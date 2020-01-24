import React,{Component} from 'react';
import './externalcss.css';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import NewModal from './newModal';
class Certified extends Component
{
    constructor()
    {
        super();
        this.state={carList:[],models:[],carShow:[],carBody:[],loading:true,button:'1',show:false,id:""}
        fetch('https://marketcheck-prod.apigee.net/v1/search?api_key=nAdeu5YqwPAW8BGgH9JQAnBaIlx7RywP&rows=50&start=1000&vehicle_type=car&car_type=new')
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
                this.setState({carList:a,models:c,carShow:a,carBody:e,loading:false,button:'1'});
            })
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
    changePrice = () =>
    {
        var a = document.getElementById('price').value;
        if(a === "SEARCH BY PRICE")
        {
            var b = this.state.carList;
            this.setState({carShow:b});
        }
        else if(a === "Less Than 1500000")
        {
            var c = this.state.carList.filter((car)=>{
                const x = Number(car.price)*70;
                return x < 1500000;
            })
            console.log(c);
            this.setState({carShow:c});
        }
        else if(a === "1500000-2000000")
        {
            var p = this.state.carList.filter((car)=>{
                const x = Number(car.price)*70
                return x >= 1500000 && x <= 2000000;
            })
            console.log(p);
            this.setState({carShow:p});
        }
        else if(a === "2000000-2500000")
        {
            var q = this.state.carList.filter((car)=>{
                const x = Number(car.price)*70
                return x >= 2000000 && x <= 2500000;
            })
            console.log(q);
            this.setState({carShow:q});
        }
        else if(a === "2500000-3000000")
        {
            var r = this.state.carList.filter((car)=>{
                const x = Number(car.price)*70
                return x >= 2500000 && x <= 3000000;
            })
            console.log(r);
            this.setState({carShow:r});
        }
        else if(a === "3000000-3500000")
        {
            var s = this.state.carList.filter((car)=>{
                const x = Number(car.price)*70
                return x >= 3000000 && x <= 3500000;
            })
            console.log(s);
            this.setState({carShow:s});
        }
        else
        {
            var t = this.state.carList.filter((car)=>{
                const x = Number(car.price)*70;
                return x > 3500000;
            })
            console.log(t);
            this.setState({carShow:t});
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
    render() {
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
                <NewModal id={this.state.id} changeModal={this.changeModal}/>
            )
        }
        else if(this.state.button ==='1')
        {
            return(
            <div>
                <div className="d-flex flex-column">
                    <h2>Quick Search</h2>
                    <ButtonGroup size="sm">
                    <Button className="btn btn-outline-light btn-dark" onClick={this.butttonClicked.bind(this,'1')} active={this.state.button==='1'}>All Categories</Button>
                    <Button className="btn btn-outline-light btn-dark" onClick={this.butttonClicked.bind(this,'2')} active={this.state.button==='2'}>By Model</Button>
                    <Button className="btn btn-outline-light btn-dark" onClick={this.butttonClicked.bind(this,'3')} active={this.state.button==='3'}>By Body Type</Button>
                    <Button className="btn btn-outline-light btn-dark" onClick={this.butttonClicked.bind(this,'4')} active={this.state.button==='4'}>By Price</Button>
                    </ButtonGroup>
                </div> 
                <div className="container" style={{marginTop:'20px',backgroundColor:'white'}}>
                    <div className="row">{this.state.carShow.map((car)=>{
                        return <div key={car.id} className="mb-1 col-md-3 col-lg-3 col-sm-10">
                            <div className="card" style={{width: "15rem"}}>
                                <img src={car.media.photo_links[0]} className="card-img-top" alt="NOT AVAILABLE"></img>
                                <div className="card-body">
                                    <h5 className="card-title">{car.heading}</h5>
                                    <p>{car.build.year} | {car.build.fuel_type}</p>
                                    <h2>Rs.{Number(car.price)*70}</h2>
                                    <button className="btn btn-primary" onClick={()=>this.ModalHandle(true,car)}>View Details</button>
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
                    <ButtonGroup size="sm">
                    <Button className="btn btn-outline-light btn-dark" onClick={this.butttonClicked.bind(this,'1')} active={this.state.button==='1'}>All Categories</Button>
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
                    <div className="row" >{this.state.carShow.map((car)=>{
                        return <div key={car.id} className="mb-1 col-md-3 col-lg-3 col-sm-10">
                            <div className="card" style={{width: "15rem"}}>
                                <img src={car.media.photo_links[0]} className="card-img-top" alt="NOT AVAILABLE"></img>
                                <div class="card-body">
                                    <h5 class="card-title">{car.heading}</h5>
                                    <p>{car.build.year} | {car.build.fuel_type}</p>
                                    <h2>Rs.{Number(car.price)*70}</h2>
                                    <button class="btn btn-primary" onClick={()=>this.ModalHandle(true,car)}>View Details</button>
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
                <ButtonGroup size="sm">
                <Button className="btn btn-outline-light btn-dark" onClick={this.butttonClicked.bind(this,'1')} active={this.state.button==='1'}>All Categories</Button>
                <Button className="btn btn-outline-light btn-dark" onClick={this.butttonClicked.bind(this,'2')} active={this.state.button==='2'}>By Model</Button>
                <Button className="btn btn-outline-light btn-dark" onClick={this.butttonClicked.bind(this,'3')} active={this.state.button==='3'}>By Body Type</Button>
                <Button className="btn btn-outline-light btn-dark" onClick={this.butttonClicked.bind(this,'4')} active={this.state.button==='4'}>By Price</Button>
                </ButtonGroup>
            </div>
            <div className="text-center">
            <select id = "body" onChange={this.changeBody} class="mdb-select md-form" style={{height:'50px',backgroundColor:'#DDA0DD',fontFamily:'Arial',color:'#ffffff',border: '6px solid transparent',marginTop:"20px",marginBottom:"20px"}}>
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
                        <div class="card" style={{width: "15rem"}}>
                            <img src={car.media.photo_links[0]} class="card-img-top" alt="NOT AVAILABLE"></img>
                            <div class="card-body">
                                <h5 class="card-title">{car.heading}</h5>
                                <p>{car.build.year} | {car.build.fuel_type}</p>
                                <h2>Rs.{Number(car.price)*70}</h2>
                                <button class="btn btn-primary" onClick={()=>this.ModalHandle(true,car)}>View Details</button>
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
                <ButtonGroup size="sm">
                <Button className="btn btn-outline-light btn-dark" onClick={this.butttonClicked.bind(this,'1')} active={this.state.button==='1'}>All Categories</Button>
                <Button className="btn btn-outline-light btn-dark" onClick={this.butttonClicked.bind(this,'2')} active={this.state.button==='2'}>By Model</Button>
                <Button className="btn btn-outline-light btn-dark" onClick={this.butttonClicked.bind(this,'3')} active={this.state.button==='3'}>By Body Type</Button>
                <Button className="btn btn-outline-light btn-dark" onClick={this.butttonClicked.bind(this,'4')} active={this.state.button==='4'}>By Price</Button>
                </ButtonGroup>
            </div>
            <div className="text-center">
            <select id = "price" onChange={this.changePrice} className="mdb-select md-form" style={{height:'50px',backgroundColor:'#DDA0DD',fontFamily:'Arial',color:'#ffffff',border: '6px solid transparent',marginTop:"20px",marginBottom:"20px"}}>
                <option selected>SEARCH BY PRICE</option>
                <option>Less Than 1500000</option>
                <option>1500000-2000000</option>
                <option>2000000-2500000</option>
                <option>2500000-3000000</option>
                <option>3000000-3500000</option>
                <option>Greater Than 3500000</option>
            </select>
            </div>
            <div className="container" style={{marginTop:'20px',backgroundColor:'white'}}>
                <div className="row">
                    {
                this.state.carShow.map((car)=>{
                    return <div key={car.id} className="mb-1 col-md-3 col-lg-3 col-sm-10">
                        <div class="card" style={{width: "15rem"}}>
                            <img src={car.media.photo_links[0]} className="card-img-top" alt="NOT AVAILABLE"></img>
                            <div className="card-body">
                                <h5 className="card-title">{car.heading}</h5>
                                <p>{car.build.year} | {car.build.fuel_type}</p>
                                <h2>Rs.{Number(car.price)*70}</h2>
                                <button className="btn btn-primary" onClick={()=>this.ModalHandle(true,car)}>View Details</button>
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