import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Eye, EyeOff, BookOpen, GraduationCap, ArrowLeft } from 'lucide-react';

const Login = () => {
  const { userType } = useParams();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [attemptsLeft, setAttemptsLeft] = useState(null);
  const [lockedUntil, setLockedUntil] = useState(null);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  // If no userType specified, redirect to login type selection
  if (!userType || !['teacher', 'student'].includes(userType)) {
    navigate('/login-type');
    return null;
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await login(formData.email, formData.password);
    
    if (result.success) {
      // Check if the logged-in user's role matches the expected role
      if (result.role !== userType) {
        setError(`Please login with a ${userType} account. You are logged in as a ${result.role}.`);
        return;
      }
      navigate('/dashboard');
    } else {
      setError(result.error);
      setAttemptsLeft(result.attemptsLeft);
      setLockedUntil(result.lockedUntil);
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-md w-full space-y-8 p-8">
        <div className="text-center">
          <div className="flex justify-center">
            {userType === 'teacher' ? (
              <GraduationCap className="h-12 w-12 text-indigo-600" />
            ) : (
              <BookOpen className="h-12 w-12 text-indigo-600" />
            )}
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            {userType === 'teacher' ? 'Teacher Login' : 'Student Login'}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Sign in to your {userType} account
          </p>
          <Link
            to="/login-type"
            className="inline-flex items-center text-sm text-indigo-600 hover:text-indigo-500 mt-2"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Change login type
          </Link>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className={`px-4 py-3 rounded-md ${
              attemptsLeft === 0 ? 'bg-red-100 border border-red-300 text-red-800' : 'bg-red-50 border border-red-200 text-red-600'
            }`}>
              <div className="font-medium">{error}</div>
              {attemptsLeft !== null && attemptsLeft > 0 && (
                <div className="text-sm mt-1">
                  {attemptsLeft} attempt{attemptsLeft !== 1 ? 's' : ''} remaining
                </div>
              )}
              {lockedUntil && (
                <div className="text-sm mt-1">
                  Account locked until: {new Date(lockedUntil).toLocaleString()}
                </div>
              )}
            </div>
          )}
          
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Enter your email"
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1 relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="appearance-none relative block w-full px-3 py-2 pr-10 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <Link to="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
                Sign up as {userType}
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;