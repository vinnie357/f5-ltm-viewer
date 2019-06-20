

// match name to credentials object to get user/pass
getCreds = async function (input) { 
    try {
    //console.log("s",input);
    var credList = require("../user/creds.json");
    var devices = credList.creds;
    var creds = "";
    creds = devices.find(device => {
        return device.name === input.name
    });
    return creds
    } catch(err) {
        console.log("s",err);
    }

}

module.exports = {
    getCreds
}