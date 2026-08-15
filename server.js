//server.js
/*
	Tac gia : TRAN DO DUC NGHIA
*/
console.clear();
process.env.TZ = 'Asia/Ho_Chi_Minh';
console.log('Thoigian:' + (new Date()).getDate());
require('dotenv').config();
var cors = require('cors');
let express = require('express');
let app = express();

app.use(cors({  
    origin: '*',
    optionsSuccessStatus: 200
}));

let port = process.env.PORT || 2004;

let expressWs = require('express-ws')(app);
let since2004 = expressWs.getWss();
global['list'] = []; 
global['TOTALONLINE'] = 0;

require('./app/Model/core/send')(since2004); // Add function socket
require('./http')(app, since2004); // load các routes HTTP
require('./websocket')(app, since2004); // load các routes WebSocket
require('./app/Controller/Cron/CSMM')(since2004);
require('./app/Controller/Cron/TaiXiu')(since2004);
require('./app/Controller/Cron/Cron');
 
// Mở cổng lắng nghe và bind vào '0.0.0.0' cho Render nhận diện
app.listen(port, '0.0.0.0', function() { 
    console.log("Server listen on port ", port);
}); 

let mysqli = require('./app/Model/mysqli');
mysqli.query("UPDATE `nguoichoi` SET `time_online` = '0'", function (err, users) {
    if (err) console.log("DB Notice:", err.message);
});

console.log('start game');

process.on('beforeExit', code => {
    setTimeout(() => {
      console.log(`Process will exit with code: ${code}`);
      process.exit(code);
    }, 100);
});
  
process.on('exit', code => {
    console.log(`Process exited with code: ${code}`);
});
