import React,{Component} from 'react';
import './externalcss.css';
import image from './images/image.jpg';
import 'bootstrap/dist/css/bootstrap.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {Redirect} from 'react-router-dom';
class Title extends Component
{
    constructor()
    {
        super();
        this.state = {click:false};
    }
    logout = () =>
    {
        localStorage.clear();
        this.setState({click:true});
    }
    render()
    {
        if(this.state.click === true)
        {
            return <Redirect to="/login"></Redirect>
        }
        return (
            <Row className="justify-content-md-between">
               <Col><text className="head">CARSEARCH</text>
               <img src={image} className="headimage" alt=""></img></Col>
               <Col className="d-flex flex-row-reverse">
               <button className="btn btn-outline-dark btn-light text-right" onClick={this.logout}>LOGOUT</button>                   
               </Col>        
            </Row>
            )
    }
}
export default Title 