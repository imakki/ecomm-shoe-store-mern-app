import express from 'express';
import User from '../models/userModel';
import { getToken, isAuth } from '../util';

const router = express.Router();

router.put('/:id', isAuth, async (req, res) => {
  const userId = req.params.id;
  const user = await User.findById(userId);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.password = req.body.password || user.password;
    const updatedUser = await user.save();
    res.send({
      _id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: getToken(updatedUser),
    });
  } else {
    res.status(404).send({ message: 'User not found' });
  }
});

router.post('/signin', async (req, res, next) => {
  const signinUser = await User.findOne({
    email: req.body.email,
    password: req.body.password,
  });
  if (signinUser) {
    res.send({
      _id: signinUser.id,
      name: signinUser.name,
      email: signinUser.email,
      isAdmin: signinUser.isAdmin,
      token: getToken(signinUser),
    });
  } else {
    res.send({ msg: 'Invalid email or password' });
  }
});

router.post('/register', async (req, res, next) => {
  const name = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.send({ msg: 'email already exists!' });
    }
    const registerUser = new User({ name, email, password });
    const newUser = await registerUser.save();
    res.send(newUser);
  } catch (error) {
    res.send({ msg: error.message });
  }
});

router.get('/createAdmin', async (req, res, next) => {
  try {
    const user = new User({
      name: 'Ankit',
      email: 'ankityc143@gmail.com',
      password: 'aneken',
      isAdmin: true,
    });
    const newUser = await user.save();
    res.send(newUser);
  } catch (error) {
    res.send({ msg: error.message });
  }
});

export default router;
