const express = require('express');
const router  = express.Router();

/* GET home page */
router.get('/location', (req, res, next) => {
  res.json({testMessage: "your back end works!"});
});

module.exports = router;