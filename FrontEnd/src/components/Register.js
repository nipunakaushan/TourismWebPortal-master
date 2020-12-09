import React, {useState,useRef} from 'react';
import {Link} from 'react-router-dom';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import CheckButton from 'react-validation/build/button';
import {isEmail, isMobilePhone} from 'validator';

import AuthService from '../services/auth.service';


const Register = (props) => {
    const form = useRef();
    const checkBtn = useRef();

    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [telNo, setTelNo] = useState("");
    const [nic, setNic] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [successful, setSuccessful] = useState(false);
    const [message, setMessage] = useState("");
    const [data, setData] = useState({});



    const required = (value) => {
        if(!value){
            return (
                <div className="alert alert-danger" role="alert">
                    This field is required
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
    
    const vTelNo = (value) => {
        if(!isMobilePhone(value)){
            return (
                <div className="alert alert-danger" role="alert">
                    This is not a valid telephone no.
                </div>
            );
        }
    };
    
    const vNic = (value) => {
        if(value.length < 10 || value.length > 12){
            return (
                <div className="alert alert-danger" role="alert">
                    The NIC must be between 10 and 12 characters
                </div>
            );
        }
    };
    
    const vname = (value) => {
        if(value.length < 3 || value.length > 20){
            return (
                <div className="alert alert-danger" role="alert">
                    The username must be between 3 and 20 characters
                </div>
            );
        }
    };
    
    const vpassword = (value) => {
        localStorage.setItem('pass',value);
        if(value.length < 8 || value.length > 40){
            return (
                <div className="alert alert-danger" role="alert">
                    The password must be between 8 and 40 characters
                </div>
            );
        }
    };

    const vpasswordConfirm = (value) => {

        if(localStorage.getItem('pass') !== value){
            return (
                <div className="alert alert-danger" role="alert">
                    Incorrect confirm password
                </div>
            );
        }
    };
    



    const onChangeName = (e) => {
        const username = e.target.value;
        setName(username);
    };

    const onChangeEmail = (e) => {
        const email = e.target.value;
        setEmail(email);
    };

    const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
    };

    const onChangeTelNo = (e) => {
        const telNo = e.target.value;
        setTelNo(telNo);
    };

    const onChangeNic = (e) => {
        const nic = e.target.value;
        setNic(nic);
    };

    const onChangeConfirmPassword = (e) => {
        const confirmPassword = e.target.value;
        setConfirmPassword(confirmPassword);

    };

    const handleRegister = (e) => {
        e.preventDefault();

        setMessage("");
        setSuccessful(false);

        form.current.validateAll();

        if(checkBtn.current.context._errors.length === 0){
            AuthService.register(name,email,telNo,nic,password,confirmPassword).then((response) => {
                setData(response.data.data.user);
                setSuccessful(true);
                setMessage("Successfully registered, Welcome to NATOURS");
            },(error) => {
                const resMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
                setMessage(resMessage);
            }
            
            );
        }
    };

    return (
        <div className="col-md-12">
            <div className="card card-container">
                <img src="//ssl.gstatic.com/accounts/ui/avatar_2x.png" alt="profile-img" className="profile-img-card" />
                 
                 <Form onSubmit={handleRegister} ref={form}>
                     {!successful && (
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
                        <label htmlFor="email">Email</label>
                        <Input 
                            type="text"
                            className="form-control"
                            name="email"
                            value={email}
                            onChange={onChangeEmail}
                            validations={[required,validEmail]}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="telNo">Telephone No.</label>
                        <Input
                            type="text"
                            className="form-control"
                            name="telNo"
                            value={telNo}
                            onChange={onChangeTelNo}
                            validations={[required,vTelNo]}  
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="nic">NIC</label>
                        <Input
                            type="text"
                            className="form-control"
                            name="nic"
                            value={nic}
                            onChange={onChangeNic}
                            validations={[required,vNic]}  
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
                            validations={[required,vpassword]} 
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirm Password</label>
                        <Input
                            type="text"
                            className="form-control"
                            name="confirmPassword"
                            value={confirmPassword}
                            onChange={onChangeConfirmPassword}
                            validations={[required, vpasswordConfirm]}  
                        />
                    </div>

                    <div className="form-group">
                        <button className="btn btn-primary btn-block">Sign Up</button>
                    </div>
                </div>

            )}

                    {message && (
                        <>
                        <div className="form-group">
                            <div className={successful ? "alert alert-success" : "alert alert-danger"} role="alert">
                              {successful? `Welcome to NATOURS ${data.name}` : message}
                            </div>
                        </div>
                        {message === "Successfully registered, Welcome to NATOURS" && (
                            <Link to="/login">
                                <button className="btn btn-primary btn-block">Login here</button>
                            </Link>
                        )}
                        </>
                    )}
                    <CheckButton style={{ display: "none" }} ref={checkBtn} />
                 </Form>
            </div>
        </div>
    );
};

export default Register;