import React,{Component} from 'react';
import './externalcss.css';
import image from './images/image.jpg';
import 'bootstrap/dist/css/bootstrap.css';
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
            <div className="row">
                <div className="col-11 ">
               <h5 className="head">CAREACH</h5>
               <img src={image} className="headimage" alt=""></img>
               </div>
               <div className="d-flex align-items-baseline"> 
               <button className="btn btn-outline-dark btn-light text-right" onClick={this.logout}>LOGOUT</button>         
                </div>
            </div>
            )
    }
}
export default Title 