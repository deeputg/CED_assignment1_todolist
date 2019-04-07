pragma solidity ^0.5.0;

contract todo{
    uint[] taskIdArr;
    uint newTaskId = 1;
    struct taskStruct{
        string title;
        bool status;
    }
    mapping (uint=>taskStruct) task;
    
    function newTask(string memory _title)public {
        task[newTaskId]=taskStruct(_title,false);
        taskIdArr.push(newTaskId);
        newTaskId+=1;
    }
    
    function getAllTaskArray()public view returns(uint[]memory _taskIdArr){
        _taskIdArr = taskIdArr;   
    }
    
    function getTask(uint _taskid)public view returns(uint taskId, string memory _title,bool _status){
            taskId=_taskid;
            _title = task[_taskid].title;
            _status = task[_taskid].status;
    }
    function updateStatus(uint _taskid)public{
        if(task[_taskid].status==false)
        task[_taskid].status = true;
        else
        task[_taskid].status = false;
        
    }
}

