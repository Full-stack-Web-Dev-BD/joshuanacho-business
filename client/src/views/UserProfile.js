import { nominalTypeHack } from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { uploadPP, updateProfile } from '../store/actions/authAction'
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardText,
  FormGroup,
  Form,
  Input,
  Row,
  Col
} from "reactstrap";

class UserProfile extends React.Component {

  state = {
    file: {},
    status: 'Upload A Profile Picture',
    name: '',
    email: '',
    newPassword: '',
    currentPassword: '',
    aboutMe: ''
  }
  fileChangeHandler(e) {
    this.setState({ status: "Uploading..." })
    const fData = new FormData()
    fData.append('file', e.target.files[0])
    fData.append('uid', this.props.auth.user._id)
    this.props.uploadPP(fData)
  }
  changeHandler(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  updateProfile(e) {
    e.preventDefault()
    let user = this.props.auth.user
    let { name, email, currentPassword, newPassword, aboutMe } = this.state
    let obj = {
      name: name ? name : user.name,
      email: email ? email : user.email,
      aboutMe: aboutMe ? aboutMe : user.aboutMe,
      uid:user._id,
      currentPassword,
      newPassword
    }
    this.props.updateProfile(obj)
  }
  render() {
    let user = this.props.auth.user
    return (
      <>
        <div className="content">
          <Row>
            <Col md="8">
              <Card className="p-4">
                <CardHeader>
                  <h2 className="title">Edit Profile</h2>
                </CardHeader>
                <CardBody>
                  {
                    this.props.auth.error.message?
                    <p className={this.props.auth.error.type==="error"?"text-danger text-bold ":"text-bold text-success"}> <b> { this.props.auth.error.message }</b> </p>:''
                  }
                  <Form >
                    <Row>
                      <Col className="pr-md-1" md="6">
                        <FormGroup>
                          <label> Name</label>
                          <Input
                            onChange={e => this.changeHandler(e)}
                            name='name'
                            defaultValue={user.name}
                            placeholder="Type Your Name"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pl-md-1" md="6">
                        <FormGroup>
                          <label>Email</label>
                          <Input
                            onChange={e => this.changeHandler(e)}
                            name='email'
                            defaultValue={user.email}
                            placeholder="Your Email"
                            type="email"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pr-md-1" md="6">
                        <FormGroup>
                          <label> Curent Password</label>
                          <Input
                            onChange={e => this.changeHandler(e)}
                            name='currentPassword'
                            placeholder="Current Password"
                            type="password"
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pl-md-1" md="6">
                        <FormGroup>
                          <label>New Password</label>
                          <Input
                            onChange={e => this.changeHandler(e)}
                            name='newPassword'
                            placeholder="New Password"
                            type="password"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="12">
                        <FormGroup>
                          <label>About Me</label>
                          <Input
                            onChange={e => this.changeHandler(e)}
                            name='aboutMe'
                            id="aboutMe"
                            defaultValue={user.aboutMe}
                            placeholder="Here can be your description"
                            rows="4"
                            type="textarea"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
                <CardFooter>
                  <Button className="btn-fill" size="sm" color="primary" onClick={e => this.updateProfile(e)} >Update</Button>
                </CardFooter>
              </Card>
            </Col>
            <Col md="4">
              <Card className="card-user">
                <CardBody>
                  <CardText />
                  <div className="author">
                    <div className="block block-one" />
                    <div className="block block-two" />
                    <div className="block block-three" />
                    <div className="block block-four" />
                    {
                      user.pp ?
                        <div>
                          <a href="#pablo" onClick={e => e.preventDefault()}>
                            <img
                              alt="..."
                              className="avatar"
                              src={require(`../../uploads/${user.pp}`)}
                            />
                          </a>
                          <br />
                          <a href="#pablo" onClick={e => document.getElementById('upp').click()}>Update Profile Picture</a>
                          <input accept="image/x-png, image/gif, image/jpeg" onChange={e => this.fileChangeHandler(e)} type="file" style={{ display: 'none' }} id="upp" />
                        </div>
                        :
                        <div>
                          <a href="#pablo" onClick={e => document.getElementById('upp').click()}>
                            <img
                              alt="..."
                              className="avatar"
                              src={require("assets/img/default-pp.png")}
                            />
                            <h5 className="title">{this.state.status}</h5>
                          </a>
                          <input accept="image/x-png, image/gif, image/jpeg" onChange={e => this.fileChangeHandler(e)} type="file" style={{ display: 'none' }} id="upp" />
                        </div>
                    }
                    <p className="description text-capitalize"> {user.name} </p>
                  </div>
                  <div className="card-description">
                    {
                      user.aboutMe ?
                        <p className="text-center">{user.aboutMe }</p>:
                        <div className="text-center">
                          <Button onClick={e => { document.getElementById('aboutMe').focus() }} className="btn-fill" size="sm" color="primary" type="submit">Add Yourself</Button>
                        </div>
                    }
                  </div>
                </CardBody>
                <CardFooter>
                  <div className="button-container">
                    <Button className="btn-icon btn-round" color="facebook">
                      <a  style={{color:'white'}} target="_blank" href="https://facebook.com">
                      <i className="fab fa-facebook" />
                      </a>
                    </Button>
                    <Button className="btn-icon btn-round" color="twitter">
                    <a  style={{color:'white'}} target="_blank" href="https://twitter.com/">
                      <i className="fab fa-twitter" />
                      </a>
                    </Button>
                    <Button className="btn-icon btn-round" color="google">
                      <a  style={{color:'white'}} target="_blank" href="https://myaccount.google.com">
                        < i className="fab fa-google-plus" />
                      </a>
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}
const mapStateToProps = state => ({
  auth: state.auth
})
export default connect(mapStateToProps, { uploadPP, updateProfile })(UserProfile);
