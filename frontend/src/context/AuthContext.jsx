import React, { createContext, useContext, useState, useEffect } from 'react'
import * as authService from '../services/authService'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(localStorage.getItem('token'))
  const [loading, setLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    checkAuthStatus()
  }, [])

  const checkAuthStatus = async () => {
    const savedToken = localStorage.getItem('token')
    if (savedToken) {
      try {
        const profile = await authService.getProfile()
        setUser(profile.user)
        setToken(savedToken)
        setIsAuthenticated(true)
      } catch (error) {
        localStorage.removeItem('token')
        setIsAuthenticated(false)
      }
    }
    setLoading(false)
  }

  const login = async (email, password) => {
    try {
      const response = await authService.login({ email, password })
      setUser(response.user)
      setToken(response.token)
      setIsAuthenticated(true)
      return response
    } catch (error) {
      throw error
    }
  }

  const register = async (username, email, password) => {
    try {
      const response = await authService.register({ username, email, password })
      setUser(response.user)
      setToken(response.token)
      setIsAuthenticated(true)
      return response
    } catch (error) {
      throw error
    }
  }

  const logout = () => {
    authService.logout()
    setUser(null)
    setToken(null)
    setIsAuthenticated(false)
  }

  const value = {
    user,
    token,
    loading,
    isAuthenticated,
    login,
    register,
    logout,
    checkAuthStatus,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
