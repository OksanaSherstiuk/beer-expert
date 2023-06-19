//code with stored random beer that can be changed only by reroll button
// import React, { useState, useEffect } from 'react'
// import BeerCard from '../BeerCard/BeerCard'
// import { Link } from 'react-router-dom'
// import axios from 'axios'

// export default function RandomBeerPage() {
//   const [randomBeer, setRandomBeer] = useState(null)
//   const [beerId, setBeerId] = useState(null)

//   useEffect(() => {
//     const storedRandomBeer = localStorage.getItem('randomBeer')
//     if (storedRandomBeer) {
//       setRandomBeer(JSON.parse(storedRandomBeer))

//       const { _id } = JSON.parse(storedRandomBeer)
//       setBeerId(_id)
//       console.log(beerId)
//     } else {
//       fetchRandomBeer()
//     }
//   }, [beerId])

//   const fetchRandomBeer = async () => {
//     try {
//       const res = await axios.get('http://localhost:3001/api/random-beer')
//       const fetchedRandomBeer = res.data
//       setRandomBeer(fetchedRandomBeer)
//       console.log(fetchedRandomBeer)
//       localStorage.setItem('randomBeer', JSON.stringify(fetchedRandomBeer))
//     } catch (error) {
//       console.error('Error fetching random beer:', error)
//     }
//   }

//   const rerollRandomBeer = () => {
//     localStorage.removeItem('randomBeer')
//     fetchRandomBeer()
//   }

//   return (
//     <div>
//       {randomBeer && <BeerCard beer={randomBeer} />}
//       <button onClick={rerollRandomBeer}>Reroll</button>
//       <button>
//         <Link to={`/randomBeerDetails/${beerId}`}>More</Link>
//       </button>
//       <button>
//         <Link to="/">Back</Link>
//       </button>
//       <button>
//         <Link to="/find">Find a Beer</Link>
//       </button>
//     </div>
//   )
// }

//Previous code of random beer? which changing by refreshing page and reroll button

import React from 'react'
import BeerCard from '../../elements/BeerCard/BeerCard.jsx'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'

export default function RandomBeerPage() {
  const [randomBeer, setRandomBeer] = useState([])
  const [beerId, setBeerId] = useState()

  useEffect(() => {
    fetchRandomBeer()
  }, [])

  const fetchRandomBeer = async () => {
    try {
      const res = await axios.get('http://localhost:3001/api/random-beer')
      setRandomBeer(res.data)
      setBeerId(res.data._id)
    } catch (error) {
      console.error('Error fetching random beer:', error)
    }
  }

  return (
    <div>
      {randomBeer && <BeerCard beer={randomBeer} />}
      <button onClick={fetchRandomBeer}>Reroll</button>
      <button>
        <Link to={`/randomBeerDetails/${beerId}`}>More</Link>
      </button>
      <button>
        <Link to="/">Back</Link>
      </button>
      <button>{/* <Link to="/find">Find a Beer</Link> */}Find Beer</button>
    </div>
  )
}