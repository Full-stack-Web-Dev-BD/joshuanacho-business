import React from "react";
import PropTypes from "prop-types";
import { Container, Row, Nav, NavItem, NavLink } from "reactstrap";

class Footer extends React.Component {
  render() {
    return (
      <footer className="footer">
        <Container fluid>
          {/* <Nav>
            <NavItem>
              <NavLink > New</NavLink>
            </NavItem>
            <NavItem>
              <NavLink >About Us</NavLink>
            </NavItem>
            <NavItem>
              <NavLink>Blog</NavLink>
            </NavItem>
          </Nav> */}
        </Container>
      </footer>
    );
  }
}

export default Footer;
