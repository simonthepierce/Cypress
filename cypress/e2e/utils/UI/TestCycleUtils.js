function getTcInfo() {
  return cy.readFile("cypress/fixtures/UI/init.json").then((data) => {
    return {
      tcCreation: data.tcCreation,
      testCycleKey: data.testCycleKey,
      isLastTestCase: data.isLastTestCase,
    };
  });
}

function resetTcCreation() {
  cy.writeFile("cypress/fixtures/UI/init.json", {
    tcCreation: false,
    testCycleKey: null,
    isLastTestCase: false,
  });
}

function updateInitFile(tcCreation, testCycleKey, isLastTestCase) {
  cy.writeFile("cypress/fixtures/UI/init.json", {
    tcCreation: tcCreation,
    testCycleKey: testCycleKey,
    isLastTestCase: isLastTestCase,
  });
}
module.exports = {
  resetTcCreation,
  getTcInfo,
  updateInitFile,
};

export { resetTcCreation, getTcInfo, updateInitFile };
