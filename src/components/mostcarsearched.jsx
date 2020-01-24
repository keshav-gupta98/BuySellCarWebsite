import React,{Component} from 'react';
import image from './image.jpg';

class Mostsearchedcars extends Component
{
    constructor()
    {
        this.state = {cars:[]};
        fetch
    }
    render()
    {
        return (
            <div>
                <h1>MOST SEARCHED CAR</h1>
                <img src={image} style={{width: '300px', height: '300px'}}></img>
                <img src={image} style={{width: '300px', height: '300px'}}></img>
            </div>
        )
    }
}
export default Mostsearchedcars;