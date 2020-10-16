function allowDrop(event) {
    event.preventDefault();
}
  
function drag(event) {
    event.dataTransfer.setData("text", event.target.id);
}

let countProducts=0;
let totalPrice=0;
let productRepeat = [];
function drop(event) {
    event.preventDefault();

    var data = event.dataTransfer.getData("text");
    let product = document.getElementById(data).cloneNode(true);
    
    let price = document.querySelector("#"+data+" > div").innerText;
    let priceNumber = Number(price.split("€")[0]);
    totalPrice= totalPrice+priceNumber;
    document.getElementById("calc").innerText = totalPrice.toFixed(2);

    countProducts++;
    if(countProducts>0){
        document.getElementById("info").style.display="none";
        document.getElementById("coin").style.display="inline";
    }
    
    //Product Repeat
    let basket = document.getElementById("basket");
    basket.appendChild(product);

    let productRepeatNode = document.createElement("span");
    productRepeatNode.className = "product_repeat";
    product.insertBefore(productRepeatNode, product.children[1]);
    productRepeat.push(1);    
    
    let nodesInBasket = basket.childNodes;    
    let productsInBasket = [];

    for(let i=0; i<nodesInBasket.length; i++){
        if(nodesInBasket[i].className == "product"){
            productsInBasket.push(nodesInBasket[i]);
        }
    }
        
    for(let i=0; i<(productsInBasket.length-1); i++){       
        if(productsInBasket[i].id == product.id){            
            product.style.display = "none";            
            
            productRepeat[i]++;           
            let nodesInArticle = productsInBasket[i].childNodes;            
            nodesInArticle[3].innerText = productRepeat[i]+" x";   
        }
    }
}