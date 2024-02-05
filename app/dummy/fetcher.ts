export default async function fetcher<JSON = any>(
  input: RequestInfo,
  init?: RequestInit
): Promise<JSON> {
  const res = await fetch(input, init);
  return res.json();
}
// export async function fetcher(...args: Parameters<typeof fetch>) {
//   return (await fetch(...args)).json();
// }
