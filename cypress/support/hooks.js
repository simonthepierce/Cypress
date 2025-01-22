require("@cypress/code-coverage/support");

import { resetTcCreation, getTcInfo } from "../e2e/utils/UI/TestCycleUtils";

let testExecutionRequests = [];

before(() => {
  getTcInfo().then((tcStatus) => {
    if (!tcStatus.tcCreation) {
      const token = Cypress.env("ZEPHYRAPI");
      const url = Cypress.env("ZEPHYRURL") + "/testcycles";

      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, "0");
      const day = String(now.getDate()).padStart(2, "0");
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      const seconds = String(now.getSeconds()).padStart(2, "0");

      let dateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

      cy.request({
        headers: {
          Authorization: `Bearer ${token}`,
        },
        url: `${url}`,
        method: "POST",
        body: {
          projectKey: "KAN",
          name: `Regression - ${dateTime}`,
        },
      }).then((response) => {
        cy.writeFile("cypress/fixtures/UI/init.json", {
          tcCreation: true,
          testCycleKey: response.body.key,
          isLastTestCase: false,
        });
      });
      return;
    }
  });
});

afterEach(function () {
  getTcInfo().then((tcStatus) => {
    const testCycle = tcStatus.testCycleKey;
    if (!testCycle) {
      console.error(
        "Test cycle key is missing! Skipping status update for this test."
      );
      return;
    }

    const pattern = /KAN-T\d+/;
    const match = this.currentTest.title.match(pattern);

    if (!match) {
      console.warn("No test case key found in the test title.");
      return;
    }

    const testCaseKey = match[0];
    const statusMap = {
      passed: "Pass",
      failed: "Fail",
      skipped: "Not Executed",
    };

    const requestBody = {
      projectKey: "KAN",
      testCaseKey: testCaseKey,
      testCycleKey: testCycle,
      statusName: statusMap[this.currentTest.state] || "Not Executed",
    };

    testExecutionRequests.push(requestBody);

    cy.log(`Request body for ${testCaseKey} created and stored.`);
  });
});

after(() => {
  getTcInfo().then((tcStatus) => {
    if (tcStatus.tcCreation) {
      console.log(
        "In After hook (Status Execution state): " + tcStatus.tcCreation
      );

      if (testExecutionRequests.length === 0) {
        console.log("No test cases to update.");
      } else {
        const token = Cypress.env("ZEPHYRAPI");
        const url = Cypress.env("ZEPHYRURL") + "/testexecutions";

        console.log(
          `Sending ${testExecutionRequests.length} test execution updates...`
        );

        cy.wrap(testExecutionRequests).each((requestBody) => {
          cy.request({
            headers: {
              Authorization: `Bearer ${token}`,
            },
            url: url,
            method: "POST",
            body: requestBody,
          }).then((response) => {
            console.log(
              `Updated test case ${requestBody.testCaseKey} with status ${requestBody.statusName}, ${response.body}`
            );
          });
        });
      }
    }

    if (tcStatus.isLastTestCase) {
      cy.then(() => {
        console.log("Resetting tcCreation to false...");
        resetTcCreation();
      });
    }
  });
});
