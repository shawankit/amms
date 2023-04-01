import React, { useState } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import 'antd/dist/antd.css';
import './index.css';
import './App.css';
import { Avatar, Breadcrumb, Layout, Menu } from 'antd';
import { Customer, Homepage, Navbar, MilkCategory } from './components';
import { MailOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import Invoices from './components/Invoices';
import Stock from './components/Stock';
import ListComponent from './components/ListComponent';

const { Header, Content, Footer, Sider } = Layout;

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Layout className='h-screen'>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <Navbar />
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{
            padding: 0,
          }}
        >
           <Menu mode="horizontal" style={{ float: 'right', width: 'auto'}}>
              <Menu.Item key="notification" icon={<NotificationOutlined />}>
              </Menu.Item>
              <Menu.Item key="mail" icon={<MailOutlined />}>
              </Menu.Item>
              <Menu.Item key="profile">
                <Avatar size={30} icon={<UserOutlined />} />
              </Menu.Item>
            </Menu>
        </Header>
        <Content style={{ margin: '0 16px' }} >
          <Breadcrumb style={{ margin: '16px 0'}}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
          </Breadcrumb>
          <div style={{ padding: 10 }} >
           <Switch>
              <Route exact path="/">
                <Homepage />
              </Route>
              <Route exact path="/customers">
                <Customer />
              </Route>
              <Route exact path="/milk-category">
                <MilkCategory />
              </Route>
              <Route exact path="/invoices">
                <Invoices type={'sale'}/>
              </Route>
              <Route exact path="/stocks">
                <Stock />
              </Route>
              <Route exact path="/payments">
                <ListComponent page={'payment-receipts'} reload={false} noaction={true}/>
              </Route>
              <Route exact path="/purchases">
                <Invoices type={'purchase'}/>
              </Route>
            </Switch>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;
