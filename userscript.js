// ==UserScript==
// @name         Steam Argentinizador
// @namespace    https://github.com/MatiasTK/SteamArgentinizador
// @version      0.1
// @description  See the steam prices with taxes included!
// @author       You
// @match        https://store.steampowered.com/app/*
// @icon         https://www.google.com/s2/favicons?domain=steampowered.com
// @grant        none
// ==/UserScript==

(function () {
  "use strict";

  const IMPUESTOS = 0.64; // 64%

  let discountPrices = document.querySelectorAll(".discount_prices");
  discountPrices.forEach((e) => {
    if (e.children[1] === undefined) {
      return;
    }

    let originalPrice = e.children[1].innerText
      .split(" ")[1]
      .replace(".", "")
      .replace(",", ".");

    let finalPrice = Number(originalPrice) + Number(originalPrice) * IMPUESTOS;

    let parent = e.parentElement;

    parent.innerHTML = `
        ${parent.innerHTML}
        <div class='discount_prices'>
            <div style='position: absolute; right: 6px; color: #9bc533'>
                Precio Final:
            </div>
            <div class='discount_final_price' style='color: #9bc533'>
            ARS$ ${finalPrice.toLocaleString(undefined, {
              minimumFractionDigits: 2,
            })}
            </div>
        </div>
    `;
  });

  let gamePrices = document.querySelectorAll(".game_purchase_price");
  gamePrices.forEach((e) => {
    let originalPrice = e.innerText
      .split(" ")[1]
      .replace(".", "")
      .replace(",", ".");

    let finalPrice = Number(originalPrice) + Number(originalPrice) * IMPUESTOS;

    let parent = e.parentElement;

    console.log(finalPrice);

    parent.innerHTML = `
        ${parent.children[0].outerHTML}
        <div class='discount_prices'>
            <div style='color: #9bc533; font-size: 11px'>
                Precio Final:
            </div>
            <div class='discount_final_price' style='color: #9bc533'>
                ARS$ ${finalPrice.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                })}
            </div>
        </div>
        ${parent.children[1].outerHTML}
    `;
  });
})();
