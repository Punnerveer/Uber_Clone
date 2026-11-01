import React from 'react'

const LocationSearchPanel = ({ suggestions, setVehiclePanel, setPanelOpen, setPickup, setDestination, activeField }) => {
  const handleSuggestionClick = (suggestion) => {
    if (activeField === 'pickup') {
      setPickup(suggestion)
    } else if (activeField === 'destination') {
      setDestination(suggestion)
    }
  }

  if (!suggestions || suggestions.length === 0) {
    return (
      <div className='p-6 text-center text-neutral-400'>
        <i className="ri-map-pin-line text-3xl mb-2 inline-block"></i>
        <p className='text-xs font-medium'>Type an address or landmark above</p>
      </div>
    )
  }

  return (
    <div className='space-y-1.5 py-2'>
      {suggestions.map((elem, idx) => {
        // Split into title and subtitle if contains comma
        const parts = elem.split(',')
        const title = parts[0]
        const subtitle = parts.slice(1).join(',').trim()

        return (
          <div
            key={idx}
            onClick={() => handleSuggestionClick(elem)}
            className='flex items-center gap-3.5 p-3 rounded-2xl hover:bg-neutral-100 active:bg-neutral-200 cursor-pointer transition-colors'
          >
            <div className='w-9 h-9 rounded-full bg-neutral-100 flex items-center justify-center shrink-0 border border-neutral-200 text-neutral-700'>
              <i className="ri-map-pin-2-fill text-base"></i>
            </div>
            <div className='flex-1 overflow-hidden'>
              <h4 className='font-bold text-sm text-neutral-900 truncate'>{title}</h4>
              {subtitle && (
                <p className='text-xs text-neutral-500 truncate'>{subtitle}</p>
              )}
            </div>
            <i className="ri-arrow-right-s-line text-neutral-400 text-lg"></i>
          </div>
        )
      })}
    </div>
  )
}

export default LocationSearchPanel
