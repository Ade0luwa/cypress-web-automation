/// <reference types= "cypress" />
/// <reference types= "cypress-xpath" />
const path = require('path')
const data=require('../fixtures/'+Cypress.env("environment")+'/jsonData.config.json')
const fs = require('fs');

import loginPage from "../pageObjects/loginPage";
import sourcesPage from "../pageObjects/sourcesPage";
import destinationPage from "../pageObjects/destinationPage";
import flowsPage from "../pageObjects/flowsPage";
import statusPage from "../pageObjects/statusPage";
import { getRandomPortNumber } from './utils';

// import 'cypress-wait-until';
// import 'cypress-map';
// import 'cypress-file-upload';

// const dayjs = require('dayjs');
const url1 = Cypress.env('url1')
const login = new loginPage();
const sources = new sourcesPage()
const destination = new destinationPage()
const flows = new flowsPage()
const status = new statusPage()

const nameBases = {
  UDP: {
    input: data.Create.UDPinputID,
    output: data.Create.UDPoutputID
  },
  RTP: {
    output: data.Create.RTPoutputID
  },
  SRT: {
    input: data.Create.SRTinputID,
    output: data.Create.SRToutputID
  },
  RIST: {
    input: data.Create.RISTinputID,
    output: data.Create.RISToutputID
  },
  ENCODER: {
    base: data.Create.encoder
  },
  DECODER: {
    base: data.Create.decoder
  },
  UDX: {
    base: data.Create.udx
  }
};

const udpMode = data.Filter_Values.udpMode
const ristMode = data.Filter_Values.ristMode
const srtMode = data.Filter_Values.srtMode
const rtpMode = data.Filter_Values.rtpMode
const statusSelector = data.Filter_Values.statusData
const inputModeSelector = data.Filter_Values.inputModeData
const outputModeSelector = data.Filter_Values.outputModeData
const Status1 = data.Filter_Values.Status1
const Status2 = data.Filter_Values.Status2
const flowID = data.Filter_Values.flowID
const outIP = data.Create.UDPdestinationIP
const reflektorIP = data.Create.reflektorIP
const wrongUser = data.Username_Password.invalidUsername
let sourceCounter = data.Create.inputCounter
let destinationCounter = data.Create.outputCounter
const UDPinputNameBase  = data.Create.UDPinputID
const UDPoutputNameBase  = data.Create.UDPoutputID
const RTPoutputNameBase  = data.Create.RTPoutputID
const SRTinputNameBase  = data.Create.SRTinputID
const SRToutputNameBase  = data.Create.SRToutputID
const RISTinputNameBase  = data.Create.RISTinputID
const RISToutputNameBase  = data.Create.RISToutputID
const flowNameBase  = data.Create.flowID
const ipAddr = data.Create.IP
const Data1  = data.Create.Data1InterfaceType

Cypress.Commands.add("login", (username, password) => {
  login.getUsername().clear().type(username);
  cy.wait(1000);
  login.getPassword().clear().type(password);
  login.getSubmit().click();
  cy.wait(1000);
});

Cypress.Commands.add("invalidPassword", (username, invalidPassword) => {
  login.getUsername().clear().type(username);
  cy.wait(1000);
  login.getPassword().clear().type(invalidPassword);
  login.getSubmit().click();
  cy.wait(1000);
  login.getError().should("have.text", "Invalid credentials");
});

Cypress.Commands.add("invalidUsername", (invalidUsername, password) => {
  login.getUsername().clear().type(invalidUsername);
  cy.wait(1000);
  login.getPassword().clear().type(password);
  login.getSubmit().click();
  cy.wait(1000);
  login.getError().should("have.text", "Unable to find '" + wrongUser + "'");
});

Cypress.Commands.add("logout", () => {
  login.getLogout().click();
  cy.wait(1000);
});

Cypress.Commands.add("viewSources", () => {
  sources.getHeader().should("have.text", "Sources");
  cy.verifyTableColumns();
  cy.filterInputByMode();
  cy.filterTableByStatus();
});

Cypress.Commands.add("viewDestinations", () => {
  destination.getDestField().click();
  sources.getHeader().should("have.text", "Destinations");
  cy.verifyTableColumns();
  cy.filterOutputByMode();
  cy.filterTableByStatus();
});

