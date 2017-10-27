import * as React from 'react';
import './App.css';
import { TmdbApi } from 'tmdb-typescript-api';
const API_KEY = process.env.TMDB_API_KEY_V3 || '';

console.log('api', API_KEY);

const logo = require('./logo.svg');

class App extends React.Component {
  componentDidMount() {
    const api: TmdbApi = new TmdbApi(API_KEY);

    api.search.movies('Pulp Fiction').subscribe(movies => {
      let movie = movies.results[0];
      console.log(`"Pulp Fiction" was released in ${movie.release_date}`);
    });

    api.tvshows.details(4607).subscribe(show => {
      console.log(`"Lost" had ${show.number_of_seasons} seasons`);
    });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.tsx</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
