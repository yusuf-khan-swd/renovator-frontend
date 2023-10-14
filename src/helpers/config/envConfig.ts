export const getBaseUrl = (): string => {
  return (
    (process.env.NODE_ENV === "production" &&
      process.env.NEXT_PUBLIC_API_BASE_URL) ||
    "http://localhost:5000/api/v1"
  );
};
