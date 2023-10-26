import React, { useEffect } from 'react'
import Header from './components/Header/Header'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import StackOverflow from "./components/StackOverflow"
import Question from './components/Add-Question/Question'
import ViewQuestion from "./components/ViewQuestion"
import Auth from "./components/Auth"
import { useDispatch, useSelector } from 'react-redux'
import { login, logout, selectUser } from "./feature/userSlice";
import { auth } from "./firebase"


const App = () => {
  const user = useSelector(selectUser)
  const dispatch = useDispatch()

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(
          login({
            uid: authUser.uid,
            photo: authUser.photoURL,
            displayName: authUser.displayName,
            email: authUser.email,
          })
        );
      } else {
        dispatch(logout());
      }
      console.log(authUser);
    });
  }, [dispatch]);


  // const PrivateRoute = ({ component: Component, ...rest }) => (
  //   <Route
  //     {...rest}
  //     render={(props) =>
  //       user ? <Component {...props} />
  //         : <Redirect
  //           to="/auth" //{{
  //         //     pathname: "/auth",
  //         //     state: {
  //         //       from: props.location,
  //         //     },
  //         //   }}
  //         />
  //     }
  //   />
  // );

  return (
    <div>
      <Router>
        <Header />
        <Switch>
          {/* <Route exact path={user ? "/auth":"/"} component={user ? Auth : StackOverflow } /> */}
          <Route exact path="/auth" component={Auth} />
          <Route exact path="/" component={StackOverflow} />
          <Route exact path="/add-question" component={Question} />
          <Route exact path="/question" component={ViewQuestion} />
        </Switch>
      </Router>
    </div>
  )
}

export default App