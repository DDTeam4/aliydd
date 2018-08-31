var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/router/index');
var usersRouter = require('./routes/router/users');
var signupRouter = require('./routes/router/signup');
var signuphouseRouter = require('./routes/router/signuphouse');
var signinRouter = require('./routes/router/signin');
var customerRouter = require('./routes/router/customer');
var ownerRouter = require('./routes/router/owner');
var rentsuccessRouter = require('./routes/router/rentsuccess');
var changehouseRouter = require('./routes/router/changehouse');
var leaseRouter = require('./routes/router/lease');
var lease1Router = require('./routes/router/lease1');
var listHouseRouter = require('./routes/router/listhouse');
var rentRouter = require('./routes/router/rent');
var myRentRouter = require('./routes/router/myrent')
var ownerRentRouter = require('./routes/router/ownerrent')

var viewContract = require('./routes/service/viewcontract')
var signupServiceRouter = require('./routes/service/signup');
var signuphouseServiceRouter = require('./routes/service/signuphouse');
var signinServiceRouter = require('./routes/service/signin');
var enrollServiceRouter = require('./routes/service/enrollAdmin');
var registerServiceRouter = require('./routes/service/registerUser');
var queryServiceRouter = require('./routes/service/queryallperson');
var queryhouseServiceRouter = require('./routes/service/queryallhouse');
var queryhousebyownerServiceRouter = require('./routes/service/queryhousebyowner');
var queryoneServiceRouter = require('./routes/service/queryperson');
var queryInfoServiceRouter = require('./routes/service/queryinfo');
var queryOwnerContractServiceRouter = require('./routes/service/querycontractbyowner');
var queryAllContractRouter = require('./routes/service/queryallcontract');
var queryAllContractOwnerRouter = require('./routes/service/queryallcontract-owner');
var queryRequestContractRouter = require('./routes/service/queryrequestcontract');
var queryRequestContractOwnerRouter = require('./routes/service/queryrequestcontract-owner');
var queryConfirmContractRouter = require('./routes/service/queryconfirmcontract');
var queryFinishContractRouter = require('./routes/service/queryfinishcontract');
var queryConfirmOwnerContractRouter = require('./routes/service/queryconfirmcontract-owner');
var queryFinishOwnerContractRouter = require('./routes/service/queryfinishcontract-owner');
var createInfoServiceRouter = require('./routes/service/createinfo');
var createContract = require('./routes/service/createcontract');
var cancelContract = require('./routes/service/cancelcontract');
var getOwnerInfo = require('./routes/service/getownerinfo');
var customerConfirmContract = require('./routes/service/customerconfirmcontract');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//app.use(express.static(path.join(__dirname, 'src')));

app.use('/', enrollServiceRouter,registerServiceRouter,indexRouter);
app.use('/users', usersRouter);
app.use('/signup',signupRouter);
app.use('/signin',signinRouter);
app.use('/signuphouse',signuphouseRouter);
app.use('/customer',customerRouter);
app.use('/owner',ownerRouter);
app.use('/changehouse',changehouseRouter);
app.use('/lease',leaseRouter);
app.use('/lease1',lease1Router);
app.use('/listHouse',listHouseRouter);
app.use('/rentsuccess',rentsuccessRouter);
app.use('/rent',rentRouter);
app.use('/myrent',myRentRouter);
app.use('/ownerrent',ownerRentRouter);
app.use('/viewcontract',viewContract);

app.use('/signupService',signupServiceRouter);
app.use('/signuphouseService',signuphouseServiceRouter);
app.use('/signinService',signinServiceRouter);
app.use('/queryService',queryServiceRouter);
app.use('/queryhouseService',queryhouseServiceRouter);
app.use('/queryhousebyownerService',queryhousebyownerServiceRouter);
app.use('/queryoneService',queryoneServiceRouter);
app.use('/queryInfoService',queryInfoServiceRouter);
app.use('/queryOwnerContractService',queryOwnerContractServiceRouter);
app.use('/allcontract',queryAllContractRouter);
app.use('/allcontract-owner',queryAllContractOwnerRouter);
app.use('/requestcontract',queryRequestContractRouter);
app.use('/requestcontract-owner',queryRequestContractOwnerRouter);
app.use('/confirmcontract',queryConfirmContractRouter);
app.use('/finishcontract',queryFinishContractRouter);
app.use('/confirmownercontract',queryConfirmOwnerContractRouter);
app.use('/finishownercontract',queryFinishOwnerContractRouter);

app.use('/createInfoService',createInfoServiceRouter);
app.use('/createcontract',createContract);
app.use('/cancelcontract',cancelContract);
app.use('/getownerinfo',getOwnerInfo);
app.use('/customerconfirmcontract',customerConfirmContract);

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
