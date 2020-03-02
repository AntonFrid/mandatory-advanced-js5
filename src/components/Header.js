import React from 'react';
import { Dropbox } from 'dropbox';
import { token$ } from '../store.js';

class Header extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      searchInput: "",
      token: token$.value,
    }

    this.onChange = this.onChange.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
    this.hierarchyClick = this.hierarchyClick.bind(this);
  }

  componentDidMount() {
    this.sub = token$.subscribe((token) => this.setState({ token }));
  }

  componentWillUnmount() {
    this.sub.unsubscribe();
  }

  onChange(e){
    let value = e.target.value;
    this.setState({
      ...this.state,
      [e.target.name]: value
    })
  }

  onSearchSubmit(e){
    e.preventDefault();
    this.props.searchResults(this.state.searchInput);
  }

  hierarchyClick() {
    this.props.homeOnClick('', 'folder');
    this.setState({ searchInput: "" })
  }

  render() {
    return (
      <div className="header">
        <div className="titleWrap">
          <h2 onClick={ this.hierarchyClick }>
            { this.props.path === '' ? 'Home': 'Home' + this.props.path.replace(/\//g, ' < ') }
          </h2>
        </div>
        <div className="searchWrap">
          <form onSubmit={ this.onSearchSubmit }>
            <input className='search-box'
              name='searchInput'
              type="text"
              placeholder='Search...'
              value={ this.state.searchInput }
              onChange={ this.onChange }
            />
            <input className='search-btn' type="submit" value='Search'/>
          </form>
        </div>
      </div>
    );
  }
}

export default Header;
