import axios from '../../utils/axios';
import React,{useState,useEffect} from 'react'
import { useParams,useLocation } from 'react-router-dom'

function SendBox({conversation ,setconversation ,cwith , scroll, setScroll}) {
  const location = useLocation();
  const {conversationWith} = useParams();
  const [form, setForm] = useState({sender_id : '2',message : ''})
  useEffect(() => {
    setForm({...form, sender_id : conversationWith})
    axios.get('/active/setMessageActive/'+cwith+'/false')
  }, [])
useEffect(() => {
  setForm({sender_id : conversationWith, message : ''})
}, [location.pathname])

  
function handleChange(e){
      setForm({...form,message : e.target.value})
}

function sendMessage(){
  if(form.message !== ''){
    axios.post('/messages/send',form).then((e)=>{
      axios.get('/messages/'+cwith+'/1').then((e)=>{
        setScroll({...scroll, update : 1})
        setconversation(e.data)

      }).then((er)=>{})

    }).catch((e)=>{console.log(e)})
    setForm({...form,message : ''})
  }
}
function handleFocus(){
  axios.get('/active/setMessageActive/'+cwith+'/true')
}
function handleBlur(){
  axios.get('/active/setMessageActive/'+cwith+'/false')
}
 
  return (
    <div className='flex justify-between px-10'>

      <div className='flex space-x-2'>
      <div className='cursor-pointer'>add</div>
      <div className='cursor-pointer'>attach</div>
      <div className='cursor-pointer'>chose</div>
      </div>

      <div className='flex'>
        <div>
          <input 
          type="text" 
          value={form.message} 
          onKeyUp={(e)=>{if(e.key=='Enter'){sendMessage()}; }}
          onChange={handleChange} 
          name='message' 
          onFocus={handleFocus}
          onBlur={handleBlur}
          className='bg-slate-500 rounded-md p-1'  
          /></div>
        <div className='px-2 cursor-pointer' onClick={sendMessage}>Send</div>
      </div>
      <div className='flex'>
      <div>7</div>
      <div>8</div>
      <div>9</div>
      </div>
    </div>
  )
}

export default SendBox