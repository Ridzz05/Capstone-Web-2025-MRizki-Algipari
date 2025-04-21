import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import FormInput from '../components/FormInput';
import Button from '../components/Button';
import authService from '../services/authService';
import '../styles/nihilism.css';
import { getStrapiErrorMessage, logErrorDetails } from '../utils/errorHandler';

interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<RegisterFormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    // Cek jika user sudah login
    if (authService.isAuthenticated()) {
      navigate('/dashboard');
    }
  }, [navigate]);

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

    // Validasi form
    if (formData.password !== formData.confirmPassword) {
      setError('Password tidak sama. Silakan periksa kembali.');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password minimal 6 karakter.');
      return;
    }

    setLoading(true);

    try {
      await authService.register({
        username: formData.name,
        email: formData.email,
        password: formData.password,
      });

      // Registrasi berhasil, redirect ke halaman login
      navigate('/login', {
        state: {
          successMessage: 'Pendaftaran berhasil! Silakan login dengan akun Anda.',
        },
      });
    } catch (err) {
      // Log error details in development
      logErrorDetails(err, 'Register');

      // Get user-friendly error message
      const errorMessage = getStrapiErrorMessage(
        err,
        'Terjadi kesalahan saat mendaftar. Silakan coba lagi.'
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
      <div className="auth-background-text bottom">REGISTER</div>

      <div className="auth-layout">
        <div className="auth-card">
          <h1 className="auth-title">DAFTAR</h1>

          {error && <div className="alert alert-error">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="auth-form-field">
              <label className="auth-form-label">Nama</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Masukkan nama lengkap"
                required
                className="auth-form-input"
              />
            </div>

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
                placeholder="Minimal 6 karakter"
                required
                className="auth-form-input"
              />
            </div>

            <div className="auth-form-field">
              <label className="auth-form-label">Konfirmasi Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Masukkan password yang sama"
                required
                className="auth-form-input"
              />
            </div>

            <button type="submit" disabled={loading} className="auth-submit-button">
              {loading ? 'Loading...' : 'Daftar'}
            </button>

            <div className="auth-card-footer">
              Sudah punya akun?{' '}
              <Link to="/login" className="auth-link">
                MASUK
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
