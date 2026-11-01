import React from 'react'

const VehiclePanel = ({ selectVehicle, fare, setConfirmRidePanel, setVehiclePanel }) => {
  return (
    <div className='p-5 pt-3'>
      {/* Drag handle */}
      <div
        onClick={() => setVehiclePanel(false)}
        className='w-12 h-1.5 bg-neutral-300 rounded-full mx-auto mb-4 cursor-pointer hover:bg-neutral-400 transition-colors'
      ></div>

      <div className='flex items-center justify-between mb-4'>
        <h3 className='text-xl font-bold text-neutral-900'>Choose a ride</h3>
        <span className='text-xs font-semibold text-neutral-500 bg-neutral-100 px-2.5 py-1 rounded-full'>
          Recommended
        </span>
      </div>

      <div className='space-y-2.5'>
        {/* UberGo (Car) */}
        <div
          onClick={() => {
            selectVehicle('car')
            setConfirmRidePanel(true)
          }}
          className='flex items-center justify-between p-3.5 bg-white border-2 border-neutral-200 hover:border-black active:scale-[0.99] rounded-2xl cursor-pointer transition-all shadow-sm'
        >
          <div className='flex items-center gap-3.5'>
            <div className='w-14 h-14 bg-neutral-100 rounded-xl flex items-center justify-center shrink-0'>
              <img
                className='h-9 object-contain'
                src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1652995202/assets/b8/e532b7-4926-4597-814b-57753e19036a/original/UberX_Black.png"
                alt="UberGo"
              />
            </div>
            <div>
              <div className='flex items-center gap-1.5'>
                <h4 className='font-bold text-base text-neutral-900'>UberGo</h4>
                <span className='text-xs text-neutral-500 flex items-center gap-0.5'>
                  <i className="ri-user-fill text-[11px]"></i>4
                </span>
              </div>
              <p className='text-xs text-neutral-500 font-medium'>2 mins away • Affordable, compact</p>
            </div>
          </div>
          <div className='text-right'>
            <span className='text-lg font-extrabold text-neutral-900'>₹{fare?.car || 305}</span>
          </div>
        </div>

        {/* Moto */}
        <div
          onClick={() => {
            selectVehicle('moto')
            setConfirmRidePanel(true)
          }}
          className='flex items-center justify-between p-3.5 bg-white border-2 border-neutral-200 hover:border-black active:scale-[0.99] rounded-2xl cursor-pointer transition-all shadow-sm'
        >
          <div className='flex items-center gap-3.5'>
            <div className='w-14 h-14 bg-neutral-100 rounded-xl flex items-center justify-center shrink-0'>
              <img
                className='h-8 object-contain'
                src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png"
                alt="Moto"
              />
            </div>
            <div>
              <div className='flex items-center gap-1.5'>
                <h4 className='font-bold text-base text-neutral-900'>Moto</h4>
                <span className='text-xs text-neutral-500 flex items-center gap-0.5'>
                  <i className="ri-user-fill text-[11px]"></i>1
                </span>
                <span className='bg-emerald-100 text-emerald-800 text-[10px] font-bold px-1.5 py-0.5 rounded'>Fast</span>
              </div>
              <p className='text-xs text-neutral-500 font-medium'>3 mins away • Beat the traffic</p>
            </div>
          </div>
          <div className='text-right'>
            <span className='text-lg font-extrabold text-neutral-900'>₹{fare?.moto || 154}</span>
          </div>
        </div>

        {/* UberAuto */}
        <div
          onClick={() => {
            selectVehicle('auto')
            setConfirmRidePanel(true)
          }}
          className='flex items-center justify-between p-3.5 bg-white border-2 border-neutral-200 hover:border-black active:scale-[0.99] rounded-2xl cursor-pointer transition-all shadow-sm'
        >
          <div className='flex items-center gap-3.5'>
            <div className='w-14 h-14 bg-neutral-100 rounded-xl flex items-center justify-center shrink-0'>
              <img
                className='h-8 object-contain'
                src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png"
                alt="Auto"
              />
            </div>
            <div>
              <div className='flex items-center gap-1.5'>
                <h4 className='font-bold text-base text-neutral-900'>UberAuto</h4>
                <span className='text-xs text-neutral-500 flex items-center gap-0.5'>
                  <i className="ri-user-fill text-[11px]"></i>3
                </span>
              </div>
              <p className='text-xs text-neutral-500 font-medium'>3 mins away • Pocket friendly</p>
            </div>
          </div>
          <div className='text-right'>
            <span className='text-lg font-extrabold text-neutral-900'>₹{fare?.auto || 200}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VehiclePanel
