import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const FinishRide = ({ ride, setFinishRidePanel }) => {
  const navigate = useNavigate()
  const [ isLoading, setIsLoading ] = useState(false)
  const user = ride?.user || {}

  async function endRide() {
    setIsLoading(true)
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/rides/end-ride`,
        { rideId: ride?._id },
        { headers: { Authorization: `Bearer ${localStorage.getItem('captain-token')}` } }
      )

      if (response.status === 200) {
        navigate('/captain-home')
      }
    } catch (err) {
      console.error(err)
      alert(err.response?.data?.message || 'Failed to complete ride.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='p-5 pt-3'>
      {/* Drag handle */}
      <div
        onClick={() => setFinishRidePanel(false)}
        className='w-12 h-1.5 bg-neutral-300 rounded-full mx-auto mb-4 cursor-pointer hover:bg-neutral-400 transition-colors'
      ></div>

      <div className='flex items-center justify-between mb-4'>
        <h3 className='text-xl font-bold text-neutral-900'>Finish this Ride</h3>
        <span className='text-xs font-semibold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-full'>
          Arrived at Dropoff
        </span>
      </div>

      {/* Passenger Card */}
      <div className='flex items-center justify-between p-3.5 bg-neutral-50 rounded-2xl border border-neutral-100 mb-4'>
        <div className='flex items-center gap-3'>
          <div className='w-11 h-11 rounded-full bg-neutral-900 text-white flex items-center justify-center font-bold text-base shadow-sm'>
            {user.fullname?.firstname?.[0] || 'U'}
          </div>
          <div>
            <h4 className='font-bold text-sm text-neutral-900 capitalize'>
              {(user.fullname?.firstname || 'Rider') + ' ' + (user.fullname?.lastname || '')}
            </h4>
            <p className='text-xs text-neutral-500'>Completed 12 km trip</p>
          </div>
        </div>
        <div className='text-right'>
          <span className='text-xl font-extrabold text-neutral-900'>₹{ride?.fare || 305}</span>
          <p className='text-[10px] text-neutral-500 font-semibold'>Collect in Cash</p>
        </div>
      </div>

      {/* Destination Summary */}
      <div className='p-3.5 bg-neutral-50 rounded-2xl border border-neutral-100 mb-5 flex items-start gap-3'>
        <div className='w-3 h-3 bg-neutral-900 mt-1 shrink-0'></div>
        <div className='flex-1 overflow-hidden'>
          <span className='text-[10px] font-bold text-neutral-400 uppercase tracking-wider'>Dropoff Location</span>
          <p className='text-xs font-semibold text-neutral-800 truncate'>{ride?.destination || 'Destination Point'}</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className='space-y-2.5'>
        <button
          onClick={endRide}
          disabled={isLoading}
          className='w-full bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold py-4 px-6 rounded-2xl transition-all shadow-lg shadow-emerald-600/20 text-base flex items-center justify-center gap-2 active:scale-[0.99]'
        >
          {isLoading ? (
            <span className='inline-block w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin'></span>
          ) : (
            <>
              <i className="ri-check-double-line text-xl"></i>
              <span>Collect ₹{ride?.fare || 305} & Finish</span>
            </>
          )}
        </button>

        <button
          onClick={() => setFinishRidePanel(false)}
          className='w-full bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-semibold py-3 px-4 rounded-xl transition-all text-sm'
        >
          Back to Map
        </button>
      </div>
    </div>
  )
}

export default FinishRide
