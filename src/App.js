import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/pages/Home';
import Services from './components/pages/Services';
import SignUp from './components/pages/SignUp';
import Login from './components/pages/Login';
import Medical from './components/pages/Medical';
import MapWithLocation from './components/pages/MapWithLocation';
import MapGarage from './components/pages/GarageM';
// import MapGa
import MapPetrolPump from './components/pages/MapPetrolPump';
import CustomerSignUp from './components/pages/CustomerSignUp';
import OrderDetails from './components/pages/OrderDetails';
import profile from './components/pages/profile';
import AdminLogin from './components/pages/AdminLogin';
import DemoPg from './components/pages/DemoPg';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
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
        </Switch>
      </div>
    </Router>
  );
}

export default App;
