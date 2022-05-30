import React, { useContext, useState } from 'react';
import UserContext from '../contexts/user';
import { PageHeader, Input, message } from 'antd';
import { status, json } from '/utilities/requestHandlers';
import { Table, Alert, Select, Col } from 'antd';
import { Tag, Space } from 'antd';

const { Column } = Table;
const { Search } = Input;

function SearchUser(props) {

  const [press, setPress] = useState("");
  const [usersData, setUsers] = useState([]);
  const [isSearchOK, setSearch] = useState(false);
  const authbasic = props.authbasic;

  const onSearch = value => {
    console.log("value ", value)
    console.log("press ", `${press}`)
    let urlPath = "https://Server.alexyu22.repl.co/api/v1/users";
    if (press === "email" || press === "username")
      urlPath += `/search/?fields=${press}&q=${value}`
    else
      if (press === "username&fields=email" && value === "")
        urlPath += `/search/?fields=${press}`

    console.log("urlPath ", urlPath)
    return (fetch(`${urlPath}`, {
      method: "GET",
      headers: { "Authorization": "Basic " + `${authbasic}` }
    })
      .then(status)
      .then(json)
      .then(data => {
        console.log("user return  ", JSON.stringify(data));
        console.log("user data  ", data);
        setUsers(data);
        setSearch(true);
        value = "";
      })
      .catch(err => console.log("Error fetching users", err))
    )
  }

  const { Option } = Select;
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Role',
      key: 'role',
      dataIndex: 'role',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a>Invite {record.name}</a>
          <a>Delete</a>
        </Space>
      ),
    },
  ];
  function handleChange(value) {
    message.info("Pls. enter at least three characters to search by email or username otherwise leave the input empty")

    setPress(value);
    console.log(`selected ${value}`);
  }


  return (
    <>
      <Col span={16}>
        <PageHeader
          title="Blog User Admin "
          subTitle="Manage User Info" />
        <Search placeholder="Search Users"
          allowClear
          enterButton="Search"
          size="large"
          onSearch={onSearch} />
        <Select defaultValue="all" style={{ width: 250 }} onChange={handleChange}>
          <Option value="username">username</Option>
          <Option value="email">email</Option>
          <Option value="username&fields=email">Get all-filter by username & email</Option>
          <Option value="all">Get all-without filter</Option>
        </Select>
       <Table columns={columns} dataSource={usersData}/>
      </Col>

    </>
  );
}

export default SearchUser;

