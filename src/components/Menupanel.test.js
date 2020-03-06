import React from 'react';
import { shallow } from 'enzyme';
import Menupanel from './Menupanel';

describe('Menupanel', () => {
  it('should contain a div', () => {
    const wrapper = shallow(<Menupanel/>);
    expect(wrapper.find('div').exists())
      .toBe(true);
  });
});
