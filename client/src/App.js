import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import jwt_decode from "jwt-decode";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import setAuthToken from "./utils/setAuthToken";
import PrivateRoute from "./components/common/privateRoute";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Landing from "./components/layout/Landing";
import store from "./store";

import "./App.css";

import Register from "./components/register/Register";
import Login from "./components/login/Login";
import Dashboard from "./components/dashb/dashboard";
import userProfile from "./components/userProfile/userProfile";
import peopleProfile from "./components/PeopleProfile/people";
import Switch from "../node_modules/react-router-dom/Switch";

import newProfile from "./components/newProfile/newProfile";
import editProfile from "./components/editProfile/editprofile";
import addEducation from "./components/Education/addEducation";
import addExperience from "./components/Experience/addExperience";
import Posts from "./components/Posts/Posts";
// import Post from "./components/post/post";

// Check for token
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  const presentTime = Date.now() / 1000;
  if (decoded.exp < presentTime) {
    // Logout user
    store.dispatch(logoutUser());

    window.location.href = "/login";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Landing} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/profiles" component={userProfile} />
            <Route exact path="/profile/:username" component={peopleProfile} />

            <Switch>
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
            </Switch>
            <Switch>
              <PrivateRoute
                exact
                path="/create-profile"
                component={newProfile}
              />
            </Switch>
            <Switch>
              <PrivateRoute
                exact
                path="/edit-profile"
                component={editProfile}
              />
            </Switch>
            <Switch>
              <PrivateRoute
                exact
                path="/add-education"
                component={addEducation}
              />
              <PrivateRoute
                exact
                path="/add-experience"
                component={addExperience}
              />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/feed" component={Posts} />
            </Switch>

            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
