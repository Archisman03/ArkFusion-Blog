const express = require('express');
const { signUp } = require('../controller/auth_controller.js');

const router = express.Router();

router.post('/signup', signUp);

module.exports =router;