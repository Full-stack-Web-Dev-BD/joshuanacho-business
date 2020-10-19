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
import {connect} from 'react-redux'
import {register} from '../store/actions/authAction'

class Signup extends React.Component {
  state = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    err: {}
  }

  componentDidMount() {
    document.body.classList.add("white-content");
  }
  setBgChartData = name => {
    this.setState({
      bigChartData: name
    });
  };
  changeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  static getDerivedStateFromProps(nextProps, prevState){
    if(JSON.stringify(nextProps.auth.error)!==JSON.stringify(prevState.error)){
      return {
        error:nextProps.auth.error
      }
    }
    return null
  }
  submitHandler = (e) => {
    e.preventDefault()
    let{name, email,password , confirmPassword} =this.state
    this.props.register(
      {name,email,password,confirmPassword},
      this.props.history
    )

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
                      <CardTitle tag="h2">Signup Page</CardTitle>
                      <hr />
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <div className="row">
                    <div className="col-md-6">
                      <Label>Your Name</Label>
                      <Input className="is-invalid" onChange={(e) => this.changeHandler(e)} type="text" name="name" placeholder="Enter Your Name" />

                      {
                        this.state.error.name ?
                          <p className="text-danger text-capitalize"> {this.state.error.name} </p>
                          : ''
                      }
                    </div>
                    <div className="col-md-6">
                      <Label>Your Email</Label>
                      <Input onChange={(e) => this.changeHandler(e)} type="email" name="email" placeholder="Enter Your Email" />
                      {
                        this.state.error.email ?
                          <p className="text-danger text-capitalize"> {this.state.error.email} </p>
                          : ''
                      }
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <Label>Password</Label>
                      <Input onChange={(e) => this.changeHandler(e)} type="password" name="password" placeholder="Enter Password" />
                      {
                        this.state.error.password ?
                          <p className="text-danger text-capitalize"> {this.state.error.password} </p>
                          : ''
                      }
                    </div>
                    <div className="col-md-6">
                      <Label>Confirm Password</Label>
                      <Input onChange={(e) => this.changeHandler(e)} type="password" name="confirmPassword" placeholder="Enter Confirm Password" />
                      {
                        this.state.error.confirmPassword ?
                          <p className="text-danger text-capitalize"> {this.state.error.confirmPassword} </p>
                          : ''
                      }
                      {
                        this.state.error.massage ?
                          <p className="text-danger text-capitalize"> {this.state.error.massage} </p>
                          : ''
                      }
                    </div>
                  </div>
                  <Button onClick={e => { this.submitHandler(e) }} color="info" size="sm" className="mt-3" ><span style={{ fontWeight: '300' }}>Signup</span> </Button>
                  <p className="mt-3 text-center">Already have account ? <Link to='/login'>Login page. </Link> </p>
                </CardBody>
              </Card>
            </Col>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps=state=>({
  auth:state.auth
})
export default connect(mapStateToProps ,{register} )( Signup);
