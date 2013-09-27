exports.seed = function() {
    return data;
};

var data = [{
    "id" : "email_verify",
    "name" : "Email Verification",
    "description" : "Email Sent when a new user is register by email to confirm account",
    "subject" : "Welcome to Rootstrike",
    "from" : "no-replay@rootstrike.com",
    "vars" : "From User: verification_link, id, first_name, last_name, email, city, state, country, avatar, thumb",
    "__v" : 0
}];