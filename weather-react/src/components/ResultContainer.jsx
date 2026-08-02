import { useContext } from "react";
import weatherContext from "../context";
import Loading from "./Loading";

const ResultContainer = () => {
  const {
    day,
    setDay,
    hour,
    setHour,
    searchResult,
    setSearchResult,
    weatherInfo,
    getWeatherInfo,
    isLoading,
    isError
  } = useContext(weatherContext);

  const current = weatherInfo?.current;
  const forecastArr = weatherInfo?.forecast?.forecastday;

  const hourForRenderHourInfo =
    forecastArr?.find(date => date.date === day)
      ?.hour
      ?.find(h => h.time.split(' ')[1] === hour);

  return (
    <div className='result-container'>
      {
        isError ? <h2>Error! Please try again later...</h2>
        : isLoading ? <Loading />
          : searchResult && searchResult.length
            ? <div className='search-result'>{
              searchResult.map(res => {
                const coord = `${res.country},${res.name}`;
                return (
                  <p
                    key={res.id}
                    data-coord={coord}
                    onClick={() => getWeatherInfo(coord)}
                  >
                    {`${res.country} ${res.name}`}
                  </p>
                )
              })
            }</div>
            : searchResult && !searchResult.length
              ? <h2>No results...</h2>
              : weatherInfo ? <div className='weather-info'>
                <div className="current-card">
                  <div className="current-header">
                    <h2>{weatherInfo.location?.country} {weatherInfo.location?.name}</h2>
                    <img
                      src={current.condition.icon}
                      alt={current.condition.text}
                    />
                    <p>{current.condition.text}</p>
                    <small>Last updated: {current.last_updated}</small>
                  </div>

                  <div className="current-main">
                    <div>
                      <strong>{current.temp_c}°C</strong>
                      <span>Feels like {current.feelslike_c}°C</span>
                    </div>

                    <div>
                      <div>
                        <p>💧 Humidity</p>
                        <strong>{current.humidity}%</strong>
                      </div>

                      <div>
                        <p>👁 Visibility</p>
                        <strong>{current.vis_km} km</strong>
                      </div>

                      <div>
                        <p>☁ Clouds</p>
                        <strong>{current.cloud}%</strong>
                      </div>
                    </div>
                  </div>

                  <div className="current-details">
                    <details>
                      <summary>💨 Wind</summary>

                      <div>
                        <p>Direction: <strong>{current.wind_dir}</strong></p>
                        <p>Speed: <strong>{current.wind_kph} km/h</strong></p>
                        <p>Gusts: <strong>{current.gust_kph} km/h</strong></p>
                        <p>Degree: <strong>{current.wind_degree}°</strong></p>
                      </div>
                    </details>


                    <details>
                      <summary>🌧 Precipitation</summary>

                      <div>
                        <p>Will rain: <strong>{current.will_it_rain ? 'Yes' : 'No'}</strong></p>
                        <p>Chance of rain: <strong>{current.chance_of_rain}%</strong></p>
                        <p>Will snow: <strong>{current.will_it_snow ? 'Yes' : 'No'}</strong></p>
                        <p>Chance of snow: <strong>{current.chance_of_snow}%</strong></p>
                        <p>Precipitation: <strong>{current.precip_mm} mm</strong></p>
                      </div>
                    </details>


                    <details>
                      <summary>🌡 Environment</summary>

                      <div>
                        <p>Pressure: <strong>{current.pressure_mb} mb</strong></p>
                        <p>UV index: <strong>{current.uv}</strong></p>
                        <p>Dew point: <strong>{current.dewpoint_c}°C</strong></p>
                        <p>Heat index: <strong>{current.heatindex_c}°C</strong></p>
                        <p>Wind chill: <strong>{current.windchill_c}°C</strong></p>
                        <p>Wet bulb: <strong>{current.wetbulb_c}°C</strong></p>
                      </div>
                    </details>


                    <details>
                      <summary>🌍 Air quality</summary>

                      <div>
                        <p>CO: <strong>{current.air_quality.co}</strong></p>
                        <p>NO₂: <strong>{current.air_quality.no2}</strong></p>
                        <p>O₃: <strong>{current.air_quality.o3}</strong></p>
                        <p>SO₂: <strong>{current.air_quality.so2}</strong></p>
                        <p>PM2.5: <strong>{current.air_quality.pm2_5}</strong></p>
                        <p>PM10: <strong>{current.air_quality.pm10}</strong></p>
                        <p>EPA index: <strong>{current.air_quality['us-epa-index']}</strong></p>
                        <p>DEFRA index: <strong>{current.air_quality['gb-defra-index']}</strong></p>
                      </div>
                    </details>

                  </div>
                </div>

                <ul className='forecast-cards'>
                  {
                    forecastArr.map(date =>
                      <li
                        className={`forecast-card ${date.date === day ? 'selected' : ''}`}
                        key={date.date}
                        onClick={() => { setDay(date.date); setHour(null) }}
                      >
                        <h3>{date.date}</h3>
                        <strong>{`${date.day.mintemp_c}°C — ${date.day.maxtemp_c}`}°C</strong>
                        <p>{date.day.condition.text}</p>
                        <img src={date.day.condition.icon} alt={date.day.condition.text} />
                      </li>)
                  }
                </ul>

                {day && <ul className="forecast-hour-cards"> {
                  forecastArr
                    ?.find(date => date.date === day)
                    ?.hour.map(h => {
                      const time = h.time.split(' ')[1];

                      return (
                        <li
                          key={time}
                          className={`forecast-hour-card ${hour === time ? 'selected' : ''}`}
                          onClick={() => setHour(time)}
                        >
                          <h3>{time}</h3>
                          <strong>
                            {`${h.temp_c}°C`}
                            <br />
                            {`feels like ${h.feelslike_c}°C`}
                          </strong>
                          <p>{h.condition.text}</p>
                          <img src={h.condition.icon} alt={h.condition.text}></img>
                        </li>
                      )
                    })
                }
                </ul>
                }

                {hour && <div className='hour-weather-info'>
                  <div className="hour-main">
                    <img
                      src={hourForRenderHourInfo.condition.icon}
                      alt={hourForRenderHourInfo.condition.text}
                    />
                    <h2>{hourForRenderHourInfo.condition.text}</h2>
                    <strong>{hourForRenderHourInfo.temp_c}°C</strong>
                    <p>Feels like <strong>{hourForRenderHourInfo.feelslike_c}</strong>°C</p>
                  </div>

                  <div className="hour-quick-info">
                    <div>
                      <p>💧 Humidity</p>
                      <strong>{hourForRenderHourInfo.humidity}%</strong>
                    </div>

                    <div>
                      <p>👁 Visibility</p>
                      <strong>{hourForRenderHourInfo.vis_km} km</strong>
                    </div>

                    <div>
                      <p>☁ Clouds</p>
                      <strong>{hourForRenderHourInfo.cloud}%</strong>
                    </div>
                  </div>

                  <div className="hour-details">
                    <details>
                      <summary>💨 Wind</summary>

                      <div>
                        <p>Direction: <strong>{hourForRenderHourInfo.wind_dir}</strong></p>
                        <p>Degree: <strong>{hourForRenderHourInfo.wind_degree}°</strong></p>
                        <p>Speed: <strong>{hourForRenderHourInfo.wind_kph} km/h</strong></p>
                        <p>Gusts: <strong>{hourForRenderHourInfo.gust_kph} km/h</strong></p>
                      </div>
                    </details>

                    <details>
                      <summary>🌧 Precipitation</summary>

                      <div>
                        <p>Will rain: <strong>{hourForRenderHourInfo.will_it_rain ? 'Yes' : 'No'}</strong></p>
                        <p>Chance of rain: <strong>{hourForRenderHourInfo.chance_of_rain}%</strong></p>
                        <p>Will snow: <strong>{hourForRenderHourInfo.will_it_snow ? 'Yes' : 'No'}</strong></p>
                        <p>Chance of snow: <strong>{hourForRenderHourInfo.chance_of_snow}%</strong></p>
                        <p>Precipitation: <strong>{hourForRenderHourInfo.precip_mm} mm</strong></p>
                        <p>Snow: <strong>{hourForRenderHourInfo.snow_cm} cm</strong></p>
                      </div>
                    </details>

                    <details>
                      <summary>🌡 Environment</summary>

                      <div>
                        <p>Pressure: <strong>{hourForRenderHourInfo.pressure_mb} mb</strong></p>
                        <p>Dew point: <strong>{hourForRenderHourInfo.dewpoint_c}°C</strong></p>
                        <p>Heat index: <strong>{hourForRenderHourInfo.heatindex_c}°C</strong></p>
                        <p>Wind chill: <strong>{hourForRenderHourInfo.windchill_c}°C</strong></p>
                        <p>Wet bulb: <strong>{hourForRenderHourInfo.wetbulb_c}°C</strong></p>
                        <p>UV index: <strong>{hourForRenderHourInfo.uv}</strong></p>
                      </div>
                    </details>
                  </div>
                </div>}
              </div>
                : <h2>Weather...</h2>
      }
    </div>
  )
}

export default ResultContainer;