Cypress.Commands.add("viewFlows", () => {
  flows.getFlowField().click();
  sources.getHeader().should("have.text", "Flows");
  cy.verifyTableColumns();
  cy.wait(4000)
  sources.getFilterBtn().click();
  cy.filterTableByStatus();
});

Cypress.Commands.add("verifyTableColumns", () => {
  sources.getColumnBtn().click();
  sources.getColumns().then(($checkedCheckboxes) => {
    // Extract the names of the checked columns
    const checkedColumns = [];
    $checkedCheckboxes.each((index, checkbox) => {
      checkedColumns.push(checkbox.name);
    });
    sources.getColumnBtn().click();
    // Verify that these columns are the only ones displayed in the table headers
    sources.getTableHeaders().each(($header) => {
      const headerField = $header.attr("data-field");
      if (headerField !== "__check__" && headerField !== "##") {
        expect(checkedColumns).to.include(headerField);
      }
    });
  });
});

Cypress.Commands.add("filterInputByMode", () => {
  cy.wait(4000)
  sources.getFilterBtn().should('be.visible').click();
  cy.wait(3000)
  //select column
  sources.getDropdown().should('be.visible').eq(2).click({ force: true });
  sources.getFilterOptions(inputModeSelector).click();
  //select operator
  sources.getDropdown().eq(3).should('be.visible').click({ force: true });
  sources.getFilterOptions("equals").click();
  //filter by UDP mode
  cy.log("Filter by UDP");
  sources.getFilterText().type(udpMode);
  cy.wait(1000);
  cy.checkForNoResults("UDP mode", udpMode, "mode", sources.getModeRow);
  //filter by SRT mode
  cy.log("Filter by SRT");
  sources.getFilterText().clear().type(srtMode);
  cy.wait(1000);
  cy.checkForNoResults("SRT mode", srtMode, "mode", sources.getModeRow);
  //filter by RIST
  cy.log("Filter by RIST");
  sources.getFilterText().clear().type(ristMode);
  cy.wait(1000);
  cy.checkForNoResults("RIST mode", ristMode, "mode", sources.getModeRow);
});
  

Cypress.Commands.add("filterOutputByMode", () => {
  cy.wait(4000)
  sources.getFilterBtn().should('be.visible').click();
  cy.wait(3000)
  sources.getDropdown().eq(2).should('be.visible').click({ force: true });
  sources.getFilterOptions(outputModeSelector).click();
  //select operator
  sources.getDropdown().eq(3).should('be.visible').click({ force: true });
  sources.getFilterOptions("equals").click();
  //filter by UDP mode
  cy.log("Filter by UDP");
  sources.getFilterText().type(udpMode);
  cy.wait(1000);
  cy.checkForNoResults("UDP mode", udpMode, "mode", destination.getModeRow);
  //filter by SRT mode
  cy.log("Filter by SRT");
  sources.getFilterText().clear().type(srtMode);
  cy.wait(1000);
  cy.checkForNoResults("SRT mode", srtMode, "mode", destination.getModeRow);
  //filter by RIST
  cy.log("Filter by RIST");
  sources.getFilterText().clear().type(ristMode);
  cy.wait(1000);
  cy.checkForNoResults("RIST mode", ristMode, "mode", destination.getModeRow);
});
  

Cypress.Commands.add("checkForNoResults", (searchType, expectedText, rowType, getModeRowFn) => {
    // Check if the "No results found" element exists or if the pagination shows "0–0 of 0"
    cy.get('body').then($body => {
      if ($body.find('.MuiDataGrid-overlay.css-14349d1').length > 0) {
        // If the "No results found" element exists, proceed with the check
        destination.getNoResultsFound().then(($el) => {
          if ($el.text().includes("No results found") || $el.text().includes("No rows to show")) {
            cy.log("No results found for " + searchType);
          } else {
            if (rowType === 'mode') {
              getModeRowFn().should('contain.text', expectedText);
            } else if (rowType === 'status') {
              sources.getStatusRow().should('contain.text', expectedText);
            }
          }
        });
      } else {
        // Check if the pagination shows "0–0 of 0"
        cy.get('.MuiTablePagination-displayedRows').then($pagination => {
          if ($pagination.text().includes("0-0 of 0")) {
            cy.log("No results found for " + searchType);
          } else {
            // If the element does not exist, directly check the appropriate row
            if (rowType === 'mode') {
              getModeRowFn().should('contain.text', expectedText);
            } else if (rowType === 'status') {
              sources.getStatusRow().should('contain.text', expectedText);
            }
          }
        });
      }
    });
});  
  

