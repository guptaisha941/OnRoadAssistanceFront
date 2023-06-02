import React , { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/pages/Home';
import Services from './components/pages/Services';
import SignUp from './components/pages/SignUp';
import Login from './components/pages/Login';
import Medical from './components/pages/Medical';
import MapWithLocation from './components/pages/MapWithLocation';
import MapGarage from './components/pages/GarageM';
import MapPetrolPump from './components/pages/MapPetrolPump';
import CustomerSignUp from './components/pages/CustomerSignUp';
import OrderDetails from './components/pages/OrderDetails';
import profile from './components/pages/profile';
import AdminLogin from './components/pages/AdminLogin';
import DemoPg from './components/pages/DemoPg';
import Homelogout from './components/pages/homelogout';
import Modal from './components/pages/Modal';
import Cards1 from './components/cards1';
import Homeadmin from './components/pages/homeadmin';
import Cards2 from './components/card2';
import hospital from './components/services/hospital';
import vechiletowing from './components/services/vehicletowing';
import petroldilevery from './components/services/petroldelivery';
import Serviceslogin from './components/pages/serviceslogin';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import Request from './components/pages/Request';
import AdminReq from './components/pages/AdminReq';
import Rating from './components/pages/Rating';


function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is authenticated on mount
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
      isAuthenticated === true
        ? <Component {...props} />
        : <Redirect to='/login' />
    )} />
  );

  return (
    <Router>
      <div>
        {/* <Navbar /> */}
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/services' component={Services} />
          <Route path='/medical' component={Medical} />
          <Route path='/sign-up' component={SignUp} />
          <Route path='/login' component={Login} />
          <Route path='/map' component={MapWithLocation} />
          <Route path='/mapGarage' component={MapGarage} />
          <Route path='/mapPetrolPump' component={MapPetrolPump} />
          <Route path='/order' component={OrderDetails} />
          <Route path='/customer-sign-up' component={CustomerSignUp} />
          <Route path='/profile' component={profile} />
          <Route path='/adminLogin' component={AdminLogin} />
          <Route path='/demo' component={DemoPg}/>
          <Route path='/Modal' component={Modal}/>
          <Route path='/hospital' component={hospital}/>
          <Route path='/petroldilevery' component={petroldilevery}/>
          <Route path='/vechiletowing' component={vechiletowing}/>
          <Route path='/cards1' component={Cards1} />
          <Route path='/homelogout' component={Homelogout} />
          <Route path='/cards2' component={Cards2} />
          <Route path='/homeadmin' component={Homeadmin} />
          <Route path='/serviceslogin' component={Serviceslogin} />
          <Route path='/Request' component={Request} />
          <Route path='/AdminReq' component={AdminReq} />
          <Route path='/Rating' component={Rating} />

        
        </Switch>
      </div>
    </Router>
  );
}

export default App;
