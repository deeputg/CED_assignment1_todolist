var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  
  todoApp.methods.getAllTaskArray().call({from:coinbase}).then((val)=>{
    //console.log(val)
    taskData = new Array();
    taskData1 = new Array();
    for(let i=0;i<val.length;i++){
      taskData1.push(todoApp.methods.getTask(val[i]).call({from:coinbase}));
      // todoApp.methods.getTask(val[i]).call({from:coinbase}).then((taskDetails)=>{
      //   //console.log(taskDetails)
      //   taskData.push({taskId:val[i],taskTitle:taskDetails.title,taskStatus:taskDetails.status});
      //   console.log(taskData);
      // })
    }
    //console.log(taskData1);
    Promise.all(taskData1).then(function(result){
      console.log(result);
      res.render('index',{todoArr:result} );
    })
    
    
  })
  //console.log(todoList)
  // for(let i=0;i<todoList.length;i++){
  //   todoApp.methods.getTask(todoList[i]).call({from:coinbase}).then((val)=>{
  //     todoList = val;
  //   })
  // }
  
});

module.exports = router;
