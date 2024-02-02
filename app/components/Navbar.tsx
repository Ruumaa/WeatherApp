import { CloudSunRain, LocateFixed, MapPin } from 'lucide-react';
import SearchBar from './SearchBar';

const Navbar = () => {
  return (
    <>
      {/* TODO Glass blur navbar */}
      <nav className="shadow-lg sticky top-0 left-0 z-30 backdrop-filter backdrop-blur-lg bg-opacity-50 flex-grow flex">
        <div className="h-[80px] w-full flex items-center justify-center max-w-7xl px-3 mx-auto">
          <div className="flex items-center justify-center gap-2">
            <h2 className="text-3xl">Weather App</h2>
            <CloudSunRain size={40} className="text-orange-600" />
          </div>
          <section className="ml-auto flex items-center justify-end gap-3 ">
            <LocateFixed size={25} />
            <MapPin size={25} />
            <h3 className="font-semibold text-lg capitalize -ml-3">solo</h3>
            <SearchBar />
          </section>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
