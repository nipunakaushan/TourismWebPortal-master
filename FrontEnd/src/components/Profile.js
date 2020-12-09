import React, {useRef,useEffect,useState} from 'react';
import Image from 'react-bootstrap/Image';
import Spinner from 'react-bootstrap/Spinner';
import Modal from 'react-bootstrap/Modal';
import Toast from 'react-bootstrap/Toast';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import {isEmail, isMobilePhone} from 'validator';
import CheckButton from 'react-validation/build/button';
import UserService from '../services/user.service';
import AuthService from '../services/auth.service';
import '../css/Profile.css';

const EditModal = ({
    handleCloseEdit, 
    showEdit,
    onChangeNameEdit,
    onChangeEmailEdit,
    onChangeNicEdit,
    onChangeTelNoEdit,
    required,
    validEmailEdit,
    vTelNoEdit,
    vnameEdit,
    vNicEdit,
    form,
    checkBtn,
    nameEdit,
    emailEdit,
    nicEdit,
    telNoEdit,
    message,
    handleRegisterEdit,

}) => {
return (
<Modal style={{marginTop: '40px'}} show={showEdit} onHide={handleCloseEdit}>
    <Modal.Header closeButton>
        <Modal.Title>Edit My details</Modal.Title>
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
            value={nameEdit}
            onChange={onChangeNameEdit}
            validations={[required,vnameEdit]}  
        />
    </div>
    <div className="form-group">
        <label htmlFor="email">Email</label>
        <Input 
            type="text"
            className="form-control"
            name="email"
            value={emailEdit}
            onChange={onChangeEmailEdit}
            validations={[required,validEmailEdit]}
        />
    </div>
    <div className="form-group">
        <label htmlFor="telNo">Telephone No.</label>
        <Input
            type="text"
            className="form-control"
            name="telNo"
            value={telNoEdit}
            onChange={onChangeTelNoEdit}
            validations={[required,vTelNoEdit]}  
        />
    </div>
    <div className="form-group">
        <label htmlFor="nic">NIC</label>
        <Input
            type="text"
            className="form-control"
            name="nic"
            value={nicEdit}
            onChange={onChangeNicEdit}
            validations={[required,vNicEdit]}  
        />
    </div>

    <div className="form-group">
        <button className="btn btn-primary btn-block">Save Me</button>
    </div>

</div>
{message !== "Successfully registered, Welcome to NATOURS" && message !== "" && (
        <div className="form-group">
            <div className="alert alert-danger" role="alert">
                Error in saving user! Try again later
            </div>
        </div>
    )}
<CheckButton style={{ display: "none" }} ref={checkBtn} />
</Form>

    </Modal.Body> 
</Modal>
)
}

const PasswordChangeModal = ({
    curPass,
    onChangeCurPass,
    newPass,
    onChangeNewPass,
    confirmPass,
    onChangeConfirmPass,
    vpassword,
    vpasswordConfirm,
    required,
    form,
    checkBtn,
    showPasswordChange,
    handleCloseShowPassword,
    handleRegisterPassword,
    message

}) => {
    return (
        <Modal style={{marginTop: '40px'}} show={showPasswordChange} onHide={handleCloseShowPassword}>
    <Modal.Header closeButton>
        <Modal.Title>Set A New Password</Modal.Title>
    </Modal.Header>
    <Modal.Body>

    <Form onSubmit={handleRegisterPassword} ref={form}>
    <div>
    
    <div className="form-group">
        <label htmlFor="currentPassword">Current Password</label>
        <Input 
            type="text"
            className="form-control"
            name="currentPassword"
            value={curPass}
            onChange={onChangeCurPass}
            validations={[required]}
        />
    </div>
    <div className="form-group">
        <label htmlFor="newPassword">New Password</label>
        <Input
            type="text"
            className="form-control"
            name="newPassword"
            value={newPass}
            onChange={onChangeNewPass}
            validations={[required,vpassword]}  
        />
    </div>
    <div className="form-group">
        <label htmlFor="confirmPassword">Confirm New Password</label>
        <Input
            type="text"
            className="form-control"
            name="confirmPassword"
            value={confirmPass}
            onChange={onChangeConfirmPass}
            validations={[required,vpasswordConfirm]}  
        />
    </div>

    <div className="form-group">
        <button className="btn btn-primary btn-block">Set New Password</button>
    </div>
</div>
{message !== "Successfully registered, Welcome to NATOURS" && message !== "" && (
        <div className="form-group">
            <div className="alert alert-danger" role="alert">
                Error in saving user! Try again later
            </div>
        </div>
    )}
<CheckButton style={{ display: "none" }} ref={checkBtn} />
</Form>

    </Modal.Body> 
</Modal>
    )
}

