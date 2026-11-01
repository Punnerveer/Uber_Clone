import React, { useContext } from 'react'
import { CaptainDataContext } from '../context/CapatainContext'

const CaptainDetails = () => {
  const { captain } = useContext(CaptainDataContext)

  return (
    <div className='p-5 pt-3'>
      {/* Driver Header */}
      <div className='flex items-center justify-between pb-4 border-b border-neutral-100'>
        <div className='flex items-center gap-3'>
          <div className='w-12 h-12 rounded-full bg-neutral-900 text-white flex items-center justify-center font-bold text-lg shadow-md border-2 border-white'>
            {captain?.fullname?.firstname?.[0] || 'D'}
          </div>
          <div>
            <h4 className='font-bold text-base text-neutral-900 capitalize'>
              {(captain?.fullname?.firstname || 'Captain') + ' ' + (captain?.fullname?.lastname || '')}
            </h4>
            <div className='flex items-center gap-1.5 text-xs text-neutral-500'>
              <span className='w-2 h-2 rounded-full bg-emerald-500 animate-pulse'></span>
              <span>Online • Ready for rides</span>
            </div>
          </div>
        </div>

        {/* Daily Earnings Card */}
        <div className='text-right bg-emerald-50 border border-emerald-100 px-3.5 py-2 rounded-2xl'>
          <p className='text-[10px] uppercase font-bold text-emerald-800 tracking-wider'>Today's Pay</p>
          <h4 className='text-xl font-extrabold text-emerald-700'>₹842.50</h4>
        </div>
      </div>

      {/* Driver Performance Metrics */}
      <div className='grid grid-cols-3 gap-2.5 mt-4'>
        <div className='text-center p-3 bg-neutral-50 rounded-2xl border border-neutral-100'>
          <div className='w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mx-auto mb-1.5'>
            <i className="ri-time-line text-sm"></i>
          </div>
          <h5 className='text-sm font-bold text-neutral-900'>6.4 hrs</h5>
          <p className='text-[10px] text-neutral-500 font-medium uppercase'>Online</p>
        </div>

        <div className='text-center p-3 bg-neutral-50 rounded-2xl border border-neutral-100'>
          <div className='w-8 h-8 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mx-auto mb-1.5'>
            <i className="ri-speed-up-line text-sm"></i>
          </div>
          <h5 className='text-sm font-bold text-neutral-900'>42.8 km</h5>
          <p className='text-[10px] text-neutral-500 font-medium uppercase'>Distance</p>
        </div>

        <div className='text-center p-3 bg-neutral-50 rounded-2xl border border-neutral-100'>
          <div className='w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-1.5'>
            <i className="ri-roadster-line text-sm"></i>
          </div>
          <h5 className='text-sm font-bold text-neutral-900'>8 Trips</h5>
          <p className='text-[10px] text-neutral-500 font-medium uppercase'>Completed</p>
        </div>
      </div>
    </div>
  )
}

export default CaptainDetails
