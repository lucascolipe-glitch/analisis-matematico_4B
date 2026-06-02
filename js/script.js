function mostrarDetalle(id){

  const detalle = document.getElementById(id);

  if(detalle.style.display === "block"){
    detalle.style.display = "none";
  }
  else{
    detalle.style.display = "block";
  }

}
