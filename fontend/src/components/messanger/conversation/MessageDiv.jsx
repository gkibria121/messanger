import React from 'react'
import { Link } from 'react-router-dom'

function MessageDiv({ name, image, lastMessage,id,url }) {

    return (
        <Link className='flex cursor-pointer' key={id} to={'/messages/'+url} >
            <div className='w-20'><img src={`https://robohash.org/` + image + `?set=set3&&size=100x100`} alt="" /></div>
            <div className='pt-4'>
                <div className='w-32 h-5 overflow-hidden'>{name + id}</div>
                <div className='w-32  h-5 overflow-hidden text-overflow-ellipsis text-sm'>{lastMessage}</div>
            </div>
            <div>
                <div>more</div>
                <div>status</div>
            </div>
        </Link>
    )
}

export default MessageDiv