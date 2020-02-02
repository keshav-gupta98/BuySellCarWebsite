import React,{Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import {Link} from 'react-router-dom';
class Navbar1 extends Component
{
  render()
  {
    return (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href ="/">HOME</Nav.Link>
          <Link className="nav-link" to ="newcar">NEW CARS</Link>
          <Link className="nav-link" to ="usedcar">USED CARS</Link>
          <Link className="nav-link" to ="sellcar">SELL YOUR CAR</Link>
          <Link className="nav-link" to ="certified">CERTIFIED CARS</Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
    )
  }
}
export default Navbar1;