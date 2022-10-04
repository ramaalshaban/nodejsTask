
const adminControllers = {};

adminControllers.addEmployee = async (req, res) => {
  const { firstname, lastname, email, department, address, isAdmin } = req.body;
  const password_hash = await bcrypt.hash(req.body.password, 10);
  const newEmployee = await Employees.create({
    firstname,
    lastname,
    email,
    department,
    address,
    isAdmin,
    password_hash,
  });
  res.status(201).json(newEmployee);
};

adminControllers.updateEmployee = async (req, res) => {
  const employee = await Employees.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (!employee) res.status(404).send("No Employee found");
  res.status(200).json(employee);
};

adminControllers.deleteEmployee = async (req, res) => {
  const employee = await Employees.findByIdAndDelete(req.params.id);
  if (!employee) {
    res.status(422).json({ message: "No Employee found!" });
  } else {
    res.status(204).json(employee);
  }
};

module.exports = adminControllers;
