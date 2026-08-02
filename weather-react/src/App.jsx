import { useRef } from 'react';
import { useState } from 'react';
import weatherContext from './context';
import SearchForm from './components/SearchForm';
import ResultContainer from './components/ResultContainer';
import { useEffect } from 'react';

const App = () => {
  const API = useRef('https://react-weather-app.vengernazar0.workers.dev/');

  const [searchTxt, setSearchTxt] = useState('');

  const [searchResult, setSearchResult] = useState(null);

  const [weatherInfo, setWeatherInfo] = useState(null);

  const [day, setDay] = useState(null);

  const [hour, setHour] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const onConfirmSearch = async (e) => {
    e.preventDefault();

    if (!searchTxt.trim()) return;

    setIsLoading(true);
    setIsError(false);

    try {
      const data = await fetch(API.current, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          need: 'search',
          point: searchTxt.trim()
        })
      }).then(r => {
        if (r.ok) return r.json();
        else throw new Error();
      });

      setSearchResult(data);
    } catch {
      setIsError(true);
      setWeatherInfo(null);
      setSearchResult(null);
    } finally {
      setIsLoading(false);
      setWeatherInfo(null);
    }
  };

  const getWeatherInfo = async (point) => {
    setIsLoading(true);
    setIsError(false);

    try {
      const data = await fetch(API.current, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          need: 'get_weather',
          point
        })
      }).then(r => {
        if(r.ok) return r.json();
        else throw new Error();
      });

      setWeatherInfo(data);
    } catch {
      setIsError(true);
      setWeatherInfo(null);
      setSearchResult(null);
    } finally {
      setIsLoading(false);
      setSearchResult(null);
    }
  }

  useEffect(() => {
    setSearchTxt('');

    if (searchResult) {
      setDay(null);
      setHour(null);
    }
  }, [searchResult])

  const contextVal = {
    searchTxt,
    setSearchTxt,
    searchResult,
    setSearchResult,
    weatherInfo,
    getWeatherInfo,
    onConfirmSearch,
    day,
    setDay,
    hour,
    setHour,
    isLoading,
    isError
  };

  return (
    <weatherContext.Provider value={contextVal}>
      <div className='wrap'>
        <SearchForm />
        <ResultContainer />
      </div>
    </weatherContext.Provider>
  )
}

export default App