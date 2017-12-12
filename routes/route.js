var express = require('express');
var moment = require('moment');
var router = express.Router();

//GET homepage route
router.get('/', function(req, res, next) {
  res.render('index');
  next();
});

router.get('/:time', function(req, res) {
  
  var input;
  var time = req.params.time;
  var dateFormat = /\w+\s\w{2}\,\s\w{4}/g;
  var unixFormat = /^\d{1,}/g;
  
  var input = {
    unix: {
      test: unixFormat.test(time),
      validate: moment(time, "X")
    },
    date: {
      test: dateFormat.test(time),
      validate: moment(time, "MMMM D, YYYY")
    }
  };
  
  if (input.unix.test) {
    let val = input.unix.validate;
    sendJSON(val);
  } else if (input.date.test){
      let val = input.date.validate;
      sendJSON(val);
  } else {
      res.json({
          unix: null,
          natural: null   
      });
  }
  
  function sendJSON(validation) {
    if(validation.isValid()) {
      res.json({
        unix: validation.format("X"),
        natural: validation.format("MMMM D, YYYY")
      });
    } 
  }
  
});

module.exports = router;