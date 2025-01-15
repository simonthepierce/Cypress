import BasePage from "../../pages/BasePage";
import ProductDetailsPage from "../../pages/ProductDetailsPage";
import ProductsSearchPage from "../../pages/ProductsSearchPage";

describe(
  "product details and search",
  { tags: ["@Product", "@regression"] },
  () => {
    let basePage;

    before(() => {
      basePage = new BasePage();
    });

    beforeEach(() => {
      cy.visit("");
      cy.uiFixture("product.json").as("productData");
    });

    it(
      "PROJ-ID-T6 - should validate all the products presence in store",
      { tags: "@smoke" },
      () => {
        cy.uiFixture("products").then((products) => {
          products.forEach((product) => {
            cy.log(product.name);

            basePage.header.searchProduct(product.name);

            ProductsSearchPage.productName(product.name).should(
              "have.text",
              product.name
            );
          });
        });
      }
    );

    it("PROJ-ID-T7 - should validate the product data on products search page", () => {
      cy.get("@productData").then((productData) => {
        basePage.header.searchProduct(productData.name);
        ProductsSearchPage.productName(productData.name).should(
          "have.text",
          productData.name
        );

        ProductsSearchPage.productDescription(productData.name).should(
          "contains.text",
          productData.description
        );

        ProductsSearchPage.productPrice(productData.name).then((price) => {
          const actualPrice = price
            .text()
            .split("Ex Tax:")[0]
            .split("$")[1]
            .trim();
          expect(actualPrice).to.be.eq(productData.price);
        });
      });
    });

    it("PROJ-ID-T8 - should validate the product data on product details page", () => {
      cy.get("@productData").then((productData) => {
        basePage.header.searchProduct(productData.name);

        ProductsSearchPage.openProduct(productData.name);

        ProductDetailsPage.productName.should("have.text", productData.name);

        ProductDetailsPage.productDescription.should(
          "contains.text",
          productData.description
        );

        ProductDetailsPage.productPrice.then((price) => {
          const actualPrice = price.text().split("$")[1].trim();
          expect(actualPrice).to.be.eq(productData.price);
        });
      });
    });
  }
);
