import React,{Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
class Navbar1 extends Component
{
  render()
  {
    return (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/">HOME</Nav.Link>
          <Nav.Link href="newcar">NEW CARS</Nav.Link>
          <Nav.Link href="usedcar">USED CARS</Nav.Link>
          <Nav.Link href="sellcar">SELL YOUR CAR</Nav.Link>
          <Nav.Link href="certified">CERTIFIED CARS</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
    )
  }
}
export default Navbar1;