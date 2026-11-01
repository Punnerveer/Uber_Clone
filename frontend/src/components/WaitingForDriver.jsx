import React from 'react'

const WaitingForDriver = ({ ride, setWaitingForDriver }) => {
  const captain = ride?.captain || {}
  const vehicle = captain.vehicle || {}
  const otpString = String(ride?.otp || '------')

  return (
    <div className='p-5 pt-3'>
      {/* Drag handle */}
      <div
        onClick={() => setWaitingForDriver(false)}
        className='w-12 h-1.5 bg-neutral-300 rounded-full mx-auto mb-4 cursor-pointer hover:bg-neutral-400 transition-colors'
      ></div>

      {/* Driver Card Header */}
      <div className='flex items-center justify-between mb-4 bg-emerald-50 border border-emerald-100 p-3.5 rounded-2xl'>
        <div className='flex items-center gap-3'>
          <div className='w-12 h-12 rounded-full bg-neutral-900 text-white flex items-center justify-center font-bold text-lg shadow-md border-2 border-white'>
            {captain.fullname?.firstname?.[0] || 'D'}
          </div>
          <div>
            <h4 className='font-bold text-base text-neutral-900 capitalize leading-tight'>
              {captain.fullname?.firstname ? `${captain.fullname.firstname} ${captain.fullname.lastname || ''}` : 'Your Driver'}
            </h4>
            <div className='flex items-center gap-1.5 text-xs text-neutral-600 mt-0.5'>
              <span className='flex items-center text-amber-500 font-bold'>
                <i className="ri-star-fill text-[11px] mr-0.5"></i>4.9
              </span>
              <span>•</span>
              <span className='capitalize font-medium'>{vehicle.color || 'White'} {vehicle.vehicleType || 'Car'}</span>
            </div>
          </div>
        </div>

        {/* Plate Number Badge */}
        <div className='text-right'>
          <span className='inline-block bg-white border-2 border-neutral-800 text-neutral-900 font-extrabold text-xs px-2.5 py-1 rounded-md shadow-sm tracking-wider uppercase'>
            {vehicle.plate || 'DL-01-AB-1234'}
          </span>
          <p className='text-[10px] text-emerald-700 font-semibold mt-1'>Arriving in 3 mins</p>
        </div>
      </div>

      {/* Highlighted Security PIN / OTP Card */}
      <div className='bg-neutral-900 text-white p-4 rounded-2xl mb-4 text-center shadow-lg'>
        <div className='flex items-center justify-center gap-1.5 text-xs text-neutral-400 font-semibold mb-2'>
          <i className="ri-shield-keyhole-line text-emerald-400 text-sm"></i>
          <span>Share PIN with driver to start ride</span>
        </div>
        <div className='flex justify-center items-center gap-2 font-mono text-2xl font-black tracking-widest text-emerald-400'>
          {otpString.split('').map((digit, i) => (
            <span
              key={i}
              className='inline-flex items-center justify-center w-9 h-11 bg-neutral-800 rounded-lg border border-neutral-700 shadow-inner'
            >
              {digit}
            </span>
          ))}
        </div>
      </div>

      {/* Trip Details */}
      <div className='space-y-3 bg-neutral-50 p-4 rounded-2xl border border-neutral-100 mb-4'>
        <div className='flex items-start gap-3'>
          <div className='w-5 flex flex-col items-center mt-1'>
            <div className='w-2.5 h-2.5 rounded-full bg-emerald-600'></div>
            <div className='w-0.5 h-5 bg-neutral-300 my-0.5'></div>
          </div>
          <div className='flex-1 overflow-hidden'>
            <span className='text-[10px] font-bold text-neutral-400 uppercase tracking-wider'>Pickup</span>
            <p className='text-xs font-semibold text-neutral-800 truncate'>{ride?.pickup || 'Pickup point'}</p>
          </div>
        </div>

        <div className='flex items-start gap-3'>
          <div className='w-5 flex items-center justify-center mt-0.5'>
            <div className='w-2.5 h-2.5 bg-neutral-900'></div>
          </div>
          <div className='flex-1 overflow-hidden'>
            <span className='text-[10px] font-bold text-neutral-400 uppercase tracking-wider'>Destination</span>
            <p className='text-xs font-semibold text-neutral-800 truncate'>{ride?.destination || 'Destination'}</p>
          </div>
        </div>

        <div className='pt-2 border-t border-neutral-200 flex items-center justify-between'>
          <span className='text-xs font-medium text-neutral-500'>Fare to pay</span>
          <span className='text-lg font-extrabold text-neutral-900'>₹{ride?.fare || 305}</span>
        </div>
      </div>

      {/* Driver Contact Buttons */}
      <div className='grid grid-cols-2 gap-3'>
        <button
          onClick={() => alert(`Calling driver: ${captain.fullname?.firstname || 'Captain'}...`)}
          className='w-full bg-neutral-100 hover:bg-neutral-200 text-neutral-800 font-semibold py-3 px-4 rounded-xl transition-all text-xs flex items-center justify-center gap-1.5'
        >
          <i className="ri-phone-fill text-base text-emerald-600"></i>
          <span>Call Driver</span>
        </button>
        <button
          onClick={() => alert('Opening in-app chat with driver...')}
          className='w-full bg-neutral-100 hover:bg-neutral-200 text-neutral-800 font-semibold py-3 px-4 rounded-xl transition-all text-xs flex items-center justify-center gap-1.5'
        >
          <i className="ri-message-3-fill text-base text-blue-600"></i>
          <span>Send Message</span>
        </button>
      </div>
    </div>
  )
}

export default WaitingForDriver
