import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { quizAPI, quoteAPI } from '../services/api';
import { BookOpen, User, LogOut, Plus, Play, Quote, GraduationCap, Users } from 'lucide-react';

const Dashboard = () => {
  const { user, userRole, logout } = useAuth();
  const [quizzes, setQuizzes] = useState([]);
  const [todaysQuote, setTodaysQuote] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [quizzesData, quoteData] = await Promise.all([
          quizAPI.getAllQuizzes(),
          quoteAPI.getTodaysQuote()
        ]);
        setQuizzes(quizzesData);
        setTodaysQuote(quoteData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <BookOpen className="h-8 w-8 text-indigo-600" />
              <h1 className="ml-2 text-2xl font-bold text-gray-900">E-Learning Platform</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                to="/profile"
                className="flex items-center text-gray-700 hover:text-indigo-600"
              >
                <User className="h-5 w-5 mr-1" />
                Profile
              </Link>
              <button
                onClick={logout}
                className="flex items-center text-gray-700 hover:text-red-600"
              >
                <LogOut className="h-5 w-5 mr-1" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            {userRole === 'teacher' ? (
              <GraduationCap className="h-8 w-8 text-indigo-600 mr-3" />
            ) : (
              <BookOpen className="h-8 w-8 text-indigo-600 mr-3" />
            )}
            <div>
              <h2 className="text-3xl font-bold text-gray-900">
                Welcome back, {user?.name || (userRole === 'teacher' ? 'Teacher' : 'Student')}!
              </h2>
              <p className="text-sm text-indigo-600 font-medium capitalize">
                {userRole} Dashboard
              </p>
            </div>
          </div>
          <p className="text-gray-600">
            {userRole === 'teacher' 
              ? 'Manage your quizzes and track student progress'
              : 'Continue your learning journey with our interactive quizzes'
            }
          </p>
        </div>

        {/* Today's Quote */}
        {todaysQuote && (
          <div className="mb-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg p-6 text-white">
            <div className="flex items-start">
              <Quote className="h-6 w-6 mr-3 mt-1 flex-shrink-0" />
              <div>
                <blockquote className="text-lg italic">
                  "{todaysQuote.text}"
                </blockquote>
                <cite className="block mt-2 text-indigo-100">
                  — {todaysQuote.author}
                </cite>
              </div>
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {userRole === 'teacher' ? (
              <>
                <Link
                  to="/quiz/create"
                  className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center">
                    <Plus className="h-8 w-8 text-indigo-600 mr-3" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Create Quiz</h4>
                      <p className="text-gray-600 text-sm">Create a new quiz for students</p>
                    </div>
                  </div>
                </Link>
                
                <Link
                  to="/student-progress"
                  className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center">
                    <Users className="h-8 w-8 text-green-600 mr-3" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Student Progress</h4>
                      <p className="text-gray-600 text-sm">View quiz attempts and scores</p>
                    </div>
                  </div>
                </Link>
              </>
            ) : (
              <>
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                  <div className="flex items-center">
                    <Play className="h-8 w-8 text-indigo-600 mr-3" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Take Quizzes</h4>
                      <p className="text-gray-600 text-sm">Browse available quizzes below</p>
                    </div>
                  </div>
                </div>
              </>
            )}
            
            <Link
              to="/profile"
              className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow"
            >
              <div className="flex items-center">
                <User className="h-8 w-8 text-green-600 mr-3" />
                <div>
                  <h4 className="font-semibold text-gray-900">Update Profile</h4>
                  <p className="text-gray-600 text-sm">Manage your profile information</p>
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* Available Quizzes */}
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            {userRole === 'teacher' ? 'Your Created Quizzes' : 'Available Quizzes'}
          </h3>
          {quizzes.length === 0 ? (
            <div className="text-center py-12">
              <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h4 className="text-lg font-medium text-gray-900 mb-2">No quizzes available</h4>
              <p className="text-gray-600">Be the first to create a quiz!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {quizzes.map((quiz) => (
                <div key={quiz._id} className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow">
                  <div className="p-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">
                      {quiz.title}
                    </h4>
                    <p className="text-gray-600 text-sm mb-4">
                      {quiz.questions?.length || 0} questions
                    </p>
                    <Link
                      to={`/quiz/${quiz._id}`}
                      className="inline-flex items-center text-indigo-600 hover:text-indigo-700 font-medium"
                    >
                      <Play className="h-4 w-4 mr-1" />
                      Start Quiz
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;