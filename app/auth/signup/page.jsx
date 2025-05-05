'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '../../../context/AuthContext'

export default function SignUp() {
  const router = useRouter()
  const { login } = useAuth()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [formFocus, setFormFocus] = useState({
    name: false,
    email: false,
    password: false,
    confirmPassword: false
  })
  const [passwordStrength, setPasswordStrength] = useState(0)
  const [showNotification, setShowNotification] = useState(false)

  // Common font style to be used throughout the component
  const fontStyle = {
    fontFamily: '"Helvetica Neue", sans-serif',
    letterSpacing: '0.5px',
  }

  useEffect(() => {
    // Simple password strength calculator
    if (!formData.password) {
      setPasswordStrength(0)
      return
    }
    
    let strength = 0
    // Length check
    if (formData.password.length >= 8) strength += 1
    // Contains number
    if (/\d/.test(formData.password)) strength += 1
    // Contains special char
    if (/[!@#$%^&*(),.?":{}|<>]/.test(formData.password)) strength += 1
    // Contains uppercase
    if (/[A-Z]/.test(formData.password)) strength += 1
    
    setPasswordStrength(strength)
  }, [formData.password])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleFocus = (field) => {
    setFormFocus(prev => ({
      ...prev,
      [field]: true
    }))
  }

  const handleBlur = (field) => {
    setFormFocus(prev => ({
      ...prev,
      [field]: false
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
  
    // Validate password match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
  
    setLoading(true);
    setShowNotification(true);
  
    try {
      // In a real application, you would call your registration API here
      const userData = { 
        name: formData.name,
        email: formData.email 
      };
      
      // Use the login function from AuthContext to set the user
      login(userData);
      
      // Redirect immediately without artificial delay
      router.push('/profile');
    } catch (error) {
      setError('Failed to create account. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getStrengthColor = () => {
    if (passwordStrength === 0) return 'bg-gray-200'
    if (passwordStrength === 1) return 'bg-red-400'
    if (passwordStrength === 2) return 'bg-yellow-400'
    if (passwordStrength === 3) return 'bg-blue-400'
    return 'bg-green-400'
  }

  const getStrengthText = () => {
    if (!formData.password) return ''
    if (passwordStrength === 1) return 'Weak'
    if (passwordStrength === 2) return 'Fair'
    if (passwordStrength === 3) return 'Good'
    return 'Strong'
  }

  return (
    <div 
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8"
      style={fontStyle}
    >
      {/* Notification Dialog */}
      {showNotification && (
        <div className="fixed bottom-4 right-4 bg-white rounded-lg shadow-lg p-4 max-w-sm animate-slide-up z-50 border-l-4 border-green-500">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg className="h-6 w-6 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-gray-900">Account created successfully!</h3>
              <p className="mt-1 text-sm text-gray-500">Welcome to NextWave, {formData.name}!</p>
            </div>
            <button
              onClick={() => setShowNotification(false)}
              className="ml-auto flex-shrink-0 text-gray-400 hover:text-gray-500"
            >
              <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      )}
      
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="px-6 py-8 sm:px-10 sm:py-12">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Join NextWave</h2>
            <p className="text-sm text-gray-500">
              Create your account and start exploring
            </p>
          </div>
          
          {error && (
            <div className="mb-6 p-3 bg-red-50 border border-red-100 text-red-500 text-sm rounded-lg flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {error}
            </div>
          )}
          
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="relative">
                <label 
                  htmlFor="name" 
                  className={`absolute left-3 ${formFocus.name || formData.name ? 'text-xs top-2 text-gray-500' : 'text-sm top-1/2 -translate-y-1/2 text-gray-400'} transition-all duration-200`}
                >
                  Full Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  className="appearance-none block w-full px-3 pt-6 pb-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent transition-all duration-200"
                  value={formData.name}
                  onChange={handleChange}
                  onFocus={() => handleFocus('name')}
                  onBlur={() => handleBlur('name')}
                />
              </div>
              
              <div className="relative">
                <label 
                  htmlFor="email-address" 
                  className={`absolute left-3 ${formFocus.email || formData.email ? 'text-xs top-2 text-gray-500' : 'text-sm top-1/2 -translate-y-1/2 text-gray-400'} transition-all duration-200`}
                >
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none block w-full px-3 pt-6 pb-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent transition-all duration-200"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => handleFocus('email')}
                  onBlur={() => handleBlur('email')}
                />
              </div>
              
              <div className="relative">
                <label 
                  htmlFor="password" 
                  className={`absolute left-3 ${formFocus.password || formData.password ? 'text-xs top-2 text-gray-500' : 'text-sm top-1/2 -translate-y-1/2 text-gray-400'} transition-all duration-200`}
                >
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  className="appearance-none block w-full px-3 pt-6 pb-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent transition-all duration-200"
                  value={formData.password}
                  onChange={handleChange}
                  onFocus={() => handleFocus('password')}
                  onBlur={() => handleBlur('password')}
                />
                
                {formData.password && (
                  <div className="mt-1">
                    <div className="flex items-center justify-between mb-1">
                      <div className="w-full bg-gray-200 rounded-full h-1.5 mr-2">
                        <div 
                          className={`h-1.5 rounded-full ${getStrengthColor()}`} 
                          style={{ width: `${(passwordStrength / 4) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-500">{getStrengthText()}</span>
                    </div>
                    <p className="text-xs text-gray-500">Use 8+ characters with a mix of letters, numbers & symbols</p>
                  </div>
                )}
              </div>
              
              <div className="relative">
                <label 
                  htmlFor="confirm-password" 
                  className={`absolute left-3 ${formFocus.confirmPassword || formData.confirmPassword ? 'text-xs top-2 text-gray-500' : 'text-sm top-1/2 -translate-y-1/2 text-gray-400'} transition-all duration-200`}
                >
                  Confirm Password
                </label>
                <input
                  id="confirm-password"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  required
                  className="appearance-none block w-full px-3 pt-6 pb-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent transition-all duration-200"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  onFocus={() => handleFocus('confirmPassword')}
                  onBlur={() => handleBlur('confirmPassword')}
                />
              </div>
            </div>

            <div className="flex items-center">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                required
                className="h-4 w-4 text-gray-900 focus:ring-gray-500 border-gray-300 rounded"
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                I agree to the <a href="#" className="text-gray-900 font-medium hover:text-gray-700 transition-colors duration-200">Terms of Service</a> and <a href="#" className="text-gray-900 font-medium hover:text-gray-700 transition-colors duration-200">Privacy Policy</a>
              </label>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent rounded-lg text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all duration-200 shadow-sm hover:shadow-md"
              >
                {loading ? (
                  <>
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    </span>
                    Creating account...
                  </>
                ) : 'Create account'}
              </button>
            </div>
          </form>
          
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">
              Already have an account?{' '}
              <Link href="/auth/signin" className="font-medium text-gray-900 hover:text-gray-700 transition-colors duration-200">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}