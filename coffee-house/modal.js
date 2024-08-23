'use strict'
import data from './products.json' assert {type: 'json'};

const itemsMenuBlock = Array.from(document.querySelectorAll('.menu-block__item'));
const modalWrapper = document.querySelector('.modal-wrapper');
const modal = document.querySelector('.modal');
const body = document.body;

//functions
let closeBtn;
let itemsSizeBtn;
let itemsAddsBtn;

for (let i = 0; i < itemsMenuBlock.length; i++) {
    itemsMenuBlock[i].addEventListener('click', e => {
        e.preventDefault();
        modal.classList.toggle("active-modal");
        body.classList.toggle("noscroll");

        for (let j = 0; j < data.length; j++) {
            if ( i === j ) {
                renderItemModal(j);
                var currantItem = j;
            }
        }
        closeBtn = document.querySelector('.close-btn');
        const totalPrice = document.querySelector('.total-sum');

        itemsSizeBtn = document.querySelectorAll('.size-buttons__item');
        itemsSizeBtn.forEach((btn) => {
            btn.addEventListener('click', () => {
                itemsSizeBtn.forEach( item => {
                    item.classList.remove("size-btn-active");  
                })
                btn.classList.add("size-btn-active");

                if (btn.classList.contains('size-btn-active') && btn.classList.contains("s-size")) {
                    let itemPrice = +data[currantItem].price + +data[currantItem].sizes.s['add-price'];
                    let formatItemPrice = itemPrice.toFixed(2);
                    totalPrice.textContent = `$${formatItemPrice}`;
                  } else if (btn.classList.contains('size-btn-active') && btn.classList.contains("m-size")) {
                    let itemPrice = +data[currantItem].price + +data[currantItem].sizes.m['add-price'];
                    let formatItemPrice = itemPrice.toFixed(2);
                    totalPrice.textContent = `$${formatItemPrice}`;
                  } else if (btn.classList.contains('size-btn-active') && btn.classList.contains("l-size")) {
                    let itemPrice = +data[currantItem].price + +data[currantItem].sizes.l['add-price'];
                    let formatItemPrice = itemPrice.toFixed(2);
                    totalPrice.textContent = `$${formatItemPrice}`;
                  }
            })
        })

        itemsAddsBtn = document.querySelectorAll('.adds-buttons__item');
        itemsAddsBtn.forEach((btn) => {
            btn.addEventListener('click', () => {
                btn.classList.toggle("adds-btn-active");

                if (btn.classList.contains('adds-btn-active')) {
                    let itemPriceWithAdditives = +totalPrice.textContent.slice(1) + +data[currantItem].additives[0]['add-price'];
                    let formatItemPriceWithAdditives = itemPriceWithAdditives.toFixed(2);
                    totalPrice.textContent = `$${formatItemPriceWithAdditives}`;
                  } else {
                    let itemPriceWithAdditives = +totalPrice.textContent.slice(1) - +data[currantItem].additives[0]['add-price'];
                    let formatItemPriceWithAdditives = itemPriceWithAdditives.toFixed(2);
                    totalPrice.textContent = `$${formatItemPriceWithAdditives}`;
                }
            })
        })
    })
}

function renderItemModal (j) {
    let itemModal = `
        <div class="modal-img">
            <img src="${data[j].img}" alt="item-img">
        </div>

        <div class="modal-description dark-text">
            <div class="modal-title">
                <h3 class="title">${data[j].name}</h3>
                <p class="medium-text decs">
                ${data[j].description}
                </p>
            </div>

            <div class="size-block">
                <p class="medium-text dark-text"> Size </p>
                <ul class="size-buttons">
                    <li class="size-buttons__item dark-text link-btn-font size-btn-active s-size">
                        <span> S </span> ${data[j].sizes.s.size}
                    </li>
                    <li class="size-buttons__item dark-text link-btn-font m-size">
                        <span> M </span> ${data[j].sizes.m.size}
                    </li>
                    <li class="size-buttons__item dark-text link-btn-font l-size">
                        <span> L </span> ${data[j].sizes.l.size}
                    </li>
                </ul>
            </div>

            <div class="adds-block">
                <p class="medium-text dark-text"> Additives </p>
                <ul class="adds-buttons">
                    <li class="adds-buttons__item dark-text link-btn-font">
                        <span> 1 </span> ${data[j].additives[0].name}
                    </li>
                    <li class="adds-buttons__item dark-text link-btn-font">
                        <span> 2 </span> ${data[j].additives[1].name}
                    </li>
                    <li class="adds-buttons__item dark-text link-btn-font">
                        <span> 3 </span> ${data[j].additives[2].name}
                    </li>
                </ul>
            </div>

            <div class="total dark-text">
                <h3>Total:</h3>
                <h3 class="total-sum">$${data[j].price}</h3>
            </div>

            <div class="alert">
                <img src="./assets/icons/modal-alert.svg" alt="alert-img">
                <p class="caption-font dark-text">The cost is not final. Download our mobile app to see 
                    the final price and place your order. Earn loyalty points and enjoy 
                    your favorite coffee with up to 20% discount.
                </p>
            </div>

            <button class="close-btn dark-text link-btn-font">Close</button>
        </div> 
        `
    modalWrapper.innerHTML = itemModal;
}

//listeners

function closeModal() {
    modal.classList.remove("active-modal");
    body.classList.remove("noscroll");
}

// modal.addEventListener('click', closeModal);
//closeBtn.addEventListener('click', closeModal);

document.addEventListener('click', e => {
    if (e.target === closeBtn || e.target === modal) closeModal ()
})