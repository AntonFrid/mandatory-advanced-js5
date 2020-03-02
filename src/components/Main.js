import React from 'react';
import { Redirect } from 'react-router-dom';
import { token$ } from '../store.js';

//Components.
import Content from './Content.js';
import Header from './Header.js';
import Filepanel from './Filepanel.js';
import Menupanel from './Menupanel.js';
import Search from './Search.js';

class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = ({
       token: token$.value,
       path: window.location.pathname.replace('/main', ''),
       searchState: false,
       searchRes: [],
    });

    this.changePath = this.changePath.bind(this);
    this.searchResults = this.searchResults.bind(this);
    this.closeSearch = this.closeSearch.bind(this);
  }

  componentDidMount() {
    this.sub = token$.subscribe((token) => this.setState({ token }));
  }

  componentWillUnmount() {
    this.sub.unsubscribe();
  }

  changePath(path, tag) {
    if(tag === 'folder') {
      this.setState({ path: path });
      this.props.changePath(path);
    }
    this.setState({ searchState: false })
  }

  searchResults(input) {
    if (input) {
      this.setState({
        searchInput: input,
        searchState: true
      })
    }
  }

  closeSearch(){
    this.setState({ searchState: false });
  }

  render() {
    if(!this.state.token) {
      return <Redirect to='/'/>
    }

    return (
      <div className="Main">
        <Menupanel/>
        <div className='main-div'>
          <Header
            path={ this.state.path }
            hierarchyOnClick={ this.changePath }
            searchResults={ this.searchResults }
            closeSearch={ this.closeSearch }
            searchState={ this.state.searchState }
          />
          <div className='inner-main-div'>
            { this.state.searchState
              ? <Search
                  searchInput={ this.state.searchInput }
                  rowOnClick={ this.changePath }
                />
              : <Content
                  path={ this.state.path }
                  searchInput={ this.state.searchInput }
                  rowOnClick={ this.changePath }
                />
            }
            <Filepanel path={ this.state.path } />
          </div>
        </div>
      </div>
    );
  }
}

export default Main;
