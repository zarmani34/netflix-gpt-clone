import React from 'react'

const Card = ({result}) => {
  return (
    <div className='w-36 h-48 border-gray-500  m-2 rounded-3xl hover:scale-[1.1] hover:cursor-pointer flex-shrink-0 flex-grow transition-transform duration-500 ease-in-out'>
      <img className='w-full h-full rounded-3xl' src={`https://image.tmdb.org/t/p/w500${result.poster_path}`} alt="" />
    </div>
  )
}

export default Card
