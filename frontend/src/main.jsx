import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider, createRoutesFromElements, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { LockIcon } from 'lucide-react'
import LoginPage from './pages/LoginPage.jsx'
import Filter from './pages/Filter.jsx'
import LandlordVer from './pages/LandLordVer.jsx'
import StuVer from './pages/StuVer.jsx'
import SignupPage from './pages/SignupPage.jsx'

const router = createBrowserRouter(
    createRoutesFromElements(
      
      <Route path='/' element={<App/>}>
          {/* <Route path='' element={<HomePage/>}/> */}
          <Route path="signup" element={<SignupPage/>} />
          <Route path="login" element={<LoginPage />} />
          <Route path="login/landlord-ver" element={<LandlordVer />} />
          {/* <Route path="landlord/addproperty" element={<AddProperty />} /> */}
          <Route path="login/student-ver" element={<StuVer />} />
          <Route path="student/searchproperty" element={<Filter />} />
      </Route>
    )
  )

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}>
        <App />
    </RouterProvider>
  </StrictMode>,
)
