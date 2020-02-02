import React,{Component} from 'react';
import './externalcss.css';
import { Link } from 'react-router-dom';
import image from './images/image.png';
import 'bootstrap/dist/css/bootstrap.css';
class Title extends Component
{
    render()
    {
        return (
            <div className="row">
                <div className="col-11 ">
               <h5 className="head">CAREACH</h5>
               <img src={image} className="headimage" alt=""></img>
               </div>
               <div className="d-flex align-items-baseline"> 
                <Link to="/login"><button className="btn btn-outline-dark btn-light"style={{float:"right",marginTop:"0rem"}}> LOGIN </button></Link>        
                </div>
            </div>
            )
    }
}
export default Title