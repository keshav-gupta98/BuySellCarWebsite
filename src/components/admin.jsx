import React,{Component} from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import {Redirect} from 'react-router-dom';
class Admin extends Component
{
    constructor()
    {
        super();
        this.state = {users:[],logggedIn:false,button:false};
    }
    submitHandler = (event) =>
    {
        event.preventDefault();
            axios.post('http://localhost:8000/adminLogin',{
                mail:event.target.email.value,
                pass:event.target.password.value
            }).then(res=>
            {
                if(res.data === "error")
                {
                    alert("error");
                }
                else if(res.data === "Not Admin")
                {
                    alert("You are not admin");
                }
                else
                {
                    localStorage.setItem('token',res.data.token);
                    axios.get('http://localhost:8000/user',{
                        headers : {
                            'authorization' : localStorage.token}
                        }).then(res=>
                            {
                                if(res.data === "Not Admin")
                                alert("Not Admin");
                                else
                                {
                                this.setState({loggedIn:true,users:res.data})
                                setTimeout(()=>
                                {
                                    localStorage.setItem('login',"true");
                                })
                            }  
                        })
                }
            })
    }
    deleteUser = (id) =>
    {
        axios.post(`http://localhost:8000/user`,{
            id:id
        },{
            headers : {
                'authorization' : localStorage.token}
            }).then(res=>
        {
            axios.get('http://localhost:8000/user',{
                        headers : {
                            'authorization' : localStorage.token}
                        }).then(res=>
                            {
                                if(res.data === "Not Admin")
                                alert("Not Admin");
                                else
                                {
                                this.setState({loggedIn:true,users:res.data})
                                setTimeout(()=>
                                {
                                    alert("User Deleted");
                                })
                            }  
                        })
        })
    }
    buttonClicked = () =>
    {
        this.setState({button:true,loggedIn:false});
        setTimeout(()=>
        {
            localStorage.clear();
        })
    }
    render()
    {
        if(this.state.button === true)
        {
            return <Redirect to='/login'></Redirect>
        }
        if(this.state.loggedIn === true)
        {
            return (
                    <div>
                        <div className = "container">
                            <h2> Welcome To Admin Portal!</h2>
                        </div>
                        <div className = "container">
                            <table className="table table-striped">
                                <tbody>
                                {
                                    this.state.users.map((user)=>
                                    {
                                        return <tr key={user._id}>
                                            <td>{user.emailid}</td>
                                            <td><button className="btn-primary btn-sm" onClick={()=>{this.deleteUser(user._id)}}>Delete</button></td>
                                            </tr>
                                    })
                                }
                                </tbody>
                            </table>
                            <button className ="btn-danger" onClick={this.buttonClicked}>LOGOUT FROM ADMIN</button>
                        </div>
                    </div>
            )
        }
        return(
            <div className="container">
                <form onSubmit={this.submitHandler}>
                <div className="col-md-4 mb-3">
                    < label htmlFor="email">Email</label>
                    <input type="text" className="form-control" id="email" placeholder="Email Id"  required></input>
                </div>
                <div className="col-md-4 mb-3">
                    <label htmlFor="password">Last name</label>
                    <input type="password" className="form-control" id="password" placeholder="Password"  required></input>
                </div>
                <button className="btn btn-primary" type="submit">Login</button>
                </form>
            </div>
        )
    }
}
export default Admin