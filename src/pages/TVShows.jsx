import React, { useEffect, useState } from 'react'
import Main from '../components/Main'
import Row from '../components/Row'
import { popularTVShows, animationTVShows, comedyTVShows, fantasyTVShows, horrorTVShows, crimeTVShows, warTVShows } from '../Requests'
import Footer from '../components/Footer'
import SavedShows from '../components/SavedShows'
import ProtectedRoute from '../components/ProtectedRoute'
import { useNavigate } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext'

const TVShows = () => {
  const {user} = UserAuth()
  const navigate = useNavigate()
  const [updateKey, setUpdateKey] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setUpdateKey(updateKey + 1);
    }, 30000);
  }, [updateKey]);

  useEffect(() => {
    if (!user) {
      navigate('/login')
    }
  }, [user, navigate]);

  if (!user) {
    return null
  }

  const popularURLs = popularTVShows.reduce((accumulator, currentURL) => {
    return accumulator.concat(currentURL);
  }, []);

  const animationURLs = animationTVShows.reduce((accumulator, currentURL) => {
    return accumulator.concat(currentURL);
  }, []);

  const comedyURLs = comedyTVShows.reduce((accumulator, currentURL) => {
    return accumulator.concat(currentURL);
  }, []);

  const fantasyURLs = fantasyTVShows.reduce((accumulator, currentURL) => {
    return accumulator.concat(currentURL);
  }, []);

  const horrorURLs = horrorTVShows.reduce((accumulator, currentURL) => {
    return accumulator.concat(currentURL);
  }, []);

  const crimeURLs = crimeTVShows.reduce((accumulator, currentURL) => {
    return accumulator.concat(currentURL);
  }, []);

  const warURLs = warTVShows.reduce((accumulator, currentURL) => {
    return accumulator.concat(currentURL);
  }, []);

  const rows = [
    { title: "Popular", fetchURLs: popularURLs },
    { title: "Animation", fetchURLs: animationURLs },
    { title: "Comedy", fetchURLs: comedyURLs },
    { title: "Fantasy", fetchURLs: fantasyURLs },
    { title: "Horror", fetchURLs: horrorURLs },
    { title: "Crime", fetchURLs: crimeURLs },
    { title: "War", fetchURLs: warURLs },
  ];

  return (
    <>
        <div className='z-0 mt-[4rem]'>
          <Main />
        </div>
        <div className='z-5 mt-[-2rem] w-full'>
          <ProtectedRoute><SavedShows updateKey={updateKey}/></ProtectedRoute>
          {rows.map((row, index) => (
            row.fetchURLs.length > 0 && (
              <Row key={index} rowID={index + 1} title={row.title} fetchURLs={row.fetchURLs} />
            )
          ))}
        </div>
    </>
  )
}

export default TVShows