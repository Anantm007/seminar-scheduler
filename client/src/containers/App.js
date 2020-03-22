import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';

// Admin
import AdminLogin from '../components/admin/signin/Signin';

// Society
import SocietyLogin from '../components/society/signin/Signin';

// Layout
import Landing from '../components/layout/landing/Landing';
import NotFound from '../components/layout/notFound/Notfound';



const App = () => {
  return (
    <Router>
      <Switch>
        
        <Route exact path = '/' component={Landing} />

        <Route exact path='/admin/signin' component={AdminLogin} />
        
        <Route exact path='/society/signin' component={SocietyLogin} />

        <Route component={NotFound} />

      </Switch>
    </Router>
  );
}

export default App;
