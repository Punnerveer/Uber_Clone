import React, { useEffect, useRef, useState } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

const LiveTracking = () => {
  const mapContainerRef = useRef(null)
  const mapInstanceRef = useRef(null)
  const userMarkerRef = useRef(null)
  const carMarkersRef = useRef([])

  const [ userCoords, setUserCoords ] = useState({ lat: 28.6139, lng: 77.2090 })

  useEffect(() => {
    // 1. Get user coordinates via browser geolocation if available
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const lat = pos.coords.latitude
          const lng = pos.coords.longitude
          setUserCoords({ lat, lng })
          if (mapInstanceRef.current) {
            mapInstanceRef.current.setView([ lat, lng ], 14)
            if (userMarkerRef.current) {
              userMarkerRef.current.setLatLng([ lat, lng ])
            }
          }
        },
        () => {
          // Fallback location: New Delhi
        },
        { enableHighAccuracy: true, timeout: 8000 }
      )
    }

    // 2. Initialize Leaflet map
    if (!mapContainerRef.current) return
    if (mapInstanceRef.current) return // Already initialized

    const map = L.map(mapContainerRef.current, {
      center: [ userCoords.lat, userCoords.lng ],
      zoom: 14,
      zoomControl: false, // Cleaner Uber-like view
      attributionControl: false
    })

    mapInstanceRef.current = map

    // 3. Add CartoDB Voyager tiles (clean, modern Uber style)
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      maxZoom: 19,
      subdomains: 'abcd'
    }).addTo(map)

    // 4. Add subtle attribution in bottom right
    L.control.attribution({ position: 'bottomright', prefix: false })
      .addAttribution('&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>')
      .addTo(map)

    // 5. User Location Custom Marker with Pulse Ring
    const userIcon = L.divIcon({
      className: 'custom-user-marker',
      html: `
        <div style="position: relative; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center;">
          <div style="position: absolute; width: 40px; height: 40px; border-radius: 50%; background: rgba(16, 185, 129, 0.3); animation: ping 1.8s cubic-bezier(0, 0, 0.2, 1) infinite;"></div>
          <div style="position: relative; width: 18px; height: 18px; border-radius: 50%; background: #000000; border: 3px solid #ffffff; box-shadow: 0 4px 12px rgba(0,0,0,0.4);"></div>
        </div>
      `,
      iconSize: [ 40, 40 ],
      iconAnchor: [ 20, 20 ]
    })

    const userMarker = L.marker([ userCoords.lat, userCoords.lng ], { icon: userIcon }).addTo(map)
    userMarkerRef.current = userMarker

    // 6. Spawn simulated nearby Uber cars around user location
    const carOffsets = [
      { dLat: 0.005, dLng: 0.004 },
      { dLat: -0.004, dLng: 0.006 },
      { dLat: 0.003, dLng: -0.005 },
      { dLat: -0.006, dLng: -0.004 }
    ]

    const carIcon = L.divIcon({
      className: 'custom-car-marker',
      html: `
        <div style="width: 32px; height: 32px; background: #000000; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #ffffff; box-shadow: 0 4px 12px rgba(0,0,0,0.35); border: 2.5px solid #ffffff;">
          <i class="ri-car-fill" style="font-size: 16px;"></i>
        </div>
      `,
      iconSize: [ 32, 32 ],
      iconAnchor: [ 16, 16 ]
    })

    const cars = carOffsets.map(offset => {
      const lat = userCoords.lat + offset.dLat
      const lng = userCoords.lng + offset.dLng
      return L.marker([ lat, lng ], { icon: carIcon }).addTo(map)
    })

    carMarkersRef.current = cars

    // 7. Slightly move cars periodically for live traffic feel
    const carInterval = setInterval(() => {
      carMarkersRef.current.forEach(marker => {
        const cur = marker.getLatLng()
        const newLat = cur.lat + (Math.random() * 0.0006 - 0.0003)
        const newLng = cur.lng + (Math.random() * 0.0006 - 0.0003)
        marker.setLatLng([ newLat, newLng ])
      })
    }, 3000)

    // Trigger resize calculation to prevent gray tiles
    setTimeout(() => {
      map.invalidateSize()
    }, 200)

    // Cleanup on unmount
    return () => {
      clearInterval(carInterval)
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [])

  return (
    <div className='relative w-full h-full min-h-[300px] overflow-hidden select-none bg-neutral-100'>
      {/* Leaflet Map DOM Node */}
      <div ref={mapContainerRef} className='w-full h-full z-0' style={{ minHeight: '100%' }}></div>

      {/* Floating Controls Overlay */}
      <div className='absolute top-5 right-5 z-[500] flex flex-col gap-2 pointer-events-auto'>
        {/* Live GPS badge */}
        <div className='flex items-center gap-2 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full shadow-md border border-neutral-200/80'>
          <span className='w-2 h-2 rounded-full bg-emerald-500 animate-ping'></span>
          <span className='w-2 h-2 rounded-full bg-emerald-500 -ml-4'></span>
          <span className='text-[11px] font-bold text-neutral-800 tracking-wide uppercase'>Map Live</span>
        </div>

        {/* Recenter location button */}
        <button
          onClick={() => {
            if (mapInstanceRef.current && userMarkerRef.current) {
              mapInstanceRef.current.setView([ userCoords.lat, userCoords.lng ], 15, { animate: true })
            }
          }}
          title="Center on my location"
          className='w-9 h-9 bg-white/95 backdrop-blur-md hover:bg-white rounded-full shadow-md border border-neutral-200 flex items-center justify-center text-neutral-800 self-end transition-transform active:scale-95'
        >
          <i className="ri-crosshair-2-line text-lg"></i>
        </button>
      </div>
    </div>
  )
}

export default LiveTracking
