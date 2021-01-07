
import './App.css';
import Login from './component/Login'
import Navbar from './component/Navbar'
import Register from './component/Register'
import Home from './component/Home'
import ClientManagement from './component/ClientManagement'
import InsuranceManagement from './component/InsuranceManagement'
import ViewClient from './component/ViewClient'
import AddClient from './component/AddClient'
import AllocatePlan from './component/AllocatePlan'
import NotFoundSection from './component/NotFoundSection'
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";


function App() {
  return (
    <div className="App">

      
      <Router>
      <Navbar/>
      
        <Switch>
          <Route exact path='https://mayur7264.github.io/advisorPortal' component={Login}/>
          <Route exact path = "/" component={Login}/>
          <Route exact path='/login' component={Login}/>
          <Route exact path='/register' component={Register}/>
          <Route exact path='/home' component={Home}/>
          <Route exact path='/home/clientmanagement' component={ClientManagement}/>
          <Route exact path='/home/clientmanagement/viewclient' component={ViewClient}/>
          <Route exact path='/home/clientmanagement/addclient' component={AddClient}/>
          <Route exact path='/home/insurancemanagement' component={InsuranceManagement}/>
          <Route exact path='/home/insurancemanagement/allocateplan' component={AllocatePlan}/>
          {/*<Route path = '*' component={NotFoundSection}/>*/}
          <Redirect to="/"/>
        </Switch>
      </Router>

      
    </div>
  );
}

export default App;
