import { WeatherDetailProps } from '@/types/types';
import {
  Eye,
  LucideIcon,
  GaugeCircle,
  Sunrise,
  Sunset,
  Wind,
  Droplets,
} from 'lucide-react';
import { ReactNode } from 'react';

type Props = {};

export default function WeatherDetails(props: WeatherDetailProps) {
  // const {
  //   visability = '25km',
  //   humidity = '61%',
  //   windSpeed = '7km/h',
  //   airPressure = '1012 hPa',
  //   sunrise = '6:20',
  //   sunset = '18:48',
  // } = props;
  return (
    <>
      <WeatherDetail info="Visability" icon={Eye} value={props.visability} />
      <WeatherDetail info="Humidity" icon={Droplets} value={props.humidity} />
      <WeatherDetail info="Wind Speed" icon={Wind} value={props.windSpeed} />
      <WeatherDetail
        info="Air Pressure"
        icon={GaugeCircle}
        value={props.airPressure}
      />
      <WeatherDetail info="Sunrise" icon={Sunrise} value={props.sunrise} />
      <WeatherDetail info="Sunset" icon={Sunset} value={props.sunset} />
    </>
  );
}

interface WeatherDetail {
  info: string;
  icon: LucideIcon;
  value: string;
}

function WeatherDetail(props: WeatherDetail) {
  return (
    <div className="flex gap h-full flex-col items-center justify-between">
      <h5>{props.info}</h5>
      {/* <Eye size={50} className="text-orange-600" /> */}
      <props.icon
        size={50}
        className="text-orange-600 text-3xl hover:animate-bounce  "
      />
      <h5>{props.value}</h5>
    </div>
  );
}
