const uuid = require('uuid').v4;

class FlowData {
    constructor() {
        this.id = uuid();
        this.parent = null;
        this.data = null;
        this.session = {};
        this.createdon = new Date();
        this.completedon = null;
        this.completed = false;
    }
    complete() {
        this.completed = true;
        this.completedon = new Date();
    }
}

module.exports = FlowData;