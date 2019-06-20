var rest = require("./rest");
var auth = require('./auth');

// Member = function(object){
//     console.log("new Member Object",object);
//     this.name = object.name;
//     this.address = object.address;
//     this.fullPath = object.fullPath;
//     this.state = object.state;
//     this.selfLink = object.selfLink;
//     this.pool = object.pool.name;
// }

class Member {
    constructor(object) {
        
        return (async () => {

            // All async code here
            this.name = object.name;
            this.address = object.address;
            this.fullPath = object.fullPath;
            this.state = object.state;
            this.selfLink = object.selfLink;
            this.pool = object.pool.name;
            return this; // when done
        })();
    }
}

// Virtual = function(object) {
//     // console.log("object",object);
//     this.partition = (object) ? object.partition : "Common";
//     this.name = (object.name) ? object.name : "none";
//     this.destination = (object.destination) ? object.destination : "none";
//     this.selfLink = (object.selfLink) ? object.selfLink : "none";
//     this.fullPath = (object.fullPath) ? object.fullPath : "none";
//     this.pool = {
//             name: (object.pool.name) ? object.pool.name : "none",
//             members: (object.pool.members) ? object.pool.members : [],
//             poolReference: {
//                 link: (object.pool.poolReference) ?  object.pool.poolReference : "none"
//             }
//         };
//     };

class Virtual {
    constructor(input,device) {
        
        return (async () => {
            // All async code here
            // console.log("input",input);
            // console.log("device",device);
            var token = await auth.getToken(device);
            var link = (input.pool) ?  await updateLinks(input.poolReference.link,device.host).then() : "none";
            var members = (input.pool) ? await getRelatedPools(token.token.token,device.host,link) : "none"
            this.host = device.host
            this.partition = (input) ? input.partition : "Common";
            this.name = (input.name) ? input.name : "none";
            this.destination = (input.destination) ? input.destination : "none";
            this.selfLink = (input.selfLink) ? input.selfLink : "none";
            this.fullPath = (input.fullPath) ? input.fullPath : "none";
            this.pool = {
                    name: (input.pool) ? input.pool : "none",
                    poolReference: {
                        link: await link
                    },
                    members: await members
                };
            return this; // when done
        })();
    }
}

class Request {
    constructor(input) {
        
        return (async () => {

            // All async code here
            this.host = (input.host) ? input.host : "127.0.0.1",
            this.token = await auth.getToken(input);
            return this; // when done
        })();
    }
}

addMembers = function(object) {
    // console.log("add",object);
    // console.log("add",object.name);
    // console.log("add",object.partition);
    members = [
        {
            name:"1234",
            address: "1.2.3.4",
            port: 1234,
            status:"aviliable"
        },
        {
            name:"1235",
            address: "1.2.3.5",
            port: 1234,
            status:"disabled"
        }
    ]
    object.members = members;
    Virtual.call(this, object);
    this.pool.members.push(members);
    return "done";
}


updateVirtuals = async function(virtuals,device,callback) {
    array = [];
    let vs = await virtuals.items.map(async (num) => {
        // console.log("num",num);
        newVS = await new Virtual(num,device);
        // return await newVS
        // console.log(newVS);
        array.push(newVS);
        console.log("working...",newVS.name);
        if(array.length>=virtuals.items.length){
            callback(array);
        };
    });

};

updateLinks = async function(link,host) {
    // console.log("LTM updateLinks",link);
    // console.log("update",link);
    try {
        if (link){
            oldLink = link;
            // console.log("old Link",oldLink);
            newLink = await oldLink.replace('localhost', host);
            // console.log("New Link",newLink);
            return await newLink
        }
    } catch(err) {
        console.log("link error",err);
    }

    
}
getMembers = async function(input) {
    // console.log("ltm getMembers",input.virtuals);
    // console.log("ltm getMembers",input.virtuals.host);
    // console.log("ltm getMembers:",input.virtuals.partition);
    // console.log("ltm getMembers:",input.virtuals.name);
    // console.log("ltm getMembers:",input.virtuals.destination);
    // console.log("ltm getMembers",input.virtuals.fullPath);
    // console.log("ltm getMembers",input.virtuals.pool.name);
    // console.log("ltm getMembers",input.virtuals.membersReference); 
    try {
            if(input.virtuals.pool.name != "none") {
            newurl = await updateLinks(input.virtuals);
            // console.log("new URL",newurl);
            input.virtuals.pool.poolReference.link = newurl;
                getpools = {
                    virtuals: input.virtuals,
                    token: input.token,
                    host: input.virtuals.host
                }
                pool = await getRelatedPools(getpools);
            } else {
                    pool = {
                        membersReference: {
                            items: []
                        }
                    }
                };         
                newVirtual = {
                    partition: input.virtuals.partition,
                    name: input.virtuals.name,
                    destination: input.virtuals.destination,
                    fullPath: input.virtuals.fullPath,
                    state: input.virtuals.state,
                    selfLink: input.virtuals.selfLink,
                    pool: {
                        name: (input.virtuals.pool.name) ? input.virtuals.pool.name : "none",
                        members: (pool.membersReference.items) ? pool.membersReference.items : [],
                        poolReference: {
                            link: (newurl) ?  newurl : "none"
                        }
                    }

                }
                // console.log("ltm GetMembers",newVirtual);
                return await newVirtual;
    } catch(err) {
        // console.log(err);
    }
}


getVirtuals = async function (input) { 
    try {
        // console.log("ltm getVirtuals",input)
        request.token = input.token.token.token;
        request.host - input.host;
        request.uri = "/mgmt/tm/ltm/virtual?$select=partition,name,destination,selfLink,pool,poolReference,fullPath";
        responsePayload = await rest.getRequest(request);
        response = await typeof responsePayload != 'object' ? JSON.parse(responsePayload) : responsePayload;
        return await response;
    } catch(err) {
        // console.log("ltm",err);
    }

}

getRelatedPools = async function (token,host,link) { 
    try {
        // console.log("ltm getRelatedPools",input)
        // console.log("ltm getRelatedPools",input.virtuals.pool)
        // console.log("ltm getRelatedPools",input.virtuals.pool.name)
        request.token = token;
        request.host - host;
        request.url = link + "&expandSubcollections=true&$select=name,fullPath,address,selfLink,state,membersReference";
        responsePayload = await rest.getRequest(request);
        // response = await JSON.parse(responsePayload);
        response = await typeof responsePayload != 'object' ? JSON.parse(responsePayload) : responsePayload;
        return await response;
    } catch(err) {
        console.log("ltm GetRelatedPools",err);
    }

}
getPools = async function (input) { 
    try {
        console.log("ltm getPools",input)
        request.token = input.token.token.token;
        request.host - input.host;
        request.uri = "/mgmt/tm/ltm/pool?$select=name,fullPath,selfLink,membersReference";
        console.log("ltm getPools", request);
        var response = await rest.getRequest(request);
        return response
    } catch(err) {
        // console.log("ltm",err);
    }

}

module.exports = {
    Member,
    Virtual,
    Request,
    addMembers,
    updateVirtuals,
    updateLinks,
    getMembers,
    getVirtuals,
    getRelatedPools,
    getPools,

}