Cypress.Commands.add("filterTableByStatus", () => {
  cy.wait(2000);
  sources.getDropdown().eq(2).should('be.visible').click({ force: true });
  sources.getFilterOptions(statusSelector).click();
  //select operator
  sources.getDropdown().eq(3).should('be.visible').click({ force: true });
  sources.getFilterOptions("equals").click();
  //filter by started status
  cy.log("Filter by Started");
  sources.getFilterText().clear().type(Status1);
  cy.wait(1000);
  cy.checkForNoResults("Started status", Status1, "status");
  //filter by Disabled
  cy.log("Filter by Disabled");
  sources.getFilterText().clear().type(Status2);
  cy.wait(1000);
  cy.checkForNoResults("Started status", Status2, "status");
});

Cypress.Commands.add("filterTableByID", (filterType, filterID) => {
  cy.wait(4000)
  sources.getFilterBtn().should('be.visible').click();
  cy.wait(3000)
  sources.getDropdown().eq(2).should('be.visible').click({ force: true });
  sources.getFilterOptions(filterType).click();
  // select operator
  sources.getDropdown().eq(3).should('be.visible').click({ force: true });
  sources.getFilterOptions('equals').click();
  cy.wait(500);
  sources.getFilterText().clear().type(filterID);
  cy.wait(1000);
});

Cypress.Commands.add("filterTableBySourceID", (sourceType) => {
  const taskName = `read${sourceType}InputCounter`;
  cy.task(taskName).then((counter) => {
    const nameBase = nameBases[sourceType].input;
    const sourceID = `${nameBase}${counter}`;
    cy.filterTableByID('inputInfo.inputId', sourceID);
    sources.getSourceIDRow().should('contain.text', sourceID);
  });
});

Cypress.Commands.add("filterTableByOutputID", (outputType) => {
  const taskName = `read${outputType}OutputCounter`;
  cy.task(taskName).then((counter) => {
    const nameBase = nameBases[outputType].output;
    const outputID = `${nameBase}${counter}`;
    cy.filterTableByID('outputInfo.outputId', outputID);
    destination.getOutputIDRow().should('contain.text', outputID);
  });
});

Cypress.Commands.add("filterTableByFlowID", () => {
  cy.task("readFlowCounter").then((counter) => {
    const flowID = `${flowNameBase}${counter}`;
    cy.filterTableByID('flowId', flowID);
    flows.getFlowIDRow().should('contain.text', flowID);
  });
});

Cypress.Commands.add("createSource", (sourceType, mode, profileMode, additionalSteps) => {
  cy.log(`Starting create${sourceType}Source function`);
  sources.getCreateBtn().click();
  cy.wait(500);
  sources.getSingleCreate().click()
  cy.task(`read${sourceType}InputCounter`).then((sourceCounter) => {
    cy.log(`Current sourceCounter: ${sourceCounter}`);
    sourceCounter++;
    const inputID = `${nameBases[sourceType].input}${sourceCounter}`;
    cy.log(`Generated inputID: ${inputID}`);
    sources.getInputID().type(inputID);
    sources.getInputName().type(inputID);
    cy.log("Selecting input mode.....");
    sources.getDropdown().eq(1).click({ force: true });
    sources.getFilterOptions(mode).click();
    if (profileMode) {
      sources.getDropdown().eq(3).click({ force: true });
      sources.getFilterOptions(profileMode).click();
      cy.wait(1000)
    }
    if (additionalSteps) {
      additionalSteps();
    }
    sources.getSubmitBtn().click();
    cy.wait(3000);
    //sources.getSuccess().should("have.text", `Input '${inputID}' with 'id: ${inputID}' successfully created!`);
    cy.log(`Writing updated sourceCounter: ${sourceCounter}`);
    cy.task(`write${sourceType}InputCounter`, sourceCounter).then(() => {
      cy.log("Counter updated successfully");
    });
  });
});

