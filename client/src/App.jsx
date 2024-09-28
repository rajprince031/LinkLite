
import LogInPage from "./component/LogInPage";
import SingUpPage from "./component/SignUpPage";
import HomePage from "./component/HomePage";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Dashboard from "./component/DashboardPage";
import IsAuthRoute from "./Authentication/IsAuthRoute";
import ViewDetails from "./component/ViewDetails";
import UserProfile from "./component/UserProfile";


const App=()=>{
  return(
    <div>
      <Router>
        <Routes>
          <Route path="/" Component={HomePage}/>
          <Route path="/login" Component={LogInPage}/>
          <Route path="/signup" Component={SingUpPage}/>
        </Routes>
        <IsAuthRoute path = "/dashboard" component = {Dashboard} />
        <IsAuthRoute path="/dashboard/view-details" component = {ViewDetails} />
        <IsAuthRoute path="/dashboard/user-profile" component = {UserProfile} />
      </Router>
    </div>
  )
}

export default App;