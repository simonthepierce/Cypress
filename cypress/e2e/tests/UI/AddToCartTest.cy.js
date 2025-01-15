import BasePage from "../../pages/BasePage";
import ProductsSearchPage from "../../pages/ProductsSearchPage";
import ShoppingCartPage from "../../pages/ShoppingCartPage";

import { PRODUCT_TO_TEST as PRODUCT } from "../../config/UI/constants";

describe("adding products to cart", { tags: ["@Cart", "@regression"] }, () => {
  let basePage;

  before(() => {
    basePage = new BasePage();
  });

  beforeEach(() => {
    cy.login();
    basePage.header.searchProduct(PRODUCT);
  });

  it(
    "PROJ-ID-T1 - should add product to the cart from products search page",
    { tags: "@smoke" },
    function () {
      ProductsSearchPage.addProductToCart(PRODUCT);

      ProductsSearchPage.alert.should(
        "contains.text",
        `Success: You have added ${PRODUCT} to your shopping cart!`
      );
    }
  );

  it("PROJ-ID-T2 - should validate the presence of product in cart", function () {
    ProductsSearchPage.addProductToCart(PRODUCT);

    basePage.header.openShoppingCart();

    ShoppingCartPage.getItemsAddedToCart().should("include", PRODUCT);
  });
});
