class AppError extends Error {
    constructor(message, statusCode, res) {
      super(message);
  
      this.statusCode = statusCode;
      this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
      this.isOperational = true;

      res.status(statusCode).json({
        status: 'fail',
        error: message
      });

      Error.captureStackTrace(this, this.constructor);
    }
  }
  
  module.exports = AppError;