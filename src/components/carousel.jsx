import React,{Component} from 'react';
import Carousel from 'react-bootstrap/Carousel';
import image from './images/usedcar.png';
import image1 from './images/usedcar2.jpg'
import image2 from './images/usedcar3.jpg' 
class CarouselMain extends Component
{
    render()
    {
        return (
            <div className="container-fluid" style={{height:"400px",marginBottom:"30px",marginTop:"20px",backgroundColor:"white"}}>
                <Carousel>
                    <Carousel.Item>
                        <img style = {{height:"350px"}} className="d-block w-100" src={image} alt="first"/>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img style = {{height:"350px"}} className="d-block w-100" src={image1} alt="first"/>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img style = {{height:"350px"}} className="d-block w-100" src={image2} alt="first"/>
                    </Carousel.Item>
                </Carousel>
            </div>
        )
    }
}
export default CarouselMain