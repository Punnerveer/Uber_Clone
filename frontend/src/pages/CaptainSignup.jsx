import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CaptainDataContext } from '../context/CapatainContext'
import axios from 'axios'

const CaptainSignup = () => {
  const navigate = useNavigate()

  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ firstName, setFirstName ] = useState('')
  const [ lastName, setLastName ] = useState('')

  const [ vehicleColor, setVehicleColor ] = useState('')
  const [ vehiclePlate, setVehiclePlate ] = useState('')
  const [ vehicleCapacity, setVehicleCapacity ] = useState('')
  const [ vehicleType, setVehicleType ] = useState('')
  const [ errorMessage, setErrorMessage ] = useState('')
  const [ isLoading, setIsLoading ] = useState(false)

  const { setCaptain } = useContext(CaptainDataContext)

  const submitHandler = async (e) => {
    e.preventDefault()
    setErrorMessage('')
    setIsLoading(true)

    const captainData = {
      fullname: {
        firstname: firstName,
        lastname: lastName
      },
      email,
      password,
      vehicle: {
        color: vehicleColor,
        plate: vehiclePlate,
        capacity: Number(vehicleCapacity),
        vehicleType
      }
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`, captainData)

      if (response.status === 201) {
        const data = response.data
        setCaptain(data.captain)
        localStorage.setItem('captain-token', data.token)
        navigate('/captain-home')
      }
    } catch (error) {
      console.error(error)
      const msg = error.response?.data?.message || error.response?.data?.errors?.[0]?.msg || 'Registration failed. Please check the details and try again.'
      setErrorMessage(msg)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='h-full flex flex-col justify-between p-7 bg-white overflow-y-auto'>
      <div>
        {/* Top Header */}
        <div className='flex items-center justify-between mb-6 pt-2'>
          <Link to='/captain-login' className='w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center hover:bg-neutral-200 transition-colors'>
            <i className="ri-arrow-left-line text-lg text-neutral-700"></i>
          </Link>
          <div className='flex items-center gap-2 bg-neutral-900 text-white px-3 py-1.5 rounded-full'>
            <i className="ri-steering-2-fill text-yellow-400 text-sm"></i>
            <span className='text-xs font-bold uppercase tracking-wider'>Captain Fleet</span>
          </div>
          <div className='w-10'></div>
        </div>

        {/* Heading */}
        <div className='mb-6'>
          <h2 className='text-2xl font-bold text-neutral-900'>Become a Driver</h2>
          <p className='text-sm text-neutral-500 mt-1'>Register your vehicle and start earning</p>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className='mb-5 p-3.5 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2.5 text-red-600 text-sm'>
            <i className="ri-error-warning-fill text-lg shrink-0"></i>
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={submitHandler} className='space-y-4'>
          {/* Driver Name */}
          <div className='grid grid-cols-2 gap-3'>
            <div>
              <label className='block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1.5'>First Name</label>
              <input
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className='w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 text-neutral-900 placeholder-neutral-400 text-sm focus:outline-none focus:border-black focus:bg-white transition-all'
                type="text"
                placeholder='Rahul'
              />
            </div>
            <div>
              <label className='block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1.5'>Last Name</label>
              <input
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className='w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 text-neutral-900 placeholder-neutral-400 text-sm focus:outline-none focus:border-black focus:bg-white transition-all'
                type="text"
                placeholder='Sharma'
              />
            </div>
          </div>

          <div>
            <label className='block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1.5'>Email Address</label>
            <input
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 text-neutral-900 placeholder-neutral-400 text-sm focus:outline-none focus:border-black focus:bg-white transition-all'
              type="email"
              placeholder='driver@example.com'
            />
          </div>

          <div>
            <label className='block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1.5'>Password (min 6 chars)</label>
            <input
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 text-neutral-900 placeholder-neutral-400 text-sm focus:outline-none focus:border-black focus:bg-white transition-all'
              type="password"
              placeholder='••••••••'
            />
          </div>

          {/* Vehicle Info */}
          <div className='pt-2'>
            <span className='block text-xs font-bold text-neutral-900 uppercase tracking-wider mb-3 pb-1 border-b border-neutral-200'>
              Vehicle Details
            </span>

            <div className='grid grid-cols-2 gap-3 mb-3'>
              <div>
                <label className='block text-[11px] font-semibold text-neutral-600 mb-1'>Color</label>
                <input
                  required
                  value={vehicleColor}
                  onChange={(e) => setVehicleColor(e.target.value)}
                  className='w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 text-neutral-900 placeholder-neutral-400 text-sm focus:outline-none focus:border-black focus:bg-white transition-all'
                  type="text"
                  placeholder='White'
                />
              </div>
              <div>
                <label className='block text-[11px] font-semibold text-neutral-600 mb-1'>License Plate</label>
                <input
                  required
                  value={vehiclePlate}
                  onChange={(e) => setVehiclePlate(e.target.value)}
                  className='w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 text-neutral-900 placeholder-neutral-400 text-sm focus:outline-none focus:border-black focus:bg-white transition-all uppercase'
                  type="text"
                  placeholder='DL 01 AB 1234'
                />
              </div>
            </div>

            <div className='grid grid-cols-2 gap-3'>
              <div>
                <label className='block text-[11px] font-semibold text-neutral-600 mb-1'>Capacity</label>
                <input
                  required
                  value={vehicleCapacity}
                  onChange={(e) => setVehicleCapacity(e.target.value)}
                  className='w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 text-neutral-900 placeholder-neutral-400 text-sm focus:outline-none focus:border-black focus:bg-white transition-all'
                  type="number"
                  min="1"
                  max="8"
                  placeholder='4'
                />
              </div>
              <div>
                <label className='block text-[11px] font-semibold text-neutral-600 mb-1'>Vehicle Type</label>
                <select
                  required
                  value={vehicleType}
                  onChange={(e) => setVehicleType(e.target.value)}
                  className='w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3 py-3 text-neutral-900 text-sm focus:outline-none focus:border-black focus:bg-white transition-all'
                >
                  <option value="" disabled>Select</option>
                  <option value="car">Car</option>
                  <option value="auto">Auto</option>
                  <option value="moto">Moto</option>
                </select>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className='w-full bg-black hover:bg-neutral-800 text-white font-semibold py-3.5 px-4 rounded-xl transition-all shadow-md shadow-black/10 flex items-center justify-center gap-2 mt-4 disabled:opacity-60'
          >
            {isLoading ? (
              <span className='inline-block w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin'></span>
            ) : (
              <>
                <span>Register Captain Account</span>
                <i className="ri-arrow-right-line"></i>
              </>
            )}
          </button>
        </form>

        <p className='text-center text-sm text-neutral-600 mt-6'>
          Already a driver?{' '}
          <Link to='/captain-login' className='font-semibold text-black hover:underline'>
            Sign in
          </Link>
        </p>
      </div>

      <p className='text-[11px] text-neutral-400 text-center leading-relaxed mt-6'>
        By signing up, you agree to our Driver Partner Terms of Service.
      </p>
    </div>
  )
}

export default CaptainSignup
