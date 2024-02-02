import { GetDataWeather } from '@/utils/fetch';
import Navbar from './components/Navbar';
import { format, fromUnixTime, parseISO } from 'date-fns';
import { convertKelvinToCelcius } from '@/utils/convertTemp';
import WeatherIcon from './components/WeatherIcon';
import { getDayorNight } from '@/utils/getDay';
import WeatherDetails from './components/WeatherDetails';
import { mToKm } from '@/utils/mToKm';
import { convertWind } from '@/utils/convertWind';
import ForecastWeather from './components/ForecastWeather';
import CurrentWeather from './components/CurrentWeather';
import { useAtom } from 'jotai';
import { placeAtom } from '@/utils/jotai';
import { useHydrateAtoms } from 'jotai/utils';

export default async function Home() {
  // const [place, setPlace] = useAtom(placeAtom);
  const data = await GetDataWeather();
  const firsData = data?.list[0];
  // console.log(firsData);
  const uniqueCode = [
    ...new Set(
      data?.list.map(
        // Pick only the date with split
        (entry) => new Date(entry.dt * 1000).toISOString().split('T')[0]
      )
    ),
  ];

  const firstDataForEachDate = uniqueCode.map((date) => {
    return data?.list.find((entry) => {
      const entryDate = new Date(entry.dt * 1000).toISOString().split('T')[0];
      const entryTime = new Date(entry.dt * 1000).getHours();
      return entryDate === date && entryTime >= 6;
    });
  });
  return (
    <>
      <Navbar />
      <main className="flex flex-col gap-10 min-h-screen mx-7">
        {/* today data */}
        <section>
          <h2 className="text-xl my-4">
            {format(parseISO(firsData?.dt_txt ?? ''), 'EEEE, MMMM do')}
          </h2>
          <div className="h-52 w-full flex items-center bg-primary rounded-lg shadow-lg p-4 whitespace-nowrap">
            {' '}
            <div className=" w-1/4 h-full items-center justify-center flex flex-col text-center">
              <CurrentWeather
                temp={firsData?.main.temp ?? 297.65}
                feels_like={firsData?.main.feels_like ?? 298.3}
                temp_min={firsData?.main.temp_min ?? 297.02}
                temp_max={firsData?.main.temp_max ?? 297.65}
              />
            </div>
            <div className=" w-full h-full overflow-x-auto overflow-y-auto items-center flex gap-10 px-2">
              {data?.list.map((dataList, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center justify-center whitespace-nowrap hover:bg-orange-600 hover:text-primary rounded-xl p-2 transition ease-out duration-300"
                >
                  <h5 className="font-semibold">
                    {format(parseISO(dataList?.dt_txt ?? 0), 'h:mm a')}
                  </h5>
                  <WeatherIcon
                    iconName={getDayorNight(
                      dataList.weather[0].icon,
                      dataList.dt_txt
                    )}
                  />
                  <h5 className="font-semibold">
                    {convertKelvinToCelcius(dataList?.main.temp ?? 0)}&deg;
                  </h5>
                </div>
              ))}
            </div>
          </div>
        </section>
        {/* Weather Details */}
        <section className="w-full h-52 flex items-center rounded-lg font-semibold">
          <div className="w-1/4 bg-orange-600 h-full rounded-lg shadow-lg flex items-center flex-col justify-center p-4 hover:bg-primary text-base-100 hover:text-slate-300  transition ease-out duration-300  ">
            <h3 className="text-2xl mb-2 text-center capitalize">
              {firsData?.weather[0].description}
            </h3>
            <WeatherIcon
              iconName={getDayorNight(
                firsData?.weather[0].icon ?? '',
                firsData?.dt_txt ?? ''
              )}
            />
          </div>
          <div className="ml-10 gap-10 overflow-y-hidden overflow-x-auto w-full h-full flex items-center justify-around bg-primary rounded-lg shadow-lg p-6 whitespace-nowrap">
            <WeatherDetails
              visability={mToKm(firsData?.visibility ?? 10000)}
              humidity={`${firsData?.main.humidity} %`}
              windSpeed={convertWind(firsData?.wind.speed ?? 4.09)}
              airPressure={`${firsData?.main.pressure} hPa`}
              sunrise={format(
                fromUnixTime(data?.city.sunrise ?? 1706665111),
                'H:mm'
              )}
              sunset={format(
                fromUnixTime(data?.city.sunset ?? 1706705827),
                'H:mm'
              )}
            />
          </div>
        </section>

        {/* 7 days forecast */}
        <h2 className="text-xl mt-4 -mb-5">Forecast 7 days</h2>
        <div>
          {firstDataForEachDate.map((uniqueDate, index) => (
            <ForecastWeather
              key={index}
              description={uniqueDate?.weather[0].description ?? ''}
              weatherIcon={uniqueDate?.weather[0].icon ?? '01d'}
              date={format(parseISO(uniqueDate?.dt_txt ?? ''), 'dd.MM')}
              day={format(parseISO(uniqueDate?.dt_txt ?? ''), 'EEEE')}
              feels_like={uniqueDate?.main.feels_like ?? 0}
              temp={uniqueDate?.main.temp ?? 0}
              temp_max={uniqueDate?.main.temp_max ?? 0}
              temp_min={uniqueDate?.main.temp_min ?? 0}
              airPressure={`${uniqueDate?.main.pressure} hPa`}
              humidity={`${uniqueDate?.main.humidity} %`}
              sunrise={format(
                fromUnixTime(data?.city.sunrise ?? 1706739823),
                'H:mm'
              )}
              sunset={format(
                fromUnixTime(data?.city.sunset ?? 1706781350),
                'H:mm'
              )}
              visability={`${mToKm(uniqueDate?.visibility ?? 10000)}`}
              windSpeed={`${convertWind(uniqueDate?.wind.speed ?? 5.29)}`}
            />
          ))}
        </div>
      </main>
    </>
  );
}
