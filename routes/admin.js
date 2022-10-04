const Employees = require("../models/employee");
const userRole = require("../middleware/auth")
const express = require('express');
const router = express.Router();


const adminController = require("../controllers/admin");

router.post('/',userRole,adminController.addEmployee);
router.post('/:id/delete',userRole, adminController.deleteEmployee);
router.post('/:id/update',userRole, adminController.updateEmployee);


module.exports = router;