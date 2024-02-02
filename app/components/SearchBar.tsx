'use client';
import { cn } from '@/utils/cn';
import { getInputWeather } from '@/utils/fetch';
import { placeAtom } from '@/utils/jotai';
import { useAtom } from 'jotai';
import { Search } from 'lucide-react';
import {
  ChangeEventHandler,
  FC,
  FormEvent,
  FormEventHandler,
  HTMLAttributes,
  ReactNode,
  SetStateAction,
  useState,
} from 'react';

// type Props = {
//   className?: string;
// value: string;
// onChange: ChangeEventHandler<HTMLInputElement> | undefined;
// onSubmit: FormEventHandler<HTMLFormElement> | undefined;
// };

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
          'px-4 py-2 h-full rounded-l-lg w-3/4 border-2 border-orange-800 focus:outline-none focus:border-orange-600',
          className?.className
        )}
        placeholder="Search location..."
        onChange={(e) => handleChange(e.target.value)}
      />
      <button className="px-4 py-[9px] h-full bg-orange-600 rounded-r-lg focus:outline-none hover:bg-orange-700">
        <Search />
      </button>
      {/* <SuggestionBox /> */}
      {((showSuggestions && suggestions.length > 1) || error) && (
        <ul className="mb-4 bg-secondary absolute border top-[44px] left-0 border-gray-300 rounded-md min-w-[200px] flex flex-col gap-1 p-2">
          {error && suggestions.length < 1 && (
            <li className="text-error p-1">{error}</li>
          )}
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => handleClick(suggestion)}
              className="cursor-pointer p-1 rounded hover:bg-gray-200"
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </form>
  );
}
