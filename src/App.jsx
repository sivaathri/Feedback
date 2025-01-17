import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import QuoteDetailsForm from './QuoteDetailsForm '

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <QuoteDetailsForm/>
    </>
  )
}

export default App
