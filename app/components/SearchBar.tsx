'use client';
import { placeAtom } from '@/utils/atom';
// import { placeAtom } from '@/utils/atom';
import { cn } from '@/utils/cn';
import { getInputWeather } from '@/utils/fetch';
import { useAtom } from 'jotai';
import { Search } from 'lucide-react';
import { FormEvent, HTMLAttributes, useState } from 'react';

export default function SearchBar(className?: HTMLAttributes<string>) {
  const [city, setCity] = useState<string>('');
  const [error, setError] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [place, setPlace] = useAtom(placeAtom);

  const handleChange = async (value: string) => {
    setCity(value);
    if (value.length >= 3) {
      try {
        const response = await getInputWeather(value);
        const suggestions = response?.list.map((item: any) => item.name);
        setSuggestions(suggestions!);
        setError('');
        setShowSuggestions(true);
      } catch (error) {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleClick = (suggestion: string): void => {
    setCity(suggestion);
    setShowSuggestions(false);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (suggestions.length == 0) {
      setError('Location not found');
    } else {
      setError('');
      setPlace(city);
      setShowSuggestions(false);
    }
  };

  return (
    <form className="flex relative items-center h-10" onSubmit={handleSubmit}>
      <input
        type="text"
        value={city}
        className={cn(
          'px-4 py-2 h-full rounded-l-lg w-full border-2 focus:outline-none border-orange-600 bg-primary/40 focus:border-orange-700 focus:bg-primary transition ease-out duration-300',
          className?.className
        )}
        placeholder="Search location..."
        onChange={(e) => handleChange(e.target.value)}
      />
      <button className="px-4 py-[9px] h-full bg-orange-600 rounded-r-lg focus:outline-none hover:bg-orange-700 transition ease-in-out duration-300">
        <Search />
      </button>
      {/* <SuggestionBox /> */}
      {((showSuggestions && suggestions.length > 1) || error) && (
        <ul className="mb-4 bg-primary absolute border top-[44px] left-0 border-orange-600 rounded-md w-4/6 flex flex-col gap-1 p-2">
          {error && suggestions.length < 1 && (
            <li className="text-error p-1">{error}</li>
          )}
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => handleClick(suggestion)}
              className="cursor-pointer p-1 rounded hover:bg-orange-600 hover:text-black transition ease-out duration-300"
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </form>
  );
}
