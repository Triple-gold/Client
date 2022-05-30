import { Layout, Menu, Row, Col, Avatar } from 'antd';
import { Link } from "react-router-dom";
import UserContext from '../contexts/user';
import React, { useContext, useState, useEffect } from 'react';
import { DownOutlined, UserOutlined, HomeOutlined, EditOutlined } from '@ant-design/icons';

const { Header, Content, Sider } = Layout;


/**
 * Renders a <Nav /> component for the navigation menu.
 * @params props
 */
function Nav(props) {
  const logout = useContext(UserContext);
  const { SubMenu } = Menu;

  const centerStyle = {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
  }
  const rightStyle = { position: 'absolute', top: 0, right: 0 }
  return (
    <UserContext.Consumer>

      {({ logout, user }) => (

        <>
          <div className="logo"></div>
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
            <Menu.Item key="Home" >Home<Link to="/"></Link></Menu.Item>
            <Menu.Item key="about" >About Us<Link to="/about"></Link></Menu.Item>


            <SubMenu key="rightMenu" theme="dark" mode='horizontal' style={rightStyle} title={user.loggedIn && <span>{user.username}</span>} icon={<UserOutlined />} >
              {!user.loggedIn && <Menu.Item key="login" type="primary"  > <Link to="/login">Login</Link>
              </Menu.Item>}
              {!user.registerOK && !user.loggedIn && <Menu.Item key="register" type="primary"  > <Link to="/register">Register</Link>
              </Menu.Item>}
              {user.loggedIn && <Menu.Item key="account" type="primary"  > <Link to="/account">Profile</Link>
              </Menu.Item>}
              {user.loggedIn && <Menu.Item key="uploadImage" type="primary"  ><Link to="/img_Page">UploadImage</Link>
              </Menu.Item>}
              {user.loggedIn && <Menu.Item key="logout" onClick={logout} type="primary"  > <Link to="/">Logout</Link>
              </Menu.Item>}
            </SubMenu>
          </Menu>
          {user.role == "admin" &&
            <Menu theme="" mode="horizontal" >
              <Menu.Item key="humanManage" >Human Manage<Link to="/humanManage"></Link></Menu.Item>
              <Menu.Item key="uploadDog" >Upload Dog<Link to="/uploadDog"></Link></Menu.Item>
              <Menu.Item key="updateDoginfo" >Update Dog<Link to="/updateDoginfo"></Link></Menu.Item>
              <Menu.Item key="uploadDogImage" >Upload Dog Image<Link to="/uploadDogImage"></Link></Menu.Item>

            </Menu>
          }
        </>

      )}


    </UserContext.Consumer>

  );

}

export default Nav;