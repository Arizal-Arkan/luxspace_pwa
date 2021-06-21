import React from 'react';
import Header from './components/Header'
import Hero from './components/Hero'
import Browse from './components/Browse'
import Arrived from './components/Arrived'
import Client from './components/Client'
import Aside from './components/Aside'
import Footer from './components/Footer'

function App() {
  const [items, setItems] = React.useState([]);

  React.useEffect(function() {
    (async function() {
      const res = await fetch('https://prod-qore-app.qorebase.io/8ySrll0jkMkSJVk/allItems/rows?limit=7&offset=0&$order=asc', {
        headers: {
          "Content-Type": "application/json",
          "accept": "application/json",
          "x-api-key": process.env.REACT_APP_APIKEY
        }
      });
      const { nodes } = await res.json();
      setItems(nodes);
    })();
  }, []);
  return (
    <>
    <Header/>
    <Hero/>
    <Browse/>
    <Arrived items={items}/>
    <Client/>
    <Aside/>
    <Footer/>
    </>
  );
}

export default App;
