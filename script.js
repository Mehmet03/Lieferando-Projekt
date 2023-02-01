let shoppingBasket = [];
//let price = [16.90, 10.90, 27.50];
//let basketOf = ['Dönerteller', 'Köfte Ekmek', 'Golden Kebab Platte'];
let amount = [2, 1, 1];
let basket = [{
    "name": "Dönerteller",
    "description": "mit frischem Salat, einer Fleischsorte nach Wahl, einer Beilage nach Wahl und Sauce, dazu frischer Salat",
    "price": 16.90
},
{
    "name": "Köfte Ekmek",
    "description": "Hackfrikadelle im Fladenbrot, Salat und Sauce",
    "price": 10.90
},
{
    "name": "Golden Kebab Platte",
    "description": "gemischte Grillplatte mit Spezialitäten des Hauses, dazu eine Beilage nach Wahl, Ezme Joghurt-Dip und frischer Salat  ",
    "price": 27.50


},
{
    "name": "Döner Kebap",
    "description": "Wahl aus: mit Hähnchenfleisch, mit Kalbfleisch, ohne Fleisch, mit Chilisauce, scharf, mit Cocktailsauce und mehr.",
    "price": 7.50


}
];
let basketKebab = [];
let basketPrice = [];
let prices = [16.90, 10.90, 27.50];
let basketAmount = [];

function render() {
    renderBasket();
    renderHtml();
}
function renderMenu(baskets, price, i) {
    return `
                <div onclick="addToBasket(${i})" class="card margin-left">
                   <img src="img/plus.png" alt=""> 
                   <h2 id="addFood">${basket[i]['name']}</h2>
                    <p>${basket[i]['description']}</p>
                    <p>${basket[i]['price']} € </p>
                    
                </div>
            `;
}

function addToBasket(i) {
    let addedKebab = basket[i]['name'];
    let addedPrice = basket[i]['price'];
    let menuIndex = basketKebab.indexOf(addedKebab);

    if (menuIndex == -1) {
        basketKebab.push(addedKebab);
        basketPrice.push(addedPrice);
        basketAmount.push(1);
    }
    else {
        basketAmount[menuIndex]++;
    }
    renderShoppingBasket();
}
function getBasketIndex(basketName) {
    return basket.indexOf(basketName);
}
function renderShoppingBasket() {
    let shoppingBasket = document.getElementById('shoppingBasket');
    shoppingBasket.innerHTML = '<h1>Warenkorb</h1>';


    for (let i = 0; i < basketKebab.length; i++) {
        const addKebab = basketKebab[i];
        const addPrice = basketPrice[i];
        const addAmount = basketAmount[i];
        shoppingBasket.innerHTML += renderPriceArea(addKebab, addPrice, addAmount, i);
    }
    totalAmount();
}
function totalSub(allSubTotal) {
    return allSubTotal.toFixed(2).replace('.', ',');
}
function renderHtml() {
    let shoppingBasket = document.getElementById('shoppingBasket');
    shoppingBasket.innerHTML += `
    <div class="basket-df">
    <img class="basket" src="img/hinzufugen (1).png" alt=""> <br>
    <h1>Fülle deinen Warenkorb</h1><br>
    <p>Füge einige leckere Gerichte aus der</p><br>
    <p>Speisekarte hinzu und bestelle dein Essen</p>
    
    `;
}
function renderPriceArea(addKebab, addPrice, addAmount, i) {
    let total = addAmount * addPrice;
    const subTotal = totalSub(total);
    return `
    <div>
        <p>${addAmount} x ${addKebab}: ${subTotal} € </p>
        <div class="shopbasket">
            <div title="Menge reduzieren" onclick="substractKebab(${i})"><img src="img/minus.png" class="icon"></div>
            <div title="Menge erhöhen" onclick="addKebab(${i})"><img src="img/add.png" class="icon"></div>
        <div title="Auswahl löschen" onclick="deleteKebab(${i})"><img src="img/bin.png" class="icon"></div>
        </div>
    </div>    
        `;
}
function addKebab(i) {
    basketAmount[i]++;
    renderShoppingBasket();
}
function substractKebab(i) {
    if (basketAmount[i] <= 1) {
        basketAmount.splice(i, 1);
        basketKebab.splice(i, 1);
        basketPrice.splice(i, 1);
        renderShoppingBasket();

        if (basketAmount == 0) {
            renderHtml();

        }
    }
    if (basketAmount[i] >= 1) {
        basketAmount[i]--;
        renderShoppingBasket();

    }
}
function deleteKebab(i) {
    basketAmount.splice(i, 1);
    basketKebab.splice(i, 1);
    basketPrice.splice(i, 1);
    renderShoppingBasket();
    if (basketAmount == 0) {
        renderHtml();
    }
}

function totalAmount() {
    document.getElementById('totalSum').innerHTML = '';
    let sum = 0;
    for (let i = 0; i < basketAmount.length; i++) {
        sum += basketPrice[i] * basketAmount[i];
        totalSum.innerHTML = totalAmountHTML(sum);
    }
}
function formatSum(sum) {
    return sum.toFixed(2).replace('.', ',');
}
function formatDeliveryCost(deliverySum) {
    return deliverySum.toFixed(2).replace('.', ',');

}

function formatSumAndDelivery(sumAndDelivery) {
    return sumAndDelivery.toFixed(2).replace('.', ',');

}

function totalAmountHTML(sum, i) {
    const formattedSum = formatSum(sum);
    const deliverySum = 1.90;
    const formattedDeliverySum = formatDeliveryCost(deliverySum);
    const sumAndDelivery = sum + deliverySum;
    formattedSumAndDelivery = formatSumAndDelivery(sumAndDelivery);
    document.getElementById('mobileBasket').innerHTML = `<b>Bezahlen (${formattedSumAndDelivery}) €</b>`;
    return amountHTML(formattedSum, formattedDeliverySum, formattedSumAndDelivery, formattedSumAndDelivery)
}
function amountHTML(formattedSum, formattedDeliverySum, formattedSumAndDelivery, formattedSumAndDelivery) {
    return `
    <div class="pay">
        <b>
        Zwischensumme:${formattedSum}€ 
        </b>
    </div>
    <div class="pay">
        <b>
        Lieferkosten:${formattedDeliverySum}€ 
        </b>
    </div>
    <div class="pay">
        <b>
        Gesamtsumme:${formattedSumAndDelivery}€ 
        </b>
    </div>
    <button onclick="showSum()"><b>Bezahlen (${formattedSumAndDelivery} €)</b></button>
    `;
}

function showSum() {
    document.getElementById('payMessage').classList.add('thank-customer');
    document.getElementById('payMessage').classList.remove('display-none');
}
function renderBasket() {
    let basketArea = document.getElementById('favorite');
    basketArea.innerHTML = '';
    for (let i = 0; i < basket.length; i++) {
        const baskets = basket[i];
        const price = prices[i];
        basketArea.innerHTML += renderMenu(baskets, price, i);
    }

}


function showBasket() {
    const okati = document.getElementById('okati');
    okati.classList.replace('sidebar', 'basket-df-mobile');

}

function closeBasket() {
    const okati = document.getElementById('okati');
    okati.classList.replace('basket-df-mobile', 'sidebar');

}