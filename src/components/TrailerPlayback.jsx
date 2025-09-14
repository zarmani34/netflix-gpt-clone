import React from 'react'

const TrailerPlayback = ({officialTrailer}) => {
  return (
    <div className="relative top-0 left-0 w-full h-fit overflow-hidden ">
      {officialTrailer ? (
        <div className=" inset-0">
          <div className=" w-full h-full">
            <iframe
              className=" w-full h-full scale-[1.8] aspect-video sm:scale-150"
              src={`https://www.youtube.com/embed/${officialTrailer}?autoplay=1&mute=0&controls=0&showinfo=0&rel=0&loop=1&playlist=${officialTrailer}&modestbranding=1`}
              title="Background video player"
              frameBorder="0"
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            {/* Optional overlay to help video blend with content */}
            {/* <div className="absolute inset-0 bg-black/30"></div> */}
          </div>
        </div>
      ) : (
        <div className="w-full h-64 bg-black ">
          <h1 className='text-gray-300 text-3xl text-center relative top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-indigo-500' >Trailer not available</h1>
        </div>
      )}
      
      
      
    </div>
  )
}

export default TrailerPlayback
