import { useState } from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, BookOpen, ArrowLeft } from 'lucide-react';

const LoginType = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-md w-full space-y-8 p-8">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-indigo-600 p-3 rounded-full">
              <BookOpen className="h-8 w-8 text-white" />
            </div>
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900">
            Welcome to E-Learning Platform
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Choose your login type to continue
          </p>
        </div>
        
        <div className="space-y-4">
          <Link
            to="/login/teacher"
            className="group relative w-full flex justify-center py-4 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200"
          >
            <GraduationCap className="h-5 w-5 mr-2" />
            Login as Teacher
          </Link>
          
          <Link
            to="/login/student"
            className="group relative w-full flex justify-center py-4 px-4 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200"
          >
            <BookOpen className="h-5 w-5 mr-2" />
            Login as Student
          </Link>
        </div>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <Link to="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
              Sign up here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginType;