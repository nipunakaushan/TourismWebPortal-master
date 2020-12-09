import React, {useEffect,useState, useRef} from 'react';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Toast from 'react-bootstrap/Toast';
import Table from 'react-bootstrap/Table';
import TextArea from 'react-validation/build/textarea';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import Select from 'react-validation/build/select';
import {isEmail, isMobilePhone} from 'validator';
import CheckButton from 'react-validation/build/button';
import UserService from '../services/user.service';
import AuthService from '../services/auth.service';
import LocationService from '../services/location.service';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import TourService from '../services/tour.service';
import '../css/Home.css';

const BASE_URL = "http://localhost:8080/";

const EditModal = ({
    showEdit,
    handleCloseEdit,
    form,
    checkBtn,
    handleRegisterEdit,
    name,
                        onChangeName,
                        vname,
                        required,
                       
                        summary,
                        onChangeSummary,
                        validSummary,
                        description,
                        onChangeDescription,
                        validDescription,
                       
                        price,
                        onChangePrice,
                        maxGroupSize,
                        onChangeGroupSize,
                        duration,
                        onChangeDuration,
                        message,

}) => {
    return (
        <Modal style={{marginTop: '40px'}} show={showEdit} onHide={handleCloseEdit}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Location Details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                    <Form onSubmit={handleRegisterEdit} ref={form}>
                    <div>
                    <div className="form-group">
                        <label htmlFor="name">Name of the location</label>
                        <Input
                            type="text"
                            className="form-control"
                            name="name"
                            value={name}
                            onChange={onChangeName}
                            validations={[required,vname]}  
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <TextArea
                            className="form-control"
                            name="description"
                            value={description}
                            onChange={onChangeDescription}
                            validations={[required,validDescription]}  
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="latitudes">Latitudes</label>
                        <Input
                            type="text"
                            className="form-control"
                            name="latitudes"
                            value={maxGroupSize}
                            onChange={onChangeGroupSize}
                            validations={[required]}  
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="Longitudes">Longitudes</label>
                        <Input
                            type="text"
                            className="form-control"
                            name="Longitudes"
                            value={price}
                            onChange={onChangePrice}
                            validations={[required]}  
                        />
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary btn-block">Save</button>
                    </div>
                  
                </div>
                {message !== "" && (
                        <div className="form-group">
                            <div className="alert alert-danger" role="alert">
                                Error in adding user! Try again later
                            </div>
                        </div>
                    )}
             <CheckButton style={{ display: "none" }} ref={checkBtn} />
             </Form>

                    </Modal.Body>

                    
                </Modal>
    )
}


