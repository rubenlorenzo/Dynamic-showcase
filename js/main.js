function allowDrop(event) {
    event.preventDefault();
}
  
function drag(event) {
    event.dataTransfer.setData("text", event.target.id);
}

let countProducts=0;
function drop(event) {
    event.preventDefault();
    var data = event.dataTransfer.getData("text");
    let producto = document.getElementById(data).cloneNode(true);
    
    countProducts++;
    if(countProducts>0){
        document.getElementById("info").style.display="none";
    }

    let basket = document.getElementById("basket");
    basket.appendChild(producto);    
}