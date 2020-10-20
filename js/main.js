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
    let product = document.getElementById(data).cloneNode(true);
    
    calcTotalPrice(data);

    countProducts++;
    if(countProducts>0){
        document.getElementById("info").style.display="none";
        document.getElementById("coin").style.display="inline";
    }
    
    let basket = document.getElementById("basket");
    basket.appendChild(product);

    productsRepeat(product);

    collapseBasket(product,basket);  
}

let totalPrice=0;
function calcTotalPrice(data){
    let price = document.querySelector("#"+data+" > div").innerText;
    let priceNumber = Number(price.split("€")[0]);
    totalPrice= totalPrice+priceNumber;
    document.getElementById("calc").innerText = totalPrice.toFixed(2);
}

let productRepeat = [];
function productsRepeat(product){
    let productRepeatNode = document.createElement("span");
    productRepeatNode.className = "product_repeat";
    product.insertBefore(productRepeatNode, product.children[1]);
    productRepeat.push(1);    
        
    let productsInBasket = document.querySelectorAll("#basket .product");

    for(let i=0; i<(productsInBasket.length-1); i++){       
        if(productsInBasket[i].id == product.id){            
            product.style.display = "none";            
            
            product.classList.add("no-show");
            productRepeat[i]++;           
            let nodesInArticle = productsInBasket[i].childNodes;            
            nodesInArticle[3].innerText = productRepeat[i]+" x";   
        }
    }
}

function collapseBasket(product){
    let productsShow = document.querySelectorAll('#basket .product:not(.no-show)').length

    if(productsShow>6){
        product.style.display = "none";
        if(!product.classList.contains("no-show")){
            if(document.querySelectorAll('#basket .hidden').length > 0) {
                product.classList.add("hidden");
            }else{
                product.classList.add("nohidden");
            } 
        }
        
    }

    if(productsShow == 6 && !document.querySelector('#button_show_all')){
        let buttonShowAll = document.createElement("span");

        buttonShowAll.id="button_show_all";
        buttonShowAll.innerHTML="...";
        buttonShowAll.addEventListener("click", showAllProductsInBasket);

        basket.appendChild(buttonShowAll);
    }

    if(document.querySelectorAll('#basket .nohidden').length>0){
        showAllProductsInBasket()
    }
}

function showAllProductsInBasket(){
    if(document.querySelectorAll('#basket .hidden').length>0){
        document.querySelectorAll('#basket .hidden').forEach(el => {
            el.style.display="";
            el.classList.replace("hidden", "nohidden");
        });

    }else {
        document.querySelectorAll('#basket .nohidden').forEach(el => {
            el.style.display="none";
            el.classList.replace("nohidden", "hidden");
        });
    }
    
}