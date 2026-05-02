const router = require('express').Router();
const { register, login, googleAuth, getMe, updateProfile } = require('../controllers/auth.controller');
const { protect } = require('../middlewares/auth.middleware');

router.post('/register', register);
router.post('/login', login);
router.post('/google', googleAuth);
router.get('/me', protect, getMe);
router.patch('/profile', protect, updateProfile);

module.exports = router;
