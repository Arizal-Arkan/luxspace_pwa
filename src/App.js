import React from 'react';
import Header from './components/Header'
import Hero from './components/Hero'
import Browse from './components/Browse'
import Arrived from './components/Arrived'
import Client from './components/Client'
import Aside from './components/Aside'
import Footer from './components/Footer'
import Offline from './components/Offline'
import Splash from './pages/Spalsh'


function App() {
  const [items, setItems] = React.useState([]);
  const [offline, setOffline] = React.useState(!navigator.onLine);
  const [isLoading, setLoading] = React.useState(true);

  function handleOfflineStatus() {
    setOffline(!navigator.onLine);
  }

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

      const script = document.createElement("script");
      script.async = false;
      script.src = "/carousel.js";
      document.body.appendChild(script);
    })();

    handleOfflineStatus();
    window.addEventListener('online', handleOfflineStatus);
    window.addEventListener('offline', handleOfflineStatus);

    setTimeout(function(){
      setLoading(false);
    }, 1500)

    return function() {
      window.removeEventListener('online', handleOfflineStatus);
      window.removeEventListener('offline', handleOfflineStatus);
    }
  }, [offline]);
  return (
    <>
    {isLoading === true ? <Splash/> : 
    (
      <>
    {offline && <Offline/>}
    <Header/>
    <Hero/>
    <Browse/>
    <Arrived items={items}/>
    <Client/>
    <Aside/>
    <Footer/>
    </>
    )}
    </>
  );
}

export default App;
