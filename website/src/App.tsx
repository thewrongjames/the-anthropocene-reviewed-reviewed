import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom'
import List from './components/List'
import ReviewableOr404 from './components/ReviewableOr404'

import './App.css'

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
              An unofficial website in which you can review different facets
              of a podcast (or book) in which John Green reviews different
              facets of the human-centred world.
            </p>
          </div>
        </header>

        <div className="main content">
          <Switch>
            <Route path="/">
              <List />
            </Route>
            <Route path="/:reviewableID">
              <ReviewableOr404 />
            </Route>
          </Switch>
        </div>

        <footer>
          <div className="content">
            <p>
              This website is not associated with John Green, Hank Green of any
              of their companies or publishers or books or anything official
              like that at all.
            </p>
            <p>
              If you notice any issues with the website (or, say, <em>are John
              Green</em> and want to ask that the site be modified or taken down
              (to which I would of course comply)) feel free to reach out to me
              on <a href="https://twitter.com/thewrongjames">Twitter</a> or
              through <a href="mailto:hello@jameswright.me">email</a>.
            </p>
            <p>
              If I have gotten around to making it public by then, you may even
              be able
              to <a href="https://github.com/thewrongjames/the-anthropocene-reviewed-reviewed">
              make a pull request on GitHub</a>
            </p>
            <p>
              In case you were wondering, this website is <em>also</em> not
              associated with <a href="https://theanthropocenereviewed.com/">
              that other awesome fan project website</a>, but, you know, I
              thoroughly recommend checking that out regardless.
            </p>
            <hr></hr>
            <p>
              Made,
              with <span className="heart" role="img" aria-label="love">❤️</span>,
              by James Wright.
            </p>
          </div>
        </footer>
      </div>
    </Router>
  )
}
