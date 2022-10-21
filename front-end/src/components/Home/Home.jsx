import React from 'react';
import "./Home.css";

export const Home = ({user}) => {
  return (
    <section className='home'>
    <h1>Welcome {user && user.userName}</h1>
    </section>
  )
}
