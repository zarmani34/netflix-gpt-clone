import React from 'react'
import { netflixLogo } from '../utils/urls'

const Header = ({signIn}) => {
  return (
    <div className={signIn?'py-1 px-8 relative bg-transparent flex flex-row justify-between align-middle z-10' :'py-4 relative bg-transparent flex flex-row justify-between align-middle z-10'} >
      <div className={signIn? 'w-32':'w-32'}>
        <img src={netflixLogo} alt="" />
      </div>

      {!signIn&&<div>
        <button className='bg-white px-4 py-2 rounded-2xl font-medium' >Sign in</button>
      </div>}
    </div>
  )
}

export default Header
