import { CloudSunRain, LocateFixed, MapPin } from 'lucide-react';
import SearchBar from './SearchBar';
import CurrentLocation from './CurrentLocation';

type Props = { location?: string };

const Navbar = ({ location }: Props) => {
  return (
    <>
      {/* TODO Glass blur navbar */}
      <nav className="shadow-lg sticky top-0 left-0 z-30 backdrop-filter backdrop-blur-lg bg-opacity-50 flex-grow flex">
        <div className="h-[80px] w-full flex items-center justify-center max-w-7xl px-3 mx-auto">
          <div className="flex items-center justify-center gap-2">
            <h2 className="text-3xl font-bold">Weather App</h2>
            <CloudSunRain size={40} className="text-orange-600" />
          </div>
          <section className="ml-auto relative flex  items-center justify-end gap-4 mr-5 md:mr-0">
            <CurrentLocation location={location} />
            <div className="hidden md:flex ">
              <SearchBar />
            </div>
          </section>
        </div>
      </nav>
      <div className="flex max-w-7xl px-3 md:hidden my-5 w-full ">
        <section className="ml-auto items-center justify-start gap-3 w-full">
          <SearchBar />
        </section>
      </div>
    </>
  );
};

export default Navbar;
