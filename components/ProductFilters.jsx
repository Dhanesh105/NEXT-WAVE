'use client'

import { useState, useEffect } from 'react'

export default function ProductFilters({ onFilterChange, filters }) {
  // State to track which dropdowns are open
  const [openDropdowns, setOpenDropdowns] = useState({});
  
  // Common font style to be used throughout the component
  const fontStyle = {
    fontFamily: '"Helvetica Neue", sans-serif',
    letterSpacing: '0.5px',
  };

  const handleFilterChange = (filterName, value, isMultiSelect = false) => {
    let newValue;
    
    if (isMultiSelect) {
      // For multi-select filters, toggle the selected value in the array
      const currentValues = Array.isArray(filters[filterName]) ? filters[filterName] : [];
      
      if (value === '') {
        // If 'All' is selected, clear all selections
        newValue = [];
      } else if (currentValues.includes(value)) {
        // If value is already selected, remove it
        newValue = currentValues.filter(item => item !== value);
      } else {
        // Otherwise add it to the selection
        newValue = [...currentValues, value];
      }
    } else {
      // For boolean filters (checkboxes), just use the value directly
      newValue = value;
    }
    
    const newFilters = { ...filters, [filterName]: newValue };
    
    // Call onFilterChange to refresh products
    if (onFilterChange) {
      onFilterChange(newFilters);
    }
  };
  
  // Toggle dropdown open/closed state
  const toggleDropdown = (name) => {
    setOpenDropdowns(prev => ({
      ...prev,
      [name]: !prev[name]
    }));
  };
  
  // Custom dropdown component with multi-selection support
  const FilterDropdown = ({ title, name, options, value }) => {
    // Ensure value is always an array for multi-select
    const selectedValues = Array.isArray(value) ? value : [];
    const allSelected = selectedValues.length === 0; // 'All' is selected when no specific options are chosen
    
    return (
      <div className="mb-6">
        <div 
          className="flex justify-between items-center cursor-pointer" 
          onClick={() => toggleDropdown(name)}
        >
          <h3 
            className="text-sm uppercase font-medium"
            style={{
              ...fontStyle,
              fontSize: '14px',
              fontWeight: 700,
              color: '#333',
              textTransform: 'uppercase',
            }}
          >
            {title}
          </h3>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className={`h-4 w-4 text-gray-500 transition-transform duration-300 ${openDropdowns[name] ? 'transform rotate-180' : ''}`} 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
        
        {openDropdowns[name] && (
          <div className="mt-3 pl-1 border-l-2 border-gray-100">
            <div className="space-y-2">
              <div 
                className="flex items-center cursor-pointer" 
                onClick={() => handleFilterChange(name, '', true)}
              >
                <div className={`w-4 h-4 border border-gray-300 rounded-sm mr-2 flex items-center justify-center ${allSelected ? 'bg-gray-900' : 'bg-white'}`}>
                  {allSelected && (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <span className="text-sm text-gray-700">All</span>
              </div>
              
              {options.map((option) => (
                <div 
                  key={option} 
                  className="flex items-center cursor-pointer" 
                  onClick={() => handleFilterChange(name, option, true)}
                >
                  <div className={`w-4 h-4 border border-gray-300 rounded-sm mr-2 flex items-center justify-center ${selectedValues.includes(option) ? 'bg-gray-900' : 'bg-white'}`}>
                    {selectedValues.includes(option) && (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <span className="text-sm text-gray-700">{option}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };
  
  return (
    <div className="pr-6 space-y-6" style={fontStyle}>
      <div>
        <div className="flex items-center mb-6">
          <input 
            type="checkbox" 
            id="availability" 
            className="mr-2 h-4 w-4 text-[#2D2D2D] focus:ring-[#2D2D2D] border-gray-300 rounded" 
            checked={filters.availability}
            onChange={(e) => handleFilterChange('availability', e.target.checked)}
            aria-label="Show only available products"
          />
          <label 
            htmlFor="availability" 
            className="text-sm uppercase font-medium"
            style={{
              ...fontStyle,
              fontSize: '14px',
              fontWeight: 700,
              color: '#333',
              textTransform: 'uppercase'
            }}
          >
            IN STOCK ONLY
          </label>
        </div>
        
        <div className="flex items-center mb-6">
          <input 
            type="checkbox" 
            id="customizable" 
            className="mr-2 h-4 w-4 text-[#2D2D2D] focus:ring-[#2D2D2D] border-gray-300 rounded" 
            checked={filters.customizable || false}
            onChange={(e) => handleFilterChange('customizable', e.target.checked)}
            aria-label="Show only customizable products"
          />
          <label 
            htmlFor="customizable" 
            className="text-sm uppercase font-medium"
            style={{
              ...fontStyle,
              fontSize: '14px',
              fontWeight: 700,
              color: '#333',
              textTransform: 'uppercase'
            }}
          >
            CUSTOMIZABLE
          </label>
        </div>
        
        {/* Filter dropdowns with multi-selection support */}
        <FilterDropdown 
          title="IDEAL FOR" 
          name="idealFor" 
          options={['Men', 'Women', 'Baby & Kids']} 
          value={filters.idealFor || []} 
        />
        
        <FilterDropdown 
          title="OCCASION" 
          name="occasion" 
          options={['Casual', 'Formal', 'Business']} 
          value={filters.occasion || []} 
        />
        
        <FilterDropdown 
          title="WORK" 
          name="work" 
          options={['Embroidery', 'Print', 'Handloom']} 
          value={filters.work || []} 
        />
        
        <FilterDropdown 
          title="FABRIC" 
          name="fabric" 
          options={['Cotton', 'Silk', 'Wool', 'Synthetic']} 
          value={filters.fabric || []} 
        />
        
        <FilterDropdown 
          title="SEGMENT" 
          name="segment" 
          options={['Premium', 'Mid-range', 'Budget']} 
          value={filters.segment || []} 
        />
        
        <FilterDropdown 
          title="SUITABLE FOR" 
          name="suitableFor" 
          options={['Daily Wear', 'Party Wear', 'Office Wear', 'Outdoor Activities']} 
          value={filters.suitableFor || []} 
        />
        
        <FilterDropdown 
          title="RAW MATERIALS" 
          name="rawMaterials" 
          options={['Organic', 'Recycled', 'Natural', 'Synthetic']} 
          value={filters.rawMaterials || []} 
        />
        
        <FilterDropdown 
          title="PATTERN" 
          name="pattern" 
          options={['Solid', 'Striped', 'Checkered', 'Printed', 'Floral']} 
          value={filters.pattern || []} 
        />
      </div>
    </div>
  )
}