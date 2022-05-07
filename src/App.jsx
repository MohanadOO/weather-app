import { useEffect, useState } from 'react'
import WeatherCard from './components/WeatherCard'

function App() {
  const [countryInput, setCountryInput] = useState('')
  const [search, setSearch] = useState('')

  //City and Weather Data from the API.
  const [cityData, setCityData] = useState('')
  const [weatherData, setWeatherData] = useState('')

  function handleData() {
    setSearch(countryInput)
  }

  useEffect(() => {
    if (countryInput !== '') {
      const cityName = countryInput
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${
          import.meta.env.VITE_API_KEY
        }&units=metric`
      )
        .then((res) => res.json())
        .then((data) => setWeatherData(data))
        .catch((err) => console.error(err))

      fetch(
        `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${
          import.meta.env.VITE_API_KEY
        }`
      )
        .then((res) => res.json())
        .then((data) => setCityData(data))
        .catch((err) => console.error(err))
    }
  }, [search])

  return (
    <div className='h-screen bg-[url("/assets/background.webp")] bg-cover relative'>
      <div className='font-[Nunito] flex flex-col items-center gap-10 lg:gap-15 mx-4'>
        <h1 className='font-bold text-2xl text-center p-4 text-slate-100 bg-[rgba(0,0,0,0.8)] backdrop-blur-md mt-4 rounded-sm'>
          Weather App 🌥
        </h1>
        <div className='mx-auto justify-center items-center flex flex-col sm:flex-row gap-4'>
          <input
            type='text'
            placeholder='Enter Location...'
            onChange={(e) => setCountryInput(e.target.value)}
            value={countryInput}
            className='rounded-md bg-slate-900 text-white py-2 px-4
        border-[1px] '
          />
          <button
            onClick={handleData}
            className=' bg-slate-50 rounded-md py-2 px-5 hover:bg-slate-900 hover:text-slate-200 transition-all cursor-pointer w-32 '
          >
            Search
          </button>
        </div>

        {cityData === '' || weatherData === '' ? (
          <p className='text-2xl text-white md:text-slate-900 md:text-3xl font-bold rounded-md'>
            Check your city weather ⛅
          </p>
        ) : weatherData.cod.toString().includes('40') ? (
          <p className='text-2xl text-white md:text-slate-900 md:text-3xl font-bold'>
            No City Found ❌
          </p>
        ) : (
          <WeatherCard
            city={cityData[0].name}
            arabic_name={cityData[0].local_names.ar}
            weather={weatherData}
          />
        )}
      </div>
    </div>
  )
}

export default App
