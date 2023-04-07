import React from 'react'
import { Outlet } from 'react-router-dom'

function Header() {
  return (
    <>
    <div className='h-20'>Header is here</div>
    <Outlet />
    </ >
  )
}

export default Header