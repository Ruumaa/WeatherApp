export const convertWind = (speedInM: number): string => {
  const speedInKm = speedInM * 3.6;
  return `${speedInKm.toFixed(0)} km/h`;
};
