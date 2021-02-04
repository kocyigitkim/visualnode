import React, { Component } from 'react'
import ReactFlow, { Background, Controls, MiniMap, ReactFlowProvider } from 'react-flow-renderer';
import 'react-flow-renderer/dist/style.css';
import '../react-flow-renderer-dark.css';

export default class FlowEditor extends Component {
    state = {
        selectedNodes: [],
        nodes: [{ id: '1', data: { label: 'Node 1' }, position: { x: 250, y: 100 } },
        // you can also pass a React component as a label
        { id: '2', data: { label: <div>Node 2</div> }, position: { x: 100, y: 200 } },
        { id: 'e1-2', source: '1', target: '2', animated: false}]
    }
    constructor(props) {
        super(props);
        this.onSelectionChange = this.onSelectionChange.bind(this);
    }
    onSelectionChange(selectedNodes) {
        if (!selectedNodes) selectedNodes = [];
        selectedNodes = selectedNodes.map(p => p.id);
        this.setState({
            selectedNodes: selectedNodes
        });
    }
    render() {
        return (
            <div style={{ flex: 1, height: '100%', borderTop: '5px solid rgba(255,255,255,0.1)', borderLeft: '5px solid rgba(255,255,255,0.1)' }}>
                <ReactFlowProvider>
                    <ReactFlow onSelectionChange={this.onSelectionChange} snapToGrid={true} snapGrid={[16, 16]} elements={this.state.nodes}>
                        <MiniMap

                            nodeStrokeColor={(n) => {
                                if (n.style?.background) return n.style.background;
                                if (this.state.selectedNodes.indexOf(n.id) > -1) {
                                    return 'red';
                                }
                                return 'rgba(255,255,255,0.2)';
                            }}
                            nodeColor={(n) => {
                                if (n.style?.background) return n.style.background;

                                return 'rgba(255,255,255,0.1)';
                            }}
                            nodeBorderRadius={6}
                        />
                        <Controls />
                        <Background size={1.25} color="#333" gap={16} />

                    </ReactFlow>
                </ReactFlowProvider>
            </div>
        )
    }
}
