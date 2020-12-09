import React, {useState,useRef} from 'react';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import Modal from 'react-bootstrap/Modal';
import CheckButton from 'react-validation/build/button';
import AuthService from '../services/auth.service';
import UserService from '../services/user.service';
import {isEmail} from 'validator';
import '../css/Home.css';

const required = (value) => {
    if(!value){
        return (
            <div className="alert alert-danger" role="alert">
                This field is required
            </div>
        );
    }
};

const ModalSubmitPassword = ({
    modalShowSubmitNewPassword,
    handleCloseModalSubmitPassword,
    form,
    checkBtn,
    message,
    handleSubmitNewPassword,
    token,
    onChangeToken,
    pass,
    onChangePass,
    confirmPass,
    onChangeConfirmPass,
    vpassword,
    vpasswordConfirm,
}) => {
  return ( <Modal style={{marginTop: '40px'}} show={modalShowSubmitNewPassword} onHide={handleCloseModalSubmitPassword}>
    <Modal.Header closeButton>
        <Modal.Title>Sumbit New Password With Given Key</Modal.Title>
    </Modal.Header>
    <Modal.Body>

    <Form onSubmit={handleSubmitNewPassword} ref={form}>
    <div>
    {message !== "Successfully registered, Welcome to NATOURS" && message !== "" && (
        <div className="form-group">
            <div className="alert alert-success" role="alert">
               {message}
            </div>
        </div>
    )}
    <div className="form-group">
        <label htmlFor="token">Enter The Key Here That Recieved To Your Email</label>
        <Input 
            type="text"
            className="form-control"
            name="token"
            value={token}
            onChange={onChangeToken}
            validations={[required]}
        />
    </div>
    <div className="form-group">
        <label htmlFor="pass">New Password</label>
        <Input 
            type="text"
            className="form-control"
            name="pass"
            value={pass}
            onChange={onChangePass}
            validations={[required,vpassword]}
        />
    </div>
    <div className="form-group">
        <label htmlFor="confirmPass">Confirm New Password</label>
        <Input 
            type="text"
            className="form-control"
            name="confirmPass"
            value={confirmPass}
            onChange={onChangeConfirmPass}
            validations={[required, vpasswordConfirm]}
        />
    </div>

    <div className="form-group">
        <button className="btn btn-primary btn-block">Submit</button>
    </div>
</div>

<CheckButton style={{ display: "none" }} ref={checkBtn} />
</Form>

    </Modal.Body> 
</Modal>
)
}


const ModalForgotPassword = ({
    handleCloseModal,
    modalShow,
    required,
    form,
    checkBtn,
    handleSubmit,
    emailSubmit,
    onChangeEmailSubmit,
    validEmail
}) => {
   return (
   <Modal style={{marginTop: '40px'}} show={modalShow} onHide={handleCloseModal}>
    <Modal.Header closeButton>
        <Modal.Title>Sumbit Your Email</Modal.Title>
    </Modal.Header>
    <Modal.Body>

    <Form onSubmit={handleSubmit} ref={form}>
    <div>
    
    <div className="form-group">
        <label htmlFor="emailSubmit">Email</label>
        <Input 
            type="text"
            className="form-control"
            name="emailSubmit"
            value={emailSubmit}
            onChange={onChangeEmailSubmit}
            validations={[required, validEmail]}
        />
    </div>

    <div className="form-group">
        <button className="btn btn-primary btn-block">Submit</button>
    </div>
</div>
{/* {message !== "Successfully registered, Welcome to NATOURS" && message !== "" && (
        <div className="form-group">
            <div className="alert alert-danger" role="alert">
                Error in saving user! Try again later
            </div>
        </div>
    )} */}
<CheckButton style={{ display: "none" }} ref={checkBtn} />
</Form>
    </Modal.Body> 
</Modal>
)
}

