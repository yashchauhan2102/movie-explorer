export function getHealthStatus() {
  return {
    status: "ok",
    timeStamp: new Date().toISOString(),
  };
}