Cypress.Commands.add("createUDPSource", () => {
  cy.createSource('UDP', udpMode, null, () => {
    sources.getIP().eq(0).clear().type(ipAddr);
    cy.log("Selecting interface.....");
    sources.getDropdown().eq(3).click({ force: true });
    sources.getFilterOptions(Data1).click();
  });
});

Cypress.Commands.add("createRISTSource", (profileMode) => {
  cy.createSource('RIST', ristMode, profileMode, () => {
    sources.getDropdown().eq(4).click({ force: true });
    sources.getFilterOptions("SERVER").click();
  });
});

Cypress.Commands.add("updatePortNumber", () => {
  cy.task('writePort', ).then(() => {
    cy.log("Counter updated successfully");
    cy.wait(1000); // Wait after the task completes
  });
});

Cypress.Commands.add("createSRTSource", (profileMode) => {
  cy.task("readPort").then((portNo) => {
    portNo+=2;
    const portNum = portNo;
    cy.createSource("SRT", srtMode, profileMode, () => {
      sources.getPort().clear().type(portNum);
    });
  cy.task('writePort', portNo).then(() => {
    cy.log("Counter updated successfully");
    cy.wait(1000); // Wait after the task completes
  });
})
});



Cypress.Commands.add("createDestination", (destinationType, mode, profileMode, additionalSteps) => {
  destination.getDestField().click();
  sources.getCreateBtn().click();
  cy.wait(2000);
  sources.getSingleCreate().click()
  cy.task(`read${destinationType}OutputCounter`).then((destinationCounter) => {
    cy.log(`Current destinationCounter: ${destinationCounter}`);
    destinationCounter++;
    const outputID = `${nameBases[destinationType].output}${destinationCounter}`;
    cy.log(`Generated outputID: ${outputID}`);
    destination.getOutputID().type(outputID);
    destination.getOutputName().type(outputID);
    cy.log("Selecting output mode.....");
    sources.getDropdown().eq(1).click({ force: true });
    sources.getFilterOptions(mode).click();
    if (profileMode) {
      sources.getDropdown().eq(5).click({ force: true });
      sources.getFilterOptions(profileMode).click();
    }
    if (additionalSteps) {
      additionalSteps();
    }
    sources.getSubmitBtn().click({ force: true });
    cy.wait(1000);
    //sources.getSuccess().should("have.text", `Output '${outputID}' with 'id: ${outputID})' successfully created!`);
    cy.log(`Writing updated destinationCounter: ${destinationCounter}`);
    cy.task(`write${destinationType}OutputCounter`, destinationCounter).then(() => {
      cy.log("Counter updated successfully");
    });
  });
});


Cypress.Commands.add("createUDP_RTPdestination", (destinationType, mode, profileMode, additionalSteps) => {
  cy.createDestination(destinationType, mode, profileMode, () => {
    destination.getIP().eq(0).clear().type(outIP);
    // Selecting the corresponding input
    cy.task("readUDPInputCounter").then((sourceCounter) => {
      const inputID = `${nameBases.UDP.input}${sourceCounter}`;
      cy.log(`Selecting corresponding input: ${inputID}`);
      sources.getDropdown().eq(2).click({ force: true });
      sources.getFilterOptions(inputID).click();
    });
    cy.log("Selecting interface.....");
    sources.getDropdown().eq(5).click({ force: true });
    sources.getFilterOptions(Data1).click();

    // Execute additional steps if provided
    if (additionalSteps) {
      additionalSteps();
    }
  });
});
// Usage for UDP
Cypress.Commands.add("createUDPDestination", () => {
  cy.createUDP_RTPdestination('UDP', udpMode, null);
});

// Usage for RTP
Cypress.Commands.add("createRTPDestination", () => {
  cy.createUDP_RTPdestination('RTP', udpMode, null, () => {
    cy.log("Selecting RTP.....");
    destination.getEncapsConfigBtn().click({force:true})
    cy.wait(1000)
    sources.getDropdown().eq(5).click({ force: true });
    sources.getFilterOptions(rtpMode).click();
  });
});


