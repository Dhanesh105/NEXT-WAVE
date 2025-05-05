'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'

export default function ProductCard({ product }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [wishlistAnimation, setWishlistAnimation] = useState(false);
  const { user } = useAuth();

  // Check if product is in wishlist on component mount
  useEffect(() => {
    if (user && localStorage) {
      try {
        const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
        setIsFavorite(wishlist.some(item => item.id === product.id));
      } catch (error) {
        console.error('Error loading wishlist:', error);
      }
    }
  }, [user, product.id]);

  const toggleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!user) {
      // Redirect to login if not logged in
      window.location.href = '/auth/signin';
      return;
    }
    
    // Play animation
    setWishlistAnimation(true);
    setTimeout(() => setWishlistAnimation(false), 700);
    
    // Toggle favorite state
    const newFavoriteState = !isFavorite;
    setIsFavorite(newFavoriteState);
    
    // Update localStorage wishlist
    try {
      const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
      
      if (newFavoriteState) {
        // Add to wishlist if not already there
        if (!wishlist.some(item => item.id === product.id)) {
          wishlist.push({
            id: product.id,
            title: product.title,
            image: product.image,
            price: product.price || '$149.99',
            addedAt: new Date().toISOString()
          });
        }
      } else {
        // Remove from wishlist
        const updatedWishlist = wishlist.filter(item => item.id !== product.id);
        localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
        return;
      }
      
      localStorage.setItem('wishlist', JSON.stringify(wishlist));
      
      // You could also call an API here to sync with backend
      // Example: updateWishlistOnServer(product.id, newFavoriteState);
    } catch (error) {
      console.error('Error updating wishlist:', error);
    }
  };

  // Common font style to be used throughout the component
  const fontStyle = {
    fontFamily: '"Helvetica Neue", sans-serif',
    letterSpacing: '0.5px',
  };

  return (
    <div 
      className="group relative h-full flex flex-col bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border-0 hover:translate-y-[-4px]"
      style={fontStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Subtle background effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/80 to-white/30 opacity-80 z-0 pointer-events-none"></div>
      
      <Link href={`/products/${product.id}`} className="block relative z-10">
        <div className="relative aspect-square overflow-hidden bg-gray-50/50 rounded-t-xl">
          {product.new && (
            <div 
              className="absolute top-3 left-3 bg-black/90 text-white text-xs px-3 py-1.5 z-10 font-medium rounded-full tracking-wide backdrop-blur-sm"
              style={{
                ...fontStyle,
                fontSize: '11px',
                fontWeight: 500,
                textTransform: 'uppercase',
              }}
            >
              NEW
            </div>
          )}
          {product.outOfStock && (
            <>
              <div 
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white text-black font-bold text-center py-2 px-4 z-20 text-sm uppercase rounded-lg shadow-lg backdrop-blur-sm" 
                style={{ 
                  ...fontStyle,
                  fontSize: '14px',
                  lineHeight: '20px',
                  fontWeight: 700,
                  letterSpacing: '0.5px'
                }}>
                OUT OF STOCK
              </div>
              <div className="absolute inset-0 bg-white/50 backdrop-blur-[2px] z-10"></div>
            </>
          )}
          {product.customizable && (
            <div 
              className="absolute top-3 right-3 bg-indigo-500/90 text-white text-xs px-3 py-1.5 z-10 font-medium rounded-full tracking-wide backdrop-blur-sm"
              style={{
                ...fontStyle,
                fontSize: '11px',
                fontWeight: 500,
                textTransform: 'uppercase',
              }}
            >
              CUSTOMIZABLE
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <Image 
            src={product.image} 
            alt={product.title}
            fill
            className={`object-contain p-6 transition-transform duration-500 ease-out ${isHovered ? 'scale-105' : 'scale-100'}`}
          />
        </div>
      </Link>
      
      <div className="flex flex-col justify-between p-5 flex-grow relative z-10">
        <div className="flex justify-between items-start">
          <h3 
            className="font-bold truncate text-gray-800" 
            title={product.title}
            style={{
              ...fontStyle,
              fontSize: '16px',
              lineHeight: '24px',
              fontWeight: 600,
              color: '#333',
            }}>
            {product.title}
          </h3>
          <button 
            className={`relative p-2 -m-2 rounded-full overflow-hidden transition-all duration-300 ${isFavorite ? 'bg-rose-50/50' : 'hover:bg-gray-50/80'}`} 
            aria-label={isFavorite ? "Remove from wishlist" : "Add to wishlist"}
            onClick={toggleFavorite}
          >
            {/* Ripple effect animation */}
            {wishlistAnimation && (
              <span className="absolute inset-0 animate-ping-once rounded-full bg-rose-200/70"></span>
            )}
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className={`h-5 w-5 transition-all duration-300 ease-in-out ${wishlistAnimation ? 'scale-110' : 'scale-100'}`} 
              viewBox="0 0 24 24" 
              fill={isFavorite ? "currentColor" : "none"} 
              stroke="currentColor"
              strokeWidth={isFavorite ? 0 : 1.5}
              style={{
                color: isFavorite ? '#f43f5e' : '#d1d5db',
                filter: isFavorite ? 'drop-shadow(0 0 1px rgba(244, 63, 94, 0.5))' : 'none',
                transform: `scale(${wishlistAnimation ? 1.2 : 1})`,
                transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)'
              }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
        </div>
        
        <div className="mt-2">
          {user ? (
            <p 
              className="text-gray-900 font-medium"
              style={{
                ...fontStyle,
                fontSize: '15px',
                lineHeight: '1.5',
                fontWeight: 500,
                color: '#111',
                marginTop: '4px'
              }}>
              ${product.price}
            </p>
          ) : (
            <Link href="/auth/signin">
              <p 
                className="text-gray-500 hover:text-gray-700 transition-colors"
                style={{
                  ...fontStyle,
                  fontSize: '13px',
                  lineHeight: '1.5',
                  fontWeight: 400,
                  color: '#666',
                  cursor: 'pointer'
                }}>
                Sign in or create an account to see price
              </p>
            </Link>
          )}
        </div>
      </div>
      
      {product.recommended && (
        <div 
          className="absolute top-0 right-0 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-4 py-1 rounded-bl-xl shadow-md" 
          style={{
            ...fontStyle,
            fontWeight: 500,
            fontSize: '14px',
            lineHeight: '24px',
            letterSpacing: '0.5px',
            textAlign: 'center',
            textTransform: 'uppercase'
          }}>
          RECOMMENDED
        </div>
      )}
    </div>
  )
}