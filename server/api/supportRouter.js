const express = require('express');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

const User = require('../db/models/User');

const supportRouter = express.Router();

// const requireToken = require('../requireToken');

supportRouter.post('/forgotPassword', async (req, res, next) => {
  if (!req.body.email) res.status(400).send('email required');
  console.error(req.body.email);
  const { email } = req.body;

  const user = await User.findOne({
    where: {
      email,
    },
  });

  if (!user) {
    console.error('Route - Forgot Password: email not found');
    // res.status(403).send({ message: 'email not found' });
    res.status(200).send({ message: 'email not found' });
  } else {
    const resetToken = crypto.randomBytes(20).toString('hex');
    user.update({
      resetPasswordToken: resetToken,
      resetPasswordTokenExpires: Date.now() + 3600000,
    });

    const mailService = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: `${process.env.RESET_EMAIL_ADDRESS}`,
        pass: `${process.env.RESET_EMAIL_PASSWORD}`,
      },
    });

    const returnUrl = `${req.protocol}://${req.get('host')}/#/ResetPassword/${resetToken}`;

    const mailOptions = {
      from: 'NoReply.NoCap@gmail.com',
      to: `${user.email}`,
      subject: 'Reset Password for your NoCap Account',
      text:
        'You are receiving this email because someone requested that the password be reset for this account.\n\n'
        + 'If you did not request this, please ignore this!\n\n'
        + `Click here to reset your password: ${returnUrl}\n\n`,
    };

    console.log('Sending password reset email...');

    mailService.sendMail(mailOptions, (err) => {
      if (err) {
        console.error('error sending password reset email: ', err);
        next(err);
      } else {
        console.log('Password reset email response: ', res);
        res.status(200).send({ message: 'Recovery email sent!' });
      }
    });
  }
});

supportRouter.get('/reset', async (req, res, next) => {
  const { resetToken } = req.query;

  try {
    const user = await User.findAll({
      where: {
        resetPasswordToken: resetToken,
        // resetPasswordTokenExpires: {
        //   $gt: Date.now(),
        // },
      },
    });
    console.log(user[0]);
    res.status(200).send({
      email: user[0].email,
      message: 'password link accepted',
    });
  } catch (err) {
    console.log('Reset link is invalid or expired', err);
    res.send({ message: 'Reset link is invalid or expired' });
    next(err);
  }
});

supportRouter.put('/updatePassword', async (req, res, next) => {
  try {
    console.log(req.body);
    const { email, password } = req.body;
    const user = await User.findAll({
      where: {
        email,
      },
    });
    if (user[0]) console.log('found user in db');
    const updatedUser = await user[0].update({
      password,
      resetPasswordToken: null,
      resetPasswordTokenExpires: null,
    });
    if (updatedUser) {
      console.log('password updated');
      res.status(200).send({ message: 'Password successfully updated!' });
    }
  } catch (err) {
    console.log('User not found during password update');
    // should be 404
    res.status(200).send({ message: 'User not found during password update' });
    next(err);
  }
});

module.exports = supportRouter;
