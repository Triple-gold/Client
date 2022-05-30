import React from 'react';
import { Col, Row } from 'antd';
import PostCard from './postcard';
import { status, json } from '/utilities/requestHandlers';

class BlogGrid extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      posts: [],
    }
  }

  componentDidMount() {
    fetch('https://Server.alexyu22.repl.co/api/v1/articles')
      .then(status)
      .then(json)
      .then(data => {
        this.setState({ posts: data })
        //   console.log("post ", data)
      })
      
      .catch(err => console.log("Error fetching articles", err));


  }



  render() {

    if (!this.state.posts.length) {
      return <h3>Loading posts...</h3>
    }
    // the next line does the Array.map() operation on the posts
    // to create an array of React elements to be rendered
    const cardList = this.state.posts.map(post => {
      return (
        <div style={{ padding: "10px" }} key={post.id} >
          <Col span={6}>
            <PostCard {...post} />


          </Col>
        </div>
      )
    });
    return (
      <Row type="flex" justify="space-around">
        {cardList}
      </Row>
    );
  }
}

export default BlogGrid;
