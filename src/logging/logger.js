const winston = require('winston');
const {combine, timestamp, label, printf, prettyPrint} = winston.format;

let LABEL = 'APP';

function setLabel(label) {
  LABEL = label;
}

// const myFormat = printf(({ level, message, label, timestamp }) => {
//   return `${timestamp} [${label}] ${level}: ${message}`;
// });


const logger = winston.createLogger({
    level: 'info',
    format: combine(
      label({ label: LABEL }),
      timestamp("%Y-%m-%dT%H:%M:%S.%L%Z"),
      winston.format.json(),
      // prettyPrint()
      // myFormat
    ),
    transports: [
      new winston.transports.Console(),
      new winston.transports.File({ filename: '/var/webapp.log' }), // Save log file in /var/ folder
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