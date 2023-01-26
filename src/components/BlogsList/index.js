import {Component} from 'react'

import Loader from 'react-loader-spinner'

import BlogItem from '../BlogItem'

import './index.css'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

class BlogsList extends Component {
  state = {blogsData: [], isLoader: true}

  componentDidMount() {
    this.getBlogListData()
  }

  getBlogListData = async () => {
    const response = await fetch('https://apis.ccbp.in/blogs')
    const data = await response.json()
    const updatedBlogData = data.map(eachItem => ({
      id: eachItem.id,
      author: eachItem.author,
      avatarUrl: eachItem.avatar_url,
      imageUrl: eachItem.image_ulr,
      title: eachItem.title,
      topic: eachItem.topic,
    }))

    // console.log(updatedBlogData)

    this.setState({blogsData: updatedBlogData, isLoader: false})
  }

  render() {
    const {blogsData, isLoader} = this.state

    return (
      <div className="blog-list-container">
        {isLoader ? (
          <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
        ) : (
          blogsData.map(item => <BlogItem blogData={item} key={item.id} />)
        )}
      </div>
    )
  }
}

export default BlogsList
