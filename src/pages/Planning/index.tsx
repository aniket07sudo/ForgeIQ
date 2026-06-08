import { Link } from 'react-router-dom'

export default function Planning(){
  return (
    <section>
      <h1>Planning</h1>
      <p>Planning workspace — choose an action:</p>
      <ul>
        <li><Link to="breakdown">Breakdown</Link></li>
        <li><Link to="estimate">Estimate</Link></li>
      </ul>
    </section>
  )
}
