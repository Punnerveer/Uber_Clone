import React, { useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import FinishRide from '../components/FinishRide'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import LiveTracking from '../components/LiveTracking'

const CaptainRiding = () => {
  const [ finishRidePanel, setFinishRidePanel ] = useState(false)
  const finishRidePanelRef = useRef(null)
  const location = useLocation()
  const rideData = location.state?.ride

  useGSAP(() => {
    if (finishRidePanel) {
      gsap.to(finishRidePanelRef.current, { transform: 'translateY(0)', duration: 0.35, ease: 'power2.out' })
    } else {
      gsap.to(finishRidePanelRef.current, { transform: 'translateY(100%)', duration: 0.3, ease: 'power2.in' })
    }
  }, [ finishRidePanel ])

  return (
    <div className='h-full w-full relative overflow-hidden bg-white flex flex-col justify-between'>
      {/* Top Floating App Bar */}
      <div className='absolute top-5 left-5 right-5 z-20 flex items-center justify-between pointer-events-none'>
        <div className='bg-neutral-900 text-white px-3.5 py-1.5 rounded-2xl text-xs font-bold flex items-center gap-2 shadow-md pointer-events-auto'>
          <span className='w-2 h-2 rounded-full bg-emerald-400 animate-ping'></span>
          <span>Navigating to Destination</span>
        </div>

        <Link
          to='/captain-home'
          className='w-10 h-10 rounded-2xl bg-white shadow-md border border-neutral-200 flex items-center justify-center text-neutral-700 hover:bg-neutral-50 transition-all pointer-events-auto'
        >
          <i className="ri-close-line text-lg"></i>
        </Link>
      </div>

      {/* Map View */}
      <div className='h-4/5 w-full relative z-0'>
        <LiveTracking />
      </div>

      {/* Driver Bottom Action Bar */}
      <div
        onClick={() => setFinishRidePanel(true)}
        className='h-1/5 bg-gradient-to-r from-amber-400 to-yellow-400 p-5 flex items-center justify-between cursor-pointer rounded-t-[32px] shadow-[0_-10px_35px_rgba(0,0,0,0.15)] z-10 transition-transform hover:brightness-105'
      >
        <div>
          <span className='text-[10px] font-extrabold uppercase tracking-wider text-neutral-800'>Trip Status</span>
          <h4 className='text-xl font-black text-neutral-900'>3.8 KM to Dropoff</h4>
          <p className='text-xs font-semibold text-neutral-700'>Tap to complete ride</p>
        </div>

        <button className='bg-black text-white font-bold py-3 px-5 rounded-2xl text-sm shadow-md flex items-center gap-1.5'>
          <span>Complete</span>
          <i className="ri-arrow-up-s-line text-lg"></i>
        </button>
      </div>

      {/* Slide-up Finish Ride Modal */}
      <div
        ref={finishRidePanelRef}
        className='absolute w-full bottom-0 left-0 z-30 translate-y-full bg-white rounded-t-[32px] shadow-[0_-15px_50px_rgba(0,0,0,0.25)] border-t border-neutral-100'
      >
        <FinishRide ride={rideData} setFinishRidePanel={setFinishRidePanel} />
      </div>
    </div>
  )
}

export default CaptainRiding
