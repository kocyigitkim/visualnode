import React, { Component } from 'react'

import { Layout, Menu, Breadcrumb } from 'antd';
import AppRouter from './AppRouter';
import AppHeader from './AppHeader';
import { toast } from 'react-toastify';

const { Header, Content, Footer } = Layout;

export default class AppLayout extends Component {
  componentDidMount(){
    toast.dark("Visual Node Is Ready!");
  }
    render() {
        return (
            <Layout style={{minHeight: '100vh'}}>
            <Header style={{ zIndex: 1, width: '100%', minHeight:'100px' }}>
              <AppHeader></AppHeader>
            </Header>
            <Content className="site-layout" style={{backgroundColor: 'rgba(255,255,255,0.1)', display:'flex', flex: 1 }}>
              <div className="site-layout-background" style={{ padding: 0, paddingTop: '1px', flex: 1 }}>
                <AppRouter></AppRouter>
              </div>
            </Content>
          </Layout>
        )
    }
}
