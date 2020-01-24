import React,{Component} from 'react';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.css';
class NewModal extends Component
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
                <Button className="btn btn-danger d-flex" onClick={this.props.changeDealer}> GO BACK </Button>
                        <div className="container" style={{marginBottom:"30px",marginTop:"20px",backgroundColor:"white"}}>
                        <h1>{this.state.car.heading}</h1>
                            <table className="table table-striped">
                                <tbody>
                                    <tr>
                                    <th scope="row"></th>
                                    <td>Website:</td>
                                    <td>{this.state.car.dealer.website}</td>
                                    </tr>
                                    <tr>
                                    <th scope="row"></th>
                                    <td>Name:</td>
                                    <td>{this.state.car.dealer.name}</td>
                                    </tr>
                                    <tr>
                                    <th scope="row"></th>
                                    <td>Dealer Type</td>
                                    <td>{this.state.car.dealer.dealer_type}</td>
                                    </tr>
                                    <tr>
                                    <th scope="row"></th>
                                    <td>Address:</td>
                                    <td>{this.state.car.dealer.street},{this.state.car.dealer.city},{this.state.car.dealer.state},{this.state.car.dealer.country}</td>
                                    </tr>
                                    <tr>
                                    <th scope="row"></th>
                                    <td>Phone Number:</td>
                                    <td>{this.state.car.dealer.phone}</td>
                                    </tr>
                                </tbody>
                                </table>
                        </div>
            </div>
        )
    }
}
export default NewModal;