var testPages = {

    'test1' : {
    
        "meta": {
            "limit": 20,
            "next": null,
            "offset": 0,
            "previous": null,
            "total_count": 1
        },
        "objects": [
            {
                "actions": "/rest/v1/petitionaction/?page=411",
                "allow_multiple_responses": false,
                "cms_form": "/rest/v1/petitionform/167/",
                "created_at": "2013-08-20T15:43:06",
                "fields": {
                    "description": "Officials at Heathrow Airport detained Glenn Greenwald's partner for nine hours, confiscated his thumb drives, and threatened him with imprisonment -- all to \"send a message.\"",
                    "image_url": "http://static.guim.co.uk/sys-images/Guardian/Pix/pictures/2013/8/20/1376982811508/David-Miranda-010.jpg",
                    "twitter_text": "Pls RT: UK detains @ggreenwald's partner for 9 hrs to \"send message\" -- Demand Justice! #NSA"
                },
                "followup": {
                    "email_body": "<p>Thanks for signing.</p>\r\n<p><strong>We cannot allow our governments to bully their critics into silence.</strong></p>\r\n<p><strong></strong>Please encourage your friends to join us in condemning this despicable miscarriage of justice.</p>",
                    "email_custom_from": "",
                    "email_from_line": "/rest/v1/fromline/16/",
                    "email_subject": "re: intimidating journalists",
                    "email_wrapper": "/rest/v1/emailwrapper/2/",
                    "id": 389,
                    "notifications": [],
                    "page": "/rest/v1/petitionpage/411/",
                    "resource_uri": "/rest/v1/pagefollowup/389/",
                    "send_email": true,
                    "send_notifications": false,
                    "send_pushes": false,
                    "send_taf": true,
                    "taf_body": "Hey -\r\n\r\nJust got this email from Demand Progress. It's totally unbelievable. \r\n\r\nJournalist Glenn Greenwald's partner David Miranda was apparently detained by police at London's Heathrow Airport FOR NINE HOURS!\r\n\r\nDuring that time Miranda was forbidden from calling Greenwald or lawyer and repeatedly threatened with jail time if he didn't \"cooperate.\" His laptop, camera, and memory sticks were all confiscated.\r\n\r\nClick here to demand justice: http://act.demandprogress.org/sign/miranda/\r\n\r\nThere is little doubt that this egregious abuse of power was intended to intimidate Miranda, and by extension, Greenwald -- who has played a key role in exposing the US and UK's massive domestic spying programs in collaboration with NSA whistleblower Edward Snowden. As one US security official told Reuters, the British government's detention was intended to \"send a message.\" \r\n\r\nClick here to SEND A MESSAGE back at them: http://act.demandprogress.org/sign/miranda/\r\n\r\nWe have to show the US and UK governments that they won't succeed in intimidating their critics into silence. Indeed, as Greenwald himself put it, these brutish scare tactics -- threatening journalists with prosecution, detaining their loved ones, equating journalism with \"terrorism\" -- only \"underscore why it's so dangerous to allow [these governments] to exercise vast, unchecked spying power in the dark.\"\r\n\r\n\r\nClick here to demand an explanation for David Miranda's 9-hour police detention -- and tell the US and UK to stop trying to intimidate journalists or their loved ones: http://act.demandprogress.org/sign/miranda/\r\n\r\nThanks",
                    "taf_subject": "They detained him for 9 hours",
                    "url": "/cms/thanks/miranda"
                },
                "goal": 10000,
                "goal_type": "actions",
                "hidden": false,
                "hosted_with": "/rest/v1/hostingplatform/1/",
                "id": 411,
                "language": "/rest/v1/language/100/",
                "list": "/rest/v1/list/1/",
                "multilingual_campaign": null,
                "name": "miranda",
                "recognize": "once",
                "required_fields": [
                    {
                        "id": 2,
                        "name": "zip",
                        "resource_uri": "/rest/v1/formfield/2/"
                    }
                ],
                "resource_uri": "/rest/v1/petitionpage/411/",
                "status": "active",
                "tags": [],
                "title": "Tell the governments of the US and UK: Stop bullying journalists and their loved ones ",
                "type": "Petition",
                "updated_at": "2013-08-20T16:46:44",
                "url": ""
            }
        ]
    },
    'test2' : {
        "meta": {
            "limit": 20,
            "next": null,
            "offset": 0,
            "previous": null,
            "total_count": 1
        },
        "objects": [
            {
                "actions": "/rest/v1/petitionaction/?page=1",
                "allow_multiple_responses": false,
                "cms_form": "/rest/v1/petitionform/1/",
                "created_at": "2009-06-26T18:14:25",
                "fields": {
                    "image_url": "http://www.kennuncorked.com/images_multiple_locations/c_usda_organic_seal.jpg"
                },
                "followup": {
                    "email_body": "<p>Dear {{user.first_name}},</p>\r\n<p>Thank you for signing!</p>\r\n<p>Best,</p>\r\n<p>Food Democracy Now</p>",
                    "email_custom_from": "",
                    "email_from_line": "/rest/v1/fromline/1/",
                    "email_subject": "Thanks for demanding a sustainable USDA",
                    "email_wrapper": "/rest/v1/emailwrapper/1/",
                    "id": 1,
                    "notifications": [],
                    "page": "/rest/v1/petitionpage/1/",
                    "resource_uri": "/rest/v1/pagefollowup/1/",
                    "send_email": true,
                    "send_notifications": false,
                    "send_pushes": false,
                    "send_taf": true,
                    "taf_body": "Sample tellafriend content",
                    "taf_subject": "Sample tellafriend message",
                    "url": "/cms/thanks/usda/"
                },
                "goal": 100000,
                "goal_type": "dollars",
                "hidden": false,
                "hosted_with": "/rest/v1/hostingplatform/1/",
                "id": 1,
                "language": "/rest/v1/language/100/",
                "list": "/rest/v1/list/1/",
                "multilingual_campaign": null,
                "name": "usda",
                "recognize": "once",
                "required_fields": [],
                "resource_uri": "/rest/v1/petitionpage/1/",
                "status": "active",
                "tags": [],
                "title": "Demand a Sustainable USDA",
                "type": "Petition",
                "updated_at": "2010-12-16T18:33:23",
                "url": ""
            }
        ]
    }

};

