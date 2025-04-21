import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import FormInput from '../components/FormInput';
import Button from '../components/Button';
import authService from '../services/authService';
import '../styles/nihilism.css';
import { getStrapiErrorMessage, logErrorDetails } from '../utils/errorHandler';

interface LocationState {
  successMessage?: string;
}

interface LoginFormData {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState;

  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
  });
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    // Jika ada pesan sukses dari halaman Register
    if (state?.successMessage) {
      setSuccess(state.successMessage);
    }

    // Cek jika user sudah login
    if (authService.isAuthenticated()) {
      navigate('/dashboard');
    }
  }, [navigate, state]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      await authService.login({
        identifier: formData.email,
        password: formData.password,
      });

      navigate('/dashboard');
    } catch (err) {
      // Log error details in development
      logErrorDetails(err, 'Login');

      // Get user-friendly error message
      const errorMessage = getStrapiErrorMessage(
        err,
        'Email atau password salah. Silakan coba lagi.'
      );

      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-grid-background"></div>
      <div className="auth-background-text top">NIHIL</div>
      <div className="auth-background-text bottom">LOGIN</div>

      <div className="auth-layout">
        <div className="auth-card">
          <h1 className="auth-title">MASUK</h1>

          {error && <div className="alert alert-error">{error}</div>}
          {success && <div className="alert alert-success">{success}</div>}

          <form onSubmit={handleSubmit}>
            <div className="auth-form-field">
              <label className="auth-form-label">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Masukkan email anda"
                required
                className="auth-form-input"
              />
            </div>

            <div className="auth-form-field">
              <label className="auth-form-label">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Masukkan password"
                required
                className="auth-form-input"
              />
            </div>

            <button type="submit" disabled={loading} className="auth-submit-button">
              {loading ? 'Loading...' : 'Masuk'}
            </button>

            <div className="auth-card-footer">
              Belum punya akun?{' '}
              <Link to="/register" className="auth-link">
                DAFTAR
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
