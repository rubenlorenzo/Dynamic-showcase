function allowDrop(event) {
    event.preventDefault();
}
  
function drag(event) {
    event.dataTransfer.setData("text", event.target.id);
}

let countProducts=0;
let totalPrice=0;
function drop(event) {
    event.preventDefault();

    var data = event.dataTransfer.getData("text");
    let producto = document.getElementById(data).cloneNode(true);
    
    let price = document.querySelector("#"+data+" > div").innerText;
    let priceNumber = Number(price.split("€")[0]);
    totalPrice= totalPrice+priceNumber;
    document.getElementById("calc").innerText = totalPrice.toFixed(2);

    countProducts++;
    if(countProducts>0){
        document.getElementById("info").style.display="none";
        document.getElementById("coin").style.display="inline";
    }

    let basket = document.getElementById("basket");
    basket.appendChild(producto);    
}