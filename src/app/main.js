for(let i = 0;i<10;i++) {
  console.log(i);
}


function print (i) {
  console.log(i);
}


function asyncFor(fn) {
  for(let i = 0;i<10;i++) {
    setTimeout(fn(i), 0)
  }
}
