import React, {useEffect,useState, useRef} from 'react';
import {format} from 'date-fns';
import Spinner from 'react-bootstrap/Spinner';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import UserService from '../services/user.service';
import AuthService from '../services/auth.service';
import PartService from '../services/part.service';
import Table from 'react-bootstrap/Table';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Employee from './Employee';
import '../css/Home.css';

const ContentData = ({parts}) => {
    return (
        <div style={{marginTop: '10px'}} className="container-fluid">
            <Tabs defaultActiveKey="employee" id="uncontrolled-tab-example">
    
                <Tab eventKey="employee" title="Employee Details">
                    <Row>
                        <Col md={12}>
                                <Employee />
                        </Col>
                    </Row>
                </Tab>
                <Tab eventKey="parts" title="Mechanic Part History">
                    <Row>
                        <Col md={12}>
                        <h3 style={{marginTop:'20px'}}>Replaced Parts Details Table</h3>
                <Table style={{marginTop: '10px'}} striped bordered hover>
                    <thead>
                        <tr>
                            <th>Mechanic Name</th>
                            <th>Vehicle Type</th>
                            <th>Name of the Part</th>
                            <th>Image of the Part</th>
                            <th>Amount of Cost(Rs.)</th>
                            <th>Repair Date / Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {parts && parts.length !==0 && 
                        parts.map((data, i)=>{
                           return (
                                <tr key={i}>
                                    <td>{data.mechanicName}</td>
                                    <td>{data.type}</td>
                                    <td>{data.name}</td>
                                    <td><img style={{width: 100}} src={`${data.image}`} /></td>
                                    <td>{data.cost}</td>
                                    <td>{format(new Date(data.repairDate), "yyyy-MM-dd HH:mm aaaa")}</td>
                                    {/* <td style={{textAlign: "center"}}>
                                        <button onClick={() => contentEditHandler(data._id,data.type,data.name,data.cost)}  className="btn btn-primary" style={{marginRight: '10px', paddingLeft: '20px', paddingRight: '20px'}}>Edit</button>
                                        <button onClick={() => handleDeleteUser(data._id)} className="btn btn-danger">Delete</button>
                                    </td> */}
                                </tr>
                                );
                        })
                        }
                        
                    </tbody>
                </Table>
                        </Col>
                    </Row>
                </Tab>
            </Tabs>
        
        </div>
    );
};

const Spinnerr = () => {
    return (
        <div className="jumbotron">
               <div className="tour-details">
                    <Spinner animation="border" role="status" />
                    <h3>Loading...</h3>
               </div>
        </div>
    );
};

const BoardContentWriter = () => {
    const [content, setContent] = useState("");
    const [parts, setParts] = useState([]);

    useEffect(() => {
        const user = AuthService.getCurrentUser();

        if(user){
        PartService.getAllParts().then((response) => {
            setParts(response.data.data)
        })
        
        UserService.getUser(user.data.user._id).then((response) => {
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





    return (
        <div className="container-fluid">
            <div>
                { content !== "User not found" && content.data ? 
                    <ContentData  parts={parts}/> 
                        : 
                    <Spinnerr />
                }
            </div>
        </div>
    );
};

export default BoardContentWriter;