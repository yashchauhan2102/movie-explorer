import { HealthStatusResponseDTO } from "../dtos/healthStatus.dto";

export function getHealthStatus(): HealthStatusResponseDTO {
  return {
    status: "ok",
    timeStamp: new Date().toISOString(),
  };
}
