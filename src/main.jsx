import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './main.css'
import { RouterProvider } from 'react-router'
import router from './routers'
import { AuthContextProvider } from './components/AuthContextProvider'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthContextProvider>
    <RouterProvider router={router}></RouterProvider>
    </AuthContextProvider>
  </StrictMode>,
)
