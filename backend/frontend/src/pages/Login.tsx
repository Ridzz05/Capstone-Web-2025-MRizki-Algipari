import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import FormInput from '../components/FormInput';
import Button from '../components/Button';
import authService from '../services/authService';
import '../styles/neobrutalism.css';
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
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-illustration">{/* Ilustrasi ditampilkan melalui CSS */}</div>
        <div className="auth-form-container">
          <div className="neo-form">
            <h1 className="neo-title">Masuk</h1>

            {error && <div className="neo-error">{error}</div>}
            {success && <div className="neo-success">{success}</div>}

            <form onSubmit={handleSubmit}>
              <FormInput
                label="Email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Masukkan email anda"
              />

              <FormInput
                label="Password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Masukkan password"
              />

              <div className="form-action">
                <Button type="submit" disabled={loading}>
                  {loading ? 'Loading...' : 'Masuk'}
                </Button>
              </div>

              <div className="form-footer">
                Belum punya akun?{' '}
                <Link to="/register" className="neo-link">
                  Daftar disini
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
