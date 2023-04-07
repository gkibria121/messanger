import React,{useEffect,useState,Suspense, lazy} from 'react'
import ConversationBox from './conversation-box/ConversationBox'
import ConversationHeader from './conversation/ConversationHeader'
import SendBox from './conversation-box/SendBox'
import axios from '../utils/axios'
import { useParams } from 'react-router-dom'
const LazyComponent = lazy(() => import('./conversation-box/ConversationBox'));
function Conversation() {
  const [conversation, setconversation] = useState(false)
  const {conversationWith}  = useParams();
useEffect(() => {

axios.get('/messages/'+conversationWith+'/1').then((e)=>{
  setconversation(e.data)
}).then((er)=>{})
}, [conversationWith])
const [scroll, setScroll] = useState({load : 0,update : 0 })
  return (

    <div className='w-full'>
      <ConversationHeader />
      <Suspense fallback={<div>Loading..</div>}>
      <LazyComponent conversation={conversation} setconversation = {setconversation} cwith = {conversationWith} scroll={scroll} setScroll= {setScroll} />
        </Suspense>
      <SendBox conversation={conversation} setconversation = {setconversation} cwith = {conversationWith}  scroll={scroll} setScroll= {setScroll}/>

    </div>
  )
}

export default Conversation