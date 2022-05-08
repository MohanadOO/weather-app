import React from 'react'
import { motion } from 'framer-motion'

function WeatherCard(props) {
  //Destructuring temperature and wind information.
  const { main, weather, wind } = props.weather
  const { feels_like, humidity, temp } = main
  const { deg, speed } = wind

  const cardVariant = {
    initial: { opacity: 0, scale: 0.5 },
    animate: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: 'easeIn' },
    },
  }

  const cardElementVariant = {
    initial: { opacity: 0, x: 100 },
    animate: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3, ease: 'easeInOut' },
    },
  }

  return (
    <>
      <motion.div
        variants={cardVariant}
        initial='initial'
        animate='animate'
        className='p-4 self-center bg-slate-900/80 text-slate-100 w-full md:max-w-[600px] backdrop-blur-sm'
      >
        <div className='flex justify-center gap-5 w-full'>
          <motion.h2
            variants={cardElementVariant}
            initial='initial'
            animate='animate'
            className='text-center text-2xl sm:text-3xl font-bold'
          >
            {props.city}
          </motion.h2>
          <motion.h2
            variants={cardElementVariant}
            initial='initial'
            animate='animate'
            className='text-center text-2xl sm:text-3xl font-bold font-[Cairo]'
          >
            {props.arabic_name}
          </motion.h2>
        </div>
        <hr className='mt-5' />
        <div className='flex items-center justify-evenly'>
          <div>
            <img
              className='-translate-x-3 w-20'
              src={`http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`}
              alt={weather[0].main}
            />
            <p>
              {temp.toFixed()} C<sup>o</sup>
            </p>
          </div>
          <div>
            <h2 className='font-bold text-base sm:text-xl mb-3'>
              {weather[0].main}
            </h2>
            <p className='capitalize text-base sm:text-xl'>
              {weather[0].description}
            </p>
          </div>
        </div>
      </motion.div>
      <div className='flex p-3 self-center bg-slate-100/90 text-slate-900 backdrop-blur-sm max-w-[380px] rounded-lg'>
        <div className='text-center p-3'>
          <h3 className='mb-2 font-bold text-base sm:text-lg'>Feels Like</h3>
          <p>
            {feels_like.toFixed()} C<sup>o</sup>
          </p>
        </div>
        <div className='text-center p-3'>
          <h3 className='mb-2 font-bold text-base sm:text-lg'>Humidity</h3>
          <p>{humidity}%</p>
        </div>
        <div className='text-center p-3'>
          <h3 className='mb-2 font-bold text-base sm:text-lg'>Winds</h3>
          <p>{speed.toFixed()} MPH</p>
        </div>
      </div>
    </>
  )
}

export default WeatherCard
