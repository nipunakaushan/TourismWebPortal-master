const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const dotenv = require('dotenv');
const multer = require('multer');
const AppError = require('./app/utils/appError');

// process.on('uncaughtException', err => {
//     console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
//     console.log(err.name, err.message);
//     process.exit(1);
//   });

dotenv.config({path:'./config.env'});
const app = express();

// const globalErrorHandler = require('./app/controllers/errorController');

const customerRouter = require('./app/routes/customerRoutes')
const tourRouter = require('./app/routes/tourRoutes');
const userRouter = require('./app/routes/userRoutes');
const vehicleRouter = require('./app/routes/vehicleRoutes');
const partRouter = require('./app/routes/partRoutes');
const locationRouter = require('./app/routes/locationRoutes');
const packageRouter = require('./app/routes/packageRoutes');
const paymentRouter = require('./app/routes/paymentRoutes');
const complaintRouter = require('./app/routes/complaintRoutes');

const corsOption = {
    origin:"http://localhost:3000"
}
const DB = process.env.DATABASE;
mongoose.connect(DB,{
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then(() => console.log('DB successfully connected'));

app.use(express.json());
// app.use(express.static(`${__dirname}/public`));
app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
});

app.use(cors(corsOption));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended:true}));
// serving static files
app.use('/uploads', express.static('uploads'));

// handle storage using multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
       cb(null, 'uploads');
    },
    filename: function (req, file, cb) {
       cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
    }
 });
 const upload = multer({ storage: storage });

 // handle single file upload
app.post('/uploadfile', upload.single('dataFile'), (req, res, next) => {
    //  console.log('dta');
    const file = req.file;
    if (!file) {
       return res.status(400).send({ status: 'fail', message: 'Please upload a file.' });
    }
    return res.send({ message: 'File uploaded successfully.', file });
 });
  
 // handle multiple file upload
 app.post('/uploadmultifile', upload.array('dataFiles', 3), (req, res, next) => {
     console.log(req.files);
    const files = req.files;
    if (!files || (files && files.length === 0)) {
       return res.status(400).send({ status: 'fail', message: 'Please upload a file.' });
    }
    return res.send({
                 message: 'File uploaded successfully.',
                 files
                 });
 });

app.get('/',(req,res)=>{
    res.json({message:'Tourism API'});
});

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/customers', customerRouter);
app.use('/api/v1/vehicles', vehicleRouter);
app.use('/api/v1/parts', partRouter);
app.use('/api/v1/locations', locationRouter);
app.use('/api/v1/packages', packageRouter);
app.use('/api/v1/payments', paymentRouter);
app.use('/api/v1/complaints', complaintRouter);

const PORT = process.env.PORT || 8080;
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}.`);
});


// process.on('unhandledRejection', err => {
//     console.log('UNHANDLED REJECTION! 💥 Shutting down...');
//     console.log(err.name, err.message);
//     server.close(() => {
//         process.exit(1);
//     });
// });

app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// app.use(globalErrorHandler);