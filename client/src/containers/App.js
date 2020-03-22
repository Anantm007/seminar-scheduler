import React, {Fragment} from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Admin from '../components/admin/index'
import Society from '../components/society/index';
const App = () => {
  return (
    <Fragment>
      <h1>Seminar Schedular MSIT</h1>
      <Switch>
        <Route path='/admin' component={Admin} />
        <Route path='/society' component={Society} />
      </Switch>
    </Fragment>
  );
}

export default App;
