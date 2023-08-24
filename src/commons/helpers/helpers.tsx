export function convertFromCamelCase(camelCase: string): string {
  const result = camelCase.replace(/([A-Z])/g, " $1");
  return result[0].toUpperCase() + result.substring(1).toLowerCase();
}

export function assetSpecificationsUnit(
  key?: string,
  value?: number | null
): string {
  const keys: {
    [key: string]: string;
    maxTemp: string;
    power: string;
    rpm: string;
  } = {
    maxTemp: "ºC",
    power: "kWh",
    rpm: "RPM",
  };
  return key && value ? `${value} ${keys[key]}` : "";
}

export function assetMetricUnit(key: string, value: string | number): string {
  const keys: {
    [key: string]: string;
    lastUptimeAt: string;
    totalCollectsUptime: string;
    totalUptime: string;
  } = {
    lastUptimeAt: "",
    totalCollectsUptime: "h",
    totalUptime: "h",
  };
  if (typeof value === "number") return `${value.toFixed(2)} ${keys[key]}`;
  const date = new Date(value);
  const year = date.toLocaleString("default", { year: "numeric" });
  const month = date.toLocaleString("default", { month: "2-digit" });
  const day = date.toLocaleString("default", { day: "2-digit" });
  const hour = date.toLocaleString("default", { hour: "2-digit" });
  const minute = date.toLocaleString("default", { minute: "2-digit" });
  const second = date.toLocaleString("default", { second: "2-digit" });
  const dateFormat =
    year +
    "/" +
    month +
    "/" +
    day +
    " at " +
    hour +
    "h" +
    minute +
    "m" +
    second +
    "s";
  return dateFormat;
}

export function setWorkorderPriorityColor(priority: string): string {
  const priorities: {
    [key: string]: string;
    high: string;
    medium: string;
    low: string;
  } = {
    high: "var(--error)",
    medium: "var(--warning)",
    low: "var(--success)",
  };
  return priorities[priority];
}

export function setWorkorderStatusColor(value: string): string {
  const status: {
    [key: string]: string;
    completed: string;
    "in progress": string;
    waiting: string;
  } = {
    completed: "var(--success)",
    "in progress": "var(--warning)",
    waiting: "var(--error)",
  };
  return status[value];
}
