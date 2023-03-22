
document.getElementById("btn-abrir").onclick=()=>{
    console.log("abrir en el JS")
    function onlive() {
        // DO SOMETHING IF CHANNEL IS LIVE STREAMING
      }
      
      /* REST OF THE CODE */
      
      fetch('https://www.youtube.com/channel/UCBc7EP5ePeCU3w16qwC2BaA').then(function (response) {
          return response.text();
      }).then(function (html) {
        if (html.includes("hqdefault_live.jpg")) {
      onlive();
        }
      }).catch(function (err) {
          console.warn('Something went wrong', err);
      })
    api.abrir()
}

document.getElementById("btn-guardar").onclick=function(){
    console.log("guardar en el JS")
    this.disabled=true
    let prod = {
        nombre:document.getElementById("nombre").value ,
        precio:parseFloat(document.getElementById("precio").value),
        foto: document.getElementById("foto").src 
    }
    api.guardar(prod)
}

document.getElementById("buscar-foto").onclick=()=>{
    console.log("buscar foto en el JS")
    api.buscarFoto()
}

document.getElementById("btn-crear-carpeta").onclick=()=>{
    console.log("crear carpeta en el JS")
    api.crearCarpeta(document.getElementById("nombre-carpeta").value)
}
