import React,{Component} from 'react';
import {BrowserRouter,Route, Switch} from 'react-router-dom';
import './externalcss.css';
import Title from './title.jsx';
import Title1 from './title1.jsx';
import Home from './home.jsx';
import Login from './login.jsx';
import NewAccount from './newaccount.jsx';
import Profile from './profile';
import NavBar1 from './navbar1';
import NavBar from './navbar'
import UsedCar from './usedcar';
import NewCar from './newcar';
import Certified from './certified';
import PageNotFound from './pagenotfound'
import Thanku from './thanku';
import SellCar from './sellcar';
import Admin from './admin.jsx'
class MainPage extends Component
{
    constructor()
    {
        super();
        this.state={'login':"false"};
    }
    nature = (a) =>
    {
        this.setState({login:a});
    }
    render()
    {
        if(localStorage.getItem('login') === "true")
        return (
                <BrowserRouter>
                <div className="fixed">
                    <Title1/>
                    <NavBar/>
                </div>
                <Switch>
                <Route exact path='/' render={(props)=><Home/>}></Route>
                <Route exact path="/login" render={(props)=><Login nature={this.nature}/>}></Route>
                <Route exact path="/newaccount" render={(props)=><NewAccount />}></Route>
                <Route exact path='/profile' render={(props)=><Profile/>}></Route>
                <Route exact path='/usedcar' render={(props)=><UsedCar/>}></Route>
                <Route exact path='/newcar' render={(props)=><NewCar/>}></Route>
                <Route exact path='/certified' render={(props)=><Certified/>}></Route>
                <Route exact path='/thanku' render={(props)=><Thanku/>}></Route>
                <Route exact path='/sellcar' render={(props)=><SellCar/>}></Route>
                <Route exact path='/admin' render={(props)=><Admin/>}></Route>
                <Route render={()=><PageNotFound/>}></Route>
                </Switch>
                </BrowserRouter>
        )
        else
            return (
                <BrowserRouter>
                <div className="fixed">
                    <Title/>
                    <NavBar1/>
                </div>
                <Switch>
                <Route exact path='/'render={(props)=><Home/>}></Route>
                <Route exact path="/login" render={(props)=><Login nature={this.nature}/>}></Route>
                <Route exact path="/newaccount" render={(props)=><NewAccount />}></Route>
                <Route exact path='/usedcar' render={(props)=><UsedCar/>}></Route>
                <Route exact path='/newcar' render={(props)=><NewCar/>}></Route>
                <Route exact path='/certified' render={(props)=><Certified/>}></Route>
                <Route exact path='/sellcar' render={(props)=><SellCar/>}></Route>
                <Route exact path='/admin' render={(props)=><Admin/>}></Route>
                <Route render={()=><PageNotFound/>}></Route>
                </Switch>
                </BrowserRouter>
        )
}
}
export default MainPage;