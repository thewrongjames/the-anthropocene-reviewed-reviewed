import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom'
import ReviewableList from './components/ReviewableList'
import ReviewableOr404 from './components/ReviewableOr404'

import './App.css'
import About from './components/About'

export default function App () {
  return (
    <Router>
      <div className="App">
        <header id="topBar">
          <div className="content">
            <h1>
              <Link to="/" className="homeLink">
                The Anthropocene <span className="highlighted">
                  Reviewed Reviewed
                </span>
              </Link>
            </h1>
            <p>
              An unofficial website in which you can review different facets of
              podcast episodes (or of a book) in which John Green reviews
              different facets of the human-centred world.
            </p>
            <p><Link to="/">Home</Link> | <Link to="/about">About</Link></p>
          </div>
        </header>

        <div className="main content">
          <Switch>
            <Route path="/reviewables/:guid">
              <ReviewableOr404 />
            </Route>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/">
              <ReviewableList />
            </Route>
          </Switch>
        </div>

        <footer id="footer">
          <div className="content">
            <p><Link to="/">Home</Link> | <Link to="/about">About</Link></p>
            <hr></hr>
            <p className="withLove">
              Made,
              with <span className="heart" role="img" aria-label="love">❤️</span>,
              by <a
                href="https://twitter.com/thewrongjames"
                target="_blank"
                rel="noreferrer"
              >
                James Wright
              </a>.
            </p>
          </div>
        </footer>
      </div>
    </Router>
  )
}
