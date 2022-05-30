import UserContext from '../contexts/user';
import React, { useContext } from 'react';
import { status, json } from '/utilities/requestHandlers';
import SearchUser from './userSearch'
import ImageUpload from './ImageUpload'
import { Row, Col, Space } from 'antd';
import { Avatar, Image } from 'antd';
import { UserOutlined } from '@ant-design/icons';


function humanManage(props) {

  const user = useContext(UserContext);

  return (
    <UserContext.Consumer>

      {({ logout, user }) => (
        <>
          <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
            <Row>  
              <SearchUser authbasic={btoa(`${user.username}:${user.password}`)} />
            
            </Row>

            
          </Space>
        </>
      )}
    </UserContext.Consumer>
  )



}
export default humanManage;







/**
 * Renders a <Home /> component to be the home page of the application.
 * @params props
 */
