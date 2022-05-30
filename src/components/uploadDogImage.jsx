import React, { useContext } from 'react';
import UploadDogForm from './uploadDogForm';
import UserContext from '../contexts/user';
import { status, json } from '/utilities/requestHandlers';
import SearchUser from './userSearch'
import UploadDogImageForm from './uploadDogImageForm'
import ImageUpload from './ImageUpload'

import { Row, Col, Space } from 'antd';
import { Avatar, Image } from 'antd';
import { UserOutlined } from '@ant-design/icons';
function UploadDogImage() {
  const user = useContext(UserContext);

  return (
    <UserContext.Consumer>

      {({ logout, user }) => (
        <>
          <Col span={27}>
              {user.role == "admin" && <ImageUpload />}</Col>
          <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
           

            
          </Space>
        </>
      )}
    </UserContext.Consumer>
  )

}

export default UploadDogImage;