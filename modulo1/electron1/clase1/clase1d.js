// para leer entradas de la consola
var readlineSync = require('readline-sync')

let edades=[];
for (let i=0;i < 3;i++){
    edad = readlineSync.question("Introduzca la edad:" )
    edades.push(edad)
}
//readline.close();
console.log(`La ultima edad es ${edades[2]}`) 