var sendgrid = require('sendgrid')(
  process.env.SENDGRID_USERNAME || 'app17807371@heroku.com',
  process.env.SENDGRID_PASSWORD || '6e1zv73g'
);

module.exports = {
  send: sendgrid.send
};