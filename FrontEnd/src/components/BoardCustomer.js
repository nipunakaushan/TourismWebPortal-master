import React, {useEffect,useState, useRef} from 'react';
import {format} from 'date-fns';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Toast from 'react-bootstrap/Toast';
import Table from 'react-bootstrap/Table';
import TextArea from 'react-validation/build/textarea';
import Form from 'react-validation/build/form';
import CheckButton from 'react-validation/build/button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import UserService from '../services/user.service';
import AuthService from '../services/auth.service';
import ComplaintService from '../services/complaint.service';
import '../css/Home.css';


const EditModal = ({
    form,
    checkBtn,
    required,
    showModalEdit,
    handleCloseModalEdit,
    handleRegisterEdit,
    complaint,
    onChangeComplaint,
    validComplaint,
    message
}) => {
    return (
        <Modal style={{marginTop: '40px'}} show={showModalEdit} onHide={handleCloseModalEdit}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Complaint</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                    <Form onSubmit={handleRegisterEdit} ref={form}>
                    <div>
                    <div className="form-group">
                        <label htmlFor="complaint">Complaint</label>
                        <TextArea 
                            className="form-control"
                            name="complaint"
                            value={complaint}
                            onChange={onChangeComplaint}
                            validations={[required,validComplaint]}
                        />
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary btn-block">Save</button>
                    </div>
                  
                </div>
                {message !== "" && (
                        <div className="form-group">
                            <div className="alert alert-danger" role="alert">
                                Error in saving complaint! Try again later
                            </div>
                        </div>
                    )}
             <CheckButton style={{ display: "none" }} ref={checkBtn} />
             </Form>

                    </Modal.Body>

                    
                </Modal>
    );
}



