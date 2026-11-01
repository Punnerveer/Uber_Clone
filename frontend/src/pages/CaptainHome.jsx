import React, { useRef, useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import CaptainDetails from '../components/CaptainDetails'
import RidePopUp from '../components/RidePopUp'
import ConfirmRidePopUp from '../components/ConfirmRidePopUp'
import LiveTracking from '../components/LiveTracking'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { SocketContext } from '../context/SocketContext'
import { CaptainDataContext } from '../context/CapatainContext'
import axios from 'axios'

const CaptainHome = () => {
  const [ ridePopupPanel, setRidePopupPanel ] = useState(false)
  const [ confirmRidePopupPanel, setConfirmRidePopupPanel ] = useState(false)
  const [ ride, setRide ] = useState(null)

  const ridePopupPanelRef = useRef(null)
  const confirmRidePopupPanelRef = useRef(null)

  const { socket } = useContext(SocketContext)
  const { captain } = useContext(CaptainDataContext)

  useEffect(() => {
    if (!socket || !captain?._id) return

    socket.emit('join', {
      userId: captain._id,
      userType: 'captain'
    })

    const updateLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          socket.emit('update-location-captain', {
            userId: captain._id,
            location: {
              ltd: position.coords.latitude,
              lng: position.coords.longitude
            }
          })
        })
      }
    }

    const locationInterval = setInterval(updateLocation, 10000)
    updateLocation()

    const handleNewRide = (data) => {
      setRide(data)
      setRidePopupPanel(true)
    }

    socket.on('new-ride', handleNewRide)

    return () => {
      clearInterval(locationInterval)
      socket.off('new-ride', handleNewRide)
    }
  }, [ captain, socket ])

  async function confirmRide() {
    try {
      await axios.post(
        `${import.meta.env.VITE_BASE_URL}/rides/confirm`,
        {
          rideId: ride?._id,
          captainId: captain?._id
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('captain-token')}`
          }
        }
      )
      setRidePopupPanel(false)
      setConfirmRidePopupPanel(true)
    } catch (err) {
      console.error(err)
    }
  }

  useGSAP(() => {
    if (ridePopupPanel) {
      gsap.to(ridePopupPanelRef.current, { transform: 'translateY(0)', duration: 0.35, ease: 'power2.out' })
    } else {
      gsap.to(ridePopupPanelRef.current, { transform: 'translateY(100%)', duration: 0.3, ease: 'power2.in' })
    }
  }, [ ridePopupPanel ])

  useGSAP(() => {
    if (confirmRidePopupPanel) {
      gsap.to(confirmRidePopupPanelRef.current, { transform: 'translateY(0)', duration: 0.35, ease: 'power2.out' })
    } else {
      gsap.to(confirmRidePopupPanelRef.current, { transform: 'translateY(100%)', duration: 0.3, ease: 'power2.in' })
    }
  }, [ confirmRidePopupPanel ])

  return (
    <div className='h-full w-full relative overflow-hidden bg-white flex flex-col justify-between'>
      {/* Top Floating App Bar */}
      <div className='absolute top-0 left-0 right-0 z-10 p-5 flex items-center justify-between pointer-events-none'>
        <div className='bg-neutral-900 text-white px-3.5 py-2 rounded-2xl shadow-md flex items-center gap-2 pointer-events-auto'>
          <i className="ri-steering-2-fill text-amber-400"></i>
          <span className='text-xs font-bold uppercase tracking-wider'>Driver Mode</span>
        </div>

        <Link
          to='/captain/logout'
          title="Sign out"
          className='w-10 h-10 rounded-2xl bg-white/90 backdrop-blur-md border border-neutral-200 shadow-md flex items-center justify-center text-neutral-700 hover:text-red-600 hover:bg-white transition-all pointer-events-auto'
        >
          <i className="ri-logout-box-r-line text-lg"></i>
        </Link>
      </div>

      {/* Map Background */}
      <div className='w-full h-3/5 absolute top-0 left-0 right-0 z-0'>
        <LiveTracking />
      </div>

      {/* Driver Stats Bottom Container */}
      <div className='w-full bg-white rounded-t-[32px] shadow-[0_-12px_40px_rgba(0,0,0,0.12)] border-t border-neutral-100 z-10 mt-auto'>
        <CaptainDetails />
      </div>

      {/* Ride Request Incoming Popup */}
      <div
        ref={ridePopupPanelRef}
        className='absolute w-full bottom-0 left-0 z-30 translate-y-full bg-white rounded-t-[32px] shadow-[0_-15px_50px_rgba(0,0,0,0.25)] border-t border-neutral-100'
      >
        <RidePopUp
          ride={ride}
          setRidePopupPanel={setRidePopupPanel}
          setConfirmRidePopupPanel={setConfirmRidePopupPanel}
          confirmRide={confirmRide}
        />
      </div>

      {/* Confirm OTP to Start Popup */}
      <div
        ref={confirmRidePopupPanelRef}
        className='absolute w-full bottom-0 left-0 z-30 translate-y-full bg-white rounded-t-[32px] shadow-[0_-15px_50px_rgba(0,0,0,0.25)] border-t border-neutral-100'
      >
        <ConfirmRidePopUp
          ride={ride}
          setConfirmRidePopupPanel={setConfirmRidePopupPanel}
          setRidePopupPanel={setRidePopupPanel}
        />
      </div>
    </div>
  )
}

export default CaptainHome
