import React from 'react'
import DashBoard from './DashBoard'
import Conversation from './Conversation'

function Messanger() {

  return (
    <div className='flex'>
        <DashBoard />
        <Conversation />
    </div>
  )
}

export default Messanger