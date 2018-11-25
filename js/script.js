class App extends React.Component {
    constructor() {
      super();
      this.state = {
        searchText: '',
        users: []
      };
    }
  
    onChangeHandle(event) {
      this.setState({searchText: event.target.value});
    }
  
    onSubmit(event) {
      event.preventDefault();
      const {searchText} = this.state;
      const url = `https://api.github.com/search/users?q=${searchText}`;
      fetch(url)
        .then(response => response.json())
        .then(responseJson => this.setState({users: responseJson.items}));
    }
  
    render() {
      return (
        <div>
          <form onSubmit={event => this.onSubmit(event)} className={'app_main'}>
            <label htmlFor="searchText">Search by user name</label>
            <input
              type="text"
              id="searchText"
              onChange={event => this.onChangeHandle(event)}
              value={this.state.searchText}/>
          </form>
          <UsersList users={this.state.users}/>
        </div>
      );
    }
  }

  class UsersList extends React.Component {
    get users() {
      return this.props.users.map(user => <User key={user.id} user={user}/>);
    }
  
    render() {
      return (
        <div className={'users-list'}>
          <h1 className={'users-header'}> Github users list</h1>
        {this.users}
        </div>
      );
    }
  }

  class User extends React.Component {
    render() {
      return (
        <div className={'users-git'}>
          <div className={'git-img'}>
            <img src={this.props.user.avatar_url} style={{maxWidth: '100px'}} />
          </div>
          <div className={'git-link'}>
            <h4>Link to github:</h4>
            <a href={this.props.user.html_url} target="_blank" className={'link_prop'}>{this.props.user.login}</a>
          </div>
        </div>
      );
    }
  }

  ReactDOM.render(
    <App />,
    document.getElementById('root')
);