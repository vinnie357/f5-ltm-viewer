var json2xls = require('json2xls');
var fs = require('fs');

currentDate = function() {
    var time = new Date().toISOString().slice(0, 100)
    return time;
};
timestamp = function() {
    var time = Math.floor(Date.now() / 1000)
    return time;
};

csvExport = async function(array,device,filePath){
    try {
        // console.log("tools csvExport Input:",array);
        console.log(currentDate());
        // var xls = await json2xls(array);
        var xls = json2xls(array,{
            // fields: ['host']
        });
        if(filePath == true) {
            path = './csv_exports/';
        } else {
            path = filePath;
        };
        fs.writeFileSync(path + device.name + timestamp() + "_export.xlsx", xls, 'binary');
        console.log("exporting_" + device.name +"_" + timestamp() + "_export.xlsx");
        // 
        // examples
        // 
        // var json = {
        //     foo: 'bar',
        //     qux: 'moo',
        //     poo: 123,
        //     stux: new Date()
        // }
        //export only the field 'poo'
        // var xls = json2xls(json,{
        //     fields: ['poo']
        // });
        //export only the field 'poo' as string
        // var xls = json2xls(json,{
        //     fields: {poo:'string'}
        // });
        // fs.writeFileSync('data.xlsx', xls, 'binary');

    } catch(err) {
        console.log("export_failure",err);
    }
}

module.exports = {
    csvExport,
    timestamp,
    currentDate
}