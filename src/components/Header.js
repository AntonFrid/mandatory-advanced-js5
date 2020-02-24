import React from 'react';

class Header extends React.Component {
  constructor(props){
    super(props)

    this.state = { searchInput: "" }

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
  }

  render() {
    return (
      <div className="header">
        <div className="titleWrap">
          <h2 onClick={ () => this.props.homeOnClick('', 'folder') }>
            { this.props.path === '' ? 'Home': 'Home' + this.props.path.replace(/\//g, ' < ') }
          </h2>
        </div>
        <div className="searchWrap">
          <form onSubmit={ this.onSubmit }>
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
