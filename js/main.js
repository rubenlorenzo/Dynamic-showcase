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
        document.getElementById("calc").style.display="inline";
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
    let productsShow = document.querySelectorAll('#basket .product:not(.no-show)');
    let numProductsShow = productsShow.length;
    
    updateProductsInBasket(productsShow);   

    if(numProductsShow == 6 && !document.querySelector('#button_show_all')){
        let buttonShowAll = document.createElement("div");

        buttonShowAll.id="button_show_all";
        buttonShowAll.innerHTML="...";
        buttonShowAll.addEventListener("click", showAllProductsInBasket);
        let totalBox = document.querySelector('#total');

        totalBox.insertBefore(buttonShowAll, totalBox.children[0]);
        document.querySelector('#button_show_all').style.display="none";
    }

    if(numProductsShow > 6 ){
        document.querySelector('#button_show_all').style.display="";
    }

}

function showAllProductsInBasket(){ 
    let productsShow = document.querySelectorAll('#basket .product:not(.no-show)');
    let countProductsHide = 0
    productsShow.forEach(el => {
        if(el.style.display =="none"){
            countProductsHide++;
        }
    })
    
    if(countProductsHide>0){
        productsShow.forEach(el => {
            el.style.display = "";   
        })
    }else{
        updateProductsInBasket(productsShow);
    }
        
}

function updateProductsInBasket(productsShow){
    for(let i = 0; i < productsShow.length; i++){
        if(i<6){
            productsShow[i].style.display="";
        }else{
            productsShow[i].style.display="none";      
            
        }
    }
}

function deleteProduct(productId){
    let productsSelect = document.querySelectorAll("#basket > #"+productId);
    let numProduct = productsSelect.length-1;    
    productsSelect[numProduct].remove();

    if(numProduct>0){
        if(numProduct==1){
            productsSelect[0].childNodes[4].innerText=""
        }else{
            productsSelect[0].childNodes[4].innerText=numProduct+" x"
        }
        productRepeat.shift()  
    }

    priceProduct = productsSelect[0].childNodes[5].innerText;    
    calcTotalPrice("-"+priceProduct);

    let productsShow = document.querySelectorAll('#basket .product:not(.no-show)');
    if(productsShow.length < 7 && document.querySelector('#button_show_all')){
        document.querySelector('#button_show_all').style.display="none";
    }

    updateProductsInBasket(productsShow);

    let productsInBasket = document.querySelectorAll('#basket .product').length;
    if(productsInBasket == 0){
        document.getElementById("info").style.display="";
        document.getElementById("calc").style.display="none";
        document.getElementById("coin").style.display="none";
        countProducts=0;
    }
}

