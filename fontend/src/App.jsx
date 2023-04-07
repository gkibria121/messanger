import {Routes,Route} from 'react-router-dom'
import Header from './components/header/Header'
import Messanger from './components/messanger/Messanger'
function App() {


  return (
   <>
   <Routes>
   < Route path='/' element={<Header />} >
   <Route path='messages/:conversationWith' element={<Messanger />}/>
   </Route>
   </Routes>
   </>
  )
}

export default App
