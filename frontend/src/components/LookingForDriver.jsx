import React from 'react'

const LookingForDriver = ({ pickup, destination, fare, vehicleType, setVehicleFound }) => {
  return (
    <div className='p-5 pt-3'>
      {/* Drag handle */}
      <div
        onClick={() => setVehicleFound(false)}
        className='w-12 h-1.5 bg-neutral-300 rounded-full mx-auto mb-4 cursor-pointer hover:bg-neutral-400 transition-colors'
      ></div>

      <div className='text-center mb-5'>
        {/* Animated Radar Pulse Container */}
        <div className='relative w-24 h-24 mx-auto flex items-center justify-center mb-3'>
          <div className='absolute inset-0 rounded-full bg-emerald-500/20 animate-ping'></div>
          <div className='absolute w-16 h-16 rounded-full bg-emerald-500/30 animate-pulse'></div>
          <div className='relative w-12 h-12 bg-black rounded-full flex items-center justify-center text-white shadow-xl'>
            <i className="ri-car-fill text-2xl animate-bounce"></i>
          </div>
        </div>

        <h3 className='text-xl font-bold text-neutral-900'>Looking for a Driver</h3>
        <p className='text-xs text-neutral-500 mt-1 flex items-center justify-center gap-1.5'>
          <span className='w-2 h-2 rounded-full bg-emerald-500 animate-pulse'></span>
          Broadcasting request to nearby captains...
        </p>

        {/* Shimmer loading progress bar */}
        <div className='w-48 h-1 bg-neutral-100 rounded-full mx-auto mt-3 overflow-hidden'>
          <div className='w-full h-full bg-black rounded-full animate-pulse'></div>
        </div>
      </div>

      {/* Ride Details Summary Card */}
      <div className='space-y-3 bg-neutral-50 p-4 rounded-2xl border border-neutral-100 mb-4'>
        {/* Pickup */}
        <div className='flex items-start gap-3'>
          <div className='w-5 flex flex-col items-center mt-1'>
            <div className='w-2.5 h-2.5 rounded-full bg-emerald-600'></div>
            <div className='w-0.5 h-5 bg-neutral-300 my-0.5'></div>
          </div>
          <div className='flex-1 overflow-hidden'>
            <span className='text-[10px] font-bold text-neutral-400 uppercase tracking-wider'>Pickup Location</span>
            <p className='text-xs font-semibold text-neutral-800 truncate'>{pickup || 'Your current location'}</p>
          </div>
        </div>

        {/* Destination */}
        <div className='flex items-start gap-3'>
          <div className='w-5 flex items-center justify-center mt-0.5'>
            <div className='w-2.5 h-2.5 bg-neutral-900'></div>
          </div>
          <div className='flex-1 overflow-hidden'>
            <span className='text-[10px] font-bold text-neutral-400 uppercase tracking-wider'>Destination</span>
            <p className='text-xs font-semibold text-neutral-800 truncate'>{destination || 'Selected drop point'}</p>
          </div>
        </div>

        {/* Price & Vehicle Type */}
        <div className='pt-2 border-t border-neutral-200 flex items-center justify-between'>
          <div className='flex items-center gap-2'>
            <span className='px-2.5 py-1 bg-neutral-200 text-neutral-800 text-[11px] font-bold rounded-lg uppercase'>
              {vehicleType || 'UberGo'}
            </span>
            <span className='text-xs text-neutral-500'>Cash payment</span>
          </div>
          <span className='text-lg font-extrabold text-neutral-900'>
            ₹{fare?.[vehicleType] || 305}
          </span>
        </div>
      </div>

      {/* Cancel Search Button */}
      <button
        onClick={() => setVehicleFound(false)}
        className='w-full bg-neutral-100 hover:bg-red-50 hover:text-red-600 text-neutral-700 font-semibold py-3.5 px-4 rounded-xl transition-all border border-neutral-200 text-sm flex items-center justify-center gap-1.5'
      >
        <i className="ri-close-circle-line text-base"></i>
        <span>Cancel ride search</span>
      </button>
    </div>
  )
}

export default LookingForDriver
