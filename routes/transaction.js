const express = require('express');
const router  = express.Router();
const Transaction = require ('../models/Transaction')

/* GET home page */
router.get('/transaction', (req, res, next) => {
  res.json({testMessage: "your back end works!"});
});

router.post('/request', (req,res) => {
  let tooId = req.body.tool;
  let ownerId = req.body.owner;
  let sDate = req.body.startDate;
  let eDate = req.body.endDate;
  let reqType = req.body.type;
  let userId = req.session.currentUser._id;
  Transaction.create({
    type: reqType,
    startDate: sDate,
    endDate: eDate,
    maker: userId,
    target: ownerId,
    tool: tooId
  })
  .then((tranData) => {
    res.status(200).json({
      messageBody: "Request created successfully!",
      data: tranData
    })
  })
  .catch(err => {
    res.status(500).json({
      messageBody: `Error, could not create the transaction because: ${err}`
    })
  });
  
})


module.exports = router;