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
import {isEmail, isMobilePhone} from 'validator';
import CheckButton from 'react-validation/build/button';
import UserService from '../services/user.service';
import AuthService from '../services/auth.service';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import PackageService from '../services/package.service';
import TourService from '../services/tour.service';
import Employee from './Employee';
import '../css/Home.css';

const BASE_URL = "http://localhost:8080/";

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

                        showPackage,
                        handleClosePackage,
                        handleShowPackage,
                        handleRegisterPackage,
                        allPackagesData,
                        contentEditHandlerPackage,
                        handleDeletePackage,

                        showPackageEdit,
                        handleClosePackageEdit,
                        handleRegisterPackageEdit,
                    }) => {
    return (
        <div style={{marginTop: '10px'}} className="container-fluid">
            
                <Button onClick={handleShowPackage} style={{marginTop: '20px'}}>Add VIP Packages</Button>

                <Modal style={{marginTop: '40px'}} show={showPackage} onHide={handleClosePackage}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add package details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                    <Form onSubmit={handleRegisterPackage} ref={form}>
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
                        <label htmlFor="description">Description</label>
                        <TextArea 
                            className="form-control"
                            name="description"
                            value={description}
                            onChange={onChangeDescription}
                            validations={[required]}
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
                        <label htmlFor="includes">What includes</label>
                        <TextArea 
                            className="form-control"
                            name="includes"
                            value={summary}
                            onChange={onChangeSummary}
                            validations={[required]}
                        />
                    </div>
                    

                    <div className="form-group">
                        <button className="btn btn-primary btn-block">Add Package</button>
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
                <Modal style={{marginTop: '40px'}} show={showPackageEdit} onHide={handleClosePackageEdit}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit package details</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                    <Form onSubmit={handleRegisterPackageEdit} ref={form}>
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
                        <label htmlFor="description">Description</label>
                        <TextArea 
                            className="form-control"
                            name="description"
                            value={description}
                            onChange={onChangeDescription}
                            validations={[required]}
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
                        <label htmlFor="includes">What includes</label>
                        <TextArea 
                            className="form-control"
                            name="includes"
                            value={summary}
                            onChange={onChangeSummary}
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
                <h3 style={{marginTop:'20px'}}>Packages Detail Table</h3>
                <Table style={{marginTop: '10px'}} striped bordered hover>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Price in US dollars</th>
                            <th>Includes</th>
                            <th style={{textAlign: "center"}}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allPackagesData.length !==0 && 
                        allPackagesData.map((data,i)=>{
                           return (
                                <tr key={i}>
                                    <td>{data.name}</td>
                                    <td>{data.description}</td>
                                    <td>{data.price}</td>
                                    <td>{data.includes}</td>
                                    <td style={{textAlign: 'center'}}>
                                        <button onClick={() => contentEditHandlerPackage(data._id,data.name,data.description,data.price,data.includes)}  className="btn btn-primary" style={{marginRight: '10px', paddingLeft: '20px', paddingRight: '20px'}}>Edit</button>
                                        <button onClick={() => handleDeletePackage(data._id)}  className="btn btn-danger">Delete</button>
                                    </td>
                                    
                                   
                                </tr>
                                );
                        })
                        }
                        
                    </tbody>
                </Table>
        
        
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

const Packages = () => {
    const form = useRef();
    const checkBtn = useRef();

    // user states

    // user states

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

    const [showPackage, setShowPackage] = useState(false);
    const [allPackagesData,setAllPackagesData] = useState([]);

    const [showPackageEdit, setShowPackageEdit] = useState(false);
    const [selectedPackageId, setSelectedPackageId] = useState("");

    



    useEffect(() => {
        const user = AuthService.getCurrentUser();

        if(user){
            TourService.getAllTours().then((response) => {
                setAllData(response.data.data.tours);
            });
            PackageService.getAllPackages().then((response) => {
                setAllPackagesData(response.data.data);
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

    const handleClose = () => setShow(false);
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
    const handleClosePackage = () => {
        setName("");
        setDescription("");
        setPrice("");
        setSummary("");
        setShowPackage(false);
    }
    const handleShowPackage = () => setShowPackage(true);
    const handleClosePackageEdit = () => {
        setName("");
        setDescription("");
        setPrice("");
        setSummary("");
        setShowPackageEdit(false);
    }

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

    const handleRegisterPackage = (e) => {
        e.preventDefault();
        setMessage("");

        form.current.validateAll();

        if(checkBtn.current.context._errors.length === 0){
            PackageService.addPackage(name,description,price,summary).then((response) => {
               
                PackageService.getAllPackages().then((response) => {
                    setAllPackagesData(response.data.data);
                   
                });

                setShowPackage(false);

            },(error) => {
                const resMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
                setMessage(resMessage);
            }
            );
        }
    }

    const handleRegisterPackageEdit = (e) => {
        e.preventDefault();
        setMessage("");

        form.current.validateAll();

        if(checkBtn.current.context._errors.length === 0){
            PackageService.updatePackage(selectedPackageId,name,description,price,summary).then((response) => {
                
                PackageService.getAllPackages().then((response) => {
                    setAllPackagesData(response.data.data);
                    
                });

                setShowPackageEdit(false);
               
            },(error) => {
                const resMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
                setMessage(resMessage);
            }
            );
        }
    }


    const handleDeletePackage = (id) => {
        PackageService.deletePackage(id).then((response) => {
            PackageService.getAllPackages().then((response) => {
                setAllPackagesData(response.data.data);
                
            });
        })
    }

    const contentEditHandlerPackage = (id,name,description,price,includes) => {
        setSelectedPackageId(id);
        setName(name);
        setDescription(description);
        setPrice(price);
        setSummary(includes);

        setShowPackageEdit(true);
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

                        showPackage={showPackage}
                        handleClosePackage={handleClosePackage}
                        handleShowPackage={handleShowPackage}
                        handleRegisterPackage={handleRegisterPackage}
                        allPackagesData={allPackagesData}
                        contentEditHandlerPackage={contentEditHandlerPackage}
                        handleDeletePackage={handleDeletePackage}
                        showPackageEdit={showPackageEdit}
                        handleClosePackageEdit={handleClosePackageEdit}
                        handleRegisterPackageEdit={handleRegisterPackageEdit}
                    /> 
                        : 
                        <Spinnerr />}
            </div>
        </div>
    );
};

export default Packages;