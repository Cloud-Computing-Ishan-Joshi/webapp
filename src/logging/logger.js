const winston = require('winston');
const {combine, timestamp, label, printf, prettyPrint} = winston.format;

let LABEL = 'APP';

function setLabel(label) {
  LABEL = label;
}

var file_path = './webapp.log';

// const myFormat = printf(({ level, message, label, timestamp }) => {
//   return `${timestamp} [${label}] ${level}: ${message}`;
// });

if (process.env.NODE_ENV === 'test') {
  LABEL = 'TEST';
  file_path = './test.log';
}
const logger = winston.createLogger({
    level: 'info',
    severity: 'INFO',
    format: combine(
      label({ label: LABEL }),
      timestamp("%Y-%m-%dT%H:%M:%S.%LZ"),
      winston.format.json(),
      // prettyPrint()
      // myFormat
    ),
    transports: [
      new winston.transports.Console(),
      new winston.transports.File({ filename: file_path }), // Save log file in /var/ folder
      // new winston.transports.File({ filename: 'application.log' }), // Save log file in /var/ folder
      // new LoggingWinston({
      //   projectId: 'your-project-id',
      //   keyFilename: 'path/to/keyfile.json', // Path to your GCP service account key file
      //   logName: 'application-log',
      //   resource: { type: 'global' },
      // }),
    ]
  });

module.exports = {logger, setLabel};