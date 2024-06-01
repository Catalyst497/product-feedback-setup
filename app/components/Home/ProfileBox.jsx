'use client'
import React, {useState} from 'react'
import {BsThreeDots} from 'react-icons/bs'
import { useSelector } from 'react-redux'
import useScreenSize from '../../hooks/useScreenSize'
import { useRouter } from 'next/navigation'

function ProfileBox() {
  const router = useRouter()
    const {user} = useSelector(st => st.user)
    const {isMobile} = useScreenSize()
    const [logoutOptionOpen, setLogoutOptionOpen] = useState(false)
    const [emailName, domain] = 'email@example.com'
    // user?.email.split('@')
    function logout () {
      setLogoutOptionOpen(false)
      localStorage.removeItem('token')
      router.push('/login')
    }
  return (
    <div className={`p-4 px-8 bg-white flex items-center justify-between rounded-lg mb-8 ${isMobile ? 'mt-8' : ''}`}>
        <div>
        <img src="./avatar.jpg" alt="" className="avatar-img w-[2rem] md:w-[3rem] rounded-[40%]" />

        </div>
        <div className='flex-1 justify-self-start px-4'>
            <div className='font-bold capitalize text-[1.5rem]'>{user.username ? user?.username : 'username'}</div>
            {/* <div>{user.email ? `${emailName.substr(0, 2)}...@${domain}` : 'email'}</div> */}
        </div>
        <div className='relative'>
          {logoutOptionOpen && <ul className='absolute bg-white rounded-lg top-full right-0 shadow-md'>
            <li className='text-[red] px-4 py-2 cursor-default' onClick={logout}>Logout</li>
          </ul>}
          <BsThreeDots onClick={() => setLogoutOptionOpen(!logoutOptionOpen)} /></div>
    </div>
  )
}

export default ProfileBox