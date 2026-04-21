/**
 * 🍵 Chai Stall Board - getElementById, querySelector, textContent
 *
 * Sharma ji ki chai stall hai station ke bahar. Unka rate board update
 * karna hai digitally. Cutting chai, masala chai, adrak chai - sabki
 * price dynamically change hoti rehti hai. getElementById se specific
 * chai ka price element dhundho, querySelector se stall ka naam dhundho,
 * aur textContent se values read/write karo.
 *
 * DOM Structure expected:
 *   <div class="chai-stall">
 *     <h1 class="stall-name">Sharma Chai Wala</h1>
 *     <div class="price-board">
 *       <p id="price-masala" class="chai-price" data-chai="masala">₹15</p>
 *       <p id="price-cutting" class="chai-price" data-chai="cutting">₹10</p>
 *       <p id="price-adrak" class="chai-price" data-chai="adrak">₹20</p>
 *     </div>
 *   </div>
 *
 * Functions:
 *
 *   1. updateChaiPrice(document, chaiType, newPrice)
 *      - Finds element with id "price-{chaiType}" using getElementById
 *      - Sets its textContent to "₹{newPrice}"
 *      - Returns true if element found and updated, false if not found
 *      - Validation: newPrice must be a number > 0, else return false
 *      - chaiType must be a non-empty string, else return false
 *
 *   2. getChaiPrice(document, chaiType)
 *      - Finds element with id "price-{chaiType}"
 *      - Reads textContent, removes "₹" prefix, parses to number
 *      - Returns the number price
 *      - Agar element not found, return null
 *
 *   3. updateStallName(document, newName)
 *      - Finds ".stall-name" element using querySelector
 *      - Saves old textContent, updates to newName
 *      - Returns old name string
 *      - Agar element not found, return null
 *      - Agar newName not string or empty, return null
 *
 *   4. highlightCheapestChai(document)
 *      - Finds all ".chai-price" elements using querySelectorAll
 *      - Parses each price (remove ₹, parse to number)
 *      - Adds class "cheapest" to the element with lowest price
 *      - Removes class "cheapest" from all other chai-price elements
 *      - Returns the data-chai attribute value of cheapest chai
 *      - Agar no chai-price elements found, return null
 *
 * Hint: document.getElementById("id") se specific element dhundho,
 *   document.querySelector(".class") se first matching element,
 *   document.querySelectorAll(".class") se saare matching elements.
 *
 * @example
 *   updateChaiPrice(document, "masala", 20);
 *   // => true (element with id "price-masala" now shows "₹20")
 *
 *   getChaiPrice(document, "masala");
 *   // => 20
 *
 *   updateStallName(document, "Sharma Premium Chai");
 *   // => "Sharma Chai Wala" (old name returned)
 *
 *   highlightCheapestChai(document);
 *   // => "cutting" (cheapest chai gets "cheapest" class)
 */
export function updateChaiPrice(document, chaiType, newPrice) {
  // Your code here
  if (
    typeof chaiType !== "string" ||
    chaiType.trim() === "" ||
    typeof newPrice !== "number" ||
    newPrice <= 0
  ) {
    return false;
  }

  const element = document.getElementById(`price-${chaiType}`);
  if (element) {
    element.textContent = `₹${newPrice}`;
    return true
  } else {
    return false
  }
}

export function getChaiPrice(document, chaiType) {
  // Your code here


  const element = document.getElementById(`price-${chaiType}`);
  if (element) {
    const priceText = element.textContent;
    const priceNumber = parseFloat(priceText.replace("₹", ""));
    return priceNumber
  } else {
    return null
  }
}

export function updateStallName(document, newName) {
  // Your code here

  if (typeof newName !== "string" || newName.trim() === "") {
    return null
  }

  const element = document.querySelector(".stall-name");
  if(element){
    const oldName =element.textContent;
    element.textContent = newName;
    return oldName
  } else {
    return null
  }
}

export function highlightCheapestChai(document) {
  // Your code here
  const elements = document.querySelectorAll(".chai-price");
  if (elements.length === 0) {
    return null;
  }

  let cheapestPrice = Infinity
  let cheapestChai = null
  
  elements.forEach(element => {
    const priceText = element.textContent;
    const priceNumber = parseFloat(priceText.replace("₹", ""));
    if (priceNumber < cheapestPrice) {
      cheapestPrice = priceNumber;
      cheapestChai = element;
    }
  });
  if (cheapestChai) {
    elements.forEach(element => {
      element.classList.remove("cheapest");
    });
    cheapestChai.classList.add("cheapest");
    return cheapestChai.getAttribute("data-chai");
  }
  return null;
}
