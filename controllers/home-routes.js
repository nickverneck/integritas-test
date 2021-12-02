const router = require('express').Router();
const { User} = require('../models');
const { Op } = require("sequelize");
const { log } = require('handlebars');
// dashboard.handlebars
router.get('/', async(req, res) => {
  if (req.session.loggedIn) {
    try {
      const user = await User.findByPk(req.session.userID);
      
      res.render('dashboard', {
        
         name: user.name,dob: user.dob,address: user.address,email: user.email,
        loggedIn: req.session.loggedIn
      });
    } catch (error) {
      console.log(error);
    }
  }
  else {res.redirect('/login');}
});
// register.handlebars
router.get('/register', (req, res) => {
  res.render('register')
});
router.get('/update', (req, res) => {
  if (req.session.loggedIn) {
  res.render('update')
  }
  else {res.redirect('/login');}
});
// login.handlebars
router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    
    res.redirect('/');
    return;
  }
  res.render('login');
 
});






module.exports = router;