import React from 'react'
import { Typography } from '@material-ui/core'
import { Link } from 'gatsby'

import './Testimonials.css'
import Review from '../Review'

const REVIEWS = [
  {
    text:
      'This is the most comprehensive coverage of modern GraphQL, going from the basics of the Query Language to excruciating detail on Validation and Execution internals that you’ll be thankful for when things go wrong, to the latest and greatest in the ecosystem, like Apollo Federation and Hasura. It normally takes a developer months to get up to speed on putting together all these pieces. The GraphQL Guide teaches it in just a few hours!',
    stars: 5,
    author: {
      name: 'Shawn Wang',
      photo: 'https://avatars.githubusercontent.com/u/6764957?v=4',
    },
  },
  {
    text:
      'I really enjoyed reading the book. It is very detailed, and the different git branches are great for picking up at certain sections. I would have loved to have had this book by my side when I started GraphQL :)',
    stars: 5,
    author: {
      name: 'Enno Thoma',
      photo: 'https://avatars.githubusercontent.com/u/32581439?v=4',
    },
  },
  {
    text:
      'I’d already had the opportunity to work with and learn GraphQL, but The GraphQL Guide really cemented the core concepts (and enlightened me on some details I’d overlooked before). I always struggled with the concept of Subscriptions in GraphQL—after reading this guide, my understanding improved tenfold. Highly recommend reading if you want to be successful with GraphQL!',
    stars: 5,
    author: {
      name: 'Ryan Glover',
      photo: 'https://avatars.githubusercontent.com/u/874210?v=4',
    },
  },
]

const Testimonials = () => (
  <section className="Testimonials" id="reviews">
    <Typography className="Authors-header" variant="h3" component="h1">
      Reviews
    </Typography>

    <div className="Testimonials-list">
      {REVIEWS.map((review, i) => (
        <Review key={i} review={review} testimonial />
      ))}
    </div>

    <Link to="/reviews" className="Testimonials-more">
      View more
    </Link>
  </section>
)

export default Testimonials
