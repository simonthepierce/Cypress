import { PRODUCT_ID_TO_TEST, PRODUCT_TO_TEST } from "../../config/UI/constants";
import { default as ProductDetailsPage } from "../../pages/ProductDetailsPage";
import WishlistPage from "../../pages/WishlistPage";
import { getTcInfo, updateInitFile } from "../../utils/UI/TestCycleUtils";

describe(
  "adding and removing products from wishlist",
  { tags: ["@Wishlist", "@regression"] },
  () => {
    context("logged-in user", () => {
      beforeEach(() => {
        cy.login();
        ProductDetailsPage.open(PRODUCT_ID_TO_TEST);
        ProductDetailsPage.addProductToWishlist();
      });

      after(() => {
        WishlistPage.removeItemsFromWishlist();

        WishlistPage.emptyWishlistDesc
          .should("be.visible")
          .and("have.text", "Your wish list is empty.");
      });

      it("KAN-T16 - should validate the success message for product added to wishlist", () => {
        ProductDetailsPage.alert.should(
          "contains.text",
          `Success: You have added ${PRODUCT_TO_TEST} to your wish list!`
        );
      });

      it(
        "KAN-T17 - should validate the presence of product in wishlist",
        { tags: "@smoke" },
        () => {
          ProductDetailsPage.header.openWishlist();

          WishlistPage.getItemsAddedToWishlist().should(
            "include",
            PRODUCT_TO_TEST
          );
        }
      );
    });

    context("logged-out user", () => {
      beforeEach(() => {
        ProductDetailsPage.open(PRODUCT_ID_TO_TEST);
        ProductDetailsPage.addProductToWishlist();
      });

      it("KAN-T18 - should validate the error message for product added to wishlist", () => {
        getTcInfo().then((tcStatus) => {
          ProductDetailsPage.alert.should(
            "contains.text",
            `You must login or create an account to save ${PRODUCT_TO_TEST} to your wish list!`
          );
          updateInitFile(tcStatus.tcCreation, tcStatus.testCycleKey, true);
        });
      });
    });
  }
);
