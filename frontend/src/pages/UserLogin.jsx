import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserDataContext } from '../context/UserContext'
import axios from 'axios'

const UserLogin = () => {
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ errorMessage, setErrorMessage ] = useState('')
  const [ isLoading, setIsLoading ] = useState(false)

  const { setUser } = useContext(UserDataContext)
  const navigate = useNavigate()

  const submitHandler = async (e) => {
    e.preventDefault()
    setErrorMessage('')
    setIsLoading(true)

    const userData = { email, password }

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, userData)

      if (response.status === 200) {
        const data = response.data
        setUser(data.user)
        localStorage.setItem('token', data.token)
        navigate('/home')
      }
    } catch (error) {
      console.error(error)
      const msg = error.response?.data?.message || error.response?.data?.errors?.[0]?.msg || 'Login failed. Please check your credentials.'
      setErrorMessage(msg)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='h-full flex flex-col justify-between p-7 bg-white overflow-y-auto'>
      <div>
        {/* Top Header */}
        <div className='flex items-center justify-between mb-8 pt-2'>
          <Link to='/' className='w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center hover:bg-neutral-200 transition-colors'>
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
          <h2 className='text-2xl font-bold text-neutral-900'>Welcome back</h2>
          <p className='text-sm text-neutral-500 mt-1'>Enter your email and password to continue</p>
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
          <div>
            <label className='block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1.5'>Email Address</label>
            <div className='relative flex items-center'>
              <i className="ri-mail-line absolute left-4 text-neutral-400 text-lg"></i>
              <input
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3.5 pl-11 text-neutral-900 placeholder-neutral-400 text-base focus:outline-none focus:border-black focus:bg-white transition-all'
                type="email"
                placeholder='name@example.com'
              />
            </div>
          </div>

          <div>
            <label className='block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1.5'>Password</label>
            <div className='relative flex items-center'>
              <i className="ri-lock-line absolute left-4 text-neutral-400 text-lg"></i>
              <input
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className='w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3.5 pl-11 text-neutral-900 placeholder-neutral-400 text-base focus:outline-none focus:border-black focus:bg-white transition-all'
                type="password"
                placeholder='••••••••'
              />
            </div>
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
                <span>Sign in</span>
                <i className="ri-arrow-right-line"></i>
              </>
            )}
          </button>
        </form>

        <p className='text-center text-sm text-neutral-600 mt-6'>
          Don't have an account?{' '}
          <Link to='/signup' className='font-semibold text-black hover:underline'>
            Sign up
          </Link>
        </p>
      </div>

      {/* Switch to Captain */}
      <div className='pt-6'>
        <div className='relative flex py-3 items-center mb-4'>
          <div className='flex-grow border-t border-neutral-200'></div>
          <span className='flex-shrink mx-4 text-xs uppercase text-neutral-400 font-semibold tracking-wider'>Or</span>
          <div className='flex-grow border-t border-neutral-200'></div>
        </div>

        <Link
          to='/captain-login'
          className='w-full border-2 border-neutral-200 hover:border-black bg-white flex items-center justify-center gap-2 text-neutral-900 font-semibold py-3.5 rounded-xl transition-all text-sm'
        >
          <i className="ri-steering-2-fill text-lg"></i>
          <span>Sign in as a Driver</span>
        </Link>
      </div>
    </div>
  )
}

export default UserLogin
