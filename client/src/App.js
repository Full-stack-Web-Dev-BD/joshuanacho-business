import React, { Component } from 'react'
import Signup from "views/Signup";
import Login from "views/Login";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import AdminLayout from "layouts/Admin/Admin.js";

import "assets/scss/black-dashboard-react.scss";
import "assets/demo/demo.css";
import "assets/css/nucleo-icons.css";
import { connect } from 'react-redux';
import './update.css'
const hist = createBrowserHistory();

 class App extends Component {

     
    render() {
        let user=this.props.auth.user
        return (
            <Router history={hist}>
                <Switch>
                    <Route path="/admin" render={props => <AdminLayout {...props} />} />
                    <Route path='/signup' component={Signup} />
                    <Route path='/login' component={Login} />
                    <Redirect from="/" to={user.name?"/admin/dashboard":'/login'} />
                </Switch>
            </Router>
        )
    }
}
const mapStateToProps=state=>({
    auth:state.auth
})
export default connect(mapStateToProps,null) (App)