const readlineSync = require('readline-sync');
let factura = []

const nombre = readlineSync.question("Introduzca el nombre del cliente: ")
const rif = readlineSync.questionInt("Introduzca el rif del cliente: ")

if(process.argv.length < 3)
    process.argv.push(100) 

let subtotales = []   

for(i = 0; i < parseInt(process.argv[2]); i++){
    const nombreProducto = readlineSync.question(`Introduzca el nombre del ${i+1}° producto: `)
    const cantidad = readlineSync.questionInt(`Introduzca la cantidad a comprar: `)
    const precio = readlineSync.questionInt(`Introduzca el precio del ${i+1}° producto: `)

    let subtotal = cantidad * precio

    subtotales.push(subtotal)

    let item = {
        nombreProducto,
        cantidad,
        precio,
        subtotal
    }

    factura.push(item)
}

const sumSubtotales = subtotales.reduce((acc, item) => {
    return acc = acc + item;
}, 0)

const iva = sumSubtotales * 0.16

const montoTotal = sumSubtotales + iva

console.log(`El cliente ${nombre}, debe pagar un subtotal de ${sumSubtotales}$, un Iva de ${iva}$ y un monto total de ${montoTotal}$`)