Cypress.Commands.add("createRISTDestination", (profileMode, ipAddress) => {
  cy.createDestination("RIST", ristMode, profileMode, () => {
    destination.getIP().eq(0).clear().type(ipAddress);
    sources.getDropdown().eq(6).click({ force: true });
    sources.getFilterOptions("CLIENT").click();
    // Selecting the corresponding input
    cy.task("readUDPInputCounter").then((sourceCounter) => {
      const inputID = `${nameBases.UDP.input}${sourceCounter}`;
      cy.log(`Selecting corresponding input: ${inputID}`);
      sources.getDropdown().eq(2).click({ force: true });
      sources.getFilterOptions(inputID).click();
    });
  });
});

Cypress.Commands.add("createSRTDestination", (profileMode, ipAddress) => {
  cy.createDestination("SRT", srtMode, profileMode, () => {
    cy.task("readPort").then((portNo) => {
      portNo += 2;
      const portNum = portNo;

      destination.getIP().eq(0).clear().type(ipAddress);
      sources.getPort().clear().type(portNum);
      // Selecting the corresponding input
      cy.task("readUDPInputCounter").then((sourceCounter) => {
        const inputID = `${nameBases.UDP.input}${sourceCounter}`;
        cy.log(`Selecting corresponding input: ${inputID}`);
        sources.getDropdown().eq(2).click({ force: true });
        sources.getFilterOptions(inputID).click();
      });
    });
  });
});

Cypress.Commands.add("createFlow", () => {
  flows.getFlowField().click();
  flows.getCreateBtn().click();
  cy.wait(2000);
  flows.getSingleCreateFlow().click()
  cy.task("readFlowCounter").then((flowCounter) => {
    cy.log(`Current flowCounter: ${flowCounter}`);
    flowCounter++;
    const flowID = `${flowNameBase}${flowCounter}`;
    cy.log(`Generated flowID: ${flowID}`);
    flows.getFlowID().type(flowID);
    flows.getFlowName().type(flowID);

    // Selecting the corresponding input
    cy.task("readUDPInputCounter").then((sourceCounter) => {
      const inputID = `${UDPinputNameBase}${sourceCounter}`;
      cy.log(`Selecting corresponding input: ${inputID}`);
      sources.getDropdown().eq(1).click({ force: true });
      sources.getFilterOptions(inputID).click();
      sources.getDropdown().eq(1).click({ force: true });
    });
    cy.wait(500);
    sources.getSubmitBtn().click({ force: true });
    cy.wait(1000);
    // sources
    //   .getSuccess()
    //   .should(
    //     "have.text",
    //     "Flow '" + flowID + "' with 'id: " + flowID + ")' successfully created!"
    //   );

    cy.log(`Writing updated flowCounter: ${flowCounter}`);
    cy.wait(1000);
    cy.task("writeFlowCounter", flowCounter).then(() => {
      cy.log("Counter updated successfully");
      cy.wait(1000); // Wait after the task completes
    });
  });
});


Cypress.Commands.add("restartOption", (restartValue) => {
  flows.getRestartBtn(restartValue).click({ force: true });
  cy.wait(500);
  flows.getAlertDialog().should("contain.text", "Restart Confirmation");
  cy.wait(500);
  flows.getYesConfirmation().click();
  cy.wait(1000);
  sources
    .getSuccess()
    .should(
      "have.text",
      `Resource '${restartValue}' with 'id: ${restartValue})' started successfully!`
    );
  sources.getStatusRow().should("contain.text", "started");
});
  


Cypress.Commands.add("startFlow", () => {
  flows.getFlowField().click();
  cy.wait(1000);
  cy.filterTableByFlowID();
  cy.task("readFlowCounter").then((flowCounter) => {
    const flowID = `${flowNameBase}${flowCounter}`;
    cy.restartOption(flowID);
  });
});

Cypress.Commands.add("startSource", (sourceType) => {
  cy.wait(1000);
  cy.filterTableBySourceID(sourceType);
  cy.task(`read${sourceType}InputCounter`).then((sourceCounter) => {
    const sourceID = `${nameBases[sourceType].input}${sourceCounter}`;
    cy.restartOption(sourceID);
  });
});

