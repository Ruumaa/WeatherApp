// convert from Kelvin to Celcius
export function convertKelvinToCelcius(kelvin: number): number {
  const celcius = kelvin - 273.15;
  return Math.floor(celcius);
}
