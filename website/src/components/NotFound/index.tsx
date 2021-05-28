import { Link } from 'react-router-dom'

export default function NotFound () {
  return <div className="NotFound">
  <h2>Not Found</h2>
  <p>Sorry, it looks like we can't find what you are looking for.</p>
  <p>But, there's no place like <Link to="/">home</Link>.</p>
</div>
}
