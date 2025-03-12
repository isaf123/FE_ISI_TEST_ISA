export default interface ApiError extends Error {
  status?: number;
}
