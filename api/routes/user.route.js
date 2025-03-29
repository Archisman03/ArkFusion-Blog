const express = require('express');
const { test } = require('../controller/user_controller');

const router = express.Router();

// router.get('/test', (req, res) => {
//     res.json({
//         message: "API is working"
//     })
// });
//the main logic is inside the controller

router.get('/test', test );

module.exports = router;