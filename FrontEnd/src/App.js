import React, {useEffect,useState} from 'react';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

import AuthService from './services/auth.service';

import Login from './components/Login';
import Register from './components/Register';
import TourDetails from './components/TourDetails';
import Home from './components/Home';
import Profile from './components/Profile';
import BoardCustomer from './components/BoardCustomer';
import BoardManager from './components/BoardManager';
import BoardAdmin from './components/BoardAdmin';
import BoardDriver from './components/BoardDriver';
import BoardGuide from './components/BoardGuide';
import BoardMechanic from './components/BoardMechanic';
import BoardContentWriter from './components/BoardContentWriter';
import BoardAccountant from './components/BoardAccountant';

import Footer from './components/Footer';

const App = () => {
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if(user) {
      setCurrentUser(user);

    }
  }, []);

  const logout = () => {
    AuthService.logout();
  };

  return (
    <Router>
      <div >
        <nav style={{position: 'sticky',top: 0, zIndex: 9999}} className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/"} className="navbar-brand" style={{marginRight: 0}}>
           <img style={{width: '50px'}} src="/img/exoticLankaLogo.png" alt="Exotic Lanka Tourism logo" />
          </Link>
          <div className="navbar-nav mr-auto">
          <li className="nav-item">
              <Link to={"/home"} className="nav-link">
                <h5 style={{color: 'aqua', marginBottom: 0}}>Exotic Lanka Tourism</h5>
              </Link>
              </li>
            <li className="nav-item">
            
              <Link to={"/home"} className="nav-link">
                Home
              </Link>
            </li>
           { currentUser  && (<li style={{marginLeft: 350, color: '#ffff'}} className="nav-item">
           <Link style={{ color: '#ffff'}} className="nav-link">Hi, {currentUser.data.user.name}</Link>
            
          </li>)}
          </div>
          {currentUser ? (
              <div className="navbar-nav ml-auto">
               
                  <li className="nav-item">
                  <Link to={`/${currentUser.data.user.role}`} className="nav-link">
                     Dashboard
                  </Link>
                </li>
              
                <li className="nav-item">
                  <Link to="/profile" className="nav-link">
                    Profile
                  </Link>
                </li>
                <li className="nav-item">
                  <a href="/login" className="nav-link" onClick={logout}>
                    LogOut
                  </a>
                </li>
              </div>
            ):(
              <div className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link to={"/login"} className="nav-link">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={"/register"} className="nav-link">
                    Sign Up
                  </Link>
                </li>
              </div>
            )}
        </nav>

        <div style={{padding: 0, maxWidth: '100%', minHeight: '100vh'}} className="container">
          <Switch>
            <Route exact path={["/","/home"]} component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/profile" component={Profile} />
            <Route path="/tourDetails" component={TourDetails} />
            <Route path="/admin" component={BoardAdmin} />
            <Route path="/customer" component={BoardCustomer} />
            <Route path="/accountant" component={BoardAccountant} />
            <Route path="/manager" component={BoardManager} />
            <Route path="/driver" component={BoardDriver} />
            <Route path="/mechanic" component={BoardMechanic} />
            <Route path="/content-writer" component={BoardContentWriter} />
            <Route path="/guide" component={BoardGuide} />

          </Switch>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
