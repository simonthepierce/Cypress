export const extractActualPrices = ($prices) => {
  const innerText = (el) => el.innerText;
  const firstWord = (text) => text.split(" ")[0];
  const justDigits = (str) => str.replace(/[^0-9.]/g, "");

  const processedPricesList = Cypress._.map($prices, (el) =>
    parseFloat(justDigits(firstWord(innerText(el))))
  );

  return processedPricesList;
};
export const extractProductsName = ($names) => {
  const productNamesList = Cypress._.map($names, (name) => name.innerText);
  return productNamesList;
};
