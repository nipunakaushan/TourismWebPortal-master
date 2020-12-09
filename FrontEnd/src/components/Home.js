import React, {useEffect,useState} from 'react';
import { Link} from 'react-router-dom';
import axios from 'axios'; 
import Carousel from 'react-bootstrap/Carousel';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import ListGroup from 'react-bootstrap/ListGroup';
import Table from 'react-bootstrap/Table';
import ListGroupItem from 'react-bootstrap/ListGroupItem';

import Spinner from 'react-bootstrap/Spinner';
import AuthService from '../services/auth.service';
import VehicleService from '../services/vehicle.service';
import LocationService from '../services/location.service';
import PackageService from '../services/package.service';
import UserService from '../services/user.service';

import MapLoader from './MapLoader';
import '../css/Home.css';
import TourService from '../services/tour.service';

import StripeCheckout from 'react-stripe-checkout';
import { toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

const Home = () => {
    const [content, setContent] = useState([]);
    const [loggedUser, setLoggedUser] = useState("");

    const [vehicles, setVehicles] = useState([]);
    const [locations, setLocations] = useState([]);
    const [packages, setPackages] = useState([]);
    const [drivers, setDrivers] = useState([]);

    const [selectedVehicleId,setSelectedVehicleId] = useState("");
    const [cancelVehicle,setCancelVehicle] = useState(false);

    const [selectedDriverId,setSelectedDriverId] = useState("");
    const [cancelDriver,setCancelDriver] = useState(false);



    useEffect(() => {
        const loggedUser = AuthService.getCurrentUser();
        setLoggedUser(loggedUser);
        UserService.getDrivers().then((response) => {
            setDrivers(response.data.data);
        },(error) => {
            const _content = (error.response && error.response.data) || error.message || error.toString();

            setDrivers(_content);
        });
        PackageService.getAllPackages().then((response) => {
            setPackages(response.data.data);
        },(error) => {
            const _content = (error.response && error.response.data) || error.message || error.toString();

            setPackages(_content);
        });
        LocationService.getAllLocations().then((response) => {
            setLocations(response.data.data);
        },(error) => {
            const _content = (error.response && error.response.data) || error.message || error.toString();

            setLocations(_content);
        });
        VehicleService.getAllVehicles().then((response) => {
            setVehicles(response.data.data);
        },(error) => {
            const _content = (error.response && error.response.data) || error.message || error.toString();

            setVehicles(_content);
        });
        TourService.getAllTours().then((response) => {
            setContent(response.data);
        },(error) => {
            const _content = (error.response && error.response.data) || error.message || error.toString();

            setContent(_content);
        }
        );
    },[]);

    async function handleToken(customerId,customerName,amount,paymentFor) {
        const response = await axios.post('http://localhost:8080/api/v1/payments/', {customerId,customerName,amount,paymentFor});
        const {status} = response.data;
console.log(status);
        if(status === 'Success'){
            toast('Payment is Successful!', {type: 'success'});
        };
        
    };

    const selectVehicleHandler = (id) => {
        setSelectedVehicleId(id);
        setCancelVehicle(true);
    }

    const cancelVehicleHandler = () => {
        setSelectedVehicleId("");
        setCancelVehicle(false);
    }

    const selectDriverHandler = async (id) => {
        const response = await UserService.selectedDriver(id);
        const {status, message} = response.data;
        if(status === 'success'){
            toast(`${message}`, {type: 'success'});
        };
        setSelectedDriverId(id);
        setCancelDriver(true);
    }

    const cancelDriverHandler = async (id) => {
        const response = await UserService.canceldriver(id);
        const {status, message} = response.data;
        if(status === 'success'){
            toast(`${message}`, {type: 'success'});
        };
        setSelectedDriverId("");
        setCancelDriver(false);
    }
    return (
        <> 
        <div style={{maxWidth: '100%', padding: 0}} className="container-fluid">
            <Carousel>
                <Carousel.Item>
                    <img
                    style={{height: '650px'}}
                        className="d-block w-100"
                        src="sigiriya.jpg?text=First slide&bg=373940"
                        alt="First slide"
                    />
                    <Carousel.Caption>
                    <h3>Sigiriya Tour</h3>
                    <p>Best tour of month August, with highest quality</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                        style={{height: '650px'}}
                        className="d-block w-100"
                        src="nine_arches_bridge_ella.jpg?text=Second slide&bg=282c34"
                        alt="Second slide"
                    />

                    <Carousel.Caption>
                    <h3>Ella Tour</h3>
                    <p>Elite up country package of the season, we offer you well</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img
                    style={{height: '650px'}}
                        className="d-block w-100"
                        src="mirissa_beach.jpg?text=Third slide&bg=20232a"
                        alt="Third slide"
                    />

                    <Carousel.Caption>
                    <h3>Beach and Surfing Tour</h3>
                    <p>Mirissa is for surfing, with best secure package</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
        </div>      
        <div style={{marginTop: '20px'}} className="container-fluid">
        <Tabs defaultActiveKey="home" id="uncontrolled-tab-example">
            <Tab eventKey="home" title="Tours We Offer">
            <header className="jumbotron">
                <h3>Tours We Offer</h3>
            
            <Container>
            <Row>
                {content !== [] && content.data && content.data.tours.length !== 0? 
                    content.data.tours.map((tourData, index) => {
                        return (
                         
                            <Col key={index}>
                                <Card className="cards" style={{ width: '18rem', padding: 0 }}>
                                <Card.Img style={{minHeight: '190px'}} variant="top" src={`${tourData.imageCover}`} />
                                <Card.Body>
                                    <Card.Title>{tourData.name}</Card.Title>
                                    <Card.Text style={{fontSize: '13px'}}>
                                        {tourData.summary}
                                    </Card.Text>
                                    {loggedUser && loggedUser.data ? 
                                    <Link to={`/tourDetails/${tourData._id}`}>
                                        <Button variant="primary">More Details</Button>
                                    </Link> : 
                                    <Link to={"/register"}>
                                        <Button variant="primary">More Details</Button>
                                    </Link>
                                        
                                    }
                                    
                                </Card.Body>
                                </Card>
                            </Col>
                           
                        );
                    }) 
                    :
                     (
                        <div>
                               <div className="tour-details">
                                    <Spinner animation="border" role="status" />
                                    <h3>Loading...</h3>
                               </div>
                        </div>
                    )
                } 
            </Row>
            </Container>
            </header>
            </Tab>
            <Tab eventKey="profile" title="Vehicles We Have">
            <header className="jumbotron">
                <h3>Vehicles We Have</h3>
            
            <Container>
            <Row>
                {vehicles && vehicles.length !== 0? 
                    vehicles.map((vehicle, index) => {
                        return (
                         
                            


                            <Col key={index}>
                                <Card className="cards" style={{ width: '18rem', padding: 0 }}>
                                    <Card.Img style={{minHeight: '190px'}} variant="top" src={`${vehicle.photo}`} />
                                    <ListGroup className="list-group-flush">
                                                            <ListGroupItem>Vehicle Type: {vehicle.type}</ListGroupItem>
                                        <ListGroupItem>Registration No.: {vehicle.regNo}</ListGroupItem>
                                        <ListGroupItem>Maximum Milage: {vehicle.range}</ListGroupItem>
                                        <ListGroupItem>
                                        {loggedUser && loggedUser.data ? 
                                    <Link>
                                    {selectedVehicleId === vehicle._id && cancelVehicle ? 
                                        <Button onClick={cancelVehicleHandler} variant="secondary">Cancel</Button>
                                        :
                                        <Button onClick={() => selectVehicleHandler(vehicle._id)} variant="primary">Select This Vehicle</Button>

                                    }
                                    </Link> : 
                                    <Link to={"/register"}>
                                        <Button variant="primary">Select This</Button>
                                    </Link>
                                        
                                    }
                                    </ListGroupItem>
                                    </ListGroup>

                                </Card>

                            </Col>
                           
                        );
                    }) 
                    :
                     (
                        <div>
                               <div className="tour-details">
                                    <Spinner animation="border" role="status" />
                                    <h3>Loading...</h3>
                               </div>
                        </div>
                    )
                } 
            </Row>
            </Container>
            </header>
            </Tab>
            <Tab eventKey="locations" title="Favourite locations from our guides">
                {locations.length !== 0 ?
                    
                        <MapLoader locations={locations} />
                    
                    :
                    (
                        <div>
                               <div className="tour-details">
                                    <Spinner animation="border" role="status" />
                                    <h3>Loading...</h3>
                               </div>
                        </div>
                    )
                }
            </Tab>
            <Tab eventKey="packages" title="VIP Packages We Have">
            <header className="jumbotron">
                <h3>VIP Packages We Have</h3>
            
            <Container>
            <Row>
                <Table style={{marginTop: '10px'}} striped bordered hover>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Price in US dollars</th>
                            <th>Includes</th>
                            {loggedUser && <th style={{textAlign: "center"}}>Actions</th> }
                        </tr>
                    </thead>
                    <tbody>
                        {packages && packages.length !==0 ?
                        packages.map((data,i)=>{
                           return (
                                <tr key={i}>
                                    <td>{data.name}</td>
                                    <td>{data.description}</td>
                                    <td>{data.price}</td>
                                    <td>{data.includes}</td>
                                   {loggedUser && 
                                        <td style={{textAlign: 'center'}}>
                                            <StripeCheckout 
                                                stripeKey="pk_test_51HU7tXKTGqXjPG5SzufDFvnRv777rDJXMsoqCEYQfeES1rjSGBxm0xIBtQ8agJYsunwnjv2MpVJ9nt6QpTtKYASp00uPuI2q3S" 
                                                token={()=>handleToken(loggedUser.data.user._id,loggedUser.data.user.name,data.price, 'package')}
                                                amount={data.price * 100}
                                                name={data.name}
                                            >
                                            <button  className="btn btn-primary" style={{marginRight: '10px', paddingLeft: '20px', paddingRight: '20px'}}>Get Package</button>
                                            </StripeCheckout>
                                        
                                        
                                        </td> 
                                    } 
                                    
                                   
                                </tr>
                                );
                        })
                        :
                     (
                        <div>
                               <div className="tour-details">
                                    <Spinner animation="border" role="status" />
                                    <h3>Loading...</h3>
                               </div>
                        </div>
                    )
                        }
                        
                    </tbody>
                </Table>
                    
                
            </Row>
            </Container>
            </header>
            </Tab>

            {/* .......... */}
            <Tab eventKey="drivers" title="Drivers We Have">
            <header className="jumbotron">
                <h3>Drivers We Have</h3>
            
            <Container>
            <Row>
                <Table style={{marginTop: '10px'}} striped bordered hover>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>NIC</th>
                            <th>Telephone No.</th>
                            {loggedUser && <th style={{textAlign: "center"}}>Actions</th> }
                        </tr>
                    </thead>
                    <tbody>
                        {drivers && drivers.length !==0 ?
                        drivers.map((data, i)=>{
                           return (
                                <tr key={i}>
                                    <td>{data.name}</td>
                                    <td>{data.nic}</td>
                                    <td>{data.telNo}</td>

                                   {loggedUser && 
                                        <td style={{textAlign: 'center'}}>
                                            {selectedDriverId === data._id && cancelDriver ? 
                                        <Button onClick={() => cancelDriverHandler(data._id)} variant="secondary">Cancel</Button>
                                        :
                                        <Button onClick={() => selectDriverHandler(data._id)} variant="primary">Select This Driver</Button>

                                    }
                                        
                                        
                                        </td> 
                                    } 
                                    
                                   
                                </tr>
                                );
                        })
                        :
                     (
                        <div>
                               <div className="tour-details">
                                    <Spinner animation="border" role="status" />
                                    <h3>Loading...</h3>
                               </div>
                        </div>
                    )
                        }
                        
                    </tbody>
                </Table>
                    
                
            </Row>
            </Container>
            </header>
            </Tab>
            {/* ............ */}

            <Tab eventKey="about" title="About Us">
                <div className="jumbotron">
                    <h2>Vision</h2>
                    <p>Our vision is to be a major part in tourism industry.</p>
                    <h2>Mission</h2>  
                    <p>Our mission is to provide best, quality and comfortable tours to you.</p>
                </div>
                
            </Tab>
            <Tab eventKey="contact" title="Contact Us">
            <div className="jumbotron">
                <h2>Contact No: 0112345678</h2>
            </div>
               
            </Tab>
        </Tabs>
             
        </div>
        </>
    );
};

export default Home;
