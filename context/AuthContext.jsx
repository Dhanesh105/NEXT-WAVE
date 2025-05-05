'use client'

import { createContext, useState, useContext, useEffect } from 'react'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Only access localStorage in browser environment
    if (typeof window !== 'undefined') {
      // Check if user is logged in from localStorage
      const isAuthenticated = localStorage.getItem('isAuthenticated')
      const userData = localStorage.getItem('user')
      
      if (isAuthenticated === 'true' && userData) {
        setUser(JSON.parse(userData))
      }
    }
    
    setLoading(false)
  }, [])

  const login = (userData) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('isAuthenticated', 'true')
      localStorage.setItem('user', JSON.stringify(userData))
    }
    setUser(userData)
  }

  const logout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('isAuthenticated')
      localStorage.removeItem('user')
    }
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    // Return a default value when context is undefined
    return { user: null, login: () => {}, logout: () => {}, loading: true }
  }
  return context
}