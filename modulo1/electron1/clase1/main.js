const ProgressBar = require("progress")
var readlineSync = require('readline-sync')

let tope = readlineSync.question("Introduzca el tope de la barra de progreso:" )
let tiempo = readlineSync.question("Introduzca el tiempo de progreso (milisegundos):" )

var bar = new ProgressBar(':bar', { total: parseInt(tope) });
var timer = setInterval(function () {
  bar.tick();
  if (bar.complete) {
    console.log('\ncomplete\n');
    clearInterval(timer);
  }
}, tiempo); 