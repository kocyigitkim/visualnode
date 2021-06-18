class EventHandler {
    constructor() {
        this.events = {};
    }
    on(name, callback) {
        if (!this.events[name]) this.events[name] = [];
        this.events[name] = [...this.events[name], callback];
    }
    remove(name, callback) {
        var l = (this.events || {})[name] || [];
        var i = l.indexOf(callback);
        if (i > -1) {
            l.splice(i, 1);
            this.events[name] = l;
        }
    }
    trigger(name, args) {
        var callbacks = (this.events || {})[name] || [];
        for (var callback of callbacks) {
            callback(...args);
        }
    }
}

module.exports = EventHandler;