import {Redirect} from 'react-router-dom';
import React,{Component} from 'react';
import axios from 'axios';
import image from './images/login.png';
import Spinner from 'react-bootstrap/Spinner';
import UsedModal from './usedModal.jsx';
import 'bootstrap/dist/css/bootstrap.css';
class Profile extends Component
{
    constructor()
    {
        super();
//        var a = localStorage.getItem('id');
        this.state = {
            person:[],
            loading:false,
            show:false,
            id:""
        };
        
    }
    componentDidMount()
    {
        axios.get(`http://localhost:8000/profile`,{
            headers : {
                'authorization' : localStorage.token
            }
        }).then(res =>
        {
            console.log(res.data);
            this.setState({person:res.data,loading:true});  
        })
    }
    onsubmitHandeler = (event) =>
    {
        event.preventDefault();
        
        if(event.target.Password.value===event.target.Confirm.value)
        {
            const y ={"pass":event.target.Password.value};
            axios.post(`http://localhost:8000/changePassword`,{
                data:y },
                {
                    headers : {
                    'authorization' : localStorage.token
                    }
        }).then(res =>
        {
            alert(res.data); 
        })
        }
        else{
            alert('Password do not match');
        }
    }
    ModalHandle = (a,b)=>{
        this.setState({show:a,id:b})
    }
    changeModal = () =>
    {
        this.setState({show:false,id:""});
    }
    deleteCar = (id) =>
    {
        const y = {"id":id}
        axios.post(`http://localhost:8000/usedcar`,{
            data:y},
        {
            headers : {
            'authorization' : localStorage.token
            }
        }).then(res=>{
            console.log(`deleted from usedcars model`);
        })
        axios.post(`http://localhost:8000/usercar`,{
            data:y
        },{
            headers :
            {
                'authorization' : localStorage.token
            }
        }).then(res=>
        {
            alert(res.data);
            this.setState({loading:false});
        })
        setTimeout(()=>{
            axios.get(`http://localhost:8000/profile`,{
                headers : {
                    'authorization' : localStorage.token
                }
            }).then(res =>
            {
                console.log(res.data);
                this.setState({person:res.data,loading:true});  
            })
        })
    }
    render()
    {
        if(this.state.loading === false)
        {
            return (
                <div style={{marginLeft:"600px",marginTop:"200px"}}>
                    <Spinner animation="border" role="status" size="lg">
                    <span className="sr-only">Loading...</span>
                    </Spinner>
                </div>
            )
        }
        if(this.state.show===true)
        {
            return (
                <UsedModal id={this.state.id} changeModal={this.changeModal}/>
            )
        }
        if(localStorage.getItem('login') === "true")
        {
            return (
                <div className="container" style={{backgroundColor:"white"}}>
                    <div className="row">
                        <div className="col-md-3 col-lg-3 col-sm-10">
                            <div className="card" style={{width: "16rem"}}>
                                <img src={image} alt=".." className="card-img-top"/>
                                <div className="card-body">
                                    <h5 className="card-title"> {this.state.person.firstname} {this.state.person.lastname}</h5> 
                                </div>
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item">Phone Number: {this.state.person.phno}</li>
                                    <li className="list-group-item">Email Id: {this.state.person.emailid}</li> 
                                </ul>
                            </div>
                        </div>
                        <div className="col-md-3 col-lg-3 col-sm-10">
                            <div className="card" style={{width: "15rem"}}>
                                <form onSubmit={this.onsubmitHandeler}>
                                <label for="Password">New Password:</label>
                                <input type="password" id="Password" required pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Password should be greater than 8 characters,must contain at least 1 lower case,upper case,number"></input>
                                <label for="Confirm">Confirm Password:</label>
                                <input type="password" id="Confirm" required pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"></input>
                                <button className="btn btn-outline-dark btn-light text-right" type="submit">CHANGE PASSWORD</button>  
                                </form>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-6 col-sm-10">
                        <table className="table table-striped">
                        <tbody>{this.state.person.sell.map((car)=>{
                            return <tr key={car._id}>
                                <td>{car.heading}</td>
                                <td>
                                     <button className="btn btn-outline-dark btn-light ml-3 btn-sm" onClick={()=>this.deleteCar(car._id)}> Delete </button>
                                     <button className="btn btn-outline-dark btn-light ml-3 btn-sm" onClick={()=>this.ModalHandle(true,car)}> ViewDetails </button>
                                </td>
                            </tr>
                        })}
                        </tbody>
                        </table>
                    </div>
                    </div>
                </div>
            )
        }
        else
        {
            return (
                <Redirect to="/"/>
            )
        }
    }
}
export default Profile; 