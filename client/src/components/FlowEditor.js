import React, { Component } from 'react'
import * as ANT from 'antd';
import { Row, Col } from 'antd';

import ReactFlow, { Background, Controls, MiniMap, ReactFlowProvider } from 'react-flow-renderer';
import 'react-flow-renderer/dist/style.css';
import '../react-flow-renderer-dark.css';

function renderNodeLabel(title, desc) {
    return <div>
        <ANT.Typography.Title style={{color: 'lime'}} level={5}>{title}</ANT.Typography.Title>
        <hr></hr>
        <ANT.Typography.Text>{desc}</ANT.Typography.Text>
        <hr></hr>
        <div style={{ display: 'flex' }}>
            <ANT.Typography.Text style={{ flex: 1 }}>I: 1</ANT.Typography.Text>
            <ANT.Typography.Text style={{ flex: 1 }}>O: 1</ANT.Typography.Text>
            <ANT.Typography.Text style={{ flex: 1 }}>R: 0ms</ANT.Typography.Text>
        </div>
    </div>
}
export default class FlowEditor extends Component {
    state = {
        selectedNodes: [],
        nodes: [{ id: '1', sourcePosition: 'left', targetPosition: 'right', data: { label: renderNodeLabel('GET /auth/index', "FastApi Router") }, position: { x: 100, y: 100 } },
        // you can also pass a React component as a label
        { id: '2', sourcePosition: 'left', targetPosition: 'right', data: { label: renderNodeLabel('spGetUser', "Function") }, position: { x: 500, y: 100 } },
        { id: 'e2-1', source: '2', target: '1', animated: true, type: 'smoothstep', label: "requestid" }]
    }
    constructor(props) {
        super(props);
        this.onSelectionChange = this.onSelectionChange.bind(this);
        setTimeout((() => {
            this.setState({
                nodes: this.state.nodes.map(item => {
                    if (item.id === "e2-1") {
                        item.animated = false;
                    }
                    return item;
                })
            })
        }).bind(this), 3000);
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
