const User = require('../models/userModel');
const Acountant = require('../models/accountantModel');
const Admin = require('../models/adminModel');
const ContentWriter = require('../models/contentwriterModel');
const Customer = require('../models/customerModel');
const Driver = require('../models/driverModel');
const Guide = require('../models/guideModel');
const Manager = require('../models/managerModel');
const Mechanic = require('../models/mechanicModel');
const sendEmail = require('../utils/email');

const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach(el => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.getAllUsers = catchAsync(async (req, res) => {
  const users = await User.find({active: true});

  // SEND RESPONSE
  res.status(200).json({
    status: 'success',
    results: users.length,
    data: {
      users
    }
  });
});

exports.updateMe = catchAsync(async (req, res, next) => {
  // 1) Create error if user POSTs password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        'This route is not for password updates. Please use /updateMyPassword.',
        400, res
      )
    );
  }

  // 2) Filtered out unwanted fields names that are not allowed to be updated
  // const filteredBody = filterObj(req.body, 'name', 'email');

  // 3) Update user document
  const updatedUser = await User.findByIdAndUpdate(req.user.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser
    }
  });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({
    status: 'success',
    message: 'deleted'
  });
});

exports.getUser = catchAsync(async (req, res) => {
const userById =  await User.findById(req.params.id);

res.status(201).json({
  status: 'success',
  data: userById
  });
});

exports.createUser = catchAsync(async (req, res) => {
  try  {
    
    let newRole;
    switch(req.body.role){
      case 'admin': 
        newRole = await Admin.create(req.body);
        break;
      case 'accountant': 
        newRole = await Acountant.create(req.body);
        break;
      case 'customer': 
        newRole = await Customer.create(req.body);
        break;
      case 'driver': 
        newRole = await Driver.create(req.body);
        break;
      case 'content-writer': 
        newRole = await ContentWriter.create(req.body);
        break;
      case 'manager': 
        newRole = await Manager.create(req.body);
        break;
      case 'mechanic': 
        newRole = await Mechanic.create(req.body);
        break;
      case 'guide': 
        newRole = await Guide.create(req.body);
        break;
      default: null
    }

    if(newRole) {
      const newUser = await User.create(req.body);
      try{
        await sendEmail({
          email: newUser.email,
          subject: 'Welcome to Exotic Lanka Tours',
          message: `We warmly welcome you ${newUser.name} to Exotic Lanka Tours, From now on you are on a 6 months probation period and after tha we will give you a decision about making permanant after perfomance evaluation, Thanks and Regards`
        });
    
        res.status(200).json({
          status: 'success',
          message: 'Confirmation Email sent to employee successfully'
        });
      }catch(error){
        res.status(400).json({
          status: 'fail',
          message: 'Fail sending the email'
        });
      }
      res.status(200).json({
        status: 'Success',
        data: newUser,
        roleData: newRole
      });
    }else {
      res.status(400).json({
        status: 'Fail',
        message: 'Invalid data',
    });
    }
  }catch(err){
    res.status(400).json({
        status: 'Fail',
        message: 'Invalid data',
        error: err
    });
}
});
exports.updateUserStatus = async (req,res) => {
  try{
    const theUser = await User.findById(req.params.oid);
    if(theUser){
      const updatedUser = await User.findByIdAndUpdate(req.params.oid, req.body);
      if(req.body.status === 'rejected'){
        try{
          await sendEmail({
            email: theUser.email,
            subject: 'Your were rejected by exotic lanka tours',
            message: 'You were rejected by exotic lanka tours due to some bad complaints and after investigating about those, Then your exotic lanka eployee membership will be disabled after two weeks from now on, following shows your feedback and score report',
            htmlBody: `<table>
                          <thead>
                            <th>Head Manager</th>
                            <th>Head Manager Feedback</th>
                            <th>Course Instructor</th>
                            <th>Instructor Feedback</th>
                            <th>Overall Score out of 100</th>
                          </thead>
                          <tbody>
                            <td>Manager one</td>
                            <td>More coplaints from customers</td>
                            <td>Mr. Ariyadasa</td>
                            <td>Not learning well, no concentration towards the course matters mainly.</td>
                            <td>55</td>
                          </tbody>
            
                      </table>`
            
                      

          });
      
          res.status(200).json({
            status: 'success',
            message: 'Rejected, email sent to employee successfully'
          });
        }catch(error){
          res.status(400).json({
            status: 'fail',
            message: 'Fail sending the email'
          });
        }
      }else{
        try{
          await sendEmail({
            email: theUser.email,
            subject: 'Welcome to Exotic Lanka Tours As a permanant employee',
            message: `We warmly welcome ${theUser.name} as a permanant employee, Thanks and Regards`,
            htmlBody: `<table>
            <thead>
              <th>Head Manager</th>
              <th>Head Manager Feedback</th>
              <th>Course Instructor</th>
              <th>Instructor Feedback</th>
              <th>Overall Score out of 100</th>
            </thead>
            <tbody>
              <td>Manager one</td>
              <td>More complimants from customers</td>
              <td>Mr. Ariyadasa</td>
              <td>Listens well and answer quizes well and good in understanding.</td>
              <td>85</td>
            </tbody>

        </table>`
          });
      
          res.status(200).json({
            status: 'success',
            message: 'Approved, email sent to employee successfully'
          });
        }catch(error){
          res.status(400).json({
            status: 'fail',
            message: 'Fail sending the email'
          });
        }
      }
      res.status(200).json({
        status: 'success',
        data: {
          user: updatedUser
        }
      });
    }else{
      res.status(400).json({
        status: 'Fail',
        message: 'Invalid data',
    });
    }
  }catch(err){
    res.status(400).json({
      status: 'Fail',
      message: 'Invalid data',
      error: err
  });
  }
};

