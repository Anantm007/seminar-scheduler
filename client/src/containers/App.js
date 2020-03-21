import React, {Fragment} from 'react';
import './App.css';
import AdminSignin from '../components/admin/signin/signin'
import SocietySignin from '../components/society/signin/signin';
const App = () => {
  return (
    <Fragment>
      <h1>Seminar Schedular MSIT</h1>
      <AdminSignin />
      <SocietySignin />
    </Fragment>
  );
}

export default App;
