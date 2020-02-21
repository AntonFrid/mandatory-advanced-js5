import React from 'react';
import SearchField from "react-search-field";
import { Dropbox } from 'dropbox';
import { Router } from 'react-router-dom';



class Header extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      searchInput: "",
    }

    this.onChange = this.onChange.bind(this);
  }

  onChange(e){
    let value = e.target.value;
    this.setState({
      ...this.state,
      [e.target.name]: value
    })
  }

  render() {
    return (
      <div className='header'>
        <SearchField
          placeholder="Search..."
          onChange={this.onChange}
          classNames="test-class"
        />
      </div>
    );
  }
}

export default Header;
