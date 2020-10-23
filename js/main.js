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
    
    let price = document.querySelector("#"+data+" > .price").innerText;
    calcTotalPrice(price);

    countProducts++;
    if(countProducts>0){
        document.getElementById("info").style.display="none";
        document.getElementById("coin").style.display="inline";
    }
    
    let basket = document.getElementById("basket");
    basket.appendChild(product);
    
    let buttonDeleteProduct = document.createElement("span");
    buttonDeleteProduct.className="btn-delete";
    buttonDeleteProduct.innerHTML = `<i class="fa fa-minus-square-o" aria-hidden="true" onclick="deleteProduct('${product.id}')"></i>`;
    product.insertBefore(buttonDeleteProduct, product.children[1])
    
    productsRepeat(product);

    collapseBasket(product,basket);  
}

let totalPrice=0;
function calcTotalPrice(priceProduct){    
    let priceNumber = Number(priceProduct.split("€")[0]);
    totalPrice= totalPrice+priceNumber;
    document.getElementById("calc").innerText = totalPrice.toFixed(2);
}

let productRepeat = [];
function productsRepeat(product){
    let productRepeatNode = document.createElement("span");
    productRepeatNode.className = "product_repeat";
    product.insertBefore(productRepeatNode, product.children[2]);
    productRepeat.push(1);    
        
    let productsInBasket = document.querySelectorAll("#basket .product");

    for(let i=0; i<(productsInBasket.length-1); i++){       
        if(productsInBasket[i].id == product.id){            
            product.style.display = "none";            
            
            product.classList.add("no-show");
            productRepeat[i]++;           
            let nodesInArticle = productsInBasket[i].childNodes;            
            nodesInArticle[4].innerText = productRepeat[i]+" x";   
        }
    }
}

function collapseBasket(product){
    let productsShow = document.querySelectorAll('#basket .product:not(.no-show)').length;

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
        document.querySelector('#button_show_all').style.display="none";
    }

    if(productsShow == 7 ){
        document.querySelector('#button_show_all').style.display="";
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

function deleteProduct(productId){
    let productsSelect = document.querySelectorAll("#basket > #"+productId);
    let numProduct = productsSelect.length-1;    
    productsSelect[numProduct].remove();

    priceProduct = productsSelect[0].childNodes[5].innerText;    
    calcTotalPrice("-"+priceProduct);

    let productsShow = document.querySelectorAll('#basket .product:not(.no-show)').length;
    if(productsShow < 7 && document.querySelector('#button_show_all')){
        document.querySelector('#button_show_all').remove();
    }
    
    if(numProduct>0){
        if(numProduct==1){
            productsSelect[0].childNodes[4].innerText=""
        }else{
            productsSelect[0].childNodes[4].innerText=numProduct+" x"
        }
        productRepeat.shift()  
    }
}

