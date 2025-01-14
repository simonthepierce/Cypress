import BasePage from "./BasePage";
const routes = require("../config/API/routes");
import { ENDPOINT_PREFIX } from "../config/UI/constants";

class AccountPage extends BasePage {
  get h1Heading() {
    return cy.get("#content h1");
  }
  get h2Heading() {
    return cy.get("#content h2");
  }

  open() {
    return super.open(ENDPOINT_PREFIX + routes.ACCOUNT_ENDPOINT);
  }
}

export default new AccountPage();
