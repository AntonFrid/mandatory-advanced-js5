import React from 'react';
import { token$ } from '../store.js';

class Header extends React.Component {
  constructor(props){
    super(props)

    this.state = {
      searchInput: "",
      token: token$.value,
      pathArr: []
    }

    this.onChange = this.onChange.bind(this);
    this.onSearchSubmit = this.onSearchSubmit.bind(this);
    this.hierarchyClick = this.hierarchyClick.bind(this);
    this.closeSearch = this.closeSearch.bind(this);
  }

  componentDidMount() {
    this.sub = token$.subscribe((token) => this.setState({ token }));
    this.setState({ pathArr: this.props.path.split('/') });
  }

  componentDidUpdate(prevProps) {
    if(prevProps.path !== this.props.path) {
      this.setState({ pathArr: this.props.path.split('/') })
    }
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
    this.refs.inputEl.blur();
  }

  hierarchyClick(index) {
    if(this.state.pathArr[index] === '') {
      this.props.hierarchyOnClick('', 'folder');
    }
    else {
      let fullPath = '';

      for (let i = 1; i <= index; i++){
        fullPath +=  '/' + this.state.pathArr[i];
      }

      this.props.hierarchyOnClick( fullPath, 'folder');
    }

    this.setState({ searchInput: "" })
  }

  closeSearch() {
    this.props.hierarchyOnClick('', 'folder');
    this.refs.inputEl.blur();
    this.props.closeSearch();
    this.setState({ searchInput: '' });
  }

  render() {
    return (
      <div className="header">
        <div className="titleWrap">

          { this.props.searchState
            ? <h2 onClick={ () => this.hierarchyClick(0) }>Search</h2>
            : this.state.pathArr.map((path, index) => {
                return (
                  <>
                  { path !== '' ? <h2 key={ 'arrow-' + index }>{ '>' }</h2>: null}
                  <h2 key={ 'heirarchy-' + index } onClick={ () => this.hierarchyClick(index) }>
                    { path === '' ? 'Home': path.replace('%20', ' ') }
                  </h2>
                  </>
                )
          })}
        </div>
        <div className="searchWrap">
          <form onSubmit={ this.onSearchSubmit }>
            <input className='search-box'
              name='searchInput'
              type="text"
              ref='inputEl'
              placeholder='Search...'
              value={ this.state.searchInput }
              onChange={ this.onChange }
            />
            <input className='search-btn' type="submit" value='Search'/>
            { this.props.searchState ? <button onClick={ this.closeSearch }>X</button>: null }
          </form>
        </div>
      </div>
    );
  }
}

export default Header;
