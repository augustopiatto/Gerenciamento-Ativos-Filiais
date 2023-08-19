export interface UsersInterface {
  companyId: number;
  email: string;
  id: number;
  name: string;
  unitId: number;
}

export interface CompanyInterface {
  id?: number;
  name?: string;
}

interface HealthHistory {
  status: string;
  timestamp: string;
}

interface Metrics {
  lastUptimeAt: string;
  totalCollectsUptime: number;
  totalUptime: number;
}

interface Specifications {
  maxTemp: number;
}

export interface AssetsInterface {
  assignedUserIds: number[];
  companyId: number;
  healthHistory: HealthHistory[];
  healthscore: number;
  id: number;
  image: string;
  metrics: Metrics;
  model: string;
  name: string;
  sensors: string[];
  specifications: Specifications;
  status: string;
  unitId: number;
}

export interface UnitsInterface {
  companyId: number;
  id: number;
  name: string;
}

interface Checklist {
  completed: boolean;
  task: string;
}

export interface WorkordersInterface {
  assetId: number;
  assignedUserIds: number[];
  checklist: Checklist[];
  description: string;
  id: number;
  priority: string;
  status: string;
  title: string;
}
