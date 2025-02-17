import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import CTA from './CTA'


function Navbar() {
  
    const [isLogin, setIsLogin] = useState(false);
  return (
    <>
      <div className={`bg-black flex items-center justify-around text-white h-14 w-full overflow-y-hidden `} 
      >
        <Link to={"/"} className='text-blue-300 font-bold flex justify-center bg-transparent text-xl'>
          StuRent
        </Link>
        <ul className='flex w-2/4 items-center justify-center gap-20 bg-transparent '>
          <li className='bg-transparent'>
            <NavLink to={'/'} 
              className={({isActive})=>(
              `${isActive? `text-blue-500 font-bold bg-transparent`: `text-white bg-transparent`}`
              )}>
              Home
            </NavLink>

          </li>
          <li className='bg-transparent'> 
          <NavLink to={'/student/searchproperty'}
          className={({isActive})=>(
            `${isActive? `text-blue-500 font-bold bg-transparent`: `text-white bg-transparent`}`
            )}>
              Search Properties
          </NavLink>

          </li>
          
            </ul>
        <Link to={'/login'} 
        onClick={() => {setIsLogin(true)}}
        className='text-white h-full flex items-center bg-transparent text-md'>
            {!isLogin ? <CTA content="Login"/> : <Link to='/user/profile' className='bg-transparent'>
            <div className='bg-transparent'>User</div>
            </Link>
            }
        </Link>
      </div>
    </>
  )
}

export default Navbar
