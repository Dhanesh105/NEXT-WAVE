'use client'

import Link from 'next/link'
import { useState, useRef, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { useRouter } from 'next/navigation'

export function Header() {
  // Replace individual dropdown states with a single state
  const [activeDropdown, setActiveDropdown] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [cartItems, setCartItems] = useState([])
  const [favorites, setFavorites] = useState([])
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  
  const dropdownRef = useRef(null)
  const { user, logout } = useAuth()
  const router = useRouter()
  
  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null)
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])
  
  // Toggle dropdown function that ensures only one dropdown is open at a time
  const toggleDropdown = (name) => {
    setActiveDropdown(prev => prev === name ? null : name)
  }
  
  const handleLogout = () => {
    if (logout) {
      logout()
      setActiveDropdown(null)
      router.push('/')
    }
  }
  
  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      // Close search panel
      setActiveDropdown(null)
      // Navigate to search results page with query parameter
      router.push(`/shop?search=${encodeURIComponent(searchQuery)}`)
    }
  }
  
  const addToCart = (product) => {
    setCartItems(prev => [...prev, product])
  }
  
  const removeFromCart = (productId) => {
    setCartItems(prev => prev.filter(item => item.id !== productId))
  }
  
  const toggleFavorite = (product) => {
    const isFavorite = favorites.some(item => item.id === product.id)
    if (isFavorite) {
      setFavorites(prev => prev.filter(item => item.id !== product.id))
    } else {
      setFavorites(prev => [...prev, product])
    }
  }
  
  const handleCheckout = () => {
    if (cartItems.length > 0) {
      setActiveDropdown(null)
      router.push('/checkout')
    }
  }
  
  return (
    <header className="bg-white sticky top-0 z-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={dropdownRef}>
        {/* Top section with logo and icons */}
        <div className="flex flex-col items-center h-auto py-4">
          {/* Centered Logo */}
          <div className="text-center mb-4 relative w-full">
            {/* Globe icon on the left */}
            <div className="absolute left-0 top-1/2 transform -translate-y-1/2">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-4">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
                <path d="M12 2C12 2 7 7 7 12C7 17 12 22 12 22" stroke="currentColor" strokeWidth="1.5" />
                <path d="M12 2C12 2 17 7 17 12C17 17 12 22 12 22" stroke="currentColor" strokeWidth="1.5" />
                <path d="M2 12H22" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </div>
            <Link href="/" className="font-bold text-2xl tracking-wide uppercase text-gray-900 hover:text-gray-700 transition-colors duration-300">
              LOGO
            </Link>
          </div>
          
          {/* Navigation - moved up from bottom section */}
          <nav className="hidden md:flex justify-center space-x-12 mt-3 pb-0 mb-0">
            {['SHOP', 'SKILLS', 'STORIES', 'ABOUT', 'CONTACT US'].map((item) => (
              <Link 
                key={item} 
                href={`/${item.toLowerCase().replace(' us', '')}` }
                className="text-gray-900 hover:text-gray-700 px-3 py-2 text-xs font-bold tracking-wide uppercase relative"
              >
                {item}
              </Link>
            ))}
          </nav>
        </div>
        
        {/* Icons section - moved to fixed position */}
        <div className="absolute top-4 right-4 sm:right-6 lg:right-8 flex items-center space-x-5">
          {/* Search icon */}
          <button 
            aria-label="Search" 
            className="text-gray-900 hover:text-gray-700 transition-colors duration-300 relative"
            onClick={() => toggleDropdown('search')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            
            {/* Search dropdown */}
            {activeDropdown === 'search' && (
              <div className="absolute right-0 mt-3 w-72 bg-white rounded-lg shadow-xl py-4 px-4 z-10 border border-gray-100 animate-fade-in">
                <form onSubmit={handleSearch}>
                  <div className="flex items-center border-b border-gray-200 pb-2">
                    <input
                      type="text"
                      placeholder="Search products..."
                      className="flex-1 outline-none text-sm"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      autoFocus
                    />
                    {/* Changed from button to div with onClick handler */}
                    <div 
                      onClick={handleSearch}
                      className="ml-2 text-gray-500 hover:text-gray-700 cursor-pointer"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                  </div>
                </form>
                <div className="mt-3 text-xs text-gray-500">
                  <p>Popular searches:</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {['Cotton', 'Silk', 'Formal', 'Casual', 'Men', 'Women'].map(term => (
                      <button 
                        key={term} 
                        className="px-2 py-1 bg-gray-100 rounded-full text-gray-700 hover:bg-gray-200 transition-colors"
                        onClick={() => {
                          setSearchQuery(term)
                          handleSearch({ preventDefault: () => {} })
                        }}
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </button>
          
          {/* Heart/favorites icon */}
          <button 
            aria-label="Favorites" 
            className="text-gray-900 hover:text-gray-700 transition-colors duration-300 relative"
            onClick={() => toggleDropdown('favorites')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            
            {/* Show count if there are favorites */}
            {favorites.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                {favorites.length}
              </span>
            )}
            
            {/* Favorites dropdown */}
            {activeDropdown === 'favorites' && (
              <div className="absolute right-0 mt-3 w-80 bg-white rounded-lg shadow-xl py-4 z-10 border border-gray-100 animate-fade-in">
                <div className="px-4 py-2 border-b border-gray-100">
                  <p className="text-sm font-medium">Your Favorites</p>
                </div>
                
                <div className="max-h-96 overflow-y-auto">
                  {favorites.length === 0 ? (
                    <div className="px-4 py-6 text-center">
                      <p className="text-gray-500 text-sm">No favorites yet</p>
                      <Link 
                        href="/shop" 
                        className="mt-3 inline-block text-sm text-[#2D2D2D] hover:underline"
                        onClick={() => setActiveDropdown(null)}
                      >
                        Browse products
                      </Link>
                    </div>
                  ) : (
                    <div>
                      {favorites.map((item) => (
                        <div key={item.id} className="px-4 py-3 border-b border-gray-100 flex items-center">
                          <div className="h-16 w-16 bg-gray-100 rounded flex-shrink-0 mr-3"></div>
                          <div className="flex-1">
                            <p className="text-sm font-medium truncate">{item.title}</p>
                            <p className="text-sm text-gray-500">${item.price}</p>
                          </div>
                          <div className="flex space-x-2">
                            <button 
                              className="text-gray-400 hover:text-gray-600"
                              onClick={() => toggleFavorite(item)}
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                            <button 
                              className="text-gray-400 hover:text-gray-600"
                              onClick={() => {
                                addToCart(item)
                                toggleFavorite(item)
                              }}
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
                {favorites.length > 0 && (
                  <div className="px-4 pt-3">
                    <Link 
                      href="/favorites"
                      className="block w-full py-2 px-4 bg-[#2D2D2D] text-white text-center rounded text-sm hover:bg-black transition-colors"
                      onClick={() => setActiveDropdown(null)}
                    >
                      View All Favorites
                    </Link>
                  </div>
                )}
              </div>
            )}
          </button>
          
          {/* Shopping bag icon */}
          <button 
            aria-label="Shopping bag" 
            className="text-gray-900 hover:text-gray-700 transition-colors duration-300 relative"
            onClick={() => toggleDropdown('cart')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            
            {/* Show count if there are items in cart */}
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                {cartItems.length}
              </span>
            )}
            
            {/* Cart dropdown */}
            {activeDropdown === 'cart' && (
              <div className="absolute right-0 mt-3 w-80 bg-white rounded-lg shadow-xl py-4 z-10 border border-gray-100 animate-fade-in">
                <div className="px-4 py-2 border-b border-gray-100">
                  <p className="text-sm font-medium">Your Cart</p>
                </div>
                
                <div className="max-h-96 overflow-y-auto">
                  {cartItems.length === 0 ? (
                    <div className="px-4 py-6 text-center">
                      <p className="text-gray-500 text-sm">Your cart is empty</p>
                      <Link 
                        href="/shop" 
                        className="mt-3 inline-block text-sm text-[#2D2D2D] hover:underline"
                        onClick={() => setActiveDropdown(null)}
                      >
                        Start shopping
                      </Link>
                    </div>
                  ) : (
                    <div>
                      {cartItems.map((item) => (
                        <div key={item.id} className="px-4 py-3 border-b border-gray-100 flex items-center">
                          <div className="h-16 w-16 bg-gray-100 rounded flex-shrink-0 mr-3"></div>
                          <div className="flex-1">
                            <p className="text-sm font-medium truncate">{item.title}</p>
                            <p className="text-sm text-gray-500">${item.price}</p>
                          </div>
                          <button 
                            className="text-gray-400 hover:text-gray-600"
                            onClick={() => removeFromCart(item.id)}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
                {cartItems.length > 0 && (
                  <div className="px-4 pt-3">
                    <div className="flex justify-between py-2 text-sm">
                      <span>Subtotal:</span>
                      <span className="font-medium">
                        ${cartItems.reduce((total, item) => total + item.price, 0).toFixed(2)}
                      </span>
                    </div>
                    <button 
                      className="block w-full py-2 px-4 bg-[#2D2D2D] text-white text-center rounded text-sm hover:bg-black transition-colors"
                      onClick={handleCheckout}
                    >
                      Checkout
                    </button>
                    <Link 
                      href="/cart"
                      className="block w-full py-2 px-4 mt-2 border border-gray-300 text-gray-700 text-center rounded text-sm hover:bg-gray-50 transition-colors"
                      onClick={() => setActiveDropdown(null)}
                    >
                      View Cart
                    </Link>
                  </div>
                )}
              </div>
            )}
          </button>
          
          {/* User account icon/menu */}
          <div className="relative">
            <button 
              aria-label="User account" 
              className="text-gray-900 hover:text-gray-700 transition-colors duration-300 flex items-center group relative"
              onClick={() => toggleDropdown('user')}
            >
              {user ? (
                <div className="flex items-center">
                  <div className="h-6 w-6 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center text-xs font-medium text-gray-700 mr-1 shadow-sm group-hover:shadow group-hover:from-gray-300 group-hover:to-gray-200 transition-all duration-300 transform group-hover:scale-105">
                    {user.name ? user.name.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-xs hidden sm:inline group-hover:text-gray-900 transition-colors duration-300">{user.name || user.email}</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 ml-1 text-gray-500 group-hover:text-gray-700 transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              )}
            </button>
            
            {/* User dropdown menu */}
            {activeDropdown === 'user' && (
              <div className="absolute right-0 mt-3 w-56 bg-white rounded-lg shadow-xl py-2 z-10 border border-gray-100 transform transition-all duration-200 opacity-100 scale-100 origin-top-right animate-fade-in">
                {/* ... existing user menu code ... */}
                <div className="px-4 py-3 border-b border-gray-100">
                  <p className="text-xs text-gray-500 uppercase tracking-wider">Account</p>
                  {user && (
                    <p className="text-sm font-medium text-gray-900 truncate">{user.name || user.email}</p>
                  )}
                </div>
                {user ? (
                  <>
                    <Link 
                      href="/profile" 
                      className="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors duration-150"
                      onClick={() => setActiveDropdown(null)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-3 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      Your Profile
                    </Link>
                    <Link 
                      href="/orders" 
                      className="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors duration-150"
                      onClick={() => setActiveDropdown(null)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-3 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      </svg>
                      Your Orders
                    </Link>
                    <div className="border-t border-gray-100 my-1"></div>
                    <button 
                      className="flex items-center w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors duration-150"
                      onClick={handleLogout}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-3 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      Sign out
                    </button>
                  </>
                ) : (
                  <>
                    <Link 
                      href="/auth/signin" 
                      className="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors duration-150"
                      onClick={() => setActiveDropdown(null)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-3 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                      </svg>
                      Sign in
                    </Link>
                    <Link 
                      href="/auth/signup" 
                      className="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors duration-150"
                      onClick={() => setActiveDropdown(null)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-3 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                      </svg>
                      Create account
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>
          
          {/* Language selector */}
          <div className="text-xs font-medium text-gray-900 hover:text-gray-700 cursor-pointer transition-colors duration-300">
            ENG
            <span className="ml-1 text-[10px]">▼</span>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-lg">
            {['SHOP', 'SKILLS', 'STORIES', 'ABOUT', 'CONTACT US'].map((item) => (
              <Link 
                key={item}
                href={`/${item.toLowerCase().replace(' us', '')}`} 
                className="block px-3 py-2 text-gray-900 font-normal hover:bg-gray-50 rounded-md uppercase text-xs tracking-wide transition-colors duration-300"
              >
                {item}
              </Link>
            ))}
            
            {/* Add authentication links for mobile */}
            {!user && (
              <>
                <Link 
                  href="/auth/signin" 
                  className="block px-3 py-2 text-gray-900 font-normal hover:bg-gray-50 rounded-md text-xs tracking-wide transition-colors duration-300"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign in
                </Link>
                <Link 
                  href="/auth/signup" 
                  className="block px-3 py-2 text-gray-900 font-normal hover:bg-gray-50 rounded-md text-xs tracking-wide transition-colors duration-300"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Create account
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  )
}

export default Header