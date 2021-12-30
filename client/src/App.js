import { BrowserRouter, Switch, Route } from "react-router-dom";

import Header from "./components/Header";
import Login from "./components/Login";
import Signup from "./components/Signup";
import LoginState from "./controller/loginstate";
import Post from "./components/Post";
import Home from "./components/Home";
import 'bootstrap/dist/css/bootstrap.min.css';
import Myprofile from "./components/Myprofile";
import First from "./components/First";
import Userpage from "./components/Userpage";
import Followpage from "./components/Followpage";
import Followingpage from "./components/Followingpage";
import Addcomments from "./components/Addcomments";
import Seecomments from "./components/Seecomments";
function App() {
  return (
    <LoginState>
      <BrowserRouter>
        <Header />
        <Switch>
          <Route exact path='/' component={First}/>
          <Route exact path='/Home' component={Home}/>
          <Route exact path='/Signup' component={Signup} />
          <Route exact path='/Login' component={Login} />
          <Route exact path='/add_post' component={Post} />
          <Route exact path='/myprofile' component={Myprofile} />
          <Route exact path='/Userpage' component={Userpage} />
          <Route exact path='/Followpage' component={Followpage} />
          <Route exact path='/Followingpage' component={Followingpage} />
          <Route exact path='/Addcomments' component={Addcomments} />
          <Route exact path='/Seecomments' component={Seecomments} />
        </Switch>
      </BrowserRouter>
    </LoginState>
  );
}


export default App;
