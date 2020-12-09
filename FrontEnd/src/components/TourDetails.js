import React, {useEffect,useState} from 'react';
import StripeCheckout from 'react-stripe-checkout';
import TourService from '../services/tour.service';
import axios from 'axios';
import { toast} from 'react-toastify';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import ListGroup from 'react-bootstrap/ListGroup';
import AuthService from '../services/auth.service';
import 'react-toastify/dist/ReactToastify.css';
import '../css/Home.css';

toast.configure();

const TourDetails = () => {
    const [content, setContent] = useState("");
    const [currentUser, setCurrentUser] = useState("");

    useEffect(() => {
        const currentUser = AuthService.getCurrentUser();
        if(currentUser.data){
            setCurrentUser(currentUser.data.user);

        }
        TourService.getTourDetails(window.location.pathname.split('/')[2]).then((response) => {
            setContent(response.data.data);
        },(error) => {
            const _content = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

            setContent(_content);
        });
    }, []);

    async function handleToken(customerId,customerName,amount,paymentFor) {
        const response = await axios.post('http://localhost:8080/api/v1/payments/', {customerId,customerName,amount,paymentFor});
        const {status} = response.data;
        // console.log(response);
        if(status === 'Success'){
            toast('Payment is Successful!', {type: 'success'});
        };
        
    };

    const Tour = ({content}) => {
        if(content !=="" && content.tour){
            return (
                <>
                <div style={{backgroundImage: `url('${content.tour && content.tour.images?content.tour.images[0]:'/img/tours/parallax.jpg'}')`}} className="parallax">
                <div style={{ backgroundColor: 'transparent'}} className="jumbotron">
                   <div className="tour-details">
                        <h1>{content.tour.name}</h1>
                        <StripeCheckout 
                            stripeKey="pk_test_51HU7tXKTGqXjPG5SzufDFvnRv777rDJXMsoqCEYQfeES1rjSGBxm0xIBtQ8agJYsunwnjv2MpVJ9nt6QpTtKYASp00uPuI2q3S" 
                            token={()=>handleToken(currentUser._id,currentUser.name,content.tour.price, 'tour')}
                            amount={content.tour.price * 100}
                            name={content.tour.name}
                            >
                            <Button>Book Tour Now</Button>
                        </StripeCheckout>
                   </div>
                </div>
            </div>
            
                <div>
                   <div style={{padding: 0}} className="container-fluid">
                       <div style={{margin: 0}} className="jumbotron">
                            <h3 style={{marginBottom: '20px'}}>Description</h3>
                            <p>{content.tour.description}</p>
                            
                            <ListGroup style={{borderRadius: '20px'}} variant="flush">
                                <ListGroup.Item><img style={{width: '20px', marginRight: '10px'}} src="/img/pin.png" />{'   '}Difficulty:{' '}<strong>{content.tour.difficulty}</strong></ListGroup.Item>
                                <ListGroup.Item><img style={{width: '20px', marginRight: '10px'}} src="/img/pin.png" />{'   '}Duration:{' '}<strong>{content.tour.duration}{' '}days</strong></ListGroup.Item>
                                <ListGroup.Item><img style={{width: '20px', marginRight: '10px'}} src="/img/pin.png" />{'   '}Price:{' '}<strong>${content.tour.price}</strong></ListGroup.Item>
                                <ListGroup.Item><img style={{width: '20px', marginRight: '10px'}} src="/img/pin.png" />{'   '}Maximum Group Size:{' '}<strong>{content.tour.maxGroupSize}</strong></ListGroup.Item>
                            </ListGroup>
                            
                       </div>
                   </div>
                </div>

            <div style={{backgroundImage: `url('${content.tour && content.tour.images?content.tour.images[2]:'/img/tours/parallax.jpg'}')`}} className="parallax">
                <div style={{ backgroundColor: 'transparent'}} className="jumbotron">
                   <div className="tour-details">
                        <StripeCheckout 
                            stripeKey="pk_test_51HU7tXKTGqXjPG5SzufDFvnRv777rDJXMsoqCEYQfeES1rjSGBxm0xIBtQ8agJYsunwnjv2MpVJ9nt6QpTtKYASp00uPuI2q3S" 
                            token={()=>handleToken(currentUser._id,currentUser.name,content.tour.price, 'tour')}
                            amount={content.tour.price * 100}
                            name={content.tour.name}
                            >
                            <Button>Book Tour Now</Button>
                        </StripeCheckout>
                   </div>
                </div>
            </div>
            </>
            );
        }
        return (
            <div className="jumbotron">
                   <div className="tour-details">
                        <Spinner animation="border" role="status" />
                        <h3>Loading...</h3>
                   </div>
            </div>
        );
        
    };



    return (
        <div className="container-fluid" style={{padding: 0}}>
            <Tour content={content}/>
        </div>
    );
};

export default TourDetails;