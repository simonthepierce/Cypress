import { SORTING_CRITERIA } from "../../config/UI/constants";
import { default as ProductsSearchPage } from "../../pages/ProductsSearchPage";
import { extractActualPrices } from "../../utils/UI/ProductUtils";
import productCategories from "../../../fixtures/UI/ProductCategories";

describe(
  "Products meeting the search criteria",
  { tags: ["@Search", "@regression"] },
  () => {
    beforeEach(() => {
      ProductsSearchPage.open();
      ProductsSearchPage.header.searchProduct(" ");
    });

    context("Sorting", () => {
      it(
        "KAN-T9 - should check that the products are sorted by Price (Low > High)",
        { tags: "@smoke" },
        () => {
          ProductsSearchPage.sortSearchResultsBy(SORTING_CRITERIA.PRICE_ASC);
          ProductsSearchPage.allProductsPrices
            .should("not.be.empty")
            .then(($prices) => {
              const prices = extractActualPrices($prices);
              const sorted = Cypress._.sortBy(prices);
              expect(sorted).to.deep.equal(prices);
            });
        }
      );

      it("KAN-T10 - should check that the products are sorted by Price (High > Low)", () => {
        ProductsSearchPage.sortSearchResultsBy(SORTING_CRITERIA.PRICE_DESC);
        ProductsSearchPage.allProductsPrices
          .should("not.be.empty")
          .then(($prices) => {
            const prices = extractActualPrices($prices);
            const sorted = Cypress._.sortBy(prices).reverse();
            expect(sorted).to.deep.equal(prices);
          });
      });

      it("KAN-T11 - should check that the products are sorted by Name (A - Z)", () => {
        ProductsSearchPage.sortSearchResultsBy(SORTING_CRITERIA.NAME_ASC);
        const productNames = ProductsSearchPage.getAllProductNames();
        const sortedNames = productNames.sort();
        cy.wrap(sortedNames).should("deep.equal", productNames);
      });

      it("KAN-T12 - should check that the products are sorted by Price Name (Z - A)", () => {
        ProductsSearchPage.sortSearchResultsBy(SORTING_CRITERIA.NAME_DESC);
        const productNames = ProductsSearchPage.getAllProductNames();
        const sortedNames = productNames.sort().reverse();
        cy.wrap(sortedNames).should("deep.equal", productNames);
      });
    });

    context("Categories", () => {
      productCategories.categories.forEach((category) => {
        it(
          `KAN-T13 - should filter the search results by category: ${category.categoryName}`,
          { tags: "@smoke" },
          () => {
            ProductsSearchPage.filterSearchResultsByCategory(
              category.categoryName
            );
            ProductsSearchPage.applyFilter();
            const productNames = ProductsSearchPage.getAllProductNames();
            cy.wrap(productNames).should("include.members", category.products);
          }
        );
      });
    });
  }
);
