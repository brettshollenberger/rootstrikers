var sendgrid = require('sendgrid')(
  process.env.SENDGRID_USERNAME || 'app17265372@heroku.com',
  process.env.SENDGRID_PASSWORD || 'ggclqmgk'
);

module.exports = function(app) {
    
    return {
        send: function(params) {
            if ('development' === app.get('env')) {
                //params.to = 'matt@facultycreative.com';
                //console.info('App is in development, we are overriding the email addresses');
            } else {
                //sendgrid.send(params);   
            }
        }
    };
};