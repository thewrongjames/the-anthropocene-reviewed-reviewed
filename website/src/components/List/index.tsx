import { useState } from 'react'
import Parser from 'rss-parser'

export default function List () {
  const parser = new Parser()

  const [things, setThings] = useState<any[]>([])

  parser.parseURL('http://feeds.wnyc.org/TheAnthropoceneReviewed').then(feed => {
    const newThings: any[] = []
    feed.items.forEach(newThings.push)
    setThings(newThings)
  })

  return <div className="List">
    <h2>List</h2>
    {things.map((thing, index) => <p id="index">{thing.title}</p>)}
  </div>
}