const Login = (props) => {
    const form = useRef();
    const checkBtn = useRef();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [modalShow, setModalShow] = useState(false);
    const [emailSubmit, setEmailSubmit] = useState("");

    const [modalShowSubmitNewPassword, setModalShowSubmitNewPassword] = useState(false);
    const [token, setToken] = useState("");
    const [pass, setPass] = useState("");
    const [confirmPass, setConfirmPass] = useState("");
    const [messageNew, setMessageNew] = useState("");

    const onChangeUsername = (e) => {
        const username = e.target.value;
        setUsername(username);
    };

    const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
    };

    const onChangeEmailSubmit = (e) => {
        const email = e.target.value;
        setEmailSubmit(email);
    }

    const onChangeToken = (e) => {
        const token = e.target.value;
        setToken(token);
    }

    const onChangePass = (e) => {
        const pass = e.target.value;
        setPass(pass);
    }

    const onChangeConfirmPass = (e) => {
        const confirmPass = e.target.value;
        setConfirmPass(confirmPass);
    }

    const vpassword = (value) => {
        localStorage.setItem('passNew',value);
        if(value.length < 6 || value.length > 40){
            return (
                <div className="alert alert-danger" role="alert">
                    The password must be between 6 and 40 characters
                </div>
            );
        }
    };

    const vpasswordConfirm = (value) => {

        if(localStorage.getItem('passNew') !== value){
            return (
                <div className="alert alert-danger" role="alert">
                    Incorrect confirm password
                </div>
            );
        }
    };

    const validEmail = (value) => {
        if(!isEmail(value)){
            return (
                <div className="alert alert-danger" role="alert">
                    This is not a valid email
                </div>
            );
        }
    };

    const handleLogin = (e) => {
        e.preventDefault();

        setMessage("");
        setLoading(true);


            AuthService.login(username,password).then((response) => {
                const user = AuthService.getCurrentUser();
                if(user.data.user.role === 'customer'){
                    props.history.push("/profile");
                    window.location.reload();
                } else {
                    props.history.push(`/${user.data.user.role}`);
                    window.location.reload();
                }

            }, (error) => {
                const resMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

                setLoading(false);
                setMessage(resMessage);
            });

    };

    const showModalHandler = () => setModalShow(true);
    const handleCloseModal = () => setModalShow(false);
    const handleCloseModalSubmitPassword = () => setModalShowSubmitNewPassword(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        setMessage("");
        setLoading(true);

        form.current.validateAll();

        if(checkBtn.current.context._errors.length === 0){
            UserService.forgotPassword(emailSubmit).then((response) => {
               if(response.data.status === 'success') {
                setModalShow(false);
                setModalShowSubmitNewPassword(true);
                setMessage(response.data.message);
               }

            }, (error) => {
                const resMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

                setLoading(false);
                setMessage(resMessage);
            });
        } else {
            setLoading(false);
        }
    }

    const handleSubmitNewPassword = (e) => {
        e.preventDefault();

        setMessage("");
        setLoading(true);


       
            UserService.resetPassword(token,pass,confirmPass).then((response) => {
               if(response.data.status === 'success') {
                setModalShowSubmitNewPassword(false);
                setMessageNew('Password reset success, now login with new password');
               }
               setLoading(false);

            }, (error) => {
                const resMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

                setLoading(false);
                setMessage(resMessage);
            });
       
    }

    return (
        <div className="col-md-12">
            <div className="card card-container">
                <img 
                    src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                    alt="profile-img"
                    className="profile-img-card"
                 />
                    {messageNew === "Password reset success, now login with new password" && (
                        <div className="form-group">
                            <div className="alert alert-success" role="alert">
                                {messageNew}
                            </div>
                        </div>
                    )}
                 <Form 
                  onSubmit={handleLogin} 
                  ref={form}
                 >
                     
                     <div className="form-group">
                         <label htmlFor="username">Email</label>
                         <Input
                            type="text"
                            className="form-control"
                            name="username"
                            value={username}
                            onChange={onChangeUsername}
                            validations={[required]}
                         />
                     </div>
                     <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <Input
                            type="text"
                            className="form-control"
                            name="password"
                            value={password}
                            onChange={onChangePassword}
                            validations={[required]}
                        />
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary btn-block" disabled={loading}>
                            {loading && (
                                <span className="spinner-border spinner-border-sm"></span>
                            )}
                            <span>Login</span>
                        </button>
                    </div>
                   
                    {message && (
                        <div className="form-group">
                            <div className="alert alert-danger" role="alert">
                                {message}
                            </div>
                        </div>
                    )}
                    <CheckButton style={{ display: "none" }} ref={checkBtn} />
                 </Form>
                 <div  style={{textAlign: 'center'}}>
                        <a onClick={showModalHandler} className="forgot-password">Forgot Password?</a>
                    </div>
            </div>
            {/* <Modal /> */}
            <ModalForgotPassword 
                modalShow={modalShow}
                handleCloseModal={handleCloseModal}
                required={required}
                form={form}
                checkBtn={checkBtn}
                handleSubmit={handleSubmit}
                emailSubmit={emailSubmit}
                onChangeEmailSubmit={onChangeEmailSubmit}
                validEmail={validEmail}
            />
            <ModalSubmitPassword 
                modalShowSubmitNewPassword={modalShowSubmitNewPassword}
                handleCloseModalSubmitPassword={handleCloseModalSubmitPassword}
                form={form}
                checkBtn={checkBtn}
                message={message}
                handleSubmitNewPassword={handleSubmitNewPassword}
                token={token}
                onChangeToken={onChangeToken}
                pass={pass}
                onChangePass={onChangePass}
                confirmPass={confirmPass}
                onChangeConfirmPass={onChangeConfirmPass}
                vpassword={vpassword}
                vpasswordConfirm={vpasswordConfirm}
            />
        </div>
    );
};

export default Login;