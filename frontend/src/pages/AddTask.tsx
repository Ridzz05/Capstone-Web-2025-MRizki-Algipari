import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TaskForm from '../components/TaskForm';
import Navbar from '../components/Navbar';
import authService from '../services/authService';
import taskService, { TaskInput } from '../services/taskService';
import '../styles/nihilism.css';
import '../styles/navbar.css';

const AddTask: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>('');
  const [isMobile, setIsMobile] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Deteksi perangkat mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Check on initial load
    checkIfMobile();

    // Check on window resize
    window.addEventListener('resize', checkIfMobile);

    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  // Load user info
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

    // Set loaded state after a short delay
    setTimeout(() => {
      setIsLoaded(true);
    }, 100);
  }, [navigate]);

  const handleAddTask = () => {
    // No need to do anything since we're already on the add task page
  };

  const handleTaskSubmit = (taskData: TaskInput) => {
    // Create new task
    taskService.createTask(taskData);

    // Redirect back to dashboard
    navigate('/dashboard');
  };

  const handleCancelForm = () => {
    // Redirect back to dashboard without creating a task
    navigate('/dashboard');
  };

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  return (
    <div
      className={`auth-container dashboard-modern ${isMobile ? 'mobile-view' : ''} ${isLoaded ? 'is-loaded' : ''}`}
    >
      <div className="auth-grid-background"></div>
      <div className="auth-background-text top">NIHIL</div>
      <div className="auth-background-text bottom">TASKS</div>

      <Navbar onAddTask={handleAddTask} onLogout={handleLogout} />

      <div className="dashboard-content">
        <div className="dashboard-header card animate-item">
          <h1 className="dashboard-title">Tambah Task Baru</h1>
          <div className="dashboard-welcome">
            <p>
              Buat task baru untuk dikelola, <strong>{username || 'User'}</strong>.
            </p>
          </div>
        </div>

        <div className="dashboard-tasks card animate-item delay-1">
          <div className="task-form-container animate-fade">
            <TaskForm onSubmit={handleTaskSubmit} onCancel={handleCancelForm} />
          </div>
        </div>

        <div className="dashboard-footer">
          {/* Bottom spacing to ensure content isn't hidden behind the nav */}
        </div>
      </div>
    </div>
  );
};

export default AddTask;
