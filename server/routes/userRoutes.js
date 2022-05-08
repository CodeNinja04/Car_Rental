const express = require('express')
const router = express.Router()
const {
    registerUser,
    loginUser,
    getMe,
} = require('../controllers/userController')
const { protected } = require('../middlewares/auth')

router.post('/', registerUser)
router.post('/login', loginUser)
router.get('/me', protected, getMe)

module.exports = router