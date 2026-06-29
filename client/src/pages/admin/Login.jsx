import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Navigate } from 'react-router-dom';
import { FiLock } from 'react-icons/fi';
import Button from '../../components/common/Button.jsx';
import { useAuth } from '../../context/AuthContext.jsx';

const Login = () => {
  const { login, isAuthenticated } = useAuth();
  const { register, handleSubmit, formState: { isSubmitting } } = useForm();
  const [error, setError] = useState('');

  if (isAuthenticated) return <Navigate to="/" replace />;

  const onSubmit = async (values) => {
    setError('');
    try {
      await login(values);
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <main className="login-page">
      <form className="login-card" onSubmit={handleSubmit(onSubmit)}>
        <h1>Admin Login</h1>
        <p>Sign in to manage projects and certificates.</p>
        {error && <span className="form-error">{error}</span>}
        <input {...register('email', { required: true })} type="email" placeholder="Email" />
        <input {...register('password', { required: true })} type="password" placeholder="Password" />
        <Button type="submit" icon={FiLock} disabled={isSubmitting}>{isSubmitting ? 'Signing in...' : 'Login'}</Button>
      </form>
    </main>
  );
};

export default Login;
