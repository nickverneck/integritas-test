const router = require('express').Router();
const { User } = require('../../models');

require('dotenv').config();
// register
router.post('/register', async (req, res) => {
    try {
      const dbUserData = await User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
      });
      
      req.session.save(() => {
        req.session.loggedIn = true;
         req.session.userID = dbUserData.id;
        res.render('login',{loggedIn: req.session.loggedIn})
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });
  
  // Login
  router.post('/login', async (req, res) => {
    try {
      const dbUserData = await User.findOne({
        where: {
          username: req.body.username,
         
        },
      });
  
      if (!dbUserData) {
        res
          .status(400)
          .json({ message: 'Incorrect username or password. Please try again!' });
        return;
      }
  
      const validPassword = await dbUserData.checkPassword(req.body.password);
  
      if (!validPassword) {
        res
          .status(400)
          .json({ message: 'Incorrect email or password. Please try again!' });
        return;
      }
  
      req.session.save(() => {
        req.session.loggedIn = true;
        req.session.userID = dbUserData.id;
        console.log(dbUserData.name)
        //  res.render('dashboard',{fullName:dbUserData.name,email:dbUserData.email,dob:dbUserData.dob,address:dbUserData.address ,loggedIn: req.session.loggedIn})
       res.redirect('/')
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });
  // update user
  router.post('/update', async (req, res) => {
    if (req.session.loggedIn) {
      try {
        const dbUserData = await User.update(
          {
            name: req.body.name,
           
            dob: req.body.dob,
            address: req.body.address,
          },
          {
            where: {id: req.session.userID},
  })
res.redirect('/')
}
  catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
}
});

  
  // Logout
  router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    } else {
      res.status(404).end();
    }
  });
  
  module.exports = router;