const ContentData = ({
    showModal,
    handleCloseModal,
    handleRegister,
    form,
    checkBtn,
    complaint,
    onChangeComplaint,
    required,
    validComplaint,
    handleShow,
    showToast,
    message,
    complaintHistoryData,
    contentEditHandlerPackage,
    handleDeletePackage,
    showModalEdit,
    handleCloseModalEdit,
    handleRegisterEdit,
    showToastEdit,
    showToastDelete,
}) => {
    return (
        <div style={{marginTop: '10px'}} className="container-fluid">
        <Row>
            <Col md={12}>

                <Button onClick={handleShow}>Submit a complaint</Button>
                <Toast style={{ float: 'right', backgroundColor: 'green', color: '#ffff'}} show={showToast} delay={3000} autohide animation>
                        <Toast.Body>Complaint submitted successfully!</Toast.Body>
                </Toast>
                <Toast style={{ float: 'right', backgroundColor: 'green', color: '#ffff'}} show={showToastEdit} delay={3000} autohide animation>
                        <Toast.Body>Complaint saved successfully!</Toast.Body>
                </Toast>
                <Toast style={{ float: 'right', backgroundColor: 'green', color: '#ffff'}} show={showToastDelete} delay={3000} autohide animation>
                        <Toast.Body>Complaint deleted successfully!</Toast.Body>
                </Toast>
        <Modal style={{marginTop: '40px'}} show={showModal} onHide={handleCloseModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Complaint</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                    <Form onSubmit={handleRegister} ref={form}>
                    <div>
                    <div className="form-group">
                        <label htmlFor="complaint">Complaint</label>
                        <TextArea 
                            className="form-control"
                            name="complaint"
                            value={complaint}
                            onChange={onChangeComplaint}
                            validations={[required,validComplaint]}
                        />
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary btn-block">Submit</button>
                    </div>
                  
                </div>
                {message !== "" && (
                        <div className="form-group">
                            <div className="alert alert-danger" role="alert">
                                Error in submitting complaint! Try again later
                            </div>
                        </div>
                    )}
             <CheckButton style={{ display: "none" }} ref={checkBtn} />
             </Form>

                    </Modal.Body>

                    
                </Modal>
                
                <EditModal 
                    form={form}
                    checkBtn={checkBtn}
                    complaint={complaint}
                    onChangeComplaint={onChangeComplaint}
                    required={required}
                    validComplaint={validComplaint}
                    showModalEdit={showModalEdit}
                    handleCloseModalEdit={handleCloseModalEdit}
                    handleRegisterEdit={handleRegisterEdit}
                    message={message}
                />

                <h3 style={{marginTop:'20px'}}>My Complaint History</h3>
                <Table style={{marginTop: '10px'}} striped bordered hover>
                    <thead>
                        <tr>
                            <th>Date/Time</th>
                            <th>Complaint</th>
                            <th>Response</th>
                            <th>Status</th>
                            <th style={{textAlign: "center"}}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {complaintHistoryData.length !==0 && 
                        complaintHistoryData.map((data)=>{
                           return (
                                <tr>
                                    <td>{format(new Date(data.complaintDate), "yyyy-MM-dd HH:mm aaaa")}</td>
                                    <td>{data.complaint}</td>
                                    <td>{data.response}</td>
                                    <td>{data.status}</td>
                                    <td style={{textAlign: 'center'}}>
                                        <button onClick={() => contentEditHandlerPackage(data._id,data.complaint)}  className="btn btn-primary" style={{marginRight: '10px', paddingLeft: '20px', paddingRight: '20px'}}>Edit</button>
                                        <button onClick={() => handleDeletePackage(data._id)}  className="btn btn-danger">Delete</button>
                                    </td>
                                    
                                   
                                </tr>
                                );
                        })
                        }
                        
                    </tbody>
                </Table>
                
                </Col>
                </Row>
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

const BoardCustomer = () => {
    const form = useRef();
    const checkBtn = useRef();

    const [content, setContent] = useState("");

    const [showModal, setShowModal] = useState(false);
    const [showModalEdit, setShowModalEdit] = useState(false);

    const [complaint, setComplaint] = useState("");
    const [showToast, setShowToast] = useState(false);
    const [showToastEdit, setShowToastEdit] = useState(false);
    const [showToastDelete, setShowToastDelete] = useState(false);

    const [message, setMessage] = useState("");
    const [complaintHistoryData, setComplaintHistoryData] = useState("");

    const [selectedId, setSelectedId] = useState("");

    useEffect(() => {
        const user = AuthService.getCurrentUser();

        if(user){
            ComplaintService.getComplaintDetails(user.data.user._id).then((response) => {
                setComplaintHistoryData(response.data.data);
            });
        UserService.getUser(user.data.user._id).then((response) => {
            setContent(response.data.data);
            console.log(response.data);
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

    const validComplaint = (value) => {
        if(value.length < 5){
            return (
                <div className="alert alert-danger" role="alert">
                    The complaint must be larger than 5 characters
                </div>
            );
        }
    };

    const handleShow = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);
    const handleCloseModalEdit = () => {
        setComplaint("");
        setShowModalEdit(false);
    }

    const onChangeComplaint = (e) => {
        const complaint = e.target.value;
        setComplaint(complaint);
    }

    const clearToast = () => {
        setTimeout(() => setShowToast(false), 3000);
    }
    const clearToastEdit = () => {
        setTimeout(() => setShowToastEdit(false), 3000);
    }
    const clearToastDelete = () => {
        setTimeout(() => setShowToastDelete(false), 3000);
    }

    const handleRegister = (e) => {
        e.preventDefault();
        setMessage("");

        form.current.validateAll();

        if(checkBtn.current.context._errors.length === 0){
            ComplaintService.addComplaint(content._id,content.name,complaint).then((response) => {
                ComplaintService.getComplaintDetails(content._id).then((response) => {
                    setComplaintHistoryData(response.data.data);
                });

                setShowModal(false);
                setShowToast(true);
                clearToast();
            },(error) => {
                const resMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
                setMessage(resMessage);
            }
            );
        }
        
    }
    const contentEditHandlerPackage = (id,complaint) => {
        setShowModalEdit(true);
        setSelectedId(id);
        setComplaint(complaint);
    }

    const handleRegisterEdit = (e) => {
        e.preventDefault();
        setMessage("");

        form.current.validateAll();

        if(checkBtn.current.context._errors.length === 0){
            ComplaintService.updateComplaint(selectedId,complaint).then((response) => {
                ComplaintService.getComplaintDetails(content._id).then((response) => {
                    setComplaintHistoryData(response.data.data);
                });

                setShowModalEdit(false);
                setShowToastEdit(true);
                setComplaint("");
                clearToastEdit();
            },(error) => {
                const resMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
                setMessage(resMessage);
            }
            );
        }
    }

    const handleDeletePackage = async (id) => {
        await ComplaintService.deleteComplaint(id);
        ComplaintService.getComplaintDetails(content._id).then((response) => {
            setComplaintHistoryData(response.data.data);
        });

        setShowToastDelete(true);
        clearToastDelete();
    }

    return (
        <div className="container-fluid">
            <div>
                { content !== "User not found" && content ? 
                <ContentData
                    showModal={showModal}
                    handleCloseModal={handleCloseModal}
                    handleRegister={handleRegister}
                    form={form}
                    checkBtn={checkBtn}
                    complaint={complaint}
                    onChangeComplaint={onChangeComplaint}
                    required={required}
                    validComplaint={validComplaint}
                    handleShow={handleShow}
                    showToast={showToast}
                    message={message}
                    complaintHistoryData={complaintHistoryData}
                    contentEditHandlerPackage={contentEditHandlerPackage}
                    handleDeletePackage={handleDeletePackage}
                    showModalEdit={showModalEdit}
                    handleCloseModalEdit={handleCloseModalEdit}
                    handleRegisterEdit={handleRegisterEdit}
                    showToastEdit={showToastEdit}
                    showToastDelete={showToastDelete}
                  /> 
                : 
                <Spinnerr />
                }
            </div>
        </div>
    );
};

export default BoardCustomer;