import React from "react";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Label,
  Input,
  Row,
  Col,
} from "reactstrap";

import OuterNavbar from "components/Navbars/OuterNavbar";
import Axios from "axios";
import { Link } from "react-router-dom";
import { login } from '../store/actions/authAction'
import { connect } from "react-redux";
class Login extends React.Component {
  state = {
    email: '',
    password: '',
    error: {}
  }

  componentDidMount() {
    document.body.classList.add("white-content");
  }
  setBgChartData = name => {
    this.setState({
      bigChartData: name
    });
  };
  static  getDerivedStateFromProps(nextProps, prevState) {
    if (JSON.stringify(nextProps.auth.error) !== JSON.stringify(prevState.error)) {
      return {
        error: nextProps.auth.error
      }
    }
  }
  changeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  submitHandler = (e) => {
    e.preventDefault()
    let { email, password } = this.state
    this.props.login({ email, password }, this.props.history)
  }

  render() {
    return (
      <div>
        <OuterNavbar />
        <div className="row mt-5">
          <div className="col-md-6 offset-md-3">
            <Col xs="12">
              <Card className="card-chart p-4">
                <CardHeader>
                  <Row>
                    <Col className="text-center" >
                      <CardTitle tag="h2">Login Page</CardTitle>
                      <hr />
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <div className="row">
                    <div className="col-md-6">
                      <Label>Your Email</Label>
                      <Input onChange={(e) => this.changeHandler(e)} type="email" name="email" placeholder="Enter Your Email" />
                      {
                        this.state.error.email ?
                          <p className="text-danger text-capitalize"> {this.state.error.email} </p>
                          : ''
                      }
                    </div>

                    <div className="col-md-6">
                      <Label>Password</Label>
                      <Input onChange={(e) => this.changeHandler(e)} type="password" name="password" placeholder="Enter Password" />
                      {
                        this.state.error.password ?
                          <p className="text-danger text-capitalize"> {this.state.error.password} </p>
                          : ''
                      }
                      {
                        this.state.error.massage ?
                          <p className="text-danger text-capitalize"> {this.state.error.massage} </p>
                          : ''
                      }
                    </div>
                  </div>
                  <Button onClick={e => { this.submitHandler(e) }} color="info" size="sm" className="mt-3" ><span style={{ fontWeight: '300' }}>Login</span> </Button>
                  <p className="mt-3 text-center">Not have account ? <Link to='/signup'>Sign up now </Link> </p>
                </CardBody>
              </Card>
            </Col>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  auth: state.auth
})
export default connect(mapStateToProps, { login })(Login);
