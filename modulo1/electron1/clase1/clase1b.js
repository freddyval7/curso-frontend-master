//console.log ("Los parametros recibidos fueron")
//console.log (process.argv)

// la aplicacion espera que le envien 2 parametros
if (process.argv.length < 4)
    console.log("Se esperan 2 parametros")
else{
    let base = parseInt(process.argv[2])
    if (isNaN(base))
        console.log("se espera un numero como primer parametro")
    else{
        let altura = parseInt(process.argv[3])
        if (isNaN(altura))
            console.log("se espera un numero como segundo parametro")
        else{
            let area = base*altura;

            console.log(`el area es ${area}`)
        }
    }
}