import React,{Component} from 'react';
import './externalcss.css';
import { Link } from 'react-router-dom';
import image from './images/image.jpg';
import 'bootstrap/dist/css/bootstrap.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
class Title extends Component
{
    render()
    {
        return (
            <Row className="justify-content-md-between">
               <Col sm={3} md={6} lg={4}><text className="head">CARSEARCH</text>
               <img src={image} className="headimage" alt=""></img></Col>
               <Col className="d-flex flex-row-reverse">
                    <Link to="/login"><button className="btn btn-outline-dark btn-light"> LOGIN </button></Link>
               </Col>        
            </Row>
            )
    }
}
export default Title 