Cypress.Commands.add("startDestination", (destinationType) => {
  cy.wait(1000);
  cy.filterTableByOutputID(destinationType);
  cy.task(`read${destinationType}OutputCounter`).then((outputCounter) => {
    const outputID = `${nameBases[destinationType].output}${outputCounter}`;
    cy.restartOption(outputID);
  });
});

Cypress.Commands.add("getSourceBitrate", () => {
  // Get the bitrate value for the source
  status.getTSstatistics().contains('Sources').parent().find('.box-container').contains('Bitrate').next().invoke('text').then((text) => {
    const sourceBitrate = parseFloat(text.trim().replace(/,/g, ''));
    cy.log(`Source Bitrate: ${sourceBitrate}`);
    cy.wrap(sourceBitrate).as('sourceBitrate');
  });
});

Cypress.Commands.add("getDestinationBitrate", () => {
  // Get the bitrate value for the destination
  status.getTSstatistics().contains('Destinations').parent().find('.box-container').contains('Bitrate').next().invoke('text').then((text) => {
    const destinationBitrate = parseFloat(text.trim().replace(/,/g, ''));
    cy.log(`Destination Bitrate: ${destinationBitrate}`);
    cy.wrap(destinationBitrate).as('destinationBitrate');
  });
});

Cypress.Commands.add("compareBitrate", (sourceAlias, destinationAlias, mode) => {
  const checkAndCompareBitrate = () => {
    cy.get(sourceAlias).then((sourceBitrate) => {
      cy.wait(1000)
      if (sourceBitrate === 0) {
        cy.log ("Bitrate is 0")
        cy.reload();
        status.getSearchBtn().should('be.visible');
        cy[`verify${mode}SourceConnection`]();
      } else {
        cy.get(destinationAlias).then((destinationBitrate) => {
          if (destinationBitrate === 0) {
            cy.reload();
            cy[`verify${mode}DestinationConnection`]();
          } else {
            expect(destinationBitrate).to.be.gte(sourceBitrate * 0.5);
          }
        });
      }
    });
  };
  checkAndCompareBitrate();
});


Cypress.Commands.add("verifySourceConnection", (inputNameBase, inputCounterTask, statisticsTitle, connectionStatus) => {
  status.getStatusField().click();
  cy.wait(1000);
  cy.task(inputCounterTask).then((sourceCounter) => {
    const inputID = `${inputNameBase}${sourceCounter}`;
    cy.log(`Selecting corresponding input: ${inputID}`);
    status.getSearchBtn().type(inputID);
    cy.wait(1000);
    status.getName().click();
    status.getHeaderName().should('have.text', inputID);
  });
  status.getUDPstatisticsTitle().should('have.text', statisticsTitle);
  cy.wait(1000);
  cy.getSourceBitrate();
  if (connectionStatus) {
    status.getConnectionStatus().should('contain.text', connectionStatus);
  } else {
    status.getSourcePresent().should('have.text', 'true');
  }
});

Cypress.Commands.add("verifyDestinationConnection", (outputNameBase, outputCounterTask, statisticsTitle, connectionStatus) => {
  cy.log('checking destination connection');
  status.getStatusField().click();
  status.getDestinationTab().should('be.visible').click();
  cy.wait(1000);
  cy.task(outputCounterTask).then((destinationCounter) => {
    const outputID = `${outputNameBase}${destinationCounter}`;
    cy.log(`Selecting corresponding input: ${outputID}`);
    status.getSearchBtn().type(outputID);
    cy.wait(1000);
    status.getName().click();
    status.getHeaderName().should('have.text', outputID);
  });
  cy.getDestinationBitrate();
  status.getUDPstatisticsTitle().should('have.text', statisticsTitle);
  cy.wait(1000);
  if (connectionStatus) {
    status.getConnectionStatus().should('contain.text', connectionStatus);
  } else {
    status.getSourcePresent().should('have.text', 'true');
  }
});

Cypress.Commands.add("verifyConnections", (url1, url2, mode, username, password) => {
  // Verify Destination in RFK 1
  cy.visit(url1);
  cy.login(username, password);
  cy[`verify${mode}DestinationConnection`]();

  // Verify Source in RFK 2
  cy.visit(url2);
  cy.login(username, password);
  cy[`verify${mode}SourceConnection`]();
});


