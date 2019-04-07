var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


var Web3=require("web3");
web3 = new Web3("http://localhost:8545");

coinbase = "0x5f3096543ebd2d93578a80719ef4b782ed303088";
contrcatAddr = "0xc7ee9b3fe6b2ab2db399a0bb6c0a6043b2e85bff";
contractABI = [
	{
		"constant": false,
		"inputs": [
			{
				"name": "_title",
				"type": "string"
			}
		],
		"name": "newTask",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_taskid",
				"type": "uint256"
			}
		],
		"name": "updateStatus",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getAllTaskArray",
		"outputs": [
			{
				"name": "_taskIdArr",
				"type": "uint256[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_taskid",
				"type": "uint256"
			}
		],
		"name": "getTask",
		"outputs": [
			{
				"name": "taskId",
				"type": "uint256"
			},
			{
				"name": "_title",
				"type": "string"
			},
			{
				"name": "_status",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
];

todoApp = web3.eth.Contract(contractABI,contrcatAddr);

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var todoRouter = require("./routes/todo");

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use("/todo",todoRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
