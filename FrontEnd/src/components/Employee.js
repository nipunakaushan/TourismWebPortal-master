import React, {useEffect,useState, useRef} from 'react';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Toast from 'react-bootstrap/Toast';
import Table from 'react-bootstrap/Table';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import Select from 'react-validation/build/select';
import {isEmail, isMobilePhone} from 'validator';
import CheckButton from 'react-validation/build/button';
import UserService from '../services/user.service';
import AuthService from '../services/auth.service';

import '../css/Home.css';


const EditModal = ({
                        handleShowEdit, 
                        handleCloseEdit, 
                        showEdit,
                        onChangeNameEdit,
                        onChangeEmailEdit,
                        onChangeNicEdit,
                        onChangeTelNoEdit,
                        onChangeRoleEdit,
                        onChangeSalaryEdit,
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
                        salaryEdit,
                        handleRegisterEdit,
                        roleEdit,

}) => {
    return (
        <Modal style={{marginTop: '40px'}} show={showEdit} onHide={handleCloseEdit}>
                        <Modal.Header closeButton>
                            <Modal.Title>Edit employee details</Modal.Title>
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
                            <label htmlFor="role">Employee Role</label>
                            <Select value={roleEdit} className="form-control" onChange={onChangeRoleEdit}>
                                <option value="admin">Admin</option>
                                <option value="manager">Manager</option>
                                <option value="accountant">Accountant</option>
                                <option value="guide">Guide</option>
                                <option value="driver">Driver</option>
                                <option value="content-writer">Content Writer</option>
                                <option value="mechanic">Mechanic</option>
                            </Select>
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
                            <label htmlFor="salary">Monthly Salary in Rupees</label>
                            <Input
                                type="text"
                                className="form-control"
                                name="salary"
                                value={salaryEdit}
                                onChange={onChangeSalaryEdit}
                                validations={[required]}  
                            />
                        </div>

                        <div className="form-group">
                            <button className="btn btn-primary btn-block">Save Employee</button>
                        </div>
                    </div>
                    {message !== "Successfully registered, Welcome to NATOURS" && message !== "" && (
                            <div className="form-group">
                                <div className="alert alert-danger" role="alert">
                                    Error in saving employee! Try again later
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
                     content,
                     handleShow,
                     handleClose,
                     show,
                     handleRegister,
                     onChangeName,
                     onChangeEmail,
                     onChangeNic,
                     onChangeTelNo,
                     onChangePassword,
                     onChangeConfirmPassword,
                     required,
                     validEmail,
                     vTelNo,
                     vname,
                     vNic,
                     vpassword,
                     vpasswordConfirm,
                     name,
                     email,
                     password,
                     confirmPassword,
                     nic,
                     telNo,
                     form,
                     checkBtn,
                     onChangeRole,
                     message,
                     salary,
                     onChangeSalary,
                     showToast,
                     allData,

                     handleShowEdit, 
                        handleCloseEdit, 
                        showEdit,
                        onChangeNameEdit,
                        onChangeEmailEdit,
                        onChangeNicEdit,
                        onChangeTelNoEdit,
                        onChangeRoleEdit,
                        onChangeSalaryEdit,
                        validEmailEdit,
                        vTelNoEdit,
                        vnameEdit,
                        vNicEdit,
                        nameEdit,
                        emailEdit,
                        nicEdit,
                        telNoEdit,
                        salaryEdit,
                        handleRegisterEdit,
                        roleEdit,

                        handleSubmitEditHandler,
                        handleDeleteUser,
                        showDeleteToast,
                        handleUpdateStatus,
                        showStatusModal,
                        onChangeApproval,

                        handleCloseStatus,
                        handleRegisterStatus,
                        showToastStatus
                    }) => {
    return (

        <div style={{marginTop: '10px'}} className="container-fluid">

                    <Button onClick={handleShow}>Add Employee</Button>

                    <Toast style={{ float: 'right', backgroundColor: 'green', color: '#ffff'}} show={showToast} delay={3000} autohide animation>
                        <Toast.Body>Employee added successfully!</Toast.Body>
                    </Toast>
                    <Toast style={{ float: 'right', backgroundColor: 'green', color: '#ffff'}} show={showDeleteToast} delay={3000} autohide animation>
                        <Toast.Body>Employee disabled successfully!</Toast.Body>
                    </Toast>
                    <Toast style={{ float: 'right', backgroundColor: 'green', color: '#ffff'}} show={showToastStatus} delay={3000} autohide animation>
                        <Toast.Body>Employee status updated successfully!</Toast.Body>
                    </Toast>
                        <EditModal 
                            handleShowEdit={handleShowEdit} 
                            handleCloseEdit={handleCloseEdit} 
                            showEdit={showEdit}
                            onChangeNameEdit={onChangeNameEdit}
                            onChangeEmailEdit={onChangeEmailEdit}
                            onChangeNicEdit={onChangeNicEdit}
                            onChangeTelNoEdit={onChangeTelNoEdit}
                            onChangeRoleEdit={onChangeRoleEdit}
                            onChangeSalaryEdit={onChangeSalaryEdit}
                            required={required}
                            validEmailEdit={validEmailEdit}
                            vTelNoEdit={vTelNoEdit}
                            vnameEdit={vnameEdit}
                            vNicEdit={vNicEdit}
                            form={form}
                            checkBtn={checkBtn}
                            nameEdit={nameEdit}
                            emailEdit={emailEdit}
                            nicEdit={nicEdit}
                            telNoEdit={telNoEdit}
                            message={message}
                            salaryEdit={salaryEdit}
                            roleEdit={roleEdit}
                            handleRegisterEdit={handleRegisterEdit}
                        />
                    <Modal style={{marginTop: '40px'}} show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Add user details</Modal.Title>
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
                            <label htmlFor="role">Employee Role</label>
                            <Select className="form-control" onChange={onChangeRole} validations={[required]}>
                                <option>Select a role</option>
                                <option value="admin">Admin</option>
                                <option value="manager">Manager</option>
                                <option value="accountant">Accountant</option>
                                <option value="guide">Guide</option>
                                <option value="driver">Driver</option>
                                <option value="content-writer">Content Writer</option>
                                <option value="mechanic">Mechanic</option>
                            </Select>
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
                            <label htmlFor="salary">Monthly Salary in Rupees</label>
                            <Input
                                type="text"
                                className="form-control"
                                name="salary"
                                value={salary}
                                onChange={onChangeSalary}
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
                            <button className="btn btn-primary btn-block">Add Employee</button>
                        </div>
                      
                    </div>
                    {message !== "Successfully registered, Welcome to NATOURS" && message !== "" && (
                            <div className="form-group">
                                <div className="alert alert-danger" role="alert">
                                    Error in adding employee! Try again later
                                </div>
                            </div>
                        )}
                 <CheckButton style={{ display: "none" }} ref={checkBtn} />
                 </Form>

                        </Modal.Body>

                        
                    </Modal>
                    
                    
                    {/* ----- */}
                    <Modal style={{marginTop: '40px'}} show={showStatusModal} onHide={handleCloseStatus}>
                        <Modal.Header closeButton>
                            <Modal.Title>Employee Approval</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>

                        <Form onSubmit={handleRegisterStatus} ref={form}>
                        <div>
                        <div className="form-group">
                            <label htmlFor="approved">Approve</label>
                            <Input
                                type="radio"
                                className="form-control"
                                name="approval"
                                value="approved"
                                onChange={onChangeApproval}
                                 
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="rejected">Reject</label>
                            <Input
                                type="radio"
                                className="form-control"
                                name="approval"
                                value="rejected"
                                onChange={onChangeApproval}
                                
                            />
                        </div>

                        <div className="form-group">
                            <button className="btn btn-primary btn-block">Submit</button>
                        </div>
                      
                    </div>
                    {message !== "Successfully registered, Welcome to NATOURS" && message !== "" && (
                            <div className="form-group">
                                <div className="alert alert-danger" role="alert">
                                    Error in adding employee! Try again later
                                </div>
                            </div>
                        )}
                 <CheckButton style={{ display: "none" }} ref={checkBtn} />
                 </Form>

                        </Modal.Body>

                        
                    </Modal>
                    {/* ----- */}

                    <h3 style={{marginTop:'20px'}}>Employees Detail Table</h3>
                    <Table style={{marginTop: '10px'}} striped bordered hover>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>NIC No.</th>
                                <th>Telephone No.</th>
                                <th>Role</th>
                                <th>Status</th>
                                <th style={{textAlign: "center"}}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allData.length !==0 && 
                            allData.map((data,i)=>{
                               return (
                                    <tr key={i}>
                                        <td>{data.name}</td>
                                        <td>{data.email}</td>
                                        <td>{data.nic}</td>
                                        <td>{data.telNo}</td>
                                        <td>{data.role}</td>
                                        <td>{data.status}</td>
                                        <td style={{textAlign: "center"}}>
                                            <button onClick={() => handleSubmitEditHandler(data._id,data.name,data.email,data.nic,data.telNo,data.role,data.salary)} className="btn btn-primary" style={{marginRight: '10px', paddingLeft: '20px', paddingRight: '20px'}}>Edit</button>
                                            <button onClick={() => handleDeleteUser(data._id)} className="btn btn-danger" style={{marginRight: '10px'}}>Delete</button>
                                            <button disabled={data.status !== 'pending'} onClick={() => handleUpdateStatus(data._id)} className="btn btn-info">Set Approval</button>
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

const Employee = () => {
    const [content, setContent] = useState("");
    const [show, setShow] = useState(false);
    const [showEdit, setShowEdit] = useState(false);

    const form = useRef();
    const checkBtn = useRef();

    const [selectedUserId, setSelectedUserId] = useState("");

    const [name, setName] = useState("");
    const [nameEdit, setNameEdit] = useState("");

    const [password, setPassword] = useState("");

    const [email, setEmail] = useState("");
    const [emailEdit, setEmailEdit] = useState("");

    const [telNo, setTelNo] = useState("");
    const [telNoEdit, setTelNoEdit] = useState("");

    const [nic, setNic] = useState("");
    const [nicEdit, setNicEdit] = useState("");

    const [confirmPassword, setConfirmPassword] = useState("");

    const [role, setRole] = useState("");
    const [roleEdit, setRoleEdit] = useState("");

    const [salary, setSalary] = useState(0);
    const [salaryEdit, setSalaryEdit] = useState(0);

    const [showToast, setShowToast] = useState(false);
    const [showDeleteToast,setShowDeleteToast] = useState(false);



    const [successful, setSuccessful] = useState(false);
    const [message, setMessage] = useState("");

    const [allData, setAllData] = useState([]);

    const [selectedEmployeeId, setSelectedEmployeeId] = useState("");
    const [showStatusModal, setShowStatusModal] = useState(false);
    const [approval, setApproval] = useState("");
    const [showToastStatus,setShowToastStatus] = useState(false);
    
    useEffect(() => {
        const user = AuthService.getCurrentUser();
        
        if(user){
               
                UserService.getUser(user.data.user._id).then((response) => {
                setContent(response.data);
                UserService.getAllUsers().then((response) => {
                    setAllData(response.data.data.users.filter(e => e.role !== 'customer'));
                });
                
                
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
        setEmail("");
        setNic("");
        setTelNo("");
        setRole("");
        setSalary("");
        setPassword("");
        setConfirmPassword("");
        setShow(false);
    }
    const handleShow = () => setShow(true);
    const handleCloseEdit = () => setShowEdit(false);
    const handleShowEdit = () => setShowEdit(true);
    
    const handleSubmitEditHandler = (id,name,email,nic,telNo,role,salary) => {
        setNameEdit(name);
        setEmailEdit(email);
        setNicEdit(nic);
        setTelNoEdit(telNo);
        setRoleEdit(role);
        setSalaryEdit(salary);
        setSelectedUserId(id)

        handleShowEdit()
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
    
    const validEmail = (value) => {
        if(!isEmail(value)){
            return (
                <div className="alert alert-danger" role="alert">
                    This is not a valid email
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
    
    const vTelNo = (value) => {
        if(!isMobilePhone(value)){
            return (
                <div className="alert alert-danger" role="alert">
                    This is not a valid telephone no.
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
    
    const vNic = (value) => {
        if(value.length < 10 || value.length > 12){
            return (
                <div className="alert alert-danger" role="alert">
                    The NIC must be between 10 and 12 characters
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
    
    const vname = (value) => {
        if(value.length < 3 || value.length > 20){
            return (
                <div className="alert alert-danger" role="alert">
                    The username must be between 3 and 20 characters
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
        localStorage.setItem('pass2',value);
        if(value.length < 6 || value.length > 40){
            return (
                <div className="alert alert-danger" role="alert">
                    The password must be between 6 and 40 characters
                </div>
            );
        }
    };

    const vpasswordConfirm = (value) => {
        if(localStorage.getItem('pass2') !== value){
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
    const onChangeNameEdit = (e) => {
        const username = e.target.value;
        setNameEdit(username);
    };

    const onChangeEmail = (e) => {
        const email = e.target.value;
        setEmail(email);
    };
    const onChangeEmailEdit = (e) => {
        const email = e.target.value;
        setEmailEdit(email);
    };

    const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
    };

    const onChangeTelNo = (e) => {
        const telNo = e.target.value;
        setTelNo(telNo);
    };
    const onChangeTelNoEdit = (e) => {
        const telNo = e.target.value;
        setTelNoEdit(telNo);
    };

    const onChangeNic = (e) => {
        const nic = e.target.value;
        setNic(nic);
    };
    const onChangeNicEdit = (e) => {
        const nic = e.target.value;
        setNicEdit(nic);
    };

    const onChangeSalary = (e) => {
        const salary = e.target.value;
        setSalary(salary);
    };
    const onChangeSalaryEdit = (e) => {
        const salary = e.target.value;
        setSalaryEdit(salary);
    };

    const onChangeConfirmPassword = (e) => {
        const confirmPassword = e.target.value;
        setConfirmPassword(confirmPassword);
    };

    const onChangeRole = (e) => {
        const role = e.target.value;
        setRole(role);
    };
    const onChangeRoleEdit = (e) => {
        const role = e.target.value;
        setRoleEdit(role);
    };

    const clearToast = () => {
        setTimeout(() => setShowToast(false), 3000);
    }
    const clearToastDelete = () => {
        setTimeout(() => setShowDeleteToast(false), 3000);
    }
    const clearToastStatus = () => {
        setTimeout(() => setShowToastStatus(false), 3000);
    }

    const handleRegister = (e) => {
        e.preventDefault();

        setMessage("");
        setSuccessful(false);

        form.current.validateAll();

        if(checkBtn.current.context._errors.length === 0){
            UserService.addUser(name,email,role,telNo,nic,salary,password,confirmPassword).then((response) => {
                console.log('data=>>',{...response.data.data,...response.data.roleData});

                UserService.getAllUsers().then((response) => {
                    setAllData(response.data.data.users.filter(e => e.role !== 'customer'));

                });

                setMessage("Successfully registered, Welcome to NATOURS");
                setShow(false);
                setShowToast(true);
                clearToast();
            },(error) => {
                const resMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
                setMessage(resMessage);
            }
            );
        }
        
    };

    const handleRegisterEdit = (e) => {
        e.preventDefault();

        setMessage("");
        setSuccessful(false);

        form.current.validateAll();

        if(checkBtn.current.context._errors.length === 0){
            UserService.updateUser(selectedUserId,nameEdit,emailEdit,roleEdit,telNoEdit,nicEdit,salaryEdit).then((response) => {
                
                UserService.getAllUsers().then((response) => {
                    setAllData(response.data.data.users.filter(e => e.role !== 'customer'));
                });

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
    const handleDeleteUser = (id) => {  
            UserService.deleteUser(id).then(()=>{
                setShowDeleteToast(true);
                clearToastDelete();

                UserService.getAllUsers().then((response) => {
                    setAllData(response.data.data.users.filter(e => e.role !== 'customer'));
                });
            }, (error) => {
                console.log(error);
            });
    
    }
    console.log(allData);
    const handleUpdateStatus = (id) => {
        setSelectedEmployeeId(id);
        setShowStatusModal(true);
    }
    const onChangeApproval = (e) => {
        const approval = e.target.value;
        setApproval(approval);
        console.log(approval);
    }
    const handleCloseStatus = () => setShowStatusModal(false);

    const handleRegisterStatus = (e) => {
        e.preventDefault();
        setMessage("");
        setSuccessful(false);
        form.current.validateAll();

        if(checkBtn.current.context._errors.length === 0){
            UserService.setEmployeeStatus(selectedEmployeeId, approval).then((response) => {
                console.log(response.data);
                if(response.data.status === 'success'){
                    UserService.getAllUsers().then((response)=>{
                        setAllData(response.data.data.users.filter(e => e.role !== 'customer'));
                    })
                }

                setMessage("Successfully registered, Welcome to NATOURS");
                setShowStatusModal(false);
                setShowToastStatus(true);
                clearToastStatus();
            },(error) => {
                const resMessage = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
                setMessage(resMessage);
            }
            );
        }
    }
    return (
        <div className="container-fluid">
            <div>
                { content !== "User not found" && content.data ? 
                    <ContentData 
                        content={content.data} 
                        handleShow={handleShow} 
                        handleClose={handleClose} 
                        show={show}
                        handleRegister={handleRegister}
                        onChangeName={onChangeName}
                        onChangeEmail={onChangeEmail}
                        onChangeNic={onChangeNic}
                        onChangeTelNo={onChangeTelNo}
                        onChangePassword={onChangePassword}
                        onChangeConfirmPassword={onChangeConfirmPassword}
                        required={required}
                        validEmail={validEmail}
                        vTelNo={vTelNo}
                        vname={vname}
                        vNic={vNic}
                        vpassword={vpassword}
                        vpasswordConfirm={vpasswordConfirm}
                        name={name}
                        email={email}
                        password={password}
                        confirmPassword={confirmPassword}
                        nic={nic}
                        telNo={telNo}
                        form={form}
                        checkBtn={checkBtn}
                        onChangeRole={onChangeRole}
                        message={message}
                        salary={salary}
                        onChangeSalary={onChangeSalary}
                        showToast={showToast}
                        allData={allData}

                        handleShowEdit={handleShowEdit} 
                        handleCloseEdit={handleCloseEdit} 
                        showEdit={showEdit}
                        onChangeNameEdit={onChangeNameEdit}
                        onChangeEmailEdit={onChangeEmailEdit}
                        onChangeNicEdit={onChangeNicEdit}
                        onChangeTelNoEdit={onChangeTelNoEdit}
                        onChangeRoleEdit={onChangeRoleEdit}
                        onChangeSalaryEdit={onChangeSalaryEdit}
                        validEmailEdit={validEmailEdit}
                        vTelNoEdit={vTelNoEdit}
                        vnameEdit={vnameEdit}
                        vNicEdit={vNicEdit}
                        nameEdit={nameEdit}
                        emailEdit={emailEdit}
                        nicEdit={nicEdit}
                        telNoEdit={telNoEdit}
                        salaryEdit={salaryEdit}
                        handleRegisterEdit={handleRegisterEdit}
                        roleEdit={roleEdit}

                        handleSubmitEditHandler={handleSubmitEditHandler}
                        handleDeleteUser={handleDeleteUser}
                        showDeleteToast={showDeleteToast}
                        handleUpdateStatus={handleUpdateStatus}
                        showStatusModal={showStatusModal}
                        onChangeApproval={onChangeApproval}
                        handleCloseStatus={handleCloseStatus}
                        handleRegisterStatus={handleRegisterStatus}
                        showToastStatus={showToastStatus}
                    /> 
                    : 
                    <Spinnerr />}
            </div>
        </div>
    );
};

export default Employee;