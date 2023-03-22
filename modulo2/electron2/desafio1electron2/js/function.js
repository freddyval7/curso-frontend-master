document.getElementById("copiar").onclick = ()=>{
    alert("Texto copiado!")
    document.getElementById("title").style.display = "block"
    bridge.portapapeles.writeText(document.getElementById("input").value)
    document.getElementById("texto").innerText = bridge.portapapeles.readText();
}