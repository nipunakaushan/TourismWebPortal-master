const Payment = require('../models/paymentsModel');

exports.createPayment = async (req,res) => {
    try  {
        const newPayment = await Payment.create(req.body);
        const token = '122jdhhddyge5534hnd87fnnbf77djmjdh';
        res.status(200).json({
            status: 'Success',
            token,
            data: newPayment
        });
    }catch(err){
        res.status(400).json({
            status: 'Fail',
            message: 'Invalid data',
            error: err
        });
    }
};

exports.getAllPayments = async (req,res) => {
    try {
        const payments = await Payment.find();

        res.status(200).json({
            status: 'Success',
            result: payments.length,
            data: payments
        });
    }catch(err){
        res.status(400).json({
            status: 'Fail',
            message: 'Server error',
            error: err
        });
    }
};

exports.getTypePayments = async (req, res, next) => {
    // const year = req.params.year * 1; // 2021
  try{
    const payments = await Payment.aggregate([
          {
            $group: 
            {
                _id: {type: "$paymentFor", year: { $year: "$paymentDate" }},
                totalAmount: { $sum: '$amount' },
                count: { $sum: 1 }
              }
          },
          {
            $addFields: { yearType: '$_id' }
          },
          {
            $project: {
              _id: 0
            }
          },
        ]);
      
        res.status(200).json({
          status: 'success',
          data: {
            payments
          }
        });
  }catch(err){
    res.status(400).json({
        status: 'Fail',
        message: 'Server error',
        error: err
    });
  }
    
  };

  exports.getMonthlyPayments = async (req, res, next) => {
    // const year = req.params.year * 1; // 2021
  try{
    const payments = await Payment.aggregate([
          {
            $group: 
            {
                _id: { year: {$year: "$paymentDate"},
                        month: {$month: "$paymentDate"} 
                    },
                totalAmount: { $sum: '$amount' },
                count: { $sum: 1 }
              }
          },
          {
            $addFields: { yearMonth: '$_id' }
          },
          {
            $project: {
              _id: 0,
            }
          },
          {
            $limit: 12
          }
        ]);
      
        res.status(200).json({
          status: 'success',
          data: {
            payments
          }
        });
  }catch(err){
    res.status(400).json({
        status: 'Fail',
        message: 'Server error',
        error: err
    });
  }
    
  };

// exports.getOnePart = async (req,res) => {
//     try {
//         const part = await Part.findById(req.params.id);

//         res.status(200).json({
//             status: 'Success',
//             data: part
//         });
//     }catch(err){
//         res.status(400).json({
//             status: 'Fail',
//             message: 'Given id is not exist',
//             error: err
//         });
//     }
// };

// exports.updatePart = async (req,res) => {
//     try { 
//         const updatedPart = await Part.findByIdAndUpdate(req.params.id, req.body, {
//             new: true,
//             runValidators: true
//         });

//         res.status(200).json({
//             status: 'Success',
//             data: updatedPart
//         });
//     }catch(err) {
//         res.status(400).json({
//             status: 'Fail',
//             message: 'Given id is not exist',
//             error: err
//         });
//     }
// };

// exports.deletePart = async (req,res) => {
//     try {
//         await Part.findByIdAndDelete(req.params.id);

//         res.status(200).json({
//             status: 'Success',
//             data: null,
//             message: 'Successfully deleted'
//         });
//     }catch(err) {
//         res.status(400).json({
//             status: 'Fail',
//             message: 'Given id is not exist',
//             error: err
//         });
//     }
// };