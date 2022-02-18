import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import FooterComponent from './components/FooterComponent';
import ListCustomerComponent from './components/ListCustomerComponent';
import CreateCustomerComponent from './components/CreateCustomerComponent';
import ViewCustomerComponent from './components/ViewCustomerComponent';
import AdminResgisterComponent from './components/AdminResgisterComponent';
import AdminLoginComponent from './components/AdminLoginComponent';
import LandingPageComponent from './components/LandingPageComponent';
import CustomerReportComponent from './components/Reports/CustomerReportComponent';
import AddBillComponent from './components/AddBillComponent';


function App() {


  return (

    <div>
      <Router>
          {/* <HeaderComponent/> */}
          <div>
            <Switch> 

              <Route path="/" exact component={LandingPageComponent}></Route>
              <Route path = "/admin-login" component = {AdminLoginComponent}></Route>
              <Route path = "/admin-register" component = {AdminResgisterComponent}></Route>

              <Route path="/customers" exact render={(props) => (
                window.sessionStorage.getItem("isUserLogged") === "true"
                ? <ListCustomerComponent {...props}/>
                : <Redirect to='/admin-login' />
              )} />

              <Route path="/customerReports" exact render={(props) => (
                window.sessionStorage.getItem("isUserLogged") === "true"
                ? <CustomerReportComponent {...props}/>
                : <Redirect to='/admin-login' />
              )} />

              <Route path="/addBill/:id" exact render={(props) => (
                window.sessionStorage.getItem("isUserLogged") === "true"
                ? <AddBillComponent {...props}/>
                : <Redirect to='/admin-login' />
              )} />

              <Route path="/add-customer/:id" exact render={(props) => (
                window.sessionStorage.getItem("isUserLogged") === "true"
                ? <CreateCustomerComponent {...props}/>
                : <Redirect to='/admin-login' />
              )} />

              <Route path="/view-customer/:id" exact render={(props) => (
                window.sessionStorage.getItem("isUserLogged") === "true"
                ? <ViewCustomerComponent {...props}/>
                : <Redirect to='/admin-login' />
              )} />

              {/* <Route path ="/customers" component = {ListCustomerComponent}></Route> */}
              {/* <Route path ="/add-customer/:id" component = {CreateCustomerComponent}></Route> */}
              {/* <Route path = "/view-customer/:id" component = {ViewCustomerComponent}></Route> */}
              
            </Switch>
          </div>
          <div className = "mt-5 pt-4">
            <FooterComponent/>
          </div>
          
      </Router>
    </div>
  );
} 

export default App;
