const { defineConfig } = require("cypress");
const fs = require('fs');
const path = require('path');

module.exports = defineConfig({
  chromeWebSecurity: false,
  env: {
    environment: "staging",
    browserPermissions: {
      geolocation: "allow",
    },
    url: "https://172.16.136.24",
    url1: "https://172.16.121.184",
  },
  reporter: "cypress-multi-reporters",
  reporterOptions: {
    reporterEnabled: "mochawesome",
    mochawesomeReporterOptions: {
      reportDir: "cypress/reports",
      overwrite: true,
      html: true,
      json: true,
      reportFilename: "[name]-report",
      quiet: true,
    },
  },
  defaultCommandTimeout: 20000,
  pageLoadTimeout: 60000,
  e2e: {
    setupNodeEvents(on, config) {
      on("task", {
        readUDPInputCounter() {
          const filePath = path.join(
            __dirname,
            "cypress/fixtures/",
            config.env.environment,
            "jsonData.config.json"
          );
          if (!fs.existsSync(filePath)) {
            throw new Error(`File not found: ${filePath}`);
          }
          const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
          return data.Create.UDPinputCounter;
        },
        writeUDPInputCounter(counter) {
          const filePath = path.join(
            __dirname,
            "cypress/fixtures/",
            config.env.environment,
            "jsonData.config.json"
          );
          if (!fs.existsSync(filePath)) {
            throw new Error(`File not found: ${filePath}`);
          }
          const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
          data.Create.UDPinputCounter = counter;
          fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
          console.log(`Counter updated to: ${counter}`);
          return null;
        },
        readUDPOutputCounter() {
          const filePath = path.join(
            __dirname,
            "cypress/fixtures/",
            config.env.environment,
            "jsonData.config.json"
          );
          if (!fs.existsSync(filePath)) {
            throw new Error(`File not found: ${filePath}`);
          }
          const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
          return data.Create.UDPoutputCounter;
        },
        writeUDPOutputCounter(counter) {
          const filePath = path.join(
            __dirname,
            "cypress/fixtures/",
            config.env.environment,
            "jsonData.config.json"
          );
          if (!fs.existsSync(filePath)) {
            throw new Error(`File not found: ${filePath}`);
          }
          const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
          data.Create.UDPoutputCounter = counter;
          fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
          console.log(`Counter updated to: ${counter}`);
          return null;
        },
        readRTPOutputCounter() {
          const filePath = path.join(
            __dirname,
            "cypress/fixtures/",
            config.env.environment,
            "jsonData.config.json"
          );
          if (!fs.existsSync(filePath)) {
            throw new Error(`File not found: ${filePath}`);
          }
          const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
          return data.Create.RTPoutputCounter;
        },
        writeRTPOutputCounter(counter) {
          const filePath = path.join(
            __dirname,
            "cypress/fixtures/",
            config.env.environment,
            "jsonData.config.json"
          );
          if (!fs.existsSync(filePath)) {
            throw new Error(`File not found: ${filePath}`);
          }
          const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
          data.Create.RTPoutputCounter = counter;
          fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
          console.log(`Counter updated to: ${counter}`);
          return null;
        },
        readSRTInputCounter() {
          const filePath = path.join(
            __dirname,
            "cypress/fixtures/",
            config.env.environment,
            "jsonData.config.json"
          );
          if (!fs.existsSync(filePath)) {
            throw new Error(`File not found: ${filePath}`);
          }
          const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
          return data.Create.SRTinputCounter;
        },
        writeSRTInputCounter(counter) {
          const filePath = path.join(
            __dirname,
            "cypress/fixtures/",
            config.env.environment,
            "jsonData.config.json"
          );
          if (!fs.existsSync(filePath)) {
            throw new Error(`File not found: ${filePath}`);
          }
          const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
          data.Create.SRTinputCounter = counter;
          fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
          console.log(`Counter updated to: ${counter}`);
          return null;
        },
        readSRTOutputCounter() {
          const filePath = path.join(
            __dirname,
            "cypress/fixtures/",
            config.env.environment,
            "jsonData.config.json"
          );
          if (!fs.existsSync(filePath)) {
            throw new Error(`File not found: ${filePath}`);
          }
          const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
          return data.Create.SRToutputCounter;
        },
        writeSRTOutputCounter(counter) {
          const filePath = path.join(
            __dirname,
            "cypress/fixtures/",
            config.env.environment,
            "jsonData.config.json"
          );
          if (!fs.existsSync(filePath)) {
            throw new Error(`File not found: ${filePath}`);
          }
          const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
          data.Create.SRToutputCounter = counter;
          fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
          console.log(`Counter updated to: ${counter}`);
          return null;
        },
        readRISTInputCounter() {
          const filePath = path.join(
            __dirname,
            "cypress/fixtures/",
            config.env.environment,
            "jsonData.config.json"
          );
          if (!fs.existsSync(filePath)) {
            throw new Error(`File not found: ${filePath}`);
          }
          const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
          return data.Create.RISTinputCounter;
        },
        writeRISTInputCounter(counter) {
          const filePath = path.join(
            __dirname,
            "cypress/fixtures/",
            config.env.environment,
            "jsonData.config.json"
          );
          if (!fs.existsSync(filePath)) {
            throw new Error(`File not found: ${filePath}`);
          }
          const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
          data.Create.RISTinputCounter = counter;
          fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
          console.log(`Counter updated to: ${counter}`);
          return null;
        },
        readRISTOutputCounter() {
          const filePath = path.join(
            __dirname,
            "cypress/fixtures/",
            config.env.environment,
            "jsonData.config.json"
          );
          if (!fs.existsSync(filePath)) {
            throw new Error(`File not found: ${filePath}`);
          }
          const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
          return data.Create.RISToutputCounter;
        },
        writeRISTOutputCounter(counter) {
          const filePath = path.join(
            __dirname,
            "cypress/fixtures/",
            config.env.environment,
            "jsonData.config.json"
          );
          if (!fs.existsSync(filePath)) {
            throw new Error(`File not found: ${filePath}`);
          }
          const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
          data.Create.RISToutputCounter = counter;
          fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
          console.log(`Counter updated to: ${counter}`);
          return null;
        },
        readFlowCounter() {
          const filePath = path.join(
            __dirname,
            "cypress/fixtures/",
            config.env.environment,
            "jsonData.config.json"
          );
          if (!fs.existsSync(filePath)) {
            throw new Error(`File not found: ${filePath}`);
          }
          const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
          return data.Create.flowCounter;
        },
        writeFlowCounter(counter) {
          const filePath = path.join(
            __dirname,
            "cypress/fixtures/",
            config.env.environment,
            "jsonData.config.json"
          );
          if (!fs.existsSync(filePath)) {
            throw new Error(`File not found: ${filePath}`);
          }
          const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
          data.Create.flowCounter = counter;
          fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
          console.log(`Counter updated to: ${counter}`);
          return null;
        },
        readPort() {
          const filePath = path.join(
            __dirname,
            "cypress/fixtures/",
            config.env.environment,
            "jsonData.config.json"
          );
          if (!fs.existsSync(filePath)) {
            throw new Error(`File not found: ${filePath}`);
          }
          const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
          return data.Create.portNumber;
        },
        writePort(counter) {
          const filePath = path.join(
            __dirname,
            "cypress/fixtures/",
            config.env.environment,
            "jsonData.config.json"
          );
          if (!fs.existsSync(filePath)) {
            throw new Error(`File not found: ${filePath}`);
          }
          const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
          data.Create.portNumber = counter;
          fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
          console.log(`Counter updated to: ${counter}`);
          return null;
        },
        readUDXcounter() {
          const filePath = path.join(
            __dirname,
            "cypress/fixtures/",
            config.env.environment,
            "jsonData.config.json"
          );
          if (!fs.existsSync(filePath)) {
            throw new Error(`File not found: ${filePath}`);
          }
          const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
          return data.Create.udxCounter;
        },
        writeUDXcounter(counter) {
          const filePath = path.join(
            __dirname,
            "cypress/fixtures/",
            config.env.environment,
            "jsonData.config.json"
          );
          if (!fs.existsSync(filePath)) {
            throw new Error(`File not found: ${filePath}`);
          }
          const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
          data.Create.udxCounter = counter;
          fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
          console.log(`Counter updated to: ${counter}`);
          return null;
        },
        readDECODERcounter() {
          const filePath = path.join(
            __dirname,
            "cypress/fixtures/",
            config.env.environment,
            "jsonData.config.json"
          );
          if (!fs.existsSync(filePath)) {
            throw new Error(`File not found: ${filePath}`);
          }
          const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
          return data.Create.decoderCounter;
        },
        writeDECODERcounter(counter) {
          const filePath = path.join(
            __dirname,
            "cypress/fixtures/",
            config.env.environment,
            "jsonData.config.json"
          );
          if (!fs.existsSync(filePath)) {
            throw new Error(`File not found: ${filePath}`);
          }
          const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
          data.Create.decoderCounter = counter;
          fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
          console.log(`Counter updated to: ${counter}`);
          return null;
        },
        readENCODERcounter() {
          const filePath = path.join(
            __dirname,
            "cypress/fixtures/",
            config.env.environment,
            "jsonData.config.json"
          );
          if (!fs.existsSync(filePath)) {
            throw new Error(`File not found: ${filePath}`);
          }
          const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
          return data.Create.encoderCounter;
        },
        writeENCODERcounter(counter) {
          const filePath = path.join(
            __dirname,
            "cypress/fixtures/",
            config.env.environment,
            "jsonData.config.json"
          );
          if (!fs.existsSync(filePath)) {
            throw new Error(`File not found: ${filePath}`);
          }
          const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
          data.Create.encoderCounter = counter;
          fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
          console.log(`Counter updated to: ${counter}`);
          return null;
        },
      });
    },
  },
});
