import React,{Component} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {Redirect} from 'react-router';
class Login extends Component
{
    constructor()
    {
        super();
        this.state = {
            id:"3489",
            mail:"",
            pass:"",
            loggedin:false,
        }
    }
    submitHandler = (event) =>
    {
        event.preventDefault();
        console.log(this.state); 
        console.log(event.target.email.value);
        console.log(event.target.password.value);
            axios.post('http://localhost:8000/userLogin',{
                            mail:event.target.email.value,
                            pass:event.target.password.value
                            })
                            .then(res=>{
                                if(res.data === "error")
                                    console.log(res.data);
                                else if(res.data === "noUser")
                                {                                    
                                    alert("Invalid Username Or Password")
                                }
                                else
                                {
                                    this.setState({loggedin:true,id:res.data._id});
                                    setTimeout(()=>{
                                        console.log(this.state.loggedin);
                                        localStorage.setItem('login',"true");
                                        localStorage.setItem('token',res.data.token);
                                        this.props.nature("true")
                                    })
                                }
                            })
    }
    render()
    {
        if(this.state.loggedin)
        { 
            return <Redirect to="/thanku"></Redirect>
        }
        return(
            <div>
                <form onSubmit={this.submitHandler}>
                <div className="col-md-4 mb-3">
                    < label htmlFor="email">Email</label>
                    <input type="text" className="form-control" id="email" placeholder="Email Id"  required></input>
                </div>
                <div className="col-md-4 mb-3">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" id="password" placeholder="Password"  required></input>
                </div>
                <button className="btn btn-primary" type="submit">Login</button><Link to='/newaccount'>Create new Account</Link>
                </form>
            </div>
        )
    }
}
export default Login