import React from 'react'
import { shallow } from 'enzyme'
import SimpleBlog from './SimpleBlog'

describe.only('<SimpleBlog />', () => {
  it('renders content', () => {
    let title = "title"
    let author = "author"
    let likes = 5
    let blog = {title, author, likes}

    const blogComponent = shallow(<SimpleBlog blog={blog} />)
    const detailsDiv = blogComponent.find('.details')

    expect(detailsDiv.text()).toContain(title + " " + author)
    const likesDiv = blogComponent.find('.likes')

    expect(likesDiv.text()).toContain("blog has " + likes + " likes")
    
  })
})