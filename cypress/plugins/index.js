const path = require('path');

module.exports = (on, config) => {
  on('before:run', (details) => {
    // This event is fired before the test run starts
    console.log('Starting test run...');
  });

  on('after:spec', (spec, results) => {
    // This event is fired after each spec file is run
    const specFileName = path.basename(spec.relative, '.js'); // Get the spec file name without extension
    const reporterOptions = config.reporterOptions;

    if (reporterOptions && reporterOptions.mochawesomeReporterOptions) {
      reporterOptions.mochawesomeReporterOptions.reportFilename = `test-report-${specFileName}`;
    }

    return null;
  });

  return config;
};