Cypress.Commands.add("verifyUDPSourceConnection", () => {
  cy.verifySourceConnection(UDPinputNameBase, "readUDPInputCounter", 'UDP Statistics');
});

Cypress.Commands.add("verifyUDPDestinationConnection", () => {
  cy.verifyDestinationConnection(UDPoutputNameBase, "readUDPOutputCounter", 'UDP Statistics');
  cy.compareBitrate('@sourceBitrate', '@destinationBitrate', udpMode);
});

Cypress.Commands.add("verifyRTPDestinationConnection", () => {
  cy.verifyDestinationConnection(RTPoutputNameBase, "readRTPOutputCounter", 'RTP Statistics');
  cy.compareBitrate('@sourceBitrate', '@destinationBitrate', rtpMode);
});

Cypress.Commands.add("verifyRISTSourceConnection", () => {
  cy.verifySourceConnection(RISTinputNameBase, "readRISTInputCounter", 'RIST Statistics', 'CONNECTED');
  cy.compareBitrate('@destinationBitrate', '@sourceBitrate', ristMode);
});

Cypress.Commands.add("verifySRTSourceConnection", () => {
  cy.verifySourceConnection(SRTinputNameBase, "readSRTInputCounter", 'SRT Statistics', 'CONNECTED');
  cy.compareBitrate('@destinationBitrate', '@sourceBitrate', srtMode);
});

Cypress.Commands.add("verifyRISTDestinationConnection", () => {
  cy.verifyDestinationConnection(RISToutputNameBase, "readRISTOutputCounter", 'RIST Statistics', 'CONNECTED');
});

Cypress.Commands.add("verifySRTDestinationConnection", () => {
  cy.verifyDestinationConnection(SRToutputNameBase, "readSRTOutputCounter", 'SRT Statistics', 'CONNECTED');
});


// Specific function to verify SRT destination connection
Cypress.Commands.add("createMicroservices", (microserviceType, otherMicroservice, additionalSteps) => {
  cy.log(`Starting create${microserviceType} function`);
  sources.getCreateBtn().click();
  cy.wait(500);
});

// Specific function to verify SRT destination connection
Cypress.Commands.add("createDecoder", () => {
  
});

// Specific function to verify SRT destination connection
Cypress.Commands.add("createEncoder", () => {
  
});

// Specific function to verify SRT destination connection
Cypress.Commands.add("createUDX", () => {
  
});


// Cypress.Commands.add("createSource", (sourceType, mode, profileMode, additionalSteps) => {
//   cy.log(`Starting create${sourceType}Source function`);
//   sources.getCreateBtn().click();
//   cy.wait(500);
//   cy.task(`read${sourceType}InputCounter`).then((sourceCounter) => {
//     cy.log(`Current sourceCounter: ${sourceCounter}`);
//     sourceCounter++;
//     const inputID = `${nameBases[sourceType].input}${sourceCounter}`;
//     cy.log(`Generated inputID: ${inputID}`);
//     sources.getInputID().type(inputID);
//     sources.getInputName().type(inputID);
//     cy.log("Selecting input mode.....");
//     sources.getDropdown().eq(1).click({ force: true });
//     sources.getFilterOptions(mode).click();
//     if (profileMode) {
//       sources.getDropdown().eq(3).click({ force: true });
//       sources.getFilterOptions(profileMode).click();
//       cy.wait(1000)
//     }
//     if (additionalSteps) {
//       additionalSteps();
//     }
//     sources.getSubmitBtn().click();
//     cy.wait(1000);
//     sources.getSuccess().should("have.text", `Input '${inputID}' with 'id: ${inputID}' successfully created!`);
//     cy.log(`Writing updated sourceCounter: ${sourceCounter}`);
//     cy.task(`write${sourceType}InputCounter`, sourceCounter).then(() => {
//       cy.log("Counter updated successfully");
//     });
//   });
// });

// Cypress.Commands.add("createUDPSource", () => {
//   cy.createSource('UDP', udpMode, () => {
//     sources.getIP().eq(0).clear().type(ipAddr);
//     cy.log("Selecting interface.....");
//     sources.getDropdown().eq(3).click({ force: true });
//     sources.getFilterOptions(Data1).click();
//   });
// });
