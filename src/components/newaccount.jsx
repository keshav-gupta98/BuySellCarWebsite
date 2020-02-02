import React,{Component} from 'react';
import axios from 'axios';
import {Redirect} from 'react-router';
import 'bootstrap/dist/css/bootstrap.css';
import './formcss.css';
class NewAccount extends Component
{
    state = {
        firstname:'',
        lastname:'',
        emailid:'',
        phno:0,
        password:'',
        submitted:false,
        res:false
    }
    constructor()
    {
        super();
        this.firstname='';
        this.lastname='';
        this.emailid='';
        this.phno=0;
        this.password='';
        
        this.letter = React.createRef();
        this.capital = React.createRef();
        this.number = React.createRef();
        this.length = React.createRef();
    }

    passwordCheck = (event)=>{
        let myInput = event.target.value;
                    var lowerCaseLetters = /[a-z]/g;
                    if(myInput.match(lowerCaseLetters)) {  
                        this.letter.current.classList.remove("invalid");
                        this.letter.current.classList.add("valid");
                    } else {
                        this.letter.current.classList.remove("valid");
                        this.letter.current.classList.add("invalid");
                    }
                    
                    // Validate capital letters
                    var upperCaseLetters = /[A-Z]/g;
                    if(myInput.match(upperCaseLetters)) {  
                        this.capital.current.classList.remove("invalid");
                        this.capital.current.classList.add("valid");
                    } else {
                        this.capital.current.classList.remove("valid");
                        this.capital.current.classList.add("invalid");
                    }

                    // Validate numbers
                    var numbers = /[0-9]/g;
                    if(myInput.match(numbers)) {  
                        this.number.current.classList.remove("invalid");
                        this.number.current.classList.add("valid");
                    } else {
                        this.number.current.classList.remove("valid");
                        this.number.current.classList.add("invalid");
                    }
                    
                    // Validate length
                    if(myInput.length >= 8) {
                        this.length.current.classList.remove("invalid");
                        this.length.current.classList.add("valid");
                    } else {
                        this.length.current.classList.remove("valid");
                        this.length.current.classList.add("invalid");
                    }

    }
    passwordChange = () =>
    {
        if(this.letter.current.classList.contains("valid"))
        {
            if(this.capital.current.classList.contains("valid"))
            {
                if(this.number.current.classList.contains("valid"))
                {
                    if(this.length.current.classList.contains("valid"))
                    return true;
                }
            }
        }
        return false;
    }
    onsubmitHandeler = (event)=>
    {
        event.preventDefault();
        var regName =  /^[a-zA-Z]+$/; 
        if(!regName.test(document.getElementById('Firstname').value) || !regName.test(document.getElementById('Lastname').value))
        {
            alert('Invalid Name')
        }
        else
        {
            var phoneno = /^\d{10}$/;
            if(event.target.Phone.value.match(phoneno) === false || event.target.Phone.value.length !== 10)
            {
                alert('Invalid Phone Number');
            }
            else
            {
                if(this.passwordChange()===false)
                {
                    alert("Please enter correct value");
                }
                else
                {
                    if(event.target.Confirm.value!==event.target.Password.value)
                    {
                        alert('Please confirm password correctly');
                    }
                    else
                    {
                        this.firstname=event.target.Firstname.value;
                        this.lastname=event.target.Lastname.value;
                        this.emailid=event.target.Email.value;
                        this.phno=event.target.Phone.value;
                        this.password=event.target.Password.value;
                        this.setState({firstname:this.firstname,
                                        lastname:this.lastname,
                                        emailid:this.emailid,
                                        phno:this.phno,
                                        password:this.password,
                                        submitted:true});

                    }
                }
            }
        }
    }
    render() {
        if(this.state.res===true)
        {
            return<Redirect to='login'/>
        }
        if(this.state.submitted)
        {
            console.log(this.state); 
            axios.post('http://localhost:8000/register',{
                            user : this.state
                            })
                            .then(res=>{
                                if(res.data === "error")
                                    alert("This User Already Exist")
                                if(res.data === "OK")
                                this.setState({res:true});
                            })
        }
        return(
            <React.Fragment>
            <div>
                <h2 className="col-md-3 mb-3">Create New Account</h2>
            <form onSubmit={this.onsubmitHandeler}>
            <div className="form-row">
            <div className="col-md-3 mb-3">
                < label htmlFor="Firstname">First name</label>
                <input type="name" className="form-control" id="Firstname" placeholder="First name"  required></input>
            </div>
            <div className="col-md-3 mb-3">
                <label htmlFor="Lastname">Last name</label>
                <input type="text" className="form-control" id="Lastname" placeholder="Last name"  required></input>
            </div>
            <div className="col-md-4 mb-3">
                <label htmlFor="Email">Email ID</label>
                <div className="input-group">
                <input type="email" className="form-control" id="Email" placeholder="e.g.abc@gmail.com" aria-describedby="inputGroupPrepend2" required></input>
                </div>
            </div>
            </div>
            <div className="form-row">
            <div className="col-md-5 mb-3">
                <label htmlFor="Phone">Phone Number</label>
                <input type="number" className="form-control" id="Phone" required></input>
            </div>
            <div className="col-md-3 mb-3">
                <label htmlFor="Password">Password</label>
                <input type="password" className="form-control" id="Password"required pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" onChange={this.passwordCheck}  />
            </div>
            <div className="col-md-3 mb-3">
                <label htmlFor="Confirm">Confirm Password</label>
                <input type="password" className="form-control" id="Confirm" required></input>
            </div>
            </div>
            <button className="btn btn-outline-dark btn-light" type="submit">Create Account</button>
        </form>
        <div id="message">
        <h3>Password must contain the following:</h3>
        <p ref={this.letter} className="invalid">A <b>lowercase</b> letter</p>
        <p  ref={this.capital} id="capital" className="invalid">A <b>capital (uppercase)</b> letter</p>
        <p ref={this.number} id="number" className="invalid">A <b>number</b></p>
        <p ref={this.length} id="length" className="invalid">Minimum <b>8 characters</b></p>
        </div>
        </div>
        </React.Fragment>
        )
    }
}
export default NewAccount;