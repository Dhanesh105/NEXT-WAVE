'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  const [email, setEmail] = useState('')
  const [emailError, setEmailError] = useState('')

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
    setEmailError('')
  }

  const handleSubscribe = (e) => {
    e.preventDefault()
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email address')
      return
    }
    
    // Handle subscription logic here
    alert(`Subscribed with email: ${email}`)
    setEmail('')
  }

  return (
    <footer className="font-sans bg-black text-white">
      {/* Newsletter Section */}
      <div className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start gap-8">
            <div className="w-full md:w-1/2">
              <h3 className="text-base font-medium mb-4 uppercase">BE THE FIRST TO KNOW</h3>
              <p className="text-sm text-gray-300 mb-4">Sign up for updates from mettā muse.</p>
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
                <div className="flex-grow">
                  <input 
                    type="email" 
                    value={email}
                    onChange={handleEmailChange}
                    placeholder="Enter your e-mail..." 
                    className="w-full px-4 py-2 bg-white text-black border border-gray-300 focus:outline-none"
                    aria-label="Email for newsletter"
                  />
                  {emailError && <p className="text-red-400 text-xs mt-1">{emailError}</p>}
                </div>
                <button 
                  type="submit" 
                  className="bg-black text-white px-6 py-2 uppercase text-sm font-medium border border-white"
                >
                  SUBSCRIBE
                </button>
              </form>
            </div>
            <div className="w-full md:w-1/2">
              <h3 className="text-base font-medium mb-4 uppercase">CONTACT US</h3>
              <p className="text-sm text-gray-300 mb-1">+44 221 133 5360</p>
              <p className="text-sm text-gray-300 mb-4">customercare@mettamuse.com</p>
              <h3 className="text-base font-medium mb-2 uppercase">CURRENCY</h3>
              <div className="flex items-center">
                <div className="flex items-center border border-white px-2 py-1">
                  <span className="mr-1">🌐</span>
                  <span className="text-sm">USD</span>
                </div>
              </div>
              <p className="text-xs text-gray-400 mt-2">Transactions will be completed in Euros and a currency reference is available on hover.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="py-8 border-t border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* metta muse Column */}
            <div>
              <h3 className="font-medium text-base mb-4 uppercase">mettā muse</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><Link href="#" className="hover:text-white">About Us</Link></li>
                <li><Link href="#" className="hover:text-white">Stories</Link></li>
                <li><Link href="#" className="hover:text-white">Artisans</Link></li>
                <li><Link href="#" className="hover:text-white">Boutiques</Link></li>
                <li><Link href="#" className="hover:text-white">Contact Us</Link></li>
                <li><Link href="#" className="hover:text-white">EU Compliance Docs</Link></li>
              </ul>
            </div>
            
            {/* QUICK LINKS Column */}
            <div>
              <h3 className="font-medium text-base mb-4 uppercase">QUICK LINKS</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li><Link href="#" className="hover:text-white">Orders & Shipping</Link></li>
                <li><Link href="#" className="hover:text-white">Join/Login as a Seller</Link></li>
                <li><Link href="#" className="hover:text-white">Payment & Pricing</Link></li>
                <li><Link href="#" className="hover:text-white">Return & Refunds</Link></li>
                <li><Link href="#" className="hover:text-white">FAQs</Link></li>
                <li><Link href="#" className="hover:text-white">Privacy Policy</Link></li>
                <li><Link href="#" className="hover:text-white">Terms & Conditions</Link></li>
              </ul>
            </div>
            
            {/* FOLLOW US */}
            <div>
              <h3 className="font-medium text-base mb-4 uppercase">FOLLOW US</h3>
              <div className="flex space-x-4 mb-4">
                <a href="#" aria-label="Instagram" className="text-white">
                  <div className="h-8 w-8 rounded-full border border-white flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </div>
                </a>
                <a href="#" aria-label="LinkedIn" className="text-white">
                  <div className="h-8 w-8 rounded-full border border-white flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
                    </svg>
                  </div>
                </a>
              </div>
            </div>
            
            {/* Payment Methods */}
            <div>
              <h3 className="font-medium text-base mb-4 uppercase">mettā muse ACCEPTS</h3>
              <div className="grid grid-cols-3 gap-2">
                <div className="h-8 w-14 bg-white rounded-sm flex items-center justify-center">
                  <span className="text-xs font-bold text-black">G Pay</span>
                </div>
                <div className="h-8 w-14 bg-white rounded-sm flex items-center justify-center">
                  <span className="text-xs font-bold text-black">Master</span>
                </div>
                <div className="h-8 w-14 bg-white rounded-sm flex items-center justify-center">
                  <span className="text-xs font-bold text-black">PayPal</span>
                </div>
                <div className="h-8 w-14 bg-white rounded-sm flex items-center justify-center">
                  <span className="text-xs font-bold text-black">Amex</span>
                </div>
                <div className="h-8 w-14 bg-white rounded-sm flex items-center justify-center">
                  <span className="text-xs font-bold text-black">Apple</span>
                </div>
                <div className="h-8 w-14 bg-white rounded-sm flex items-center justify-center">
                  <span className="text-xs font-bold text-black">GPay</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="py-4 text-center text-xs text-gray-400 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4">
          <p>Copyright © {new Date().getFullYear().toString()} mettamuse. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}