var request = require('request');

module.exports = function(app, db) {
    
    var apiBase = 'https://facultycreative:F8CArey0FBQt@act.demandprogress.org/rest/v1/';
    
    app.post('/api/actionkit/createUser', function(req, res, next) {
    
        var url = apiBase + 'user/';
       
        request({method:'POST', uri:url, body:req.body, headers:{'Content-Type':'application/json'}, json:true}, function (error, response, body) {
          
          if (!error && response.statusCode == 201) {
          
            // get the user id of the returned ActionKit user
            var segment_str = response.headers.location;
            var segment_array = segment_str.split( '/' );
            var last_segment = segment_array[segment_array.length - 2];
          
            res.send({error:false, response:last_segment});
          } else {
            res.send({error:true});
          }
          
        }); 

    });
    
    app.get('/api/actionkit/getUser', function(req, res, next) {
    
        var url = apiBase + 'user/?email=' + req.query.email;
       
        request({method:'GET', uri:url, json:true}, function (error, response, body) {
          
          if (!error && response.statusCode == 200 && body.meta.total_count === 1) {
            res.send({error:false, response:body.objects[0]});
          } else {
            res.send({error:true});
          }
          
        }); 
        
    });
    
    // hooked up to the dummey data
    app.get('/api/actionkit/getPage', function(req, res, next) {
       
        var url = apiBase + 'page/?name=' + req.query.shortname;
        
        if(req.query.shortname in testPages) {
            var body = testPages[req.query.shortname];
            res.send({error:false, response:body.objects[0]});
        } else {
            res.send({error:true});
        }
    });
    
    app.post('/api/actionkit/doAction', function(req, res, next) {
    
        var url = apiBase + 'action/';
       
        request({method:'POST', uri:url, body:req.body, headers:{'Content-Type':'application/json'}, json:true}, function (error, response, body) {      
          
          if (!error && response.statusCode == 201) {
            res.send({error:false});
          } else if(!error && response.statusCode == 400) {
              if(body.errors) {
                res.send({error:true, errors:body.errors});
              } else {
                res.send({error:true});
              }
          } 
          else {
              res.send({error:true});
          }
          
        }); 
    });
    
};