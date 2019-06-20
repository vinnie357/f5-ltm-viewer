//imports
var pass = require("./secrets");
var rest = require("./rest");

module.exports.getToken = async function (input) { 
        try {
            // console.log("auth",input);
            let creds = await pass.getCreds(input);
            this.post_data_json = {
                "username":creds.web_user,
                "password":creds.web_pass,
                "loginProviderName":"tmos"
            };
            input.post_data = this.post_data_json
            // console.log("data",input.post_data)
            return await rest.postRequest(input)
        } catch(err) {
            console.log("a",err)
        }
        
}