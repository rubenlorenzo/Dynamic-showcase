
const productsTemplate = (products, shelfText) =>  {

    const shelf = document.getElementById(shelfText);

    let productsString = ""
    products.forEach(product => {
        
        let onlyProductString = 
        `<article id='${product.id}' class='product' draggable='true' ondragstart='drag(event)'>
            <img src='${product.img}' alt='${product.imgText}' srcset='' draggable='false'>
            <div class='price'>${product.price}€</div>
        </article>`

        productsString = productsString + onlyProductString;
    });
    
    shelf.innerHTML = productsString;

}

let fruits = [
    {'id':'product1','img':'./img/fruit_apple.png', 'imgText':'manzanas', 'price':'1.19'},
    {'id':'product2','img':'./img/fruit_banna.png', 'imgText':'bananas', 'price':'2.05'},
    {'id':'product3','img':'./img/fruit_grapes.png', 'imgText':'uvas', 'price':'2.04'},
    {'id':'product4','img':'./img/fruit_lemon.png', 'imgText':'limones', 'price':'1.55'},
    {'id':'product5','img':'./img/fruit_orange.png', 'imgText':'naranjas', 'price':'2.30'},
    {'id':'product6','img':'./img/fruit_pear.png', 'imgText':'peras', 'price':'1.70'},
    {'id':'product7','img':'./img/fruit_strawberry.png', 'imgText':'fresas', 'price':'3.10'},
    {'id':'product8','img':'./img/fruit_watermelon.png', 'imgText':'sandía', 'price':'2.60'},
];

productsTemplate(fruits,"fruits");


let othersFood = [
    {'id':'product9','img':'./img/coffee.png', 'imgText':'café', 'price':'1.70'},
    {'id':'product10','img':'./img/milk.png', 'imgText':'leche', 'price':'0.90'},
    {'id':'product11','img':'./img/refreshment.png', 'imgText':'refresco', 'price':'1.00'},
    {'id':'product12','img':'./img/wine.png', 'imgText':'vino', 'price':'2.60'},
]

productsTemplate(othersFood,"othersFood");
