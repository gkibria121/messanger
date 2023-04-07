import React from 'react'
import MessageDiv from '../conversation/MessageDiv'
function DashBoardBody({Messages}) {
    if(!Messages){
        return ;
    }

  return (
    <div className='h-[85vh] overflow-scroll w-[19rem]'>
    {Messages.map((message) => {

        if (message.sender_id == '2') {
            return (
                <MessageDiv name={message.receiver.name} image={message.receiver.id} lastMessage={message.message} key={message.id} url={message.receiver_id} />
            )
        }
        else {
            return (
                <MessageDiv name={message.sender.name} image={message.sender.id} lastMessage={message.message}  key={message.id}  url={message.sender_id} />
            )
        }
    })}


</div>
  )
}

export default DashBoardBody