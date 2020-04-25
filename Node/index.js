
const express = require('express');
const app = express();

app.set('port',process.env.PORT || 8090);

app.listen(app.get('port'),()=>{
console.log(`Server listening on ${app.get('port')}`);
})