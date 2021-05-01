const express = require('express');

const {
  models: { User },
} = require('../db/models/associations');

const registerRouter = express.Router();

registerRouter.post('/', async (req, res, next) => {
  try {
    const {
      firstName, lastName, email, password,
    } = req.body;

    const tryToFindUser = await User.findOne({ where: { email } });

    if (tryToFindUser) {
      res.status(403).json({ message: 'User already exists ' });
    }
    await User.create({
      firstName,
      lastName,
      email,
      password,
    });
    const token = await User.authenticate(req.body);

    res.status(201).send({ token });
  } catch (error) {
    res.redirect('/register');
    next(error);
  }
});

registerRouter.put('/', async (req, res, next) => {
  try {
    const {
      firstName, lastName, email, password, anonUser,
    } = req.body;

    const tryToFindUser = await User.findOne({ where: { email } });
    const anonymousUser = await User.findByPk(anonUser);

    if (tryToFindUser) {
      res.status(403).json({ message: 'User already exists ' });
    }
    await anonymousUser.update({
      firstName,
      lastName,
      email,
      password,
    });
    console.log(anonymousUser);
    const token = await User.authenticate({ email, password });

    res.status(201).send({ token });
  } catch (error) {
    res.redirect('/register');
    next(error);
  }
});

module.exports = registerRouter;
