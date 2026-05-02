const User = require('../models/User.model');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const { jwtSecret, jwtExpiresIn } = require('../config/constants');

const generateToken = (id) => jwt.sign({ id }, jwtSecret, { expiresIn: jwtExpiresIn });

const googleClient = new OAuth2Client();

// POST /api/auth/register
exports.register = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;
    const exists = await User.findOne({ email });
    if (exists) return res.status(409).json({ message: 'Email already registered' });

    const user = await User.create({ name, email, password, role });
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } catch (err) {
    next(err);
  }
};

// POST /api/auth/login
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } catch (err) {
    next(err);
  }
};

// POST /api/auth/google
exports.googleAuth = async (req, res, next) => {
  try {
    const { credential } = req.body;
    if (!credential) {
      return res.status(400).json({ message: 'Google credential token is required' });
    }

    // Verify the Google ID token
    const ticket = await googleClient.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const { sub: googleId, email, name, picture } = payload;

    if (!email) {
      return res.status(400).json({ message: 'Google account does not have an email' });
    }

    // Find existing user by googleId or email
    let user = await User.findOne({ $or: [{ googleId }, { email }] });

    if (user) {
      // Link Google account if user exists by email but hasn't linked Google yet
      if (!user.googleId) {
        user.googleId = googleId;
        if (picture && !user.avatar) user.avatar = picture;
        await user.save();
      }
    } else {
      // Create a new user (no password needed for Google OAuth)
      user = await User.create({
        name: name || email.split('@')[0],
        email,
        googleId,
        avatar: picture || '',
      });
    }

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
      token: generateToken(user._id),
    });
  } catch (err) {
    console.error('Google Auth Error:', err.message);
    res.status(401).json({ message: 'Invalid Google credentials. Please try again.' });
  }
};

// GET /api/auth/me
exports.getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

const { sendEmail } = require('../utils/mailer');

// PATCH /api/auth/profile
exports.updateProfile = async (req, res, next) => {
  try {
    const { name, currentPassword, newPassword, avatar, otp } = req.body;
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Update name if provided
    if (name) user.name = name;

    // Update avatar if provided
    if (avatar) user.avatar = avatar;

    // Handle password change
    if (newPassword) {
      // 1. Check current password
      if (user.password && !currentPassword) {
        return res.status(400).json({ message: 'Current password is required' });
      }
      if (user.password && !(await user.comparePassword(currentPassword))) {
        return res.status(401).json({ message: 'Current password is incorrect' });
      }

      // 2. Check OTP
      if (!otp) {
        return res.status(400).json({ message: 'OTP is required for password changes' });
      }
      if (user.otpCode !== otp || user.otpExpires < Date.now()) {
        return res.status(401).json({ message: 'Invalid or expired OTP' });
      }

      // Clear OTP and set new password
      user.otpCode = null;
      user.otpExpires = null;
      user.password = newPassword;
    }

    await user.save();

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
    });
  } catch (err) {
    next(err);
  }
};

// POST /api/auth/send-otp
exports.sendOtp = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.otpCode = otp;
    user.otpExpires = Date.now() + 10 * 60 * 1000; // 10 minutes
    await user.save();

    const html = `
      <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px; max-width: 500px;">
        <h2 style="color: #4CAF50;">CarSaga Verification</h2>
        <p>Your OTP code for changing your password is:</p>
        <div style="font-size: 32px; font-weight: bold; letter-spacing: 5px; color: #333; margin: 20px 0;">${otp}</div>
        <p style="color: #666; font-size: 14px;">This code expires in 10 minutes. If you didn't request this, please ignore this email.</p>
      </div>
    `;

    await sendEmail(user.email, 'CarSaga: Your OTP Code', html);

    res.status(200).json({ message: 'OTP sent to your email' });
  } catch (err) {
    next(err);
  }
};
