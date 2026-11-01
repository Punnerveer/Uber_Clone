import React from 'react'
import { Link } from 'react-router-dom'

const Start = () => {
  return (
    <div className='h-full flex flex-col justify-between bg-neutral-950 relative overflow-hidden'>
      {/* Background Hero Image with Dark Gradient Overlay */}
      <div className='absolute inset-0 bg-cover bg-center bg-[url(https://images.unsplash.com/photo-1557404763-69708cd8b9ce?q=80&w=1000&auto=format&fit=crop)] opacity-60'></div>
      <div className='absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-neutral-950/20'></div>

      {/* Top Header */}
      <div className='relative z-10 p-7 pt-9 flex items-center justify-between'>
        <img
          className='w-20 invert brightness-0'
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt="Uber"
        />
        <Link
          to='/captain-login'
          className='text-xs font-semibold text-white/90 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 hover:bg-white/20 transition-all'
        >
          Driver Mode
        </Link>
      </div>

      {/* Bottom Content Card */}
      <div className='relative z-10 bg-white p-7 pt-8 rounded-t-[32px] shadow-2xl'>
        <div className='w-12 h-1 bg-neutral-200 rounded-full mx-auto mb-6'></div>
        <div className='flex items-center gap-2 mb-2'>
          <span className='inline-flex items-center justify-center w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold'>
            ✓
          </span>
          <span className='text-xs font-semibold text-emerald-700 tracking-wide uppercase'>Always available</span>
        </div>
        <h1 className='text-2xl sm:text-3xl font-extrabold text-neutral-900 leading-tight mb-2'>
          Go anywhere with Uber
        </h1>
        <p className='text-sm text-neutral-500 mb-6'>
          Request a ride, hop in, and go. Fast, secure, and always at your fingertips.
        </p>

        <Link
          to='/login'
          className='flex items-center justify-between w-full bg-black hover:bg-neutral-800 text-white font-semibold py-4 px-6 rounded-2xl transition-all shadow-lg shadow-black/20 group'
        >
          <span className='text-base font-semibold'>Continue as Rider</span>
          <div className='w-8 h-8 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-1 transition-transform'>
            <i className="ri-arrow-right-line text-lg"></i>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default Start
