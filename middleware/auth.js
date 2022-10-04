const Employees = require("../models/employee");
const mongoose = require('mongoose');
const { decode } = require("jsonwebtoken");

function userRole(req, res, next) {
  const token = req.body.token;
  if(token){
      const decode = jwt.verify(token, 'secret');

      const admin = await Employees.findOne({
        _id: mongoose.Types.ObjectId(decode.id),
    });
      if (admin.isAdmin) {
        next();
      } else 
        return res.status(403)
        .json({ message: "You're not authorized" });
    };
  }
    
  module.exports = userRole;
  
