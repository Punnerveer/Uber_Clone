import React from 'react'

const RidePopUp = ({ ride, setRidePopupPanel, setConfirmRidePopupPanel, confirmRide }) => {
  const user = ride?.user || {}

  return (
    <div className='p-5 pt-3'>
      {/* Drag handle */}
      <div
        onClick={() => setRidePopupPanel(false)}
        className='w-12 h-1.5 bg-neutral-300 rounded-full mx-auto mb-4 cursor-pointer hover:bg-neutral-400 transition-colors'
      ></div>

      {/* Header Banner */}
      <div className='flex items-center justify-between p-4 bg-gradient-to-r from-amber-400 to-yellow-400 rounded-2xl shadow-md mb-4 text-neutral-900'>
        <div className='flex items-center gap-3'>
          <div className='w-12 h-12 rounded-full bg-black text-white flex items-center justify-center font-bold text-lg shadow-sm border border-white/20'>
            {user.fullname?.firstname?.[0] || 'U'}
          </div>
          <div>
            <span className='text-[10px] font-extrabold uppercase tracking-widest text-neutral-800'>Incoming Request</span>
            <h4 className='font-bold text-base capitalize leading-tight'>
              {(user.fullname?.firstname || 'Rider') + ' ' + (user.fullname?.lastname || '')}
            </h4>
            <div className='flex items-center gap-1 text-xs text-neutral-800 font-semibold'>
              <i className="ri-star-fill text-xs"></i>
              <span>4.9 (42 rides)</span>
            </div>
          </div>
        </div>
        <div className='text-right'>
          <span className='text-2xl font-black'>₹{ride?.fare || 305}</span>
          <p className='text-[11px] font-bold text-neutral-800'>Estimated Fare</p>
        </div>
      </div>

      {/* Route Details */}
      <div className='space-y-3 bg-neutral-50 p-4 rounded-2xl border border-neutral-100 mb-5'>
        {/* Pickup */}
        <div className='flex items-start gap-3'>
          <div className='w-5 flex flex-col items-center mt-1'>
            <div className='w-2.5 h-2.5 rounded-full bg-emerald-600 ring-2 ring-emerald-100'></div>
            <div className='w-0.5 h-6 bg-neutral-300 my-0.5'></div>
          </div>
          <div className='flex-1 overflow-hidden'>
            <span className='text-[10px] font-bold text-neutral-400 uppercase tracking-wider'>Pickup Location</span>
            <p className='text-xs font-semibold text-neutral-800 truncate'>{ride?.pickup || 'Pickup point'}</p>
          </div>
        </div>

        {/* Destination */}
        <div className='flex items-start gap-3'>
          <div className='w-5 flex items-center justify-center mt-0.5'>
            <div className='w-2.5 h-2.5 bg-neutral-900 ring-2 ring-neutral-200'></div>
          </div>
          <div className='flex-1 overflow-hidden'>
            <span className='text-[10px] font-bold text-neutral-400 uppercase tracking-wider'>Dropoff Location</span>
            <p className='text-xs font-semibold text-neutral-800 truncate'>{ride?.destination || 'Drop point'}</p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className='space-y-2.5'>
        <button
          onClick={() => {
            setConfirmRidePopupPanel(true)
            confirmRide()
          }}
          className='w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 px-6 rounded-2xl transition-all shadow-lg shadow-emerald-600/20 text-base flex items-center justify-center gap-2 active:scale-[0.99]'
        >
          <i className="ri-check-line text-xl"></i>
          <span>Accept Ride</span>
        </button>

        <button
          onClick={() => setRidePopupPanel(false)}
          className='w-full bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-semibold py-3 px-4 rounded-2xl transition-all text-sm'
        >
          Decline
        </button>
      </div>
    </div>
  )
}

export default RidePopUp
