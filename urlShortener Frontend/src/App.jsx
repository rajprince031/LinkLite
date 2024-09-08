
import LogInPage from "./component/LogInPage";
import SingUpPage from "./component/SignUpPage";
import HomePage from "./component/HomePage";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Dashboard from "./component/DashboardPage";


const App=()=>{
  return(
    <div>
      <Router>
        <Routes>
          <Route path="/" Component={HomePage}/>
          <Route path="/login" Component={LogInPage}/>
          <Route path="/signup" Component={SingUpPage}/>
          <Route path='/dashboard' Component={Dashboard}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App;