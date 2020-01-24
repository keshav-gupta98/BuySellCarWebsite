import React,{Component} from 'react';
import {Redirect} from 'react-router';
import axios from 'axios';
class Sellcar extends Component
{
    constructor()
    {
        super();
        this.state ={models:[],id:localStorage.getItem('id'),bodyType:[],cars:[],profile:""}
        var person;
        if(localStorage.getItem('login') === "true")
        {
            axios.get(`http://localhost:8000/profile`,{
            headers : {
                'authorization' : localStorage.token
            }
            }).then(res =>
            {
                person = res.data;  
            })
            fetch('https://marketcheck-prod.apigee.net/v1/search?api_key=nAdeu5YqwPAW8BGgH9JQAnBaIlx7RywP&rows=50&start=1000&vehicle_type=car&car_type=used')
            .then(res => {
                return res.json()
            })
            .then(res => {
                var a = res.listings;
                var b = a.map((car)=>
                {
                    return `${car.build.make} ${car.build.model}`;
                })
                const c = [...new Set(b)];
                c.sort();
                var d = a.map((car)=>
                {
                    return car.build.body_type;
                })
                const e = [...new Set(d)];

                this.setState({id:localStorage.getItem('id'),models:c,bodyType:e,cars:a,profile:person});
            })
        }
    }
    submitHandler = (event) =>
    {
        event.preventDefault();
        var s = [];
        s = this.state.cars.filter((car)=>
        {
            return event.target.brand.value === `${car.build.make} ${car.build.model}`
        })
        const x = [...new Set(s)];
        const y = {
            "heading":`${event.target.year.value} ${event.target.brand.value}`,
            "price":event.target.price.value,
            "miles":event.target.miles.value,
            "interior_color":event.target.icolor.value,
            "exterior_color":event.target.ecolor.value,
            "media":{"photo_links":[]},
            "build":{"year":event.target.year.value,"model":x[0].build.model,"make":x[0].build.make,"body_type":x[0].build.body_type,"transmission":x[0].build.transmission,"engine":x[0].build.engine,"doors":x[0].build.doors,"cylinders":x[0].build.cylinders,"fuel_type":x[0].build.fuel_type,"made_in":x[0].build.made_in,"overall_height":x[0].build.overall_height,"overall_width":x[0].build.overall_width,"std_seating":x[0].build.std_seating},
            "dealer":{"website":"-","name":`${this.state.profile.firstname} ${this.state.profile.lastname}`,"dealer_type":"individual","phone":`${this.state.profile.phno}`,"street":event.target.street.value,"city":event.target.city.value,"state":event.target.state.value,"country":event.target.country.value}
        }
        axios.post(`http://localhost:8000/sellCar`,{
            car:y
        },{
            headers : {
                'authorization' : localStorage.token
            } 
        }).then(res =>
        {
            var k = res.data 
            axios.post(`http://localhost:8000/addCar`,{
            car:k
            },{
                headers : {
                    'authorization' : localStorage.token
                } 
            }).then(res =>
                {
                    alert(res.data); 
                 })
            })
    }
    render()
    {
        if(localStorage.getItem('login') === "true")
        {
            return (
            <div className="container" style={{backgroundColor:"white"}}>
                <form onSubmit={this.submitHandler}>
                <div className="col-md-5 mb-3">
                    <label htmlFor="brand">Car Model</label>
                    <select id="brand" className="form-control-lg">
                        {this.state.models.map((car)=>
                        {
                            return <option key={car}>{car}</option>
                        })}
                    </select>
                </div>
                <div className="col-md-5 mb-3">
                    <label htmlFor="miles">Miles Driven</label>
                    <input type="number" className="form-control" id="miles" placeholder="Miles Driven"  required></input>
                </div>
                <div className="col-md-5 mb-3">
                    <label htmlFor="icolor">Interior Color</label>
                    <input type="text" className="form-control" id="icolor" placeholder="Interior Color"  required></input>
                </div>
                <div className="col-md-5 mb-3">
                    <label htmlFor="ecolor">Exterior Color</label>
                    <input type="text" className="form-control" id="ecolor" placeholder="Exterior Color"  required></input>
                </div>
                <div className="col-md-5 mb-3">
                    <label htmlFor="year">Year</label>
                    <select className="form-control" id="year" placeholder="Year" required>
                        <option>1990</option><option>1991</option><option>1992</option><option>1993</option><option>1994</option><option>1995</option><option>1996</option><option>1997</option><option>1998</option><option>1999</option><option>2000</option><option>2001</option><option>2002</option><option>2003</option><option>2004</option><option>2005</option><option>2006</option><option>2007</option><option>2008</option><option>2009</option><option>2009</option><option>2010</option><option>2011</option><option>2012</option><option>2013</option><option>2014</option><option>2015</option><option>2016</option><option>2017</option><option>2018</option><option>2019</option><option>2020</option>
                    </select>
                </div>
                <div className="col-md-5 mb-3">
                    <label className="sr-only" for="price">Expected Price</label>
                        <div className="input-group mb-2">
                            <div className="input-group-prepend">
                                <div className="input-group-text">$</div>
                            </div>
                            <input type="number" className="form-control" id="price" required placeholder="Expected Price"/>
                        </div>
                </div>
                <div className="col-md-5 mb-3">
                    <label htmlFor="street">Street</label>
                    <input type="text" className="form-control" id="street" placeholder="Street"  required></input>
                </div>
                <div className="col-md-5 mb-3">
                    <label htmlFor="city">City</label>
                    <input type="text" className="form-control" id="city" placeholder="City"  required></input>
                </div>
                <div className="col-md-5 mb-3">
                    <label htmlFor="state">State</label>
                    <input type="text" className="form-control" id="state" placeholder="State"  required></input>
                </div>
                <div className="col-md-5 mb-3">
                    <label htmlFor="country">Country</label>
                    <input type="text" className="form-control" id="country" placeholder="Country"  required></input>
                </div>
                <button className="btn btn-primary" type="submit">Sell</button>
                </form>
            </div> )
        }
        else
        {
            return <Redirect to="/login"></Redirect>
        }
    }
}
export default Sellcar;