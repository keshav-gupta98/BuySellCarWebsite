import React,{Component} from 'react';
import Carousel from 'react-bootstrap/Carousel'
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.css';
class UsedModal extends Component
{
    constructor(props)
    {
        super(props);
        this.state={car:this.props.id};
    }
    render()
    {
        return (
            <div className="container" style={{height:"330px",marginBottom:"30px",marginTop:"20px",backgroundColor:"white"}}>
                <Button className="btn btn-danger d-flex" onClick={this.props.changeModal}> GO BACK </Button>
                        <div className="container" style={{marginBottom:"30px",marginTop:"20px",backgroundColor:"white"}}>
                            <Carousel>
                            {
                            this.state.car.media.photo_links.map((image)=>{
                                return <Carousel.Item>
                                <img style = {{height:"300px"}} className="d-block w-100" src={image} alt="first"/>
                                </Carousel.Item>
                            })
                            }
                            </Carousel>
                        <h1>{this.state.car.heading}</h1>
                            <table className="table table-striped">
                                <tbody>
                                    <tr>
                                    <th scope="row"></th>
                                    <td>Price:</td>
                                    <td>Rs.{Number(this.state.car.price)*70}</td>
                                    </tr>
                                    <tr>
                                    <th scope="row"></th>
                                    <td>Miles:</td>
                                    <td>{this.state.car.miles}</td>
                                    </tr>
                                    <tr>
                                    <th scope="row"></th>
                                    <td>Interior Color:</td>
                                    <td>{this.state.car.interior_color}</td>
                                    </tr>
                                    <tr>
                                    <th scope="row"></th>
                                    <td>Exterior Color:</td>
                                    <td>{this.state.car.exterior_color}</td>
                                    </tr>
                                    <tr>
                                    <th scope="row"></th>
                                    <td>Year:</td>
                                    <td>{this.state.car.build.year}</td>
                                    </tr>
                                    <tr>
                                    <th scope="row"></th>
                                    <td>Make:</td>
                                    <td>{this.state.car.build.make}</td>
                                    </tr>
                                    <tr>
                                    <th scope="row"></th>
                                    <td>Model:</td>
                                    <td>{this.state.car.build.model}</td>
                                    </tr>
                                    <tr>
                                    <th scope="row"></th>
                                    <td>Body Type:</td>
                                    <td>{this.state.car.build.body_type}</td>
                                    </tr>
                                    <tr>
                                    <th scope="row"></th>
                                    <td>Transmission:</td>
                                    <td>{this.state.car.build.transmission}</td>
                                    </tr>
                                    <tr>
                                    <th scope="row"></th>
                                    <td>Engine:</td>
                                    <td>{this.state.car.build.engine}</td>
                                    </tr>
                                    <tr>
                                    <th scope="row"></th>
                                    <td>Fuel Type:</td>
                                    <td>{this.state.car.build.fuel_type}</td>
                                    </tr>
                                    <tr>
                                    <th scope="row"></th>
                                    <td>Doors:</td>
                                    <td>{this.state.car.build.doors}</td>
                                    </tr>
                                    <tr>
                                    <th scope="row"></th>
                                    <td>Cylinders:</td>
                                    <td>{this.state.car.build.cylinders}</td>
                                    </tr>
                                    <tr>
                                    <th scope="row"></th>
                                    <td>Made In:</td>
                                    <td>{this.state.car.build.made_in}</td>
                                    </tr>
                                    <tr>
                                    <th scope="row"></th>
                                    <td>Height:</td>
                                    <td>{this.state.car.build.overall_height}</td>
                                    </tr>
                                    <tr>
                                    <th scope="row"></th>
                                    <td>Width:</td>
                                    <td>{this.state.car.build.overall_width}</td>
                                    </tr>
                                    <tr>
                                    <th scope="row"></th>
                                    <td>Seating Capacity:</td>
                                    <td>{this.state.car.build.std_seating}</td>
                                    </tr>
                                </tbody>
                                </table>
                        </div>
            </div>
        )
    }
}
export default UsedModal;