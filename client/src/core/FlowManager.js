import State from 'faststate-react/states/State';
import { v4 as uuid } from 'uuid';
import _ from 'lodash'

export default class FlowManager {
    constructor() {
        this.state = new State();
        this.state.nodes = [];
        this.state.connections = [];
    }
    add(node) {
        node.id = uuid();
        this.state.nodes.push(node);
        this.state.update();
        return node;
    }
    addRange(range) {
        for(var node of range){
            node.id = uuid();
            this.state.nodes.push(node);
        }
        this.state.update();
        return range;
    }
    remove(node) {
        _.remove(this.state.nodes, (item) => item.id === node.id);
        this.state.update();
    }
    removeRange(range) {
        _.remove(this.state.nodes, (item) => _.findIndex(range, rangeItem => rangeItem.id === item.id) > -1);
        this.state.update();
    }
    clear(){
        this.states.nodes = [];
        this.state.update();
    }
}