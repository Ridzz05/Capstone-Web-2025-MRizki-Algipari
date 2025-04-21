import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import FormInput from '../components/FormInput';
import Button from '../components/Button';
import authService from '../services/authService';
import '../styles/neobrutalism.css';
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
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-illustration">{/* Ilustrasi ditampilkan melalui CSS */}</div>
        <div className="auth-form-container">
          <div className="neo-form">
            <h1 className="neo-title">Daftar</h1>

            {error && <div className="neo-error">{error}</div>}

            <form onSubmit={handleSubmit}>
              <FormInput
                label="Nama"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Masukkan nama lengkap"
              />

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
                placeholder="Minimal 6 karakter"
              />

              <FormInput
                label="Konfirmasi Password"
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Masukkan password yang sama"
              />

              <div className="form-action">
                <Button type="submit" disabled={loading}>
                  {loading ? 'Loading...' : 'Daftar'}
                </Button>
              </div>

              <div className="form-footer">
                Sudah punya akun?{' '}
                <Link to="/login" className="neo-link">
                  Masuk disini
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
