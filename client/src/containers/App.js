import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';

// Admin
import AdminLogin from '../components/admin/signin/Signin';
import AdminDashboard from '../components/admin/dashboard/Dashboard';

// Society
import SocietyLogin from '../components/society/signin/Signin';

// Layout
import Landing from '../components/layout/landing/Landing';
import NavBar from '../components/layout/navbar/Navbar';
import NotFound from '../components/layout/notFound/Notfound';

// Auth Routes
import AdminRoute from '../components/adminAuth/AdminRoute';

const App = () => {
  return (
    <Router>
      <NavBar />
      <Switch>
        
        <Route exact path = '/' component = {Landing} />

        <Route exact path = '/admin/signin' component = {AdminLogin} />
        <AdminRoute exact path = '/admin/dashboard' component = {AdminDashboard} />


        <Route exact path = '/society/signin' component = {SocietyLogin} />

        <Route component={NotFound} />

      </Switch>
    </Router>
  );
}

export default App;
