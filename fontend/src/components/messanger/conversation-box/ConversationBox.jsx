import axios from '../../utils/axios'
import React,{ useRef, useEffect,useState } from 'react'
import { useLocation } from 'react-router-dom'
function ConversationBox({conversation ,setconversation ,cwith , scroll, setScroll}) {
  const location = useLocation()

const divRef = useRef(0);
const [isMessageActive, setisMessageActive] = useState(false)

useEffect(() => {

  if(conversation){
    if(divRef.current.getAttribute('data-id') == null){
      divRef.current.setAttribute("data-id", "2");
      divRef.current.scrollTop = divRef.current.scrollHeight;
    }
    else
    {
      if(scroll.load!=0){
        divRef.current.scrollTop = divRef.current.scrollHeight - scroll.load;
      }
       if(scroll.update =='1' || scroll.load==0){
        divRef.current.scrollTop = divRef.current.scrollHeight
       }

    }
}


}, [conversation])
useEffect(() => {
  if(conversation){
    divRef.current.setAttribute("data-id", "2");
    divRef.current.scrollTop = divRef.current.scrollHeight;
    setScroll({load : 0,update : 0})
  }
}, [location.pathname])

useEffect(() => {
  axios.get('/active/setMessageActive/'+cwith+'/false')
  setisMessageActive(false)

}, [])


useEffect(() => {
  function sendRequest() {
    axios.get('/active/isMessageActive/'+cwith)
      .then(response => {
        if(response.data[`${cwith}`] == 'true' ){
          setisMessageActive(true)
       
        }
        else{
          setisMessageActive(false)
        }
      })
      .catch(error => {
        // handle the error
      });
  }

  const interval = setInterval(sendRequest, 1000); // send the request every 1000 milliseconds (1 second)

  // cleanup function to stop the interval when the component unmounts
  return () => clearInterval(interval);
}, [cwith])


function handleScroll()  
{
  if(divRef.current.scrollTop==0){
    let scrollPoint = parseInt(divRef.current.scrollHeight)
    setScroll({load : scrollPoint , update : 0})
    const count = divRef.current.getAttribute('data-id')
    axios.get('/messages/'+cwith+'/'+count).then((e)=>{
      if(conversation.length<e.data.length){
        divRef.current.setAttribute('data-id',parseInt(divRef.current.getAttribute('data-id'))+1 )
        setconversation(e.data)
      }
    })
  }
}

  if(!conversation){
    return ;
  }

  return (
    <div className={`w-full h-[74vh] overflow-auto px-4`} ref={divRef} onScroll={handleScroll}>
        {conversation.map((message)=>{
            return (
        
            <div key={message.id}  className={`flex ${message.sender_id!=='2'? 'justify-end': 'justify-start' } `} >
              <div className={`max-w-[50rem] border rounded-md p-2 m-2 ${message.sender_id!=='2' ? 'bg-blue-500': 'bg-yellow-500' }`} >{message.message}</div>
            </div>
            )

        })}
      {isMessageActive && <div className='bg-slate-500 px-2 py-1 w-10 rounded '  >
      <svg width="50" height="20">
  <circle cx="3" cy="8" r="3" id="dot1">
    <animate
      attributeName="cy"
      values="10;15;10"
      keyTimes="0;0.5;1"
      dur="1s"
      repeatCount="indefinite"
    />
  </circle>
  <circle cx="13" cy="10" r="3" id="dot2">
    <animate
      attributeName="cy"
      values="10;15;10"
      keyTimes="0;0.5;1"
      dur="1s"
      repeatCount="indefinite"
      begin="0.1s"
    />
  </circle>
  <circle cx="23" cy="10" r="3" id="dot3">
    <animate
      attributeName="cy"
      values="10;15;10"
      keyTimes="0;0.5;1"
      dur="1s"
      repeatCount="indefinite"
      begin="0.2s"
    />
  </circle>
</svg>
 </div>}
    </div>
  )
}

export default ConversationBox