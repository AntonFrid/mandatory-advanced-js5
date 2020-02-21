import React from 'react';
import { Dropbox } from 'dropbox';
import { Router } from 'react-router-dom';



class Header extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      searchInput: "",
    }

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e){
    let value = e.target.value;
    this.setState({
      ...this.state,
      [e.target.name]: value
    })
  }

  onSubmit(e){
    e.preventDefault();
    console.log(e.target.value);
  }

  render() {
    return (
      <div className="header">
        <div className="titleWrap">
          <h2>Dropbox</h2>
        </div>
        <div className="searchWrap">
          <form submit={this.onSubmit}>
            <input type="text" value={ this.state.searchInput } onChange={ this.onChange } />
            <input type="submit"></input>
          </form>
        </div>
      </div>
    );
  }
}

export default Header;