exports.updateUser = catchAsync(async (req, res, next) => {
  try {
    const theUser = await User.findById(req.params.id);
    if(theUser){
      if(req.body.role === theUser.role){
        switch(req.body.role){
          case 'admin': 
            await Admin.findOneAndUpdate({email: theUser.email},req.body);
            break;
          case 'accountant': 
            await Acountant.findOneAndUpdate({email: theUser.email},req.body);
            break;
          case 'customer': 
            await Customer.findOneAndUpdate({email: theUser.email},req.body);
            break;
          case 'driver': 
            await Driver.findOneAndUpdate({email: theUser.email},req.body);
            break;
          case 'content-writer': 
            await ContentWriter.findOneAndUpdate({email: theUser.email},req.body);
            break;
          case 'manager': 
            await Manager.findOneAndUpdate({email: theUser.email},req.body);
            break;
          case 'mechanic': 
            await Mechanic.findOneAndUpdate({email: theUser.email},req.body);
            break;
          case 'guide': 
            await Guide.findOneAndUpdate({email: theUser.email},req.body);
            break;
          default: null
        }
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
          new: true,
          runValidators: true
        });

        res.status(200).json({
          status: 'success',
          data: {
            user: updatedUser
          }
        });
      } else {
        switch(theUser.role){
          case 'admin': 
            await Admin.findOneAndDelete({email: theUser.email});
            break;
          case 'accountant': 
            await Acountant.findOneAndDelete({email: theUser.email});
            break;
          case 'customer': 
            await Customer.findOneAndDelete({email: theUser.email});
            break;
          case 'driver': 
            await Driver.findOneAndDelete({email: theUser.email});
            break;
          case 'content-writer': 
            await ContentWriter.findOneAndDelete({email: theUser.email});
            break;
          case 'manager': 
            await Manager.findOneAndDelete({email: theUser.email});
            break;
          case 'mechanic': 
            await Mechanic.findOneAndDelete({email: theUser.email});
            break;
          case 'guide': 
            await Guide.findOneAndDelete({email: theUser.email});
            break;
          default: null
        }

        switch(req.body.role){
          case 'admin': 
            await Admin.create(req.body);
            break;
          case 'accountant': 
            await Acountant.create(req.body);
            break;
          case 'customer': 
            await Customer.create(req.body);
            break;
          case 'driver': 
            await Driver.create(req.body);
            break;
          case 'content-writer': 
            await ContentWriter.create(req.body);
            break;
          case 'manager': 
            await Manager.create(req.body);
            break;
          case 'mechanic': 
            await Mechanic.create(req.body);
            break;
          case 'guide': 
            await Guide.create(req.body);
            break;
          default: null
        }
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
          new: true,
          runValidators: true
        });

        res.status(200).json({
          status: 'success',
          data: {
            user: updatedUser
          }
        });
      }
}
  } catch(error) {
    res.status(400).json({
      status: 'Fail',
      message: 'Invalid data',
      error: error
  });
  }
    
});
exports.deleteUser = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.params.id, { active: false });

  res.status(204).json({
    status: 'success',
    data: null
  });
});

exports.selectDrivers = catchAsync(async (req, res) => {
  const drivers = await User.find({ role: "driver",active: true });

  res.status(200).json({
    status: 'success',
    results: drivers.length,
    data:  drivers
  });
});

exports.selectedDriver = catchAsync(async (req, res) => {
  const selectedDriver = await User.findById(req.params.sid);

  if(selectedDriver){
    try{
      await sendEmail({
        email: selectedDriver.email,
        subject: 'You are selected for a tour by a customer',
        message: 'You are selected as a driver by a customer for their tour and he/she will call you shortly',
      });
  
      res.status(200).json({
        status: 'success',
        message: 'Selected email sent to driver successfully'
      });
    }catch(error){
      res.status(400).json({
        status: 'fail',
        message: 'Fail sending the email'
      });
    }
  }

});

exports.canceledDriver = catchAsync(async (req, res) => {
  const canceledDriver = await User.findById(req.params.cid);

  if(canceledDriver){
    try{
      await sendEmail({
        email: canceledDriver.email,
        subject: 'Your tour has been cancelled by customer',
        message: 'Selected tour you a driver has been cancelled by the customer',
      });
  
      res.status(200).json({
        status: 'success',
        message: 'Cancel email sent to driver successfully'
      });
    }catch(error){
      res.status(400).json({
        status: 'fail',
        message: 'Fail sending the email'
      });
    }
  }

});