import React from 'react'
import { mount, shallow } from 'enzyme'
import { Loot } from './Loot'

describe('Loot', ()=>{
  const mockFetchbitcoin = jest.fn()
  const props = { balance: 10, bitcoin: {}, fetchBitcoin: mockFetchbitcoin }
  let loot = shallow(<Loot />)

  it('renders properly', ()=>{
    expect(loot).toMatchSnapshot()
  })

  describe('when mounted', ()=>{
    beforeEach(()=>{
      loot = mount(<Loot {...props} />)
    })

    it('dispatches the `fetchBitcoin()` method it receives from props', ()=>{
      expect(mockFetchbitcoin).toHaveBeenCalled()
    })
  })

  describe('when there are valid bitcoin props', ()=>{
    beforeEach(()=>{
      props = { balance: 10, bitcoin: { bpi: {USD: { rate: '1,000'}}}}
      loot = shallow(<Loot {...props}/>)
    })

    it('displays the correct bitcoin value', ()=>{
      expect(loot.find('h3').text()).toEqual('Bitcoin balance: 0.01')
    })
  })
})