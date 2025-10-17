import jwt from 'jsonwebtoken';
import User from '../models/User.js';

function signToken(userId) {
  return jwt.sign({}, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '1d',
    subject: String(userId)
  });
}

export async function register(req, res, next) {
  try {
    const { name, email, password } = req.body;
    const exists = await User.findOne({ email });
    if (exists) return res.status(409).json({ message: 'Email already registered' });

    const created = await User.create({ name, email, password });
    const token = signToken(created._id);
    res.status(201).json({
      message: 'Registered successfully',
      data: { id: created._id, name: created.name, email: created.email },
      token
    });
  } catch (e) { next(e); }
}

export async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const ok = await user.comparePassword(password);
    if (!ok) return res.status(401).json({ message: 'Invalid credentials' });

    const token = signToken(user._id);
    res.json({
      message: 'Logged in',
      data: { id: user._id, name: user.name, email: user.email },
      token
    });
  } catch (e) { next(e); }
}
