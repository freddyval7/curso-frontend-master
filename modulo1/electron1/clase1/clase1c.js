// para leer entradas de la consola
const readline = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout
})

readline.question("Introduzca la edad:",(edad)=>{
    console.log(edad)
    if (edad < 18)
        console.log("Es menor de edad")
    else
        console.log("Es mayor de edad")
    readline.close()
}) 