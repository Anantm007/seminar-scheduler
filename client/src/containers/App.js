import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';

// Admin
import AdminLogin from '../components/admin/signin/Signin';
import AdminDashboard from '../components/admin/dashboard/Dashboard';
import ResetPass from '../components/admin/resetpass/ResetPass';

// Society
import SocietyLogin from '../components/society/signin/Signin';
import SocietyDashboard from '../components/society/dashboard/Dashboard';
import SocietyResetPass from '../components/society/resetpass/ResetPass';
import CheckSlot from '../components/society/checkSlot/CheckSlot';
import BookSlot from '../components/society/bookSlot/BookSlot';

// Layout
import Landing from '../components/layout/landing/Landing';
import NavBar from '../components/layout/navbar/Navbar';
import NotFound from '../components/layout/notFound/Notfound';

// Auth Routes
import AdminRoute from '../components/adminAuth/AdminRoute';
import SocityRoute from '../components/societyAuth/SocietyRoute';

const App = () => {
  return (
    <Router>
      <NavBar />
      <Switch>
        
        <Route exact path = '/' component = {Landing} />

        <Route exact path = '/admin/signin' component = {AdminLogin} />
        <AdminRoute exact path = '/admin/dashboard' component = {AdminDashboard} />
        <Route exact path="/admin/reset/password/:token" component = {ResetPass} />

        <Route exact path = '/society/signin' component = {SocietyLogin} />
        <SocityRoute exact path = '/society/dashboard' component = {SocietyDashboard} />
        <Route exact path="/society/reset/password/:token" component = {SocietyResetPass} />
        <SocityRoute exact path = '/society/check' component = {CheckSlot} />
        <SocityRoute exact path = '/society/book' component = {BookSlot} />

        <Route component={NotFound} />

      </Switch>
    </Router>
  );
}

export default App;
