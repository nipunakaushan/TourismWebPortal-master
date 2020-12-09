import React,{useEffect,useState,useRef} from 'react';
import Input from 'react-validation/build/input';
import Form from 'react-validation/build/form';
import Table from 'react-bootstrap/Table';
import CheckButton from 'react-validation/build/button';
import { format } from 'date-fns';
import AuthService from '../services/auth.service';
import UserService from '../services/user.service';
import PaymentService from '../services/payment.service';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Packages from './Packages';
import reportGenerator from './reportGenerator';

const YearField = ({
    onChangeYear,
    required,
    year,
    handleSubmitReportYear,
    form,
    checkBtn
}) => {
    return (
        <>
        <Form onSubmit={handleSubmitReportYear} ref={form}>
            <div className="form-group">
                <label htmlFor="year">Enter Report Year</label>
                <Input 
                    type="text"
                    className="form-control"
                    name="year"
                    value={year}
                    onChange={onChangeYear}
                    validations={[required]}
                />
            </div>
            <div className="form-group">
                <button className="btn btn-primary btn-block">Submit</button>
            </div>
            <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
        </>
    )
}



const BoardAccountant = () => {
    const yearNow = format(Date.now(),"yyyy");
    
    const checkBtn = useRef();
    const form = useRef();

    const [content, setContent] = useState("");
    const [monthlyTypePayments, setMonthlyTypePayments] = useState([]);
    const [filteredTypePayments,setFilteredTypePayments] = useState([]);
    
    const [monthlyPaymentPayments, setMonthlyPaymentPayments] = useState([]);
    const [filteredPaymentPayments,setFilteredPaymentPayments] = useState([]);

    const [reportType, setReportType] = useState(true);
    const [reportPayment, setReportPayment] = useState(true);
    
    const [year,setYear] = useState(yearNow);
    useEffect(() => {
        const loggedUser = AuthService.getCurrentUser();
       

        if(loggedUser){
            PaymentService.getMonthlyTypeReport().then((response) => {
                setMonthlyTypePayments(response.data.data.payments);
                
            });
            PaymentService.getMonthlyPaymentReport().then((response) => {
                setMonthlyPaymentPayments(response.data.data.payments);
            });
            UserService.getUser(loggedUser.data.user._id).then((response) => {

                setContent(response.data);
                
            },
            (error) => {
                const _content = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    
                setContent(_content);
                    }
                );
            }
            setContent("User not found")
        
       
    },[]);

    const required = (value) => {
        if(!value){
            return (
                <div className="alert alert-danger" role="alert">
                    This field is required
                </div>
            );
        }
    };

    const onChangeYear = (e) => {
        const year = e.target.value;
        setYear(year);
    };

    const getMonth = (month) =>{
        switch(month){
            case 1: return "January"
            case 2: return "February"
            case 3: return "March"
            case 4: return "April"
            case 5: return "May"
            case 6: return "June"
            case 7: return "July"
            case 8: return "August"
            case 9: return "September"
            case 10: return "October"
            case 11: return "November"
            case 12: return "December"
            default: return null
        }
    }

    const handleSubmitReportYear = (e) => {
        e.preventDefault();

        const filteredMonthlyTypePayments = monthlyTypePayments ? monthlyTypePayments.filter(e => e.yearType.year === year * 1) : [];
        setFilteredTypePayments(filteredMonthlyTypePayments);
        setReportType(filteredMonthlyTypePayments.length !== 0 ? false : true);

        const filteredMonthlyPaymentPayments = monthlyPaymentPayments ? monthlyPaymentPayments.filter(e => e.yearMonth.year === year * 1) : [];
        setFilteredPaymentPayments(filteredMonthlyPaymentPayments);
        setReportPayment(filteredMonthlyPaymentPayments.length !== 0 ? false : true);
    }
    
    return (
        <div style={{marginTop: '10px'}} className="container-fluid">
            <Tabs defaultActiveKey="home" id="uncontrolled-tab-example">
                <Tab eventKey="home" title="Report Details">
                <Row>
            <Col md={12}>
           <YearField 
            onChangeYear={onChangeYear}
            required={required}
            year={year}
            handleSubmitReportYear={handleSubmitReportYear}
            form={form}
            checkBtn={checkBtn}
           />
           <div className="container">
            <div className="jumbotron">
               <h3>Package / Tour Payment History</h3>
               <div>
               <Table style={{marginTop: '30px'}} hover>
                    <thead>
                        <tr>
                            <th>Type</th>
                            <th>No. of Payments</th>
                            <th>Amount</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {filteredTypePayments.length !==0 ? 
                        filteredTypePayments.map((data,i)=>{
                           return (
                                <tr key={i}>
                                    <td>{data.yearType.type}</td>
                                    <td>{data.count}</td>
                                    <td>Rs. {data.totalAmount * 180}</td>
                                </tr>
                                );
                        })
                        
                        : 
                        <tr>
                            <td colSpan="3"><h2 style={{textAlign: 'center'}}>NO Data</h2></td>
                        </tr>
                        }
                        {filteredTypePayments.length !==0 &&
                            <tr>
                                <td colSpan="2"><h3 style={{textAlign: 'center'}}>Total</h3></td>
                                <td><strong>Rs. {filteredTypePayments.reduce((total,e) => total + e.totalAmount * 180 * 1,0)}</strong></td>
                            </tr>
                        }
                        
                        
                    </tbody>
                </Table>
               </div>
               </div>
                <button style={{marginBottom: 70,width: 200}} disabled={reportType} onClick={() => reportGenerator(filteredTypePayments,true)} className="btn btn-primary btn-block">Generate Pdf</button>
           </div>

           <div className="container">
            <div className="jumbotron">
               <h3>Monthly Payment History</h3>
               <div>
               <Table style={{marginTop: '30px'}} hover>
                    <thead>
                        <tr>
                            <th>Month</th>
                            <th>No. of Payments</th>
                            <th>Amount</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {filteredPaymentPayments.length !==0 ? 
                        filteredPaymentPayments.map((data,i)=>{
                           return (
                                <tr key={i}>
                                    <td>{getMonth(data.yearMonth.month)}</td>
                                    <td>{data.count}</td>
                                    <td>Rs. {data.totalAmount * 180}</td>
                                </tr>
                                );
                        })
                        
                        : 
                        <tr>
                            <td colSpan="3"><h2 style={{textAlign: 'center'}}>NO Data</h2></td>
                        </tr>
                        }
                        {filteredPaymentPayments.length !==0 &&
                            <tr>
                                <td colSpan="2"><h3 style={{textAlign: 'center'}}>Total</h3></td>
                                <td><strong>Rs. {filteredPaymentPayments.reduce((total,e) => total + e.totalAmount * 180 * 1,0)}</strong></td>
                            </tr>
                        }
                        
                        
                    </tbody>
                </Table>
               </div>
               </div>
               <button style={{marginBottom: 70,width: 200}} disabled={reportPayment} onClick={() => reportGenerator(filteredPaymentPayments,false)} className="btn btn-primary btn-block">Generate Pdf</button>
           </div>
           </Col>
           </Row>
           </Tab>
           <Tab eventKey="package" title="Packages Details">
           <Row>
            <Col md={12}>
                        <Packages />
            </Col>
            </Row>
           </Tab>
           </Tabs>
        </div>
    )
}

export default BoardAccountant;