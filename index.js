const TimerComponent = require("./core/baseComponents/TimerComponent");
const FlowComponent = require("./core/FlowComponent");
const FlowComponentManager = require("./core/FlowComponentManager");
const FlowExporter = require("./core/FlowExporter");
const FlowImporter = require("./core/FlowImport");
const FlowManager = require("./core/FlowManager");

var flow = new FlowManager();
var c1 = new FlowComponent();
c1.inputs = 2;
c1.outputs = 1;
var c2 = new TimerComponent();
c2.inputs = 1;
c2.outputs = 2;
var c3 = new FlowComponent();
c3.inputs = 1;
c3.outputs = 2;
flow.addComponent(c1);
flow.addComponent(c2);
flow.addComponent(c3);

flow.addOutput(c1.id, 0, c2.id, 0);
flow.addOutput(c1.id, 0, c3.id, 0);
flow.addOutput(c2.id, 0, c3.id, 0);

var exportedFlow = new FlowExporter().export(flow);
var exported = exportedFlow;
var newFlow = new FlowManager();
var componentManager = new FlowComponentManager();
componentManager.registerPath(__dirname + "/core/baseComponents");

new FlowImporter().import(exported, newFlow, componentManager);
newFlow.init();
newFlow.flows[Object.keys(newFlow.flows)[0]].sendAll();
console.log(flow);