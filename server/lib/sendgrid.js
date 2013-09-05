var sendgrid = require('sendgrid')(
  process.env.SENDGRID_USERNAME,
  process.env.SENDGRID_PASSWORD
);

module.exports = {
  send: sendgrid.send
};