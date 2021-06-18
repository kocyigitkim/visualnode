const fs = require('fs');
const path = require('path');


class ProjectManager {
    constructor() {
        this.flows = [];
        this.workingDirectory = null;
    }

    open(projectPath) {
        this.workingDirectory = projectPath;
        this.flows = [];
    }
    save() {
        var compiled = JSON.stringify(this.flows);

    }
}