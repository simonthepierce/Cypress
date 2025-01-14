import BasePage from "./BasePage";
const routes = require("../config/API/routes");
import { ENDPOINT_PREFIX } from "../config/UI/constants";

class RegisterPage extends BasePage {
  get firstNameInput() {
    return cy.get("#input-firstname");
  }
  get lastNameInput() {
    return cy.get("#input-lastname");
  }
  get emailInput() {
    return cy.get("#input-email");
  }
  get telephoneInput() {
    return cy.get("#input-telephone");
  }
  get passwordInput() {
    return cy.get("#input-password");
  }
  get passwordConfirmInput() {
    return cy.get("#input-confirm");
  }
  get policyCheckbox() {
    return cy.get('input[type="checkbox"][name="agree"]');
  }
  get continueBtn() {
    return cy.get('input[type="submit"][value="Continue"]');
  }

  get inputValidationErr() {
    return (inputField) => cy.wrap(inputField).next(".text-danger");
  }

  get alertMsg() {
    return cy.get("#account-register .alert");
  }

  open() {
    return super.open(ENDPOINT_PREFIX + routes.REGISTRATION_ENDPOINT);
  }

  enterFirstName(username) {
    this.firstNameInput.type(username);
    return this;
  }

  enterLastName(lastName) {
    this.lastNameInput.type(lastName);
    return this;
  }

  enterPassword(password) {
    this.passwordInput.type(password);
    return this;
  }

  enterConfirmPassword(password) {
    this.passwordConfirmInput.type(password);
    return this;
  }

  enterEmail(email) {
    this.emailInput.type(email);
    return this;
  }

  enterTelephone(telephone) {
    this.telephoneInput.type(telephone);
    return this;
  }

  confirmPolicy(value) {
    if (value) {
      this.policyCheckbox.check();
    } else {
      this.policyCheckbox.uncheck();
    }
    return this;
  }

  submitRegistration() {
    this.continueBtn.click();
  }
}

export default new RegisterPage();
