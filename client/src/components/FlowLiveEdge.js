import React, { Component } from 'react'
import {
    getBezierPath,
    getEdgeCenter,
    getMarkerEnd,
    getSmoothStepPath,
} from 'react-flow-renderer';

import { LoginOutlined, LogoutOutlined, FieldTimeOutlined } from '@ant-design/icons';

const foreignObjectSize = 40;

const onEdgeClick = (evt, id) => {
    evt.stopPropagation();
};


export default class FlowLiveEdge extends Component {
    state = {
        liveSize: null,
        timer: 0
    };

    renderEdge(props) {
        const {
            id,
            sourceX,
            sourceY,
            targetX,
            targetY,
            sourcePosition,
            targetPosition,
            style = {},
            data,
            arrowHeadType,
            markerEndId,
            base
        } = props;

        const edgePath = getSmoothStepPath({
            sourceX,
            sourceY,
            sourcePosition,
            targetX,
            targetY,
            targetPosition,
        });
        const markerEnd = getMarkerEnd(arrowHeadType, markerEndId);
        const [edgeCenterX, edgeCenterY] = getEdgeCenter({
            sourceX,
            sourceY,
            targetX,
            targetY,
        });

        return (
            <>
                <path
                    id={id}
                    style={style}
                    className="react-flow__edge-path"
                    d={edgePath}
                    markerEnd={markerEnd}
                />
                <foreignObject
                    width={base.state.liveSize ? base.state.liveSize.width : foreignObjectSize}
                    height={base.state.liveSize ? base.state.liveSize.height : foreignObjectSize}
                    x={edgeCenterX - (base.state.liveSize ? base.state.liveSize.height : foreignObjectSize) / 2}
                    y={edgeCenterY - (base.state.liveSize ? base.state.liveSize.height : foreignObjectSize) / 2}
                    className="edgebutton-foreignobject"
                    requiredExtensions="http://www.w3.org/1999/xhtml"
                >
                    <body style={{ display: 'inline-block' }}>
                        <div ref={r => base.setLiveBody(r)} style={{ display: 'inline-block' }}>
                            <div style={{ padding: '3px 5px', background: 'black', boxShadow: '0px 5px 25px rgba(0,0,0,0.2)', borderRadius: 10 }}>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <div style={{ flex: 1, margin: 2, textAlign: 'center', display:'flex', alignItems:'center' }}>
                                        <LoginOutlined />
                                        <span style={{marginLeft: 3}}>1</span>
                                    </div>
                                    <div style={{ flex: 1, margin: 2, textAlign: 'center', display:'flex', alignItems:'center'  }}>
                                        <LogoutOutlined />
                                        <span style={{marginLeft: 3}}>0</span>
                                    </div>
                                    <div style={{ flex: 1, margin: 2, textAlign: 'center', display:'flex', alignItems:'center'  }}>
                                        <FieldTimeOutlined />
                                        <span style={{marginLeft: 3}}>{base.state.timer}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </body>
                </foreignObject>
            </>
        );
    }
    setLiveBody(b) {
        if (!b) return;
        this.liveBody = b;
        var v = b.getBoundingClientRect();
        if (!this.state.liveSize || (this.state.liveSize.width !== v.width && this.state.liveSize.height !== v.height)) {
            this.setState({ liveSize: v });
        }
    }
    componentDidUpdate(){
        if(this.liveBody){
            this.setLiveBody(this.liveBody);
        }
    }
    constructor(props) {
        super(props);
        this.setLiveBody = this.setLiveBody.bind(this);
        setInterval((() => {
            this.setState({ timer: this.state.timer + 1 });
        }).bind(this), 1000);
    }
    render() {
        const RenderEdgeComponent = this.renderEdge;
        return <RenderEdgeComponent base={this} liveSize={this.state.liveSize} {...this.props} />;
    }
}