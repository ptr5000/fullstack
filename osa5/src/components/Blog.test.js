import React from 'react'
import { shallow } from 'enzyme'
import {Blog} from './Blog'

describe.only('<Blog />', () => {
  it('renders content', () => {
    let title = "title"
    let author = "author"
    let likes = 5
    let blog = {title, author, likes}

    const blogComponent = shallow(<Blog blog={blog} />)
    const detailsp = blogComponent.find('.details')
    const extdetails = blogComponent.find('.extended-details')

    expect(detailsp.text()).toContain(author + ": " + title)
    expect(extdetails.length).toBe(0)
    
    detailsp.simulate('click')

    const extdetails2 = blogComponent.find('.extended-details')

    expect(extdetails2.length).toBe(1)
  })
})