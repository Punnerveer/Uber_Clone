import React, { useEffect, useContext } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { SocketContext } from '../context/SocketContext'
import LiveTracking from '../components/LiveTracking'

const Riding = () => {
  const location = useLocation()
  const { ride } = location.state || {}
  const { socket } = useContext(SocketContext)
  const navigate = useNavigate()

  const captain = ride?.captain || {}
  const vehicle = captain.vehicle || {}

  useEffect(() => {
    if (!socket) return

    const handleRideEnded = () => {
      alert('Trip completed! Thank you for riding with Uber.')
      navigate('/home')
    }

    socket.on('ride-ended', handleRideEnded)

    return () => {
      socket.off('ride-ended', handleRideEnded)
    }
  }, [ socket, navigate ])

  return (
    <div className='h-full flex flex-col justify-between bg-white relative overflow-hidden'>
      {/* Top Bar with Home Link */}
      <div className='absolute top-5 left-5 right-5 z-20 flex items-center justify-between pointer-events-none'>
        <div className='bg-emerald-500 text-white px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-md'>
          <span className='w-2 h-2 rounded-full bg-white animate-ping'></span>
          <span>Trip in Progress</span>
        </div>

        <Link
          to='/home'
          className='w-10 h-10 rounded-2xl bg-white shadow-md border border-neutral-200 flex items-center justify-center text-neutral-700 hover:bg-neutral-50 transition-all pointer-events-auto'
        >
          <i className="ri-home-5-line text-lg"></i>
        </Link>
      </div>

      {/* Map View */}
      <div className='h-1/2 w-full relative z-0'>
        <LiveTracking />
      </div>

      {/* Active Trip Info Card */}
      <div className='h-1/2 p-6 flex flex-col justify-between bg-white rounded-t-[32px] shadow-[0_-12px_40px_rgba(0,0,0,0.12)] border-t border-neutral-100 z-10'>
        <div>
          {/* Driver Header */}
          <div className='flex items-center justify-between pb-4 border-b border-neutral-100'>
            <div className='flex items-center gap-3'>
              <div className='w-12 h-12 rounded-full bg-neutral-900 text-white flex items-center justify-center font-bold text-lg shadow-sm border border-neutral-200'>
                {captain.fullname?.firstname?.[0] || 'D'}
              </div>
              <div>
                <h3 className='text-base font-bold text-neutral-900 capitalize'>
                  {(captain.fullname?.firstname || 'Captain') + ' ' + (captain.fullname?.lastname || '')}
                </h3>
                <p className='text-xs text-neutral-500 capitalize'>
                  {vehicle.color || 'White'} • {vehicle.vehicleType || 'Car'}
                </p>
              </div>
            </div>

            <div className='text-right'>
              <span className='inline-block bg-neutral-900 text-white font-extrabold text-xs px-2.5 py-1 rounded-md tracking-wider uppercase shadow-sm'>
                {vehicle.plate || 'DL 01 AB 1234'}
              </span>
              <p className='text-[11px] text-emerald-600 font-semibold mt-1'>En Route</p>
            </div>
          </div>

          {/* Destination */}
          <div className='mt-4 p-3.5 bg-neutral-50 rounded-2xl border border-neutral-100 space-y-2.5'>
            <div className='flex items-start gap-3'>
              <div className='w-3 h-3 bg-neutral-900 mt-1 shrink-0'></div>
              <div className='flex-1 overflow-hidden'>
                <span className='text-[10px] font-bold text-neutral-400 uppercase tracking-wider'>Heading to</span>
                <p className='text-xs font-semibold text-neutral-900 truncate'>{ride?.destination || 'Destination Point'}</p>
              </div>
            </div>

            <div className='pt-2 border-t border-neutral-200 flex items-center justify-between text-xs'>
              <span className='text-neutral-500 font-medium'>Payment (Cash)</span>
              <span className='font-extrabold text-base text-neutral-900'>₹{ride?.fare || 305}</span>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={() => alert(`Fare of ₹${ride?.fare || 305} to be paid directly in cash to the driver upon arrival.`)}
          className='w-full bg-black hover:bg-neutral-800 text-white font-semibold py-3.5 px-4 rounded-xl transition-all shadow-md shadow-black/10 flex items-center justify-center gap-2'
        >
          <i className="ri-wallet-3-line text-lg"></i>
          <span>Pay ₹{ride?.fare || 305} with Cash</span>
        </button>
      </div>
    </div>
  )
}

export default Riding
