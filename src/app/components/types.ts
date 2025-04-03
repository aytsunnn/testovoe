export type FilterType = 'all' | 'present' | 'absent';

export interface Person {
  id: number;
  name: string;
  company: string;
  group: string;
  present: boolean;
}

export type TogglePresenceType = (id: number) => void;