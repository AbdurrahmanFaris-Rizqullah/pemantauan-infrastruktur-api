function errorHandler(err, req, res, next) {
    let status = err.status;
    let message = err.message;
    switch (err.name) {
      case "invalid input":
        status = 400;
        message = "name/ type/ Coordinat/ Status infrastructure cannot be empty";
        break;
      case "invalid input name":
        status = 400;
        message = "wrong input name Infrastructure";
      case "invalid input type":
        status = 400;
        message = "type hanya berisi 'jalan', 'trotoar', 'lampu jalan', 'jembatan', 'drainase' ";
        break;
      case "invalid input coordinate":
        status = 400;
        message = "Poligon harus memiliki minimal 3 titik";
        break;
      case "invalid user":
        status = 401;
        message = "Error login user not found / password not matched";
        break;
      case "infrastructure not found":
        status = 404;
        message = "Error not found infrastructure";
        break;
      case "Invalid Token":
        status = 401;
        message = "Error Authentication";
        break;
      case "JsonWebTokenError":
        status = 401;
        message = "Error Authentication";
        break;
      case "Forbidden":
        status = 403;
        message = "Forbidden error authorization";
        break;
      case "SequelizeValidationError":
        status = 400;
        message = err.errors.map((err) => err.message);
        break;
      case "ValidationErrorItem":
        status = 400;
        message = err.errors.map((err) => err.message);
        break;
      case "SequelizeUniqueConstraintError":
        status = 400;
        message = err.errors.map((err) => err.message);
        break;
      case "FileRequired":
        status = 400;
        message = "File is required";
        break;
      default:
        status = 500;
        message = "Internal Server Error";
        break;
    }
    console.log(err.name);
    res.status(status).json({ message });
  }
  
  module.exports = errorHandler;
  