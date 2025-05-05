'use client'

import { useState, useRef, useEffect } from 'react';

export default function SortDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('RECOMMENDED');
  const dropdownRef = useRef(null);

  const options = [
    'RECOMMENDED',
    'PRICE: LOW TO HIGH',
    'POPULAR',
    'PRICE: HIGH TO LOW',
    'NEWEST'
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const selectOption = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    // You can add a callback here to handle sorting
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button 
        type="button" 
        className="inline-flex justify-between items-center w-full px-4 py-2.5 text-sm font-medium text-gray-700 bg-white rounded-lg hover:bg-gray-50 focus:outline-none transition-all duration-200"
        onClick={toggleDropdown}
      >
        <span className="uppercase font-medium tracking-wide">{selectedOption}</span>
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className={`h-4 w-4 ml-2 text-gray-500 transition-transform duration-300 ${isOpen ? 'transform rotate-180' : ''}`} 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      <div 
        className={`absolute right-0 mt-2 w-56 origin-top-right bg-white rounded-lg z-50 transform transition-all duration-300 ease-in-out ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}
        style={{ maxHeight: '300px', overflowY: 'auto' }}
      >
        <div className="py-1 divide-y divide-gray-100">
          <div className="px-4 py-2.5 text-xs font-semibold text-gray-500 uppercase tracking-wider bg-gray-50 rounded-t-lg">
            Sort By
          </div>
          {options.map((option) => (
            <button 
              key={option}
              className={`flex items-center w-full px-4 py-3 text-sm text-left hover:bg-gray-50 transition-colors duration-200 ${option === selectedOption ? 'text-gray-700 font-bold' : 'text-gray-700'}`}
              onClick={() => selectOption(option)}
            >
              {option === selectedOption ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <div className="h-5 w-5 mr-2 flex-shrink-0"></div>
              )}
              <div className="flex-grow">{option}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}