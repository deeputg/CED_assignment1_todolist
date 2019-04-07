var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post("/updateStatus",function(req,res){
  todoApp.methods.updateStatus(req.body.taskId).send({from:coinbase,gas:600000})
  res.redirect("/");
})

router.post("/addTask",function(req,res){
  todoApp.methods.newTask(req.body.title).send({from:coinbase,gas:600000})
  res.redirect("/");
})

module.exports = router;
