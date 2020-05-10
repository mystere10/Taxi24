const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Welcome to taxi24'
    })
})

module.exports = router;