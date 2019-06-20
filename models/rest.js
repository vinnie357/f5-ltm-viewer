
const request = require("request-promise");
module.exports.getRequest = async function (input) {
    try {
        // Set default options
        // console.log("get-request",input)
        // console.log("inputToken",input.token,input.uri);
        this.host   = (typeof input.host   === 'string')  ? input.host   : '127.0.0.1';
        this.protocol  = (typeof input.protocol  === 'string')  ? input.protocol  : 'https:';
        //this.port   = (typeof input.port   === 'number')  ? input.port   : 443;
        // this.username   = (typeof input.username   === 'string')  ? input.username   : input.web_user;
        // this.password   = (typeof input.password   === 'string')  ? input.password   : input.web_pass;
        this.uri    = (typeof input.uri === 'string') ? input.uri : '/mgmt/shared/authn/login';
        //this.auth   = (typeof input.auth === 'string') ? input.auth : "Basic " + new Buffer(this.username + ":" + this.password).toString("base64")
        this.url = (typeof input.url === 'string') ? input.url : this.protocol + '//' + this.host + this.uri;
        this.debug  = (typeof input.debug  === 'boolean') ? input.debug  : false;
        this.ignorecert = (typeof input.ignorecert === 'boolean') ? input.ignorecert : false;
        this.token = (input.token) ? input.token : "none";
        this.url = (input.url ) ? input.url  : this.protocol + '//' + this.host + this.uri;
       // console.log("restGET",input);
        // console.log("restGet",this.token)
        // make request
        //options
        options = {
            protocol: this.protocol,
            host: this.host,
            uri: this.url,
            method: 'GET',
            sendImmediately: true,
            rejectUnauthorized: this.ignorecert,
            headers: {
            'X-F5-Auth-Token': this.token
            },
        };
        // console.log("geturi",options.uri)
        let data = request(options, function (error, response, body) {
            // console.log('statusCode:', response.statusCode); // Print the response status code if a response was received
            if(response.statusCode == 200) {
                // console.log('get:',response);
                return data
            } 
            if(error){console.log('error:', error)}; // Print the error if one occurred
            // console.log('statusCode:', response.statusCode); // Print the response status code if a response was received
            // console.log(options.headers)
        });

        return data
    } catch(err){
        console.log("rest",err);
    }
}

module.exports.postRequest = async function (input) {
    try {
        // Set default options
        this.host   = (typeof input.host   === 'string')  ? input.host   : '127.0.0.1';
        this.protocol  = (typeof input.protocol  === 'string')  ? input.protocol  : 'https:';
        //this.port   = (typeof input.port   === 'number')  ? input.port   : 443;
        // this.username   = (typeof input.username   === 'string')  ? input.username   : input.web_user;
        // this.password   = (typeof input.password   === 'string')  ? input.password   : input.web_pass;
        this.uri    = (typeof input.uri === 'string') ? input.uri : '/mgmt/shared/authn/login';
        //this.auth   = (typeof input.auth === 'string') ? input.auth : "Basic " + new Buffer(this.username + ":" + this.password).toString("base64")
        this.url = (typeof input.url === 'string') ? input.url : this.protocol + '//' + this.host + this.uri;
        this.debug  = (typeof input.debug  === 'boolean') ? input.debug  : false;
        this.ignorecert = (typeof input.ignorecert === 'boolean') ? input.ignorecert : false;
        // console.log("restPost",input);
        // make request
        //vars
        var post_data_json = {
            "none":"null"
        };
        this.post_data = (input.post_data) ? input.post_data : post_data_json;
        // console.log(post_data_json);
        //options
        options = {
            protocol: this.protocol,
            host: this.host,
            uri: this.url,
            method: 'POST',
            sendImmediately: true,
            rejectUnauthorized: this.ignorecert,
            headers: {
            'Content-Type': 'application/json'
            },
            json: true,
            body: this.post_data
        };
        let data = request(options, function (error, response, body) {
            if(response.statusCode == 200) {
                //console.log('token:',response.body.token.token);
                token = response.body.token.token
                return token
            } 
            if(error){console.log('error:', error)}; // Print the error if one occurred
            console.log('statusCode:', response.statusCode); // Print the response status code if a response was received
        });

        return data
        } catch(err){
            console.log("rest",err);
        }
}