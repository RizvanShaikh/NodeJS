var baseSum=require("./_baseSum"),identity=require("./identity");function sum(e){return e&&e.length?baseSum(e,identity):0}module.exports=sum;