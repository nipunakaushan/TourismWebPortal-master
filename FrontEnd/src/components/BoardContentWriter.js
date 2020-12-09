import React, {useEffect,useState, useRef} from 'react';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Toast from 'react-bootstrap/Toast';
import Table from 'react-bootstrap/Table';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import TextArea from 'react-validation/build/textarea';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import Select from 'react-validation/build/select';
import CheckButton from 'react-validation/build/button';
import UserService from '../services/user.service';
import AuthService from '../services/auth.service';

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
                        <Modal.Title>Edit tour details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                    <Form onSubmit={handleRegisterEdit} ref={form}>
                    <div>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
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
                        <label htmlFor="summary">Summary</label>
                        <TextArea 
                            className="form-control"
                            name="summary"
                            value={summary}
                            onChange={onChangeSummary}
                            validations={[required,validSummary]}
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
                        <label htmlFor="price">Price in US dollars</label>
                        <Input
                            type="text"
                            className="form-control"
                            name="price"
                            value={price}
                            onChange={onChangePrice}
                            validations={[required]}  
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="size">Maximum Group Size</label>
                        <Input
                            type="text"
                            className="form-control"
                            name="size"
                            value={maxGroupSize}
                            onChange={onChangeGroupSize}
                            validations={[required]}  
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="duration">Duration in days</label>
                        <Input
                            type="text"
                            className="form-control"
                            name="duration"
                            value={duration}
                            onChange={onChangeDuration}
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
                        tourHandleDelete,
                    }) => {
    return (
        <div style={{marginTop: '10px'}} className="container-fluid">
            <Tabs defaultActiveKey="home" id="uncontrolled-tab-example">
                <Tab eventKey="home" title="Tours Details">
                <Row>
            <Col md={12}>

                <Button style={{marginTop: '20px'}} onClick={handleShow}>Add Tour</Button>
                <Toast style={{ float: 'right', backgroundColor: 'green', color: '#ffff'}} show={showToast} delay={3000} autohide animation>
                        <Toast.Body>Tour added successfully!</Toast.Body>
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
                        <Modal.Title>Add tour details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                    <Form onSubmit={handleRegister} ref={form}>
                    <div>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
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
                        <label htmlFor="cover">Select a cover photo</label>
                        <Input
                            type="file"
                            name="cover"
                            onChange={onChangeCoverPhoto}
                            validations={[required]}  
                        />
                    </div>
                    <div>
                    <Input type="button" value="Upload" onClick={handleUploadSingle} />
                        {handleResponse && <p className={handleResponse.isSuccess ? "success" : "error"}>{handleResponse.message}</p>}
                
                        <p className="title" style={{ marginTop: 30 }}>Uploaded Image:</p>
                        {imageUrl && <img src={imageUrl} alt="Uploaded File" height="100" width="100" />}
                    </div>
                    <div className="form-group">
                        <label htmlFor="summary">Summary</label>
                        <TextArea 
                            className="form-control"
                            name="summary"
                            value={summary}
                            onChange={onChangeSummary}
                            validations={[required,validSummary]}
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
                        <label htmlFor="difficulty">Select difficulty</label>
                        <Select className="form-control" onChange={onChangeDifficulty}>
                            <option>Select a difficulty level</option>
                            <option value="easy">Easy</option>
                            <option value="medium">Medium</option>
                            <option value="difficult">Difficult</option>
                        </Select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="price">Price in US dollars</label>
                        <Input
                            type="text"
                            className="form-control"
                            name="price"
                            value={price}
                            onChange={onChangePrice}
                            validations={[required]}  
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="size">Maximum Group Size</label>
                        <Input
                            type="text"
                            className="form-control"
                            name="size"
                            value={maxGroupSize}
                            onChange={onChangeGroupSize}
                            validations={[required]}  
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="duration">Duration in days</label>
                        <Input
                            type="text"
                            className="form-control"
                            name="duration"
                            value={duration}
                            onChange={onChangeDuration}
                            validations={[required]}  
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="photos">Add 3 images</label>
                        <Input
                            type="file"
                            multiple
                            name="photos"
                            onChange={onChangePhotos}
                            validations={[required]} 
                        />
                    </div>
                    <div style={{marginBottom: '30px'}}>
                    <Input type="button" value="Upload" onClick={handleUploadMultiple} />
                        {handleResponsePhoto && <p className={handleResponsePhoto.isSuccess ? "success" : "error"}>{handleResponsePhoto.message}</p>}
                
                        <p className="title" style={{ marginTop: 30 }}>Uploaded Image:</p>
                        {imageUrlPhotos1 && <img style={{ marginRight: 30 }} src={imageUrlPhotos1} alt="Uploaded File" height="100" width="100" />}
                        {imageUrlPhotos2 && <img style={{ marginRight: 30 }} src={imageUrlPhotos2} alt="Uploaded File" height="100" width="100" />}
                        {imageUrlPhotos3 && <img src={imageUrlPhotos3} alt="Uploaded File" height="100" width="100" />}
                    </div>

                    <div className="form-group">
                        <button className="btn btn-primary btn-block">Add Tour</button>
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
                <h3 style={{marginTop:'20px'}}>Tours Table</h3>
                <Table style={{marginTop: '10px'}} striped bordered hover>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Summary</th>
                            <th>Description</th>
                            <th>Price in US dollars</th>
                            <th>Duration in days</th>
                            <th>Maximum Group Size</th>
                            <th>Difficulty</th>
                            <th style={{textAlign: "center"}}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allData.length !==0 && 
                        allData.map((data,i)=>{
                           return (
                                <tr key={i}>
                                    <td>{data.name}</td>
                                    <td>{data.summary}</td>
                                    <td>{data.description}</td>
                                    <td>{data.price}</td>
                                    <td>{data.duration}</td>
                                    <td>{data.maxGroupSize}</td>
                                    <td>{data.difficulty}</td>
                                    <td>
                                        <button onClick={() => contentEditHandler(data._id,data.name,data.summary,data.description,data.price,data.duration,data.maxGroupSize)}  className="btn btn-primary" style={{marginRight: '10px', paddingLeft: '20px', paddingRight: '20px', marginBottom: '10px'}}>Edit</button>
                                        <button onClick={() => tourHandleDelete(data._id)}  className="btn btn-danger">Delete</button>
                                    </td>
                                    
                                   
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
    const [allData, setAllData] = useState("");

    useEffect(() => {
        const user = AuthService.getCurrentUser();

        if(user){
            TourService.getAllTours().then((response) => {
                setAllData(response.data.data.tours);
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
        setName("");
        setSummary("");
        setDescription("");
        setPrice("");
        setDuration("");
        setMaxGroupSize("");
        setShow(false);
    }
    const handleShow = () => setShow(true);
    const handleCloseEdit = () => {
        setSelectedId("");
        setName("");
        setSummary("");
        setDescription("");
        setPrice("");
        setDuration("");
        setMaxGroupSize("");
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

    const contentEditHandler = (id,name,summary,description,price,duration,maxGroupSize) => {
        setSelectedId(id);
        setName(name);
        setSummary(summary);
        setDescription(description);
        setPrice(price);
        setDuration(duration);
        setMaxGroupSize(maxGroupSize);

        setShowEdit(true);
    }

    const handleRegister = (e) => {
        e.preventDefault();
        setMessage("");

        form.current.validateAll();

        if(checkBtn.current.context._errors.length === 0){
            TourService.addTour(name,summary,imageUrl,description,price,maxGroupSize,duration,difficulty,{images:[imageUrlPhotos1,imageUrlPhotos2,imageUrlPhotos3]}).then((response) => {
                TourService.getAllTours().then((response) => {
                    setAllData(response.data.data.tours);
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
            TourService.updateTour(selectedId,name,summary,description,price,maxGroupSize,duration).then((response) => {
                
                TourService.getAllTours().then((response) => {
                    setAllData(response.data.data.tours);
                    
                });

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

    const tourHandleDelete = (id) => {
            TourService.deleteTour(id).then((response) => {
                TourService.getAllTours().then((response) => {
                    setAllData(response.data.data.tours);
                    
                });
            })
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
                        tourHandleDelete={tourHandleDelete}

                       
                    /> 
                        : 
                        <Spinnerr />}
            </div>
        </div>
    );
};

export default BoardContentWriter;