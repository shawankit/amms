import React, { useState, useEffect } from 'react';
import { Button, Menu, Typography, Avatar } from 'antd';
import { Link } from 'react-router-dom';
import { HomeOutlined, MoneyCollectOutlined, BulbOutlined, FundOutlined, MenuOutlined, UsergroupAddOutlined, StrikethroughOutlined, PayCircleFilled } from '@ant-design/icons';

import icon from '../images/cryptocurrency.png';

const Navbar = () => {
  const [activeMenu, setActiveMenu] = useState(true);
  const [screenSize, setScreenSize] = useState(undefined);

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (screenSize <= 800) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  return (
    <div className="nav-container  h-screen">
      <div className="logo-container">
        <Typography.Title level={2} className="logo"><Link to="/">AMMS</Link></Typography.Title>
        <Button className="menu-control-container" onClick={() => setActiveMenu(!activeMenu)}><MenuOutlined /></Button>
      </div>
      {activeMenu && (
      <Menu theme="dark" >
        <Menu.Item icon={<HomeOutlined />}>
          <Link to="/">Home</Link>
        </Menu.Item>
        <Menu.Item icon={<UsergroupAddOutlined />}>
          <Link to="/customers">Customers</Link>
        </Menu.Item>
        <Menu.Item icon={<MoneyCollectOutlined />}>
          <Link to="/invoices">Invoices</Link>
        </Menu.Item>
        <Menu.Item icon={<BulbOutlined />}>
          <Link to="/milk-category">Milk Rates</Link>
        </Menu.Item>
        <Menu.Item icon={<StrikethroughOutlined />}>
          <Link to="/stocks">Stocks</Link>
        </Menu.Item>
        <Menu.Item icon={<PayCircleFilled />}>
          <Link to="/payments">Payments History</Link>
        </Menu.Item>
        <Menu.Item icon={<PayCircleFilled />}>
          <Link to="/purchases">Purchase</Link>
        </Menu.Item>
      </Menu>
      )}
    </div>
  );
};

export default Navbar;
