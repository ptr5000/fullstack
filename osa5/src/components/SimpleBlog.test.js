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

  it('clicking the button calls event handler twice', () => {
    let title = "title"
    let author = "author"
    let likes = 5
    let blog = {title, author, likes}

    const mockHandler = jest.fn()
  
    const noteComponent = shallow(
      <SimpleBlog
        blog={blog}
        onClick={mockHandler}
      />
    )
  
    const button = noteComponent.find('button')
    button.simulate('click')
    button.simulate('click')
  
    expect(mockHandler.mock.calls.length).toBe(2)
  })

})