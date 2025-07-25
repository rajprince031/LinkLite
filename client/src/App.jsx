import LogInPage from './component/LogInPage'
import SingUpPage from './component/SignUpPage'
import HomePage from './component/HomePage'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Dashboard from './component/DashboardPage'
import IsAuthRoute from './Authentication/IsAuthRoute'
import ViewDetails from './component/ViewDetails'
import UserProfile from './component/UserProfile'
import IsLoginRoute from './Authentication/IsLoginRoute'
import PageNotFound from './component/PageNotFound'
import UpdateProfile from './component/UpdateProfile'
import HomePageAuth from './Authentication/HomePageAuth'
import AboutPage from './component/AboutPage'
import ContactPage from './component/ContactPage'

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route Component={HomePageAuth}>
            <Route path='/' Component={HomePage} />
            <Route path='/about' Component={AboutPage} />
            <Route path='/contact' Component={ContactPage} />
          </Route>
          <Route Component={IsLoginRoute}>
            <Route path="/login" Component={LogInPage} />
            <Route path="/signup" Component={SingUpPage} />
          </Route>
          <Route Component={IsAuthRoute}>
            <Route path='/dashboard' Component={Dashboard} />
            <Route path='/dashboard/view-details' Component={ViewDetails} />
            <Route path='/dashboard/user-profile' Component={UserProfile} />
            <Route path='/dashboard/update-profile' Component={UpdateProfile} />
          </Route>
        </Routes>
      </Router>
    </div>
  )
}

export default App
