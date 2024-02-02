export function mToKm(visabilityM: number): string {
  const visabilityKm = visabilityM / 1000;
  return `${visabilityKm.toFixed(0)} km`;
}
