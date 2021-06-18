const uuid = require('uuid').v4;
const FlowManager = require('./FlowManager');
const EventHandler = require('./EventHandler');
const FlowData = require('./FlowData');

class FlowComponent {
    /**
     * 
     * @param {FlowManager} manager 
     */
    constructor(manager = null) {
        this.id = uuid();
        this.group = null;
        this.name = "flowcomponent";
        this.title = null;
        this.version = null;
        this.author = null;
        this.inputs = 0;
        this.outputs = 0;
        this.manager = manager;
        this.options = null;
        this.events = new EventHandler();
    }
    on(name, callback) {
        this.events.on(name, callback);
    }
    trigger(name, args) {
        this.events.trigger(name, args);
    }
    getInputs() {
        return this.manager.getInputs(this.id);
    }
    getOutputs() {
        return this.manager.getOutputs(this.id);
    }
    inputCount() {
        return this.manager.inputs[this.id].length;
    }
    outputCount() {
        return this.manager.outputs[this.id].length;
    }
    getConnections() {
        return this.manager.getConnections(this.id);
    }
    /**
     * 
     * @param {Number} index 
     * @param {FlowData} data 
     */
    async send(index, data) {
        data = data || new FlowData();
        var outputs = this.getOutputs().filter(p => p.srcHandle == index);
        outputs.forEach(async (item) => {
            item.trigger('input-' + item.dstHandle, data);
            item.trigger('data', data);
        });
        this.trigger('output-' + index, data);
        this.trigger('output', data);
    }
    /**
     * 
     * @param {FlowData} data 
     */
    async sendAll(data) {
        data = data || new FlowData();
        for (var i = 0; i < this.outputCount(); i++) {
            this.send(i, data);
        }
    }
}

module.exports = FlowComponent;