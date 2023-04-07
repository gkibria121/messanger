import React,{ useEffect,useState } from 'react'
import DashBoardHeader from './dashboard/DashBoardHeader'
import DashBoardBody from './dashboard/DashBoardBody'
import { useParams } from 'react-router-dom'
import axios from '../utils/axios'
function DashBoard() {
    const [Messages, setMessages] = useState(false)
    useEffect(() => {
      axios.get('/dashboard').then((e)=>{
        setMessages(e.data)
    }).catch((er)=>{console.log(er)})

    }, [])
    
    return (<div>
             <DashBoardHeader />
             <DashBoardBody Messages = {Messages}/>

    </div>
    )
}

export default DashBoard