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
import AccountSettings from './pages/AccountSettings.jsx'
import HomePage from './pages/Pg.jsx'
import PgUpload from './pages/PgUpload.jsx'
import PgDetails from './pages/PgDetails.jsx'

const router = createBrowserRouter(
    createRoutesFromElements(
      
      <Route path='/' element={<App/>}>
          <Route path='' element={<HomePage/>}/>
          <Route path="signup" element={<SignupPage/>} />
          <Route path="login" element={<LoginPage />} />
          <Route path="login/landlord-ver" element={<LandlordVer />} />
          <Route path="landlord/addproperty" element={<PgUpload />} />
          <Route path="login/student-ver" element={<StuVer />} />
          <Route path="student/searchproperty" element={<Filter />} />
          <Route path="user/profile" element={<AccountSettings/>}/>
          <Route path="/pg/:id" element={<PgDetails/>} />
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
