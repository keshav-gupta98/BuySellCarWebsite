import React,{Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import {Link} from 'react-router-dom';
class Page extends Component
{
    render()
    {
        return (

            <div className = "text-center">
                <p style={{fontSize:"100px",color:"grey"}}><b> ERROR 404! </b></p>
                <p style={{fontSize:"50px",color:"red"}}> PAGE NOT FOUND </p>
                <Link to="/"><button className="btn btn-outline-dark btn-light"> GO TO HOME </button></Link>
            </div>
        )
    }
}
export default Page;