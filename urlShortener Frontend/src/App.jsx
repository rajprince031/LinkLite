
import LogInPage from "./component/LoginPage";
import SingUpPage from "./component/SignUpPage";
import HomePage from "./component/HomePage";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';


const App=()=>{
  return(
    <div>
      <Router>
        <Routes>
          <Route path="/" Component={HomePage}/>
          <Route path="/login" Component={LogInPage}/>
          <Route path="/signup" Component={SingUpPage}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App;