const Profile = (props) => {
    const form = useRef();
    const checkBtn = useRef();
    const [currentUser, setCurrentUser] = useState("");
    const [message, setMessage] = useState("");


    const [showEdit, setShowEdit] = useState(false);
    const [showPasswordChange, setShowPasswordChange] = useState(false);
    const [nameEdit, setNameEdit] = useState("");

    const [emailEdit, setEmailEdit] = useState("");

    const [telNoEdit, setTelNoEdit] = useState("");

    const [nicEdit, setNicEdit] = useState("");

    const [showToast, setShowToast] = useState(false);

    const [curPass, setCurPass] = useState("");
    const [newPass, setNewPass] = useState("");
    const [confirmPass, setConfirmPass] = useState("");

    useEffect(() => {
        const currentUser = AuthService.getCurrentUser();
        if(currentUser.data){
            setCurrentUser(currentUser.data.user);

            setNameEdit(currentUser.data.user.name);
            setEmailEdit(currentUser.data.user.email);
            setNicEdit(currentUser.data.user.nic);
            setTelNoEdit(currentUser.data.user.telNo);
        }
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

    const validEmailEdit = (value) => {
        if(!isEmail(value)){
            return (
                <div className="alert alert-danger" role="alert">
                    This is not a valid email
                </div>
            );
        }
    };
    
    const vTelNoEdit = (value) => {
        if(!isMobilePhone(value)){
            return (
                <div className="alert alert-danger" role="alert">
                    This is not a valid telephone no.
                </div>
            );
        }
    };
    
    const vNicEdit = (value) => {
        if(value.length < 10 || value.length > 12){
            return (
                <div className="alert alert-danger" role="alert">
                    The NIC must be between 10 and 12 characters
                </div>
            );
        }
    };
    
    const vnameEdit = (value) => {
        if(value.length < 3 || value.length > 20){
            return (
                <div className="alert alert-danger" role="alert">
                    The username must be between 3 and 20 characters
                </div>
            );
        }
    };

    const vpassword = (value) => {
        localStorage.setItem('pass3',value);
        if(value.length < 6 || value.length > 40){
            return (
                <div className="alert alert-danger" role="alert">
                    The password must be between 6 and 40 characters
                </div>
            );
        }
    };

    const vpasswordConfirm = (value) => {
        if(localStorage.getItem('pass3') !== value){
            return (
                <div className="alert alert-danger" role="alert">
                    Incorrect confirm password
                </div>
            );
        }
    };

    const onChangeNameEdit = (e) => {
        const username = e.target.value;
        setNameEdit(username);
    };

    const onChangeCurPass = (e) => {
        const currentPassword = e.target.value;
        setCurPass(currentPassword);
    }

    const onChangeNewPass = (e) => {
        const newPassword = e.target.value;
        setNewPass(newPassword);
    }

    const onChangeConfirmPass = (e) => {
        const confirmPassword = e.target.value;
        setConfirmPass(confirmPassword);
    }

    const onChangeEmailEdit = (e) => {
        const email = e.target.value;
        setEmailEdit(email);
    };

    const onChangeTelNoEdit = (e) => {
        const telNo = e.target.value;
        setTelNoEdit(telNo);
    };

    const onChangeNicEdit = (e) => {
        const nic = e.target.value;
        setNicEdit(nic);
    };
    const handleCloseEdit = () => setShowEdit(false);
    const handleShowEdit = () => setShowEdit(true);
    const handleShowPassword = () => setShowPasswordChange(true);
    const handleCloseShowPassword = () => setShowPasswordChange(false);

    const clearToast = () => {
        setTimeout(() => setShowToast(false), 3000);
    }

    const handleRegisterEdit = (e) => {
        e.preventDefault();

        setMessage("");

        form.current.validateAll();

        if(checkBtn.current.context._errors.length === 0){
            UserService.updateMe(nameEdit,emailEdit,telNoEdit,nicEdit).then((response) => {
                const userNow = AuthService.getCurrentUser();
                AuthService.logout();
                localStorage.setItem('user', JSON.stringify({...userNow,data: response.data.data}));
                
                const currentUser = AuthService.getCurrentUser();
                if(currentUser.data){
                setCurrentUser(currentUser.data.user);

                setNameEdit(currentUser.data.user.name);
                setEmailEdit(currentUser.data.user.email);
                setNicEdit(currentUser.data.user.nic);
                setTelNoEdit(currentUser.data.user.telNo);
            }

                setMessage("Successfully registered, Welcome to NATOURS");
                setShowEdit(false);
                setShowToast(true);
                clearToast();
            },(error) => {
                const resMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
                setMessage(resMessage);
            }
            );
        }
        
    };

    const handleDeleteUser = () => {  
        UserService.deleteMe().then(()=>{
            AuthService.logout();
            props.history.push("/register");
            window.location.reload();

        }, (error) => {
            console.log(error);
        });

}

    const handleRegisterPassword = (e) => {
        e.preventDefault();

        setMessage("");

        form.current.validateAll();

        if(checkBtn.current.context._errors.length === 0){
            UserService.updatePassword(curPass,newPass,confirmPass).then((response) => {
                const userNow = AuthService.getCurrentUser();

                AuthService.logout();
                localStorage.setItem('user', JSON.stringify({...userNow,token: response.data.token}));
                props.history.push("/login");
                window.location.reload();

                setMessage("Successfully registered, Welcome to NATOURS");
                setShowPasswordChange(false);
                setShowToast(true);
                clearToast();
            },(error) => {
                const resMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
                setMessage(resMessage);
            }
            );
        }
    }

    return (
            <div className="container">
                
                 
                <div style={{marginTop: '60px', paddingTop: '20px'}} className="jumbotron">
                   
                    
                    <Image className="profile-img-card" roundedCircle src="//ssl.gstatic.com/accounts/ui/avatar_2x.png" alt="profile_image" />
                    <div className="content">
                        <h1> My Profile</h1>
                        
                            <h2 style={{fontSize: '24px', textAlign: 'center'}} className="form-control details">{currentUser.name}</h2>
                            <h2 style={{fontSize: '24px', textAlign: 'center'}} className="form-control">{currentUser.email}</h2>
                            <h2 style={{fontSize: '24px', textAlign: 'center'}} className="form-control">{currentUser.nic}</h2>
                            <h2 style={{fontSize: '24px', textAlign: 'center'}} className="form-control">{currentUser.telNo}</h2>
                            <h2 style={{fontSize: '24px', textAlign: 'center'}} className="form-control">{currentUser.role}</h2>
                            {currentUser.role !== 'customer' && <h2 style={{fontSize: '24px', textAlign: 'center'}} className="form-control">Rs.{currentUser.salary}</h2> }

                            <div style={{marginTop: '20px'}} className="form-group">
                            {currentUser.role === 'customer' && <button onClick={handleShowPassword} style={{marginRight: '10px', paddingRight: '20px',paddingLeft: '20px' }} className="btn btn-secondary">Change Password</button> }
                                <button onClick={handleShowEdit} style={{marginRight: '10px', paddingRight: '20px',paddingLeft: '20px' }} className="btn btn-primary">Edit Me</button>
                                <button onClick={handleDeleteUser} className="btn btn-danger">Delete Me</button>
                            </div>
                            <div>
                                <Toast style={{ float: 'right', backgroundColor: 'green', color: '#ffff'}} show={showToast} delay={3000} autohide animation>
                                    <Toast.Body>My profile updated successfully!</Toast.Body>
                                </Toast>
                            </div>
                    </div>
                    
                </div>
                <EditModal 
                    form={form}
                    checkBtn={checkBtn} 
                    currentUser={currentUser}
                    nameEdit={nameEdit}
                    emailEdit={emailEdit}
                    nicEdit={nicEdit}
                    telNoEdit={telNoEdit}
                    required={required}
                    validEmailEdit={validEmailEdit}
                    vnameEdit={vnameEdit}
                    vNicEdit={vNicEdit}
                    vTelNoEdit={vTelNoEdit}
                    onChangeNameEdit={onChangeNameEdit}
                    onChangeEmailEdit={onChangeEmailEdit}
                    onChangeNicEdit={onChangeNicEdit}
                    onChangeTelNoEdit={onChangeTelNoEdit}
                    showEdit={showEdit}
                    handleCloseEdit={handleCloseEdit}
                    message={message}
                    handleRegisterEdit={handleRegisterEdit}
                />
                <PasswordChangeModal 
                    form={form}
                    checkBtn={checkBtn} 
                    curPass={curPass}
                    onChangeCurPass={onChangeCurPass}
                    newPass={newPass}
                    onChangeNewPass={onChangeNewPass}
                    confirmPass={confirmPass}
                    onChangeConfirmPass={onChangeConfirmPass}
                    vpassword={vpassword}
                    vpasswordConfirm={vpasswordConfirm}
                    required={required}
                    showPasswordChange={showPasswordChange}
                    handleCloseShowPassword={handleCloseShowPassword}
                    handleRegisterPassword={handleRegisterPassword}
                    message={message}
                />
        </div>
    );
};

export default Profile;