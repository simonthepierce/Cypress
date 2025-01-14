import HeaderComponent from "../components/headerComponents/HeaderComponent";

class BasePage {
  constructor() {
    this.header = new HeaderComponent();
  }

  open(path) {
    return cy.visit(path);
  }
}

export default BasePage;
