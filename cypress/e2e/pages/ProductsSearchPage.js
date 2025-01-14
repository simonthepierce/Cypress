import BasePage from "./BasePage";
const routes = require("../config/API/routes");
import { ENDPOINT_PREFIX } from "../config/UI/constants";

class ProductsSearchPage extends BasePage {
  get productCard() {
    return (productName) =>
      cy
        .get(`img[title='${productName}'], h1:contains('${productName}')`)
        .then(($el) => {
          if ($el.is("img")) {
            cy.wrap($el).parents(".product-thumb").as("productContainer");
          } else if ($el.is("h1")) {
            cy.wrap($el).parents(".col-sm-4").as("productContainer");
          }
        });
  }
  get alert() {
    return cy.get("#product-search .alert");
  }

  get productName() {
    return (productName) => this.productCard(productName).find(".caption h4 a");
  }
  get productDescription() {
    return (productName) =>
      this.productCard(productName).find(".caption p").first();
  }
  get productPrice() {
    return (productName) =>
      this.productCard(productName).find(".caption .price");
  }

  get sortDropdown() {
    return cy.get("#input-sort");
  }
  get allProductsPrices() {
    return cy.get(".price");
  }
  get allProductNames() {
    return cy.get(".caption h4 a");
  }

  get categoryDropdown() {
    return cy.get('select[name="category_id"]');
  }
  get searchBtn() {
    return cy.get("#button-search");
  }

  open() {
    return super.open(ENDPOINT_PREFIX + routes.PRODUCT_SEARCH_ENDPOINT);
  }

  openProduct(productName) {
    this.productCard(productName).find(".caption h4 a").click();
  }

  addProductToCart(productName) {
    this.productCard(productName)
      .find("button")
      .contains("Add to Cart")
      .click({ force: true });
  }

  sortSearchResultsBy(sortingCriteria) {
    this.sortDropdown.select(sortingCriteria);
  }

  filterSearchResultsByCategory(category) {
    this.categoryDropdown.select(category);
  }

  applyFilter() {
    this.searchBtn.click();
  }

  getAllProductNames() {
    const productNamesArr = [];
    this.allProductNames.each(($productName) =>
      productNamesArr.push($productName.text())
    );

    if (productNamesArr) {
      return productNamesArr;
    }
    return null;
  }
}

export default new ProductsSearchPage();
