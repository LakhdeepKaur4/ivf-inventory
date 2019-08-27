const http = require('http');
http.get("http://localhost:4200/users",data=>{
console.log("data json server ", data);
});