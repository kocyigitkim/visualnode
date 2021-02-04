import React, { Component } from 'react'
import SolutionExplorer from '../components/SolutionExplorer';
import { Row, Col, Divider } from 'antd';
import FlowEditor from '../components/FlowEditor';


export default class AppRouter extends Component {
    render() {
        return (
            <>
                <Row style={{width:'100%', height:'100%'}}>
                <Col flex="none" style={{width: '200px', display: 'flex', flexDirection: 'column'}}>
                <SolutionExplorer></SolutionExplorer>
                </Col>
                <Col flex="auto">
                <FlowEditor></FlowEditor>
                </Col>
                </Row>
            </>
        )
    }
}
