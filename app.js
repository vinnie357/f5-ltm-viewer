// var express = require('express');
var ltm = require('./models/ltm');
var program = require('commander');
var tools = require('./models/tools');

virtualServers = [];
virtualServersOut = [];

async function app() {
    try {
        // 
        //  cli args
        //
        program
            .version('1.0.0', '-v, --version')
            .option('-h --host <host>', 'target host')
            .option('-c, --creds <creds>', 'credentials object to use')
            .option('-cf, --credsFile <credsFile>', 'credsFile json')
            .option('-d, --devices [devices]', 'devices json')
            .option('-e, --export [export]', 'export csv, -e for default, path for other folder example: ./')
            .parse(process.argv);
        device = {
            host: program.host,
            name: program.creds
        }
         if(program.creds) {console.log("creds object",program.creds)};
         if(program.devices) {console.log("devices from file",program.devices)};
         if(program.host) {console.log("target Host:",program.host)};
         if(program.export) {        
             if(program.export == "" || program.exports == true) {
                console.log("export file default path ./csv_exports");
             } else {
                 exportsFilePath = program.export;
                 console.log("export filepath",program.export);
             }
        };
        //
        // get virtuals
        //
        request = await new ltm.Request(device);
        virtuals = await ltm.getVirtuals(request);
        // console.log(virtuals);
        newVirtuals = await ltm.updateVirtuals(virtuals,device,function(array){
            // console.log("APP",newVirtuals);
            virtualServersOut.push(array);
            out = array;
            // console.log("APP",virtualServersOut);
            //
            // file export
            //
            if(program.export) {
                try {
                    tools.csvExport(out,device,exportsFilePath);
                } catch(err) {
                    console.log("export_failure",err);
                }
            } else {
                console.log("cliOut:",out);
            }
        });
        //
        //
        // console.log("virtuals",virtualServersOut);
        // var exportFile = program.export;
        // vsAndPools = {
        //     virtualServers: newVirtuals,
        //     request: request
        // }
        // console.log(vsAndPools);
        // vsOut = await ltm.getVirtualsAndPools(vsAndPools);
        // console.log(vsOut);

        //
        // console.log("FINAL",JSON.stringify(virtualServers));
        // console.log("FINAL",virtualServers);
        // console.log("FINAL",virtualServers);
        // console.log("FINAL",virtualServersOut[0].name);
        // console.log("FINAL",virtualServersOut[0].pool.name);
        // console.log("FINAL",virtualServersOut[0].pool.members);
        //
    } catch(err) {
        console.log("APP:",err)
    }
}

 app();
