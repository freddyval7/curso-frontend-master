document.getElementById("btnPegar").onclick=()=>{
    console.log(bridge.portaPapeles.readText())
    document.getElementById("texto").innerText=bridge.portaPapeles.readText()
}
console.log("En el renderer process")