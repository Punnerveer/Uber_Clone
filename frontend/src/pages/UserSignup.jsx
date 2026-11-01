import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { UserDataContext } from '../context/UserContext'

const UserSignup = () => {
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ firstName, setFirstName ] = useState('')
  const [ lastName, setLastName ] = useState('')
  const [ errorMessage, setErrorMessage ] = useState('')
  const [ isLoading, setIsLoading ] = useState(false)

  const navigate = useNavigate()
  const { setUser } = useContext(UserDataContext)

  const submitHandler = async (e) => {
    e.preventDefault()
    setErrorMessage('')
    setIsLoading(true)

    const newUser = {
      fullname: {
        firstname: firstName,
        lastname: lastName
      },
      email: email,
      password: password
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, newUser)

      if (response.status === 201) {
        const data = response.data
        setUser(data.user)
        localStorage.setItem('token', data.token)
        navigate('/home')
      }
    } catch (error) {
      console.error(error)
      const msg = error.response?.data?.message || error.response?.data?.errors?.[0]?.msg || 'Registration failed. Please try again.'
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
          <Link to='/login' className='w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center hover:bg-neutral-200 transition-colors'>
            <i className="ri-arrow-left-line text-lg text-neutral-700"></i>
          </Link>
          <img
            className='w-16'
            src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
            alt="Uber"
          />
          <div className='w-10'></div>
        </div>

        {/* Heading */}
        <div className='mb-6'>
          <h2 className='text-2xl font-bold text-neutral-900'>Create your account</h2>
          <p className='text-sm text-neutral-500 mt-1'>Get started with your personal rider account</p>
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
          <div className='grid grid-cols-2 gap-3'>
            <div>
              <label className='block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1.5'>First Name</label>
              <input
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className='w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 text-neutral-900 placeholder-neutral-400 text-sm focus:outline-none focus:border-black focus:bg-white transition-all'
                type="text"
                placeholder='John'
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
                placeholder='Doe'
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
              placeholder='john@example.com'
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

          <button
            type="submit"
            disabled={isLoading}
            className='w-full bg-black hover:bg-neutral-800 text-white font-semibold py-3.5 px-4 rounded-xl transition-all shadow-md shadow-black/10 flex items-center justify-center gap-2 mt-2 disabled:opacity-60'
          >
            {isLoading ? (
              <span className='inline-block w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin'></span>
            ) : (
              <>
                <span>Create account</span>
                <i className="ri-arrow-right-line"></i>
              </>
            )}
          </button>
        </form>

        <p className='text-center text-sm text-neutral-600 mt-6'>
          Already have an account?{' '}
          <Link to='/login' className='font-semibold text-black hover:underline'>
            Log in
          </Link>
        </p>
      </div>

      <p className='text-[11px] text-neutral-400 text-center leading-relaxed mt-6'>
        By signing up, you agree to our Terms of Service and Privacy Policy.
      </p>
    </div>
  )
}

export default UserSignup
