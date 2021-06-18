const BSON = require("bson");
const FlowManager = require("./FlowManager");
const pako = require('pako');
const FlowComponentManager = require("./FlowComponentManager");

class FlowImporter{
    constructor(){}
    /**
     * 
     * @param {Buffer} buffer 
     * @param {FlowManager} newFlow
     * @param {FlowComponentManager} componentManager
     */
    import(buffer, newFlow, componentManager){
        var rawFlow = BSON.deserialize(pako.inflate(buffer));
        for(var k in rawFlow){
            newFlow[k] = rawFlow[k];
        }
        for(var k in newFlow.flows){
            var v = newFlow.flows[k];
            const type = componentManager.find(v.flowType);
            if(type === undefined) continue;
            delete v.flowType;
            var instance = new type();
            for(var arg in v){
                instance[arg] = v[arg];
            }
            instance.manager = newFlow;
            newFlow.flows[k] = instance;
        }
    }
}

module.exports = FlowImporter;