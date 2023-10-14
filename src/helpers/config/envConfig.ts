export const getBaseUrl = (): string => {
  return process.env.NODE_ENV === "development"
    ? "http://localhost:5000/api/v1"
    : "https://renovator-backend.vercel.app/api/v1";
};
