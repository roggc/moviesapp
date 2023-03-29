export const isExpired = (utcTime: string) => {
  const now = new Date();
  const nowUTC = new Date(
    Date.UTC(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate(),
      now.getUTCHours(),
      now.getUTCMinutes(),
      now.getUTCSeconds()
    )
  );
  const expiresAt = new Date(utcTime);
  const delta = expiresAt.getTime() - nowUTC.getTime();
  const result = delta <= 0;
  return result;
};
