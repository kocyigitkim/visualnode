const uuid = require('uuid').v4;

class FlowManager {
    constructor() {
        this.id = uuid();
        this.name = null;
        this.version = null;
        this.patch = 0;
        this.additional = [];
        this.author = null;
        this.flows = {};
        this.inputs = {};
        this.outputs = {};
    }
    /**
     * 
     * @param {String} id 
     * @returns FlowComponent[]
     */
    getInputs(id) {
        return (this.inputs[id] || []).map(item => this.flows[item.dstId]);
    }
    /**
     * 
     * @param {String} id 
     * @returns FlowComponent[]
     */
    getOutputs(id) {
        return (this.outputs[id] || []).map(item => this.flows[item.dstId]);
    }
    /**
     * 
     * @param {String} id 
     * @returns FlowComponent[]
     */
    getConnections(id) {
        return { inputs: this.getInputs(id), outputs: this.getOutputs(id) };
    }
    /**
     * 
     * @param {String} srcId 
     * @param {Number} srcHandle 
     * @param {String} dstId 
     * @param {Number} dstHandle 
     */
    addInput(srcId, srcHandle, dstId, dstHandle) {
        const inputs = this.inputs[srcId] || [];
        this.inputs[srcId] = [...inputs, { srcId, srcHandle, dstId, dstHandle }];

        const outputs = this.outputs[dstId] || [];
        this.outputs[dstId] = [...outputs, { dstId: srcId, dstHandle: srcHandle, srcId: dstId, srcHandle: dstHandle }];

        this.patch++;
    }
    /**
     * 
     * @param {String} srcId 
     * @param {Number} srcHandle 
     * @param {String} dstId 
     * @param {Number} dstHandle 
     */
    addOutput(srcId, srcHandle, dstId, dstHandle) {
        const outputs = this.outputs[srcId] || [];
        this.outputs[srcId] = [...outputs, { srcId, srcHandle, dstId, dstHandle }];

        const inputs = this.inputs[dstId] || [];
        this.inputs[dstId] = [...inputs, { dstId: srcId, dstHandle: srcHandle, srcId: dstId, srcHandle: dstHandle }];

        this.patch++;
    }
    /**
     * 
     * @param {FlowComponent} component 
     */
    addComponent(component) {
        component.manager = this;
        this.flows[component.id] = component;
        this.inputs[component.id] = [];
        this.outputs[component.id] = [];
        this.patch++;
    }
    /**
     * 
     * @param {FlowComponent} component 
     */
    removeComponent(component) {
        delete this.flows[component.id];
        delete this.inputs[component.id];
        delete this.outputs[component.id];
        this.patch++;
    }
    clear() {
        this.flows = {};
        this.inputs = {};
        this.outputs = {};
        this.patch++;
    }
    init() {
        for (var k in this.flows) {
            var v = this.flows[k];
            if (v.init) v.init();
        }
    }
    destroy() {
        for (var k in this.flows) {
            var v = this.flows[k];
            if (v.destroy) v.destroy();
        }
    }
}

module.exports = FlowManager;