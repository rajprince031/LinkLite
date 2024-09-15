
import LogInPage from "./component/LogInPage";
import SingUpPage from "./component/SignUpPage";
import HomePage from "./component/HomePage";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Dashboard from "./component/DashboardPage";
import IsAuthRoute from "./Authentication/IsAuthRoute";
import ViewDetails from "./component/ViewDetails";


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
      </Router>
    </div>
  )
}

export default App;