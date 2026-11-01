import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const ConfirmRidePopUp = ({ ride, setConfirmRidePopupPanel, setRidePopupPanel }) => {
  const [ otp, setOtp ] = useState('')
  const [ errorMessage, setErrorMessage ] = useState('')
  const [ isLoading, setIsLoading ] = useState(false)
  const navigate = useNavigate()

  const user = ride?.user || {}

  const submitHandler = async (e) => {
    e.preventDefault()
    setErrorMessage('')
    setIsLoading(true)

    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/start-ride`, {
        params: {
          rideId: ride?._id,
          otp: otp.trim()
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('captain-token')}`
        }
      })

      if (response.status === 200) {
        setConfirmRidePopupPanel(false)
        setRidePopupPanel(false)
        navigate('/captain-riding', { state: { ride } })
      }
    } catch (err) {
      console.error(err)
      setErrorMessage(err.response?.data?.message || 'Invalid OTP. Please ask the passenger for the correct 6-digit PIN.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='p-5 pt-3'>
      {/* Drag handle */}
      <div
        onClick={() => {
          setConfirmRidePopupPanel(false)
          setRidePopupPanel(false)
        }}
        className='w-12 h-1.5 bg-neutral-300 rounded-full mx-auto mb-4 cursor-pointer hover:bg-neutral-400 transition-colors'
      ></div>

      <div className='flex items-center justify-between mb-4'>
        <h3 className='text-xl font-bold text-neutral-900'>Start Trip</h3>
        <span className='text-xs font-semibold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-full'>
          Passenger Onboard
        </span>
      </div>

      {/* Passenger Info Card */}
      <div className='flex items-center justify-between p-3.5 bg-neutral-50 rounded-2xl border border-neutral-100 mb-4'>
        <div className='flex items-center gap-3'>
          <div className='w-11 h-11 rounded-full bg-neutral-900 text-white flex items-center justify-center font-bold text-base shadow-sm'>
            {user.fullname?.firstname?.[0] || 'U'}
          </div>
          <div>
            <h4 className='font-bold text-sm text-neutral-900 capitalize'>
              {(user.fullname?.firstname || 'Rider') + ' ' + (user.fullname?.lastname || '')}
            </h4>
            <p className='text-xs text-neutral-500'>Cash Trip • ₹{ride?.fare || 305}</p>
          </div>
        </div>
      </div>

      {/* Error Alert */}
      {errorMessage && (
        <div className='mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-xs flex items-center gap-2'>
          <i className="ri-error-warning-fill text-base shrink-0"></i>
          <span>{errorMessage}</span>
        </div>
      )}

      {/* OTP Form */}
      <form onSubmit={submitHandler} className='space-y-4'>
        <div>
          <label className='block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-2 text-center'>
            Enter Passenger's 6-digit PIN
          </label>
          <input
            required
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            maxLength={6}
            autoFocus
            className='w-full bg-neutral-100 border-2 border-neutral-200 focus:border-black rounded-2xl py-3.5 px-4 text-center font-mono text-3xl font-black tracking-[0.4em] text-neutral-900 focus:outline-none focus:bg-white transition-all placeholder:text-neutral-300'
            placeholder='••••••'
          />
        </div>

        <button
          type="submit"
          disabled={isLoading || otp.length !== 6}
          className='w-full bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold py-4 px-6 rounded-2xl transition-all shadow-lg shadow-emerald-600/20 text-base flex items-center justify-center gap-2 active:scale-[0.99]'
        >
          {isLoading ? (
            <span className='inline-block w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin'></span>
          ) : (
            <>
              <i className="ri-play-fill text-xl"></i>
              <span>Start Trip</span>
            </>
          )}
        </button>

        <button
          type="button"
          onClick={() => {
            setConfirmRidePopupPanel(false)
            setRidePopupPanel(false)
          }}
          className='w-full bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-semibold py-3 px-4 rounded-xl transition-all text-sm'
        >
          Cancel
        </button>
      </form>
    </div>
  )
}

export default ConfirmRidePopUp
