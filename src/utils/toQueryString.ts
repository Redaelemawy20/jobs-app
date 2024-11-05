export default function toQueryString(str: string) {
  return new URLSearchParams({ query: str }).toString();
}
