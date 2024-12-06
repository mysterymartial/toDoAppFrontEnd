import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Routes from './routes/router'

const App = () => {
  const routes = createBrowserRouter([...Routes])
  return (
    <div className=''>
      <RouterProvider router={routes}/>
    </div>
  )
}

export default App
