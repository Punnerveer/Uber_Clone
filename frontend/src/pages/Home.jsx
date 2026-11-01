import React, { useEffect, useRef, useState, useContext } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import axios from 'axios'
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from '../components/LocationSearchPanel'
import VehiclePanel from '../components/VehiclePanel'
import ConfirmRide from '../components/ConfirmRide'
import LookingForDriver from '../components/LookingForDriver'
import WaitingForDriver from '../components/WaitingForDriver'
import { SocketContext } from '../context/SocketContext'
import { UserDataContext } from '../context/UserContext'
import { useNavigate, Link } from 'react-router-dom'
import LiveTracking from '../components/LiveTracking'

const Home = () => {
  const [ pickup, setPickup ] = useState('')
  const [ destination, setDestination ] = useState('')
  const [ panelOpen, setPanelOpen ] = useState(false)

  const vehiclePanelRef = useRef(null)
  const confirmRidePanelRef = useRef(null)
  const vehicleFoundRef = useRef(null)
  const waitingForDriverRef = useRef(null)
  const panelRef = useRef(null)
  const panelCloseRef = useRef(null)

  const [ vehiclePanel, setVehiclePanel ] = useState(false)
  const [ confirmRidePanel, setConfirmRidePanel ] = useState(false)
  const [ vehicleFound, setVehicleFound ] = useState(false)
  const [ waitingForDriver, setWaitingForDriver ] = useState(false)
  const [ pickupSuggestions, setPickupSuggestions ] = useState([])
  const [ destinationSuggestions, setDestinationSuggestions ] = useState([])
  const [ activeField, setActiveField ] = useState(null)
  const [ fare, setFare ] = useState({})
  const [ vehicleType, setVehicleType ] = useState('car')
  const [ ride, setRide ] = useState(null)

  const navigate = useNavigate()
  const { socket } = useContext(SocketContext)
  const { user } = useContext(UserDataContext)

  useEffect(() => {
    if (!socket) return

    socket.emit('join', { userType: 'user', userId: user?._id })

    const handleRideConfirmed = (confirmedRide) => {
      setVehicleFound(false)
      setWaitingForDriver(true)
      setRide(confirmedRide)
    }

    const handleRideStarted = (startedRide) => {
      setWaitingForDriver(false)
      navigate('/riding', { state: { ride: startedRide } })
    }

    socket.on('ride-confirmed', handleRideConfirmed)
    socket.on('ride-started', handleRideStarted)

    return () => {
      socket.off('ride-confirmed', handleRideConfirmed)
      socket.off('ride-started', handleRideStarted)
    }
  }, [ user, socket ])

  const handlePickupChange = async (e) => {
    setPickup(e.target.value)
    if (e.target.value.length >= 2) {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
          params: { input: e.target.value },
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        setPickupSuggestions(response.data)
      } catch (err) {
        console.error(err)
      }
    }
  }

  const handleDestinationChange = async (e) => {
    setDestination(e.target.value)
    if (e.target.value.length >= 2) {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
          params: { input: e.target.value },
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        setDestinationSuggestions(response.data)
      } catch (err) {
        console.error(err)
      }
    }
  }

  const submitHandler = (e) => {
    e.preventDefault()
    findTrip()
  }

  useGSAP(() => {
    if (panelOpen) {
      gsap.to(panelRef.current, { height: '68%', opacity: 1, duration: 0.35, ease: 'power2.out' })
      gsap.to(panelCloseRef.current, { opacity: 1, scale: 1, duration: 0.2 })
    } else {
      gsap.to(panelRef.current, { height: '0%', opacity: 0, duration: 0.3, ease: 'power2.in' })
      gsap.to(panelCloseRef.current, { opacity: 0, scale: 0.8, duration: 0.2 })
    }
  }, [ panelOpen ])

  useGSAP(() => {
    if (vehiclePanel) {
      gsap.to(vehiclePanelRef.current, { transform: 'translateY(0)', duration: 0.35, ease: 'power2.out' })
    } else {
      gsap.to(vehiclePanelRef.current, { transform: 'translateY(100%)', duration: 0.3, ease: 'power2.in' })
    }
  }, [ vehiclePanel ])

  useGSAP(() => {
    if (confirmRidePanel) {
      gsap.to(confirmRidePanelRef.current, { transform: 'translateY(0)', duration: 0.35, ease: 'power2.out' })
    } else {
      gsap.to(confirmRidePanelRef.current, { transform: 'translateY(100%)', duration: 0.3, ease: 'power2.in' })
    }
  }, [ confirmRidePanel ])

  useGSAP(() => {
    if (vehicleFound) {
      gsap.to(vehicleFoundRef.current, { transform: 'translateY(0)', duration: 0.35, ease: 'power2.out' })
    } else {
      gsap.to(vehicleFoundRef.current, { transform: 'translateY(100%)', duration: 0.3, ease: 'power2.in' })
    }
  }, [ vehicleFound ])

  useGSAP(() => {
    if (waitingForDriver) {
      gsap.to(waitingForDriverRef.current, { transform: 'translateY(0)', duration: 0.35, ease: 'power2.out' })
    } else {
      gsap.to(waitingForDriverRef.current, { transform: 'translateY(100%)', duration: 0.3, ease: 'power2.in' })
    }
  }, [ waitingForDriver ])

  async function findTrip() {
    if (!pickup || !destination) {
      alert('Please enter both pickup and destination locations')
      return
    }

    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/get-fare`, {
        params: { pickup, destination },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      setFare(response.data)
      setVehiclePanel(true)
      setPanelOpen(false)
    } catch (err) {
      console.error(err)
      // Fallback fares so UI is always responsive
      setFare({ auto: 200, car: 305, moto: 154 })
      setVehiclePanel(true)
      setPanelOpen(false)
    }
  }

  async function createRide() {
    try {
      await axios.post(
        `${import.meta.env.VITE_BASE_URL}/rides/create`,
        { pickup, destination, vehicleType },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      )
    } catch (err) {
      console.error('Error creating ride:', err)
    }
  }

  return (
    <div className='h-full w-full relative overflow-hidden bg-white flex flex-col justify-between'>
      {/* Top Floating App Bar */}
      <div className='absolute top-0 left-0 right-0 z-10 p-5 flex items-center justify-between pointer-events-none'>
        <div className='bg-white/90 backdrop-blur-md px-3.5 py-2 rounded-2xl shadow-md border border-neutral-200 pointer-events-auto'>
          <img
            className='w-14'
            src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
            alt="Uber"
          />
        </div>

        <Link
          to='/user/logout'
          title="Sign out"
          className='w-10 h-10 rounded-2xl bg-white/90 backdrop-blur-md border border-neutral-200 shadow-md flex items-center justify-center text-neutral-700 hover:text-red-600 hover:bg-white transition-all pointer-events-auto'
        >
          <i className="ri-logout-box-r-line text-lg"></i>
        </Link>
      </div>

      {/* Map View */}
      <div className='w-full h-full absolute inset-0 z-0'>
        <LiveTracking />
      </div>

      {/* Bottom Booking Interface */}
      <div className='flex flex-col justify-end w-full h-full absolute inset-0 pointer-events-none z-10'>
        {/* Main Search Panel */}
        <div className='bg-white p-5 pt-6 rounded-t-[32px] shadow-[0_-12px_40px_rgba(0,0,0,0.12)] border-t border-neutral-100 pointer-events-auto relative'>
          <div className='flex items-center justify-between mb-3'>
            <h4 className='text-xl font-extrabold text-neutral-900'>Find a ride</h4>
            <button
              ref={panelCloseRef}
              onClick={() => setPanelOpen(false)}
              className='opacity-0 w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-neutral-600 transition-all'
            >
              <i className="ri-arrow-down-s-line text-xl"></i>
            </button>
          </div>

          <form onSubmit={submitHandler} className='space-y-2.5 relative'>
            {/* Visual connector line between pickup and dropoff */}
            <div className="absolute left-[17px] top-[26px] bottom-[26px] w-[2px] bg-neutral-300 z-10 pointer-events-none"></div>

            {/* Pickup Input */}
            <div className='relative flex items-center'>
              <div className='absolute left-3.5 z-20 w-2.5 h-2.5 rounded-full bg-emerald-600 ring-2 ring-emerald-100'></div>
              <input
                onClick={() => {
                  setPanelOpen(true)
                  setActiveField('pickup')
                }}
                value={pickup}
                onChange={handlePickupChange}
                className='w-full bg-neutral-50 hover:bg-neutral-100 focus:bg-white border border-neutral-200 rounded-xl px-4 py-3 pl-9 text-sm font-semibold text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-black transition-all'
                type="text"
                placeholder='Add a pick-up location'
              />
            </div>

            {/* Destination Input */}
            <div className='relative flex items-center'>
              <div className='absolute left-3.5 z-20 w-2.5 h-2.5 bg-neutral-900 ring-2 ring-neutral-200'></div>
              <input
                onClick={() => {
                  setPanelOpen(true)
                  setActiveField('destination')
                }}
                value={destination}
                onChange={handleDestinationChange}
                className='w-full bg-neutral-50 hover:bg-neutral-100 focus:bg-white border border-neutral-200 rounded-xl px-4 py-3 pl-9 text-sm font-semibold text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-black transition-all'
                type="text"
                placeholder='Enter destination'
              />
            </div>

            <button
              type='submit'
              className='w-full bg-black hover:bg-neutral-800 text-white font-semibold py-3.5 px-4 rounded-xl transition-all shadow-md shadow-black/10 flex items-center justify-center gap-2 mt-1'
            >
              <span>Find Trip</span>
              <i className="ri-arrow-right-line"></i>
            </button>
          </form>
        </div>

        {/* Expandable Suggestions Container */}
        <div ref={panelRef} className='bg-white h-0 overflow-y-auto px-5 pointer-events-auto border-t border-neutral-100'>
          <LocationSearchPanel
            suggestions={activeField === 'pickup' ? pickupSuggestions : destinationSuggestions}
            setPanelOpen={setPanelOpen}
            setVehiclePanel={setVehiclePanel}
            setPickup={setPickup}
            setDestination={setDestination}
            activeField={activeField}
          />
        </div>
      </div>

      {/* Vehicle Selection Panel */}
      <div
        ref={vehiclePanelRef}
        className='absolute w-full bottom-0 left-0 z-20 translate-y-full bg-white rounded-t-[32px] shadow-[0_-12px_40px_rgba(0,0,0,0.18)] border-t border-neutral-100'
      >
        <VehiclePanel
          selectVehicle={setVehicleType}
          fare={fare}
          setConfirmRidePanel={setConfirmRidePanel}
          setVehiclePanel={setVehiclePanel}
        />
      </div>

      {/* Confirm Ride Panel */}
      <div
        ref={confirmRidePanelRef}
        className='absolute w-full bottom-0 left-0 z-20 translate-y-full bg-white rounded-t-[32px] shadow-[0_-12px_40px_rgba(0,0,0,0.18)] border-t border-neutral-100'
      >
        <ConfirmRide
          createRide={createRide}
          pickup={pickup}
          destination={destination}
          fare={fare}
          vehicleType={vehicleType}
          setConfirmRidePanel={setConfirmRidePanel}
          setVehicleFound={setVehicleFound}
        />
      </div>

      {/* Looking for Driver Panel */}
      <div
        ref={vehicleFoundRef}
        className='absolute w-full bottom-0 left-0 z-20 translate-y-full bg-white rounded-t-[32px] shadow-[0_-12px_40px_rgba(0,0,0,0.18)] border-t border-neutral-100'
      >
        <LookingForDriver
          pickup={pickup}
          destination={destination}
          fare={fare}
          vehicleType={vehicleType}
          setVehicleFound={setVehicleFound}
        />
      </div>

      {/* Waiting for Driver Panel */}
      <div
        ref={waitingForDriverRef}
        className='absolute w-full bottom-0 left-0 z-20 translate-y-full bg-white rounded-t-[32px] shadow-[0_-12px_40px_rgba(0,0,0,0.18)] border-t border-neutral-100'
      >
        <WaitingForDriver
          ride={ride}
          setVehicleFound={setVehicleFound}
          setWaitingForDriver={setWaitingForDriver}
        />
      </div>
    </div>
  )
}

export default Home
