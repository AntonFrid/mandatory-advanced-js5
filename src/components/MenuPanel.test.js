import React from "react";
import { expect } from "chai"
import { shallow, configure } from "enzyme";
import Menupanel from "./Menupanel";
import Adapter from 'enzyme-adapter-react-16';
import sinon from 'sinon';

configure({ adapter: new Adapter() });

describe('<Menupanel />', () => {
  it("renders 2 <div> elements", () => {
    const wrapper = shallow(<Menupanel />);
    expect(wrapper.find('div')).to.have.lengthOf(2);
  })
})

describe('<Menupanel />', () => {
  it('simulates click events', () => {
    const onButtonClick = sinon.spy();
    const wrapper = shallow(<button onClick={ onButtonClick } />);
    wrapper.find('button').simulate('click');
    expect(onButtonClick).to.have.property('callCount', 1);
  });
})
