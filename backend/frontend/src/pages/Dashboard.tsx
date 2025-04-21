import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import authService from '../services/authService';
import '../styles/neobrutalism.css';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>('');

  useEffect(() => {
    // Cek jika user sudah login atau belum
    if (!authService.isAuthenticated()) {
      navigate('/login');
      return;
    }

    // Ambil data user
    const user = authService.getCurrentUser();
    if (user) {
      setUsername(user.username);
    }
  }, [navigate]);

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  return (
    <div className="auth-page">
      <div className="neo-container">
        <div className="neo-card">
          <h1 className="neo-title">Dashboard</h1>
          <div className="dashboard-content">
            <p>
              Selamat datang, <strong>{username || 'User'}</strong>!
            </p>
            <p>Anda telah berhasil login ke sistem. Ini adalah halaman dashboard Anda.</p>

            <div className="dashboard-stats">
              <div className="stat-card">
                <div className="stat-value">0</div>
                <div className="stat-label">Project</div>
              </div>
              <div className="stat-card">
                <div className="stat-value">0</div>
                <div className="stat-label">Task</div>
              </div>
              <div className="stat-card">
                <div className="stat-value">0</div>
                <div className="stat-label">Complete</div>
              </div>
            </div>

            <div className="form-action" style={{ maxWidth: '200px', marginTop: '40px' }}>
              <Button onClick={handleLogout}>Logout</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
