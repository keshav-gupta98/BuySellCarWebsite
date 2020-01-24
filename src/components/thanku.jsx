import React,{Component} from 'react';
import './externalcss.css';
import {Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
class Thanku extends Component
{
    render()
    {
            return <div className = "text-center">
                <p style={{fontSize:"100px",color:"grey"}}><b> THANK YOU! </b></p>
                <p style={{fontSize:"50px",color:"red"}}> FOR LOGGING IN </p>
                <Link to="/"><button className="btn btn-outline-dark btn-light"> GO TO HOME </button></Link>
            </div>
    }
}
export default Thanku;