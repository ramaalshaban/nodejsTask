const Employees = require("../models/employee");
const userRole = require("../middleware/auth")
const express = require('express');
const router = express.Router();


const adminController = require("../controllers/admin");

router.post('/',userRole,adminController.addEmployee);
router.delete('/:id',userRole, adminController.deleteEmployee);
router.patch('/:id',userRole, adminController.updateEmployee);


module.exports = router;
