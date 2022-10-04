const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/employee');

const login = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const foundUser = await UserModel.findOne({
        email,
      });
  
      if (!foundUser) {
        return res.status(401).json({ message: 'Wrong username or password!' });
      }
      const validPassword = await bcrypt.compare(
        password,
        foundUser.password_Hash
      );
      if (!validPassword) {
        return res.status(401).json({ message: 'Wrong username or password!' });
      }
  
      const payload = { userId: foundUser.id };
      const token = jwt.sign(payload, process.env.SECRET_KEY, {
        expiresIn: '14d',
      });
      res.cookie('token', token, {
        httpOnly: true,
        signed: true,
        maxAge: 1000 * 60 * 60 * 24 * 14, // 14 days
      });
      if(foundUser.isAdmin)
        {return res.status(201).json({ message: 'You will be redirected to the Admin Dashboard' });}
        else {
        return res.status(201).json({ message: 'Employee successfully signed in!' });}

    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };
  
  const logout = async (req, res) => {
    await res.clearCookie('token');
    return res.status(200).json({ message: 'Logged out successfully' });
  };


  const register = async (req, res) => {
    const errorsArray = [];
    const { firstName, lastName, email, password } = req.body;
  
    try {
      const usedEmail = await UserModel.findOne({ email });
      if (usedEmail) {
        errorsArray.push('Email is already taken');
      }
  
      if (errorsArray.length > 0) {
        return res.status(400).json({ error: errorsArray });
      }
  
      const passwordHash = await bcrypt.hash(password, 10);
      const newUser = await UserModel.create({
        firstName,
        lastName,
        email,
        passwordHash,
      });
  
      const shownInfo = {
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
      };
  
  
      return res.status(201).json(shownInfo);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };

  module.exports = {login , register ,logout};