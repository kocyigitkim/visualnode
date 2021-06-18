const BSON = require("bson");
const FlowManager = require("./FlowManager");
const pako = require('pako')

class FlowExporter{
    constructor(){}
    /**
     * 
     * @param {FlowManager} flow 
     */
    export(flow){
        var cloned = {...flow};
        for(var k in cloned.flows){
            var v =  cloned.flows[k];
            delete v.manager;
            delete v.events;
            v.flowType = v.__proto__.constructor.name;
        }
        return pako.deflate(BSON.serialize(cloned), {level: 9});
    }
}

module.exports = FlowExporter;