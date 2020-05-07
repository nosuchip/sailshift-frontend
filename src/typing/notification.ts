export type NotificationType = "success" | "info" | "warn" | "error";

export interface Notification {
  message?: string;
  type?: NotificationType
}
