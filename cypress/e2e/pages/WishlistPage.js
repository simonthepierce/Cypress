import BasePage from "./BasePage";
const routes = require("../config/API/routes");
import { ENDPOINT_PREFIX } from "../config/UI/constants";

class WishlistPage extends BasePage {
  get wishlistItems() {
    return cy.get("h2 + div>table>tbody>tr");
  }
  get removeFromWishlistBtn() {
    return cy.get('[data-original-title="Remove"]');
  }
  get emptyWishlistDesc() {
    return cy.get("#content>h2+p");
  }

  get productNameCol() {
    return cy.contains("table thead td", "Product Name");
  }

  open() {
    return super.open(ENDPOINT_PREFIX + routes.WISHLIST_ENDPOINT);
  }

  getItemsAddedToWishlist() {
    let wishlistItemsArr = [];

    this.productNameCol
      .invoke("index")
      .should("be.a", "number")
      .then((columnIndex) => {
        this.wishlistItems.each(($wishlistItem) => {
          cy.wrap($wishlistItem)
            .find("td a")
            .eq(columnIndex)
            .invoke("text")
            .then((productName) => {
              wishlistItemsArr.push(productName);
            });
        });
      });

    return cy.wrap(wishlistItemsArr);
  }

  removeItemsFromWishlist() {
    this.removeFromWishlistBtn.then(($buttons) => {
      const buttonCount = $buttons.length;
      for (let i = 0; i < buttonCount; i++) {
        this.removeFromWishlistBtn.eq(0).click();
      }
    });
  }
}

export default new WishlistPage();
