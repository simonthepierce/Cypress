import { validationMessages } from "../../config/UI/errorMessages";
import AccountPage from "../../pages/AccountPage";
import LoginPage from "../../pages/LoginPage";
import RegisterPage from "../../pages/RegisterPage";

import { faker } from "@faker-js/faker";

describe("Account Registration", { tags: ["@Register", "@regression"] }, () => {
  beforeEach(() => {
    LoginPage.openRegistrationPage();
  });
  it("should register the new user", () => {
    let password = faker.internet.password();

    RegisterPage.enterFirstName(faker.person.firstName())
      .enterLastName(faker.person.lastName())
      .enterEmail(faker.internet.email())
      .enterTelephone(faker.phone.number())
      .enterPassword(password)
      .enterConfirmPassword(password)
      .confirmPolicy(true)
      .submitRegistration();

    AccountPage.h1Heading.should("have.text", "Your Account Has Been Created!");
  });

  it(
    "should validate the error messages for missing input fields",
    { tags: "@smoke" },
    () => {
      RegisterPage.submitRegistration();
      cy.validateFormField(
        RegisterPage.firstNameInput,
        validationMessages.FIRSTNAME
      );
      cy.validateFormField(
        RegisterPage.lastNameInput,
        validationMessages.LASTNAME
      );
      cy.validateFormField(RegisterPage.emailInput, validationMessages.EMAIL);
      cy.validateFormField(
        RegisterPage.telephoneInput,
        validationMessages.TELEPHONE
      );
      cy.validateFormField(
        RegisterPage.passwordInput,
        validationMessages.PASSWORD
      );

      RegisterPage.alertMsg
        .should("be.visible")
        .and("contain.text", validationMessages.PRIVACY_POLICY);
    }
  );
});
