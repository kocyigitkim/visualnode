const fs = require('fs');
const path = require('path');

class FlowComponentManager {
    constructor() {
        this.components = [];
        this.register(require('./FlowComponent'));
    }
    register(component) {
        this.components.push(component);
    }
    registerPath(dir) {
        for (var item of fs.readdirSync(dir, { withFileTypes: true })) {
            if (item.isFile() && path.extname(item.name).toLowerCase() === ".js") {
                this.register(require(path.join(dir, item.name)));
            }
        }
    }
    unregister(component) {
        var i = this.components.indexOf(component);
        if (i > -1) {
            this.components.splice(i, 1);
        }
    }
    find(name) {
        return this.components.filter(c => c.name === name)[0];
    }
}
module.exports = FlowComponentManager;