function printThis() {
  console.log(this);
  this.message = "I am a good person";
}

function myNew(fnCtor) {
  var o = {};
  // 3 ways: call/apply, bind
  fnCtor.call(o);
  return o;
}

printThis();

var o = new printThis();
console.log(o);

var otherO = myNew(printThis);
console.log(otherO);
