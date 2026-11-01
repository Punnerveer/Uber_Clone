import React from 'react'

const ConfirmRide = ({ pickup, destination, fare, vehicleType, setConfirmRidePanel, setVehicleFound, createRide }) => {
  const vehicleLabels = {
    car: { name: 'UberGo', icon: 'ri-car-fill', img: 'https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1652995202/assets/b8/e532b7-4926-4597-814b-57753e19036a/original/UberX_Black.png' },
    moto: { name: 'Moto', icon: 'ri-motorbike-fill', img: 'https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png' },
    auto: { name: 'UberAuto', icon: 'ri-taxi-fill', img: 'https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png' }
  }

  const selected = vehicleLabels[vehicleType] || vehicleLabels.car

  return (
    <div className='p-5 pt-3'>
      {/* Drag handle */}
      <div
        onClick={() => setConfirmRidePanel(false)}
        className='w-12 h-1.5 bg-neutral-300 rounded-full mx-auto mb-4 cursor-pointer hover:bg-neutral-400 transition-colors'
      ></div>

      <div className='flex items-center justify-between mb-4'>
        <h3 className='text-xl font-bold text-neutral-900'>Confirm your ride</h3>
        <span className='text-xs font-semibold text-neutral-500 bg-neutral-100 px-2.5 py-1 rounded-full'>
          {selected.name}
        </span>
      </div>

      {/* Vehicle Preview Card */}
      <div className='flex items-center justify-center p-3 bg-neutral-50 rounded-2xl mb-4 border border-neutral-100'>
        <img className='h-16 object-contain' src={selected.img} alt={selected.name} />
      </div>

      {/* Route Timeline */}
      <div className='space-y-3 bg-neutral-50 p-4 rounded-2xl border border-neutral-100 mb-4'>
        {/* Pickup */}
        <div className='flex items-start gap-3'>
          <div className='w-5 flex flex-col items-center mt-1'>
            <div className='w-3 h-3 rounded-full bg-emerald-600 ring-4 ring-emerald-100'></div>
            <div className='w-0.5 h-7 bg-neutral-300 my-1'></div>
          </div>
          <div className='flex-1 overflow-hidden'>
            <span className='text-[11px] font-bold text-neutral-400 uppercase tracking-wider'>Pickup</span>
            <p className='text-sm font-semibold text-neutral-900 truncate'>{pickup || 'Your current location'}</p>
          </div>
        </div>

        {/* Destination */}
        <div className='flex items-start gap-3'>
          <div className='w-5 flex items-center justify-center mt-1'>
            <div className='w-3 h-3 bg-neutral-900 ring-4 ring-neutral-200'></div>
          </div>
          <div className='flex-1 overflow-hidden'>
            <span className='text-[11px] font-bold text-neutral-400 uppercase tracking-wider'>Destination</span>
            <p className='text-sm font-semibold text-neutral-900 truncate'>{destination || 'Selected drop point'}</p>
          </div>
        </div>

        {/* Fare & Payment */}
        <div className='pt-2 border-t border-neutral-200 flex items-center justify-between'>
          <div className='flex items-center gap-2'>
            <div className='w-8 h-8 rounded-lg bg-white border border-neutral-200 flex items-center justify-center'>
              <i className="ri-bank-card-line text-neutral-700"></i>
            </div>
            <div>
              <p className='text-xs font-bold text-neutral-900'>Cash Payment</p>
              <p className='text-[11px] text-neutral-500'>Pay driver directly</p>
            </div>
          </div>
          <span className='text-xl font-extrabold text-neutral-900'>₹{fare?.[vehicleType] || 305}</span>
        </div>
      </div>

      {/* Confirm Button */}
      <button
        onClick={() => {
          setVehicleFound(true)
          setConfirmRidePanel(false)
          createRide()
        }}
        className='w-full bg-black hover:bg-neutral-800 text-white font-semibold py-4 px-6 rounded-2xl transition-all shadow-lg shadow-black/20 flex items-center justify-center gap-2 active:scale-[0.99]'
      >
        <span>Confirm {selected.name}</span>
        <i className="ri-arrow-right-line"></i>
      </button>
    </div>
  )
}

export default ConfirmRide
