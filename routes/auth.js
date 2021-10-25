const express = require('express');
const { check, body } = require('express-validator');

const authController = require('../controllers/auth');
const User = require('../models/user');

const router = express.Router();

router.get('/login', authController.getLogin);

router.get('/signup', authController.getSignup);

router.post(
  '/login',
  [
    body('email')
      .isEmail()
      .withMessage('Please enter valid email address.')
      .normalizeEmail(),
    body('password', 'Please enter a valid password.')
      .isLength({min: 5})
      .isAlphanumeric()
      .trim()
  ], 
  authController.postLogin);

router.post(
  '/signup', 
  [                                   //validation block
    check('email')
      .isEmail()
      .withMessage('Please enter a valid email.')
      .custom((value, {req}) => {
        //if (value === 'test@test.com') {       //use as reference of specific validation
        //  throw new Error('This email address is forbidden.')
        //}
        //return true;
        return User.findOne({ email: value }).then(userDoc => {
          if (userDoc) {
            return Promise.reject(
              'E-mail exists already, please pick a different one.'
              );
            }
        });
      })
      .normalizeEmail(), 
    body(
      'password', 
      'Please enter a password with only numbers and text and at least 5 characters.'
    )
      .isLength({min: 5})
      .isAlphanumeric()
      .trim(),
    body('confirmPassword').trim().custom((value, {req}) => {
      if (value !== req.body.password) {
        throw new Error('Passwords have to match!');
      }
      return true;
    })
  ],  
  authController.postSignup
);

router.post('/logout', authController.postLogout);

router.get('/reset', authController.getReset);

router.post('/reset', authController.postReset);

router.get('/reset/:token', authController.getNewPassword);

router.post('/new-password', authController.postNewPassword);



module.exports = router;