const ContentData = ({
                        checkBtn,
                        form,
                        handleShow,
                        show,
                        handleClose,
                        name,
                        onChangeName,
                        vname,
                        required,
                        onChangeCoverPhoto,
                        summary,
                        onChangeSummary,
                        validSummary,
                        description,
                        onChangeDescription,
                        validDescription,
                        onChangeDifficulty,
                        price,
                        onChangePrice,
                        maxGroupSize,
                        onChangeGroupSize,
                        duration,
                        onChangeDuration,
                        onChangePhotos,
                        handleUploadSingle,
                        handleResponse,
                        imageUrl,

                        handleUploadMultiple,
                        imageUrlPhotos1,
                        imageUrlPhotos2,
                        imageUrlPhotos3,
                        handleResponsePhoto,
                        message, 
                        handleRegister,
                        showToast,
                        allData,
                        contentEditHandler,
                        handleShowEdit,
                        showEdit,
                        handleCloseEdit,
                        handleRegisterEdit,
                        handleDeleteUser
                    }) => {
    return (
        <div style={{marginTop: '10px'}} className="container-fluid">
        <Row>
            <Col md={12}>

                <Button onClick={handleShow}>Add a Favourite Location</Button>
                <Toast style={{ float: 'right', backgroundColor: 'green', color: '#ffff'}} show={showToast} delay={3000} autohide animation>
                        <Toast.Body>Location added successfully!</Toast.Body>
                </Toast>
                
                    <EditModal 
                        handleShowEdit={handleShowEdit} 
                        showEdit={showEdit}
                        handleCloseEdit={handleCloseEdit}
                        handleRegisterEdit={handleRegisterEdit}
                        checkBtn={checkBtn}
                        form={form}
                        name={name}
                        onChangeName={onChangeName}
                        vname={vname}
                        required={required}
                       
                        summary={summary}
                        onChangeSummary={onChangeSummary}
                        validSummary={validSummary}
                        description={description}
                        onChangeDescription={onChangeDescription}
                        validDescription={validDescription}
                       
                        price={price}
                        onChangePrice={onChangePrice}
                        maxGroupSize={maxGroupSize}
                        onChangeGroupSize={onChangeGroupSize}
                        duration={duration}
                        onChangeDuration={onChangeDuration}
                        message={message}
                    />
                <Modal style={{marginTop: '40px'}} show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Location Details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                    <Form onSubmit={handleRegister} ref={form}>
                    <div>
                   
                        
                    <div className="form-group">
                        <label htmlFor="name">Name of the location</label>
                        <Input
                            type="text"
                            className="form-control"
                            name="name"
                            value={name}
                            onChange={onChangeName}
                            validations={[required,vname]}  
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <TextArea
                            className="form-control"
                            name="description"
                            value={description}
                            onChange={onChangeDescription}
                            validations={[required,validDescription]}  
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="latitudes">Latitudes</label>
                        <Input
                            type="text"
                            className="form-control"
                            name="latitudes"
                            value={maxGroupSize}
                            onChange={onChangeGroupSize}
                            validations={[required]}  
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="Longitudes">Longitudes</label>
                        <Input
                            type="text"
                            className="form-control"
                            name="Longitudes"
                            value={price}
                            onChange={onChangePrice}
                            validations={[required]}  
                        />
                    </div>

                    <div className="form-group">
                        <button className="btn btn-primary btn-block">Add Location</button>
                    </div>
                  
                </div>
                {message !== "" && (
                        <div className="form-group">
                            <div className="alert alert-danger" role="alert">
                                Error in adding user! Try again later
                            </div>
                        </div>
                    )}
             <CheckButton style={{ display: "none" }} ref={checkBtn} />
             </Form>

                    </Modal.Body>

                    
                </Modal>
                <h3 style={{marginTop:'20px'}}>Favourite Locations Details Table</h3>
                <Table style={{marginTop: '10px'}} striped bordered hover>
                    <thead>
                        <tr>
                            <th>Name of the location</th>
                            <th>Description</th>
                            <th>Latitudes</th>
                            <th>Longitudes</th>
                            <th style={{textAlign: "center"}}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allData && allData.length !==0 && 
                        allData.map((data)=>{
                           return (
                                <tr>
                                    <td>{data.name}</td>
                                    <td>{data.description}</td>
                                    <td>{data.latitudes}</td>
                                    <td>{data.longitudes}</td>
                                    <td style={{textAlign: "center"}}>
                                        <button onClick={() => contentEditHandler(data._id,data.name,data.description,data.latitudes,data.longitudes)}  className="btn btn-primary" style={{marginRight: '10px', paddingLeft: '20px', paddingRight: '20px',marginBottom: '10px',marginRight: 'auto',}}>Edit</button>
                                        <button onClick={() => handleDeleteUser(data._id)} className="btn btn-danger">Delete</button>
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

const BoardDriver = () => {
    const form = useRef();
    const checkBtn = useRef();

    const [content, setContent] = useState("");
    const [show, setShow] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [selectedId, setSelectedId] = useState("");

    const [name, setName] = useState("");
    const [summary, setSummary] = useState("");
    const [description, setDescription] = useState("");
    const [difficulty, setDifficulty] = useState("");

    const [coverPhoto, setCoverPhoto] = useState("");
    const [handleResponse, setHandleResponse] = useState("");
    const [imageUrl, setImageUrl] = useState("");


    const [price, setPrice] = useState("");
    const [maxGroupSize, setMaxGroupSize] = useState("");
    const [duration, setDuration] = useState("");
    const [photos, setPhotos] = useState("");
    
    const [imageUrlPhotos1,setImageUrlPhotos1] = useState("");
    const [imageUrlPhotos2,setImageUrlPhotos2] = useState("");
    const [imageUrlPhotos3,setImageUrlPhotos3] = useState("");
    const [handleResponsePhoto, setHandleResponsePhoto] = useState("");
    const [message, setMessage] = useState("");

    const [showToast, setShowToast] = useState(false);
    const [allData, setAllData] = useState([]);

    



    useEffect(() => {
        const user = AuthService.getCurrentUser();

        if(user){
            LocationService.getAllLocations().then((response) => {
                setAllData(response.data.data);
            });
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

    const handleClose = () => {
        setDescription("");
        setPrice("");
        setMaxGroupSize("");
        setName("");
        setShow(false);
    }
    const handleShow = () => setShow(true);
    const handleCloseEdit = () => {
        setDescription("");
        setPrice("");
        setMaxGroupSize("");
        setName("");
        setShowEdit(false);
    
    }
    const handleShowEdit = () => setShowEdit(true);

    const required = (value) => {
        if(!value){
            return (
                <div className="alert alert-danger" role="alert">
                    This field is required
                </div>
            );
    
        }
    };

    const vname = (value) => {
        if(value.length < 3 || value.length > 80){
            return (
                <div className="alert alert-danger" role="alert">
                    The name must be between 3 and 80 characters
                </div>
            );
        }
    };

    const validSummary = (value) => {
        if(value.length < 3 || value.length > 200){
            return (
                <div className="alert alert-danger" role="alert">
                    The summary must be between 3 and 200 characters
                </div>
            );
        }
    };

    const validDescription = (value) => {
        if(value.length < 100){
            return (
                <div className="alert alert-danger" role="alert">
                    The description must be more than 100 characters
                </div>
            );
        }
    };

    const onChangeName = (e) => {
        const username = e.target.value;
        setName(username);
    };

    const onChangeCoverPhoto = (e) => {
        const coverPhoto = e.target.files[0];
        setCoverPhoto(coverPhoto);
    };

    const onChangeSummary = (e) => {
        const summary = e.target.value;
        setSummary(summary);
    };

    const onChangeDescription = (e) => {
        const description = e.target.value;
        setDescription(description);
    };

    const onChangeDifficulty = (e) => {
        const difficulty = e.target.value;
        setDifficulty(difficulty);
    };

    const onChangePrice = (e) => {
        const price = e.target.value;
        setPrice(price);
    };

    const onChangeGroupSize = (e) => {
        const maxGroupSize = e.target.value;
        setMaxGroupSize(maxGroupSize);
    };

    const onChangeDuration = (e) => {
        const duration = e.target.value;
        setDuration(duration);
    };

    const onChangePhotos = (e) => {
        const photos = e.target.files;
        setPhotos(photos);
    };

    const handleUploadSingle = async () => {
        if(coverPhoto === "") {
            setHandleResponse("Please select image to upload.");
            return false;
        }
        const formData = new FormData();
        formData.append('dataFile', coverPhoto, coverPhoto.name);
        const response = await TourService.uploadSinglePhoto(formData);
            if(response.data.status === 'fail'){
            setHandleResponse(response.data.message);
            }else{
            setHandleResponse(response.data.message);

            setImageUrl(BASE_URL + response.data.file.path);
            }

    }

    const handleUploadMultiple = async () => {
        if(photos.length === 0) {
            console.log('nooo');
            setHandleResponsePhoto("Please select image to upload.");
            return false;
        }
        const formData = new FormData();
        formData.append('dataFiles', photos[0]);
        formData.append('dataFiles', photos[1]);
        formData.append('dataFiles', photos[2]);
        const response = await TourService.uploadMultiplePhoto(formData);
            if(response.data.status === 'fail'){
            setHandleResponsePhoto(response.data.message);
            }else{
            setHandleResponsePhoto(response.data.message);
            setImageUrlPhotos1(BASE_URL + response.data.files[0].path);
            setImageUrlPhotos2(BASE_URL + response.data.files[1].path);
            setImageUrlPhotos3(BASE_URL + response.data.files[2].path);
            }

    }
    
    const clearToast = () => {
        setTimeout(() => setShowToast(false), 3000);
    }

    const contentEditHandler = (id,name,description,maxGroupSize,price) => {
        setSelectedId(id);
        setDescription(description);
        setPrice(price);
        setMaxGroupSize(maxGroupSize);
        setName(name);

        setShowEdit(true);
    }

    const handleRegister = (e) => {
        e.preventDefault();
        setMessage("");

        form.current.validateAll();

        if(checkBtn.current.context._errors.length === 0){
            LocationService.addLocation(name,description,maxGroupSize,price).then((response) => {
              
                LocationService.getAllLocations().then((response) => {
                    setAllData(response.data.data);
             
                });

                setShow(false);
                setShowToast(true);
                clearToast();
            },(error) => {
                const resMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
                setMessage(resMessage);
            }
            );
        }
    }

    const handleRegisterEdit = (e) => {
        e.preventDefault();
        setMessage("");

        form.current.validateAll();

        if(checkBtn.current.context._errors.length === 0){
            LocationService.updateLocation(selectedId,name,description,maxGroupSize,price).then((response) => {
               
                LocationService.getAllLocations().then((response) => {
                    setAllData(response.data.data);
                   
                });
                setDescription("");
                setPrice("");
                setName("");
                setMaxGroupSize("");

                setShowEdit(false);
                setShowToast(true);
                clearToast();
            },(error) => {
                const resMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
                setMessage(resMessage);
            }
            );
        }
    }

    const handleDeleteUser = (id) => {  
        LocationService.deleteLocation(id).then(()=>{
           
            LocationService.getAllLocations().then((response) => {
                setAllData(response.data.data);
            });
        }, (error) => {
            console.log(error);
        });

}

    return (
        <div className="container-fluid">
            <div>
                { content !== "User not found" && content.data ? 
                    <ContentData 
                        handleShow={handleShow} 
                        show={show}
                        handleClose={handleClose}
                        checkBtn={checkBtn}
                        form={form}
                        name={name}
                        onChangeName={onChangeName}
                        vname={vname}
                        required={required}
                        onChangeCoverPhoto={onChangeCoverPhoto}
                        summary={summary}
                        onChangeSummary={onChangeSummary}
                        validSummary={validSummary}
                        description={description}
                        onChangeDescription={onChangeDescription}
                        validDescription={validDescription}
                        onChangeDifficulty={onChangeDifficulty}
                        price={price}
                        onChangePrice={onChangePrice}
                        maxGroupSize={maxGroupSize}
                        onChangeGroupSize={onChangeGroupSize}
                        duration={duration}
                        onChangeDuration={onChangeDuration}
                        onChangePhotos={onChangePhotos}

                        handleUploadSingle={handleUploadSingle}
                        handleResponse={handleResponse}
                        imageUrl={imageUrl}
                        handleUploadMultiple={handleUploadMultiple}
                        imageUrlPhotos1={imageUrlPhotos1}
                        imageUrlPhotos2={imageUrlPhotos2}
                        imageUrlPhotos3={imageUrlPhotos3}
                        handleResponsePhoto={handleResponsePhoto}
                        message={message}
                        handleRegister={handleRegister}
                        showToast={showToast}
                        allData={allData} 

                        handleShowEdit={handleShowEdit} 
                        showEdit={showEdit}
                        handleCloseEdit={handleCloseEdit}
                        handleRegisterEdit={handleRegisterEdit}

                        contentEditHandler={contentEditHandler}
                        handleDeleteUser={handleDeleteUser}
                    /> 
                        : 
                        <Spinnerr />}
            </div>
        </div>
    );
};

export default BoardDriver;