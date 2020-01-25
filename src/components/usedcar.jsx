import React,{Component} from 'react';
import './externalcss.css';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import UsedModal from './usedModal.jsx';
import Dealer from './dealer.jsx';
import axios from 'axios';
class Certified extends Component
{
    constructor()
    {
        super();
        this.state={carList:[],models:[],carShow:[],carBody:[],loading:true,button:'1',show:false,id:"",show1:false}
        
    }
    async componentDidMount()
    {
        await fetch('https://marketcheck-prod.apigee.net/v1/search?api_key=nAdeu5YqwPAW8BGgH9JQAnBaIlx7RywP&rows=50&start=1000&vehicle_type=car&car_type=used')
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
                const e = [...new Set(d)]
                this.fetchLocalData(a,c,e);
            })
    }
    fetchLocalData = async (a,c,e)=>{
        await axios.get(`http://localhost:8000/usedcar`).then((res)=>{
                    let car = a;
                    for(var i = 0 ; i< res.data.length ; i++)
                    car.push(res.data[i]);
                    this.setState({carList:car,models:c,carShow:car,carBody:e,loading:false,button:'1'});
                })

    }
    changePrice = () =>
    {
        var a = document.getElementById('price').value;
        if(a === "SEARCH BY PRICE")
        {
            var b = this.state.carList;
            this.setState({carShow:b});
        }
        else if(a === "Less Than 500000")
        {
            var p = this.state.carList.filter((car)=>{
                const x = Number(car.price)*70;
                return x < 500000;
            })
            console.log(p);
            this.setState({carShow:p});
        }
        else if(a === "500000-1000000")
        {
            var q = this.state.carList.filter((car)=>{
                const x = Number(car.price)*70;
                return x >= 500000 && x <= 1000000;
            })
            console.log(q);
            this.setState({carShow:q});
        }
        else if(a === "1000000-1500000")
        {
            var r = this.state.carList.filter((car)=>{
                const x = Number(car.price)*70;
                return x >= 1000000 && x <= 1500000;
            })
            console.log(r);
            this.setState({carShow:r});
        }
        else if(a === "1500000-2000000")
        {
            var s = this.state.carList.filter((car)=>{
                const x = Number(car.price)*70;
                return x >= 1500000 && x <= 2000000;
            })
            console.log(s);
            this.setState({carShow:s});
        }
        else
        {
            var t = this.state.carList.filter((car)=>{
                const x = Number(car.price)*this.state.rate;
                return x > 2000000;
            })
            console.log(t);
            this.setState({carShow:t});
        }
    }
    changeBrand = () =>
    {
        var a = document.getElementById('brand').value;
        if(a === "SEARCH BY MODEL")
        {
            var b = this.state.carList;
            this.setState({carShow:b});
        }
        else
        {
            var c = this.state.carList.filter((car)=>{
                return `${car.build.make} ${car.build.model}` === a
            })
            console.log(c);
            this.setState({carShow:c});
        }
    }
    changeBody = () =>
    {
        var a = document.getElementById('body').value;
        if(a === "SEARCH BY BODY TYPE")
        {
            var b = this.state.carList;
            console.log(b);
            this.setState({carShow:b});
        }
        else
        {
            var c = this.state.carList.filter((car)=>{
                return car.build.body_type === a
            })
            console.log(c);
            this.setState({carShow:c});
        }
    }
    butttonClicked(option)
    {
        if(option === '1')
        {
            var a = this.state.carList;
            this.setState({carShow:a,button:'1'});
        }
        if(option === '2')
        {
            this.setState({button:'2'});
        }
        if(option === '3')
        {
            this.setState({button:'3'});
        }
        if(option === '4')
        {
            this.setState({button:'4'});
        }
    }
    ModalHandle = (a,b)=>{
        this.setState({show:a,id:b})
    }
    changeModal = () =>
    {
        this.setState({show:false,id:""});
    }
    DealerHandle = (a,b)=>{
        this.setState({show1:a,id:b})
    }
    changeDealer = () =>
    {
        this.setState({show1:false,id:""});
    }
    render()
    {
        if(this.state.loading)
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
        if(this.state.show1===true)
        {
            return (
                <Dealer id={this.state.id} changeDealer={this.changeDealer}/>
            )
        }
        else if(this.state.button ==='1')
        {
            return(
            <div>
                <div className="d-flex flex-column">
                    <h2>Quick Search</h2>
                    <ButtonGroup size="lg">
                    <Button className="btn btn-outline-light btn-dark" style={{height:"90px"}} onClick={this.butttonClicked.bind(this,'1')} active={this.state.button==='1'}>All Categories</Button>
                    <Button className="btn btn-outline-light btn-dark" onClick={this.butttonClicked.bind(this,'2')} active={this.state.button==='2'}>By Model</Button>
                    <Button className="btn btn-outline-light btn-dark" onClick={this.butttonClicked.bind(this,'3')} active={this.state.button==='3'}>By Body Type</Button>
                    <Button className="btn btn-outline-light btn-dark" onClick={this.butttonClicked.bind(this,'4')} active={this.state.button==='4'}>By Price</Button>
                    </ButtonGroup>
                </div> 
                <div className="container" style={{marginTop:'20px',backgroundColor:'white'}}>
                    <div className="row">{this.state.carShow.map((car)=>
                    {
                        return <div key={car.id} className="mb-1 col-md-3 col-lg-3 col-sm-10">
                            <div className="card" style={{width: "16rem"}}>
                                <img src={car.media.photo_links[0]} className="card-img-top" alt="NOT AVAILABLE"></img>
                                <div className="card-body">
                                    <h5 className="card-title">{car.heading}</h5>
                                    <p>{car.build.year} | {car.build.fuel_type} | {car.miles}</p>
                                    <h2>Rs.{Number(car.price)*70}</h2>
                                    <button className="btn btn-primary btn-sm" onClick={()=>this.ModalHandle(true,car)}>View Details</button>
                                    <button className="btn btn-primary btn-sm" onClick={()=>this.DealerHandle(true,car)}>Contact Dealer</button>
                                </div>
                            </div>
                        </div>
                        })}
                    </div>
                </div>
            </div>
            )
        }
        else if(this.state.button === '2')
        return (
            <div>
                <div className="d-flex flex-column">
                    <h2>Quick Search</h2>
                    <ButtonGroup size="lg">
                    <Button className="btn btn-outline-light btn-dark" style={{height:"90px"}} onClick={this.butttonClicked.bind(this,'1')} active={this.state.button==='1'}>All Categories</Button>
                    <Button className="btn btn-outline-light btn-dark" onClick={this.butttonClicked.bind(this,'2')} active={this.state.button==='2'}>By Model</Button>
                    <Button className="btn btn-outline-light btn-dark" onClick={this.butttonClicked.bind(this,'3')} active={this.state.button==='3'}>By Body Type</Button>
                    <Button className="btn btn-outline-light btn-dark" onClick={this.butttonClicked.bind(this,'4')} active={this.state.button==='4'}>By Price</Button>
                    </ButtonGroup>
                </div>
                <div className="text-center">
                <select id = "brand" onChange={this.changeBrand} className="mdb-select md-form" style={{height:'50px',backgroundColor:'#DDA0DD',fontFamily:'Arial',color:'#ffffff',border: '6px solid transparent',marginTop:"20px",marginBottom:"20px"}}>
                <option selected>SEARCH BY MODEL</option>
                {this.state.models.map((car)=>
                {
                    return <option key="car">{car}</option>
                })}
                </select>
                </div> 
                <div className="container" style={{marginTop:'20px',backgroundColor:'white'}}>
                    <div className="row">{this.state.carShow.map((car)=>{
                        return <div key={car.id} className="mb-1 col-md-3 col-lg-3 col-sm-10">
                            <div className="card" style={{width: "16rem"}}>
                                <img src={car.media.photo_links[0]} className="card-img-top" alt="NOT AVAILABLE"></img>
                                <div className="card-body">
                                    <h5 className="card-title">{car.heading}</h5>
                                    <p>{car.build.year} | {car.build.fuel_type} | {car.miles}</p>
                                    <h2>Rs.{Number(car.price)*70}</h2>
                                    <button className="btn btn-primary btn-sm" onClick={()=>this.ModalHandle(true,car)}>View Details</button>
                                    <button className="btn btn-primary btn-sm" onClick={()=>this.DealerHandle(true,car)}>Contact Dealer</button>
                                </div>
                            </div>
                        </div>
                        })}
                    </div>
                </div>
            </div>
    )
    else if(this.state.button === '3')
    {
        return (
            <div>
            <div className="d-flex flex-column">
                <h2>Quick Search</h2>
                <ButtonGroup size="lg">
                <Button className="btn btn-outline-light btn-dark" style={{height:"90px"}} onClick={this.butttonClicked.bind(this,'1')} active={this.state.button==='1'}>All Categories</Button>
                <Button className="btn btn-outline-light btn-dark" onClick={this.butttonClicked.bind(this,'2')} active={this.state.button==='2'}>By Model</Button>
                <Button className="btn btn-outline-light btn-dark" onClick={this.butttonClicked.bind(this,'3')} active={this.state.button==='3'}>By Body Type</Button>
                <Button className="btn btn-outline-light btn-dark" onClick={this.butttonClicked.bind(this,'4')} active={this.state.button==='4'}>By Price</Button>
                </ButtonGroup>
            </div>
            <div className="text-center">
            <select id = "body" onChange={this.changeBody} className="mdb-select md-form" style={{height:'50px',backgroundColor:'#DDA0DD',fontFamily:'Arial',color:'#ffffff',border: '6px solid transparent',marginTop:"20px",marginBottom:"20px"}}>
                <option selected>SEARCH BY BODY TYPE</option>
                {this.state.carBody.map((car)=>
                {
                    return <option key="car">{car}</option>
                })}
            </select>
            </div>
            <div className="container" style={{marginTop:'20px',backgroundColor:'white'}}>
                <div className="row">{this.state.carShow.map((car)=>{
                    return <div key={car.id} className="mb-1 col-md-3 col-lg-3 col-sm-10">
                        <div className="card" style={{width: "16rem"}}>
                            <img src={car.media.photo_links[0]} className="card-img-top" alt="NOT AVAILABLE"></img>
                            <div className="card-body">
                                <h5 className="card-title">{car.heading}</h5>
                                <p>{car.build.year} | {car.build.fuel_type} | {car.miles}</p>
                                <h2>Rs.{Number(car.price)*70}</h2>
                                <button className="btn btn-primary btn-sm" onClick={()=>this.ModalHandle(true,car)}>View Details</button>
                                <button className="btn btn-primary btn-sm" onClick={()=>this.DealerHandle(true,car)}>Contact Dealer</button>
                            </div>
                        </div>
                    </div>
                    })}
                </div>
            </div>
        </div>
        )
    }
    else if(this.state.button === '4')
    {
        return (
            <div>
            <div className="d-flex flex-column">
                <h2>Quick Search</h2>
                <ButtonGroup size="lg">
                <Button className="btn btn-outline-light btn-dark" style={{height:"90px"}} onClick={this.butttonClicked.bind(this,'1')} active={this.state.button==='1'}>All Categories</Button>
                <Button className="btn btn-outline-light btn-dark" onClick={this.butttonClicked.bind(this,'2')} active={this.state.button==='2'}>By Model</Button>
                <Button className="btn btn-outline-light btn-dark" onClick={this.butttonClicked.bind(this,'3')} active={this.state.button==='3'}>By Body Type</Button>
                <Button className="btn btn-outline-light btn-dark" onClick={this.butttonClicked.bind(this,'4')} active={this.state.button==='4'}>By Price</Button>
                </ButtonGroup>
            </div>
            <div className="text-center">
            <select id = "price" onChange={this.changePrice} className="mdb-select md-form" style={{height:'50px',backgroundColor:'#DDA0DD',fontFamily:'Arial',color:'#ffffff',border: '6px solid transparent',marginTop:"20px",marginBottom:"20px"}}>
                <option selected>SEARCH BY PRICE</option>
                <option>Less Than 500000</option>
                <option>500000-1000000</option>
                <option>1000000-1500000</option>
                <option>1500000-2000000</option>
                <option>Greater Than 2000000</option>
            </select>
            </div>
            <div className="container" style={{marginTop:'20px',backgroundColor:'white'}}>
                <div className="row">{this.state.carShow.map((car)=>{
                    return <div key={car.id} className="mb-1 col-md-3 col-lg-3 col-sm-10">
                        <div className="card" style={{width: "16rem"}}>
                            <img src={car.media.photo_links[0]} className="card-img-top" alt="NOT AVAILABLE"></img>
                            <div className="card-body">
                                <h5 className="card-title">{car.heading}</h5>
                                <p>{car.build.year} | {car.build.fuel_type} | {car.miles}</p>
                                <h2>Rs.{Number(car.price)*70}</h2>
                                <button className="btn btn-primary btn-sm" onClick={()=>this.ModalHandle(true,car)}>View Details</button>
                                <button className="btn btn-primary btn-sm" onClick={()=>this.DealerHandle(true,car)}>Contact Dealer</button>
                            </div>
                        </div>
                    </div>
                    })}
                </div>
            </div>
        </div>
        )
    }
    }
}
export default Certified;