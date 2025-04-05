export type FilterType = 'all' | 'present' | 'absent' | 'without';

export interface Person {
  id: number;
  name: string;
  company: string;
  group: string;
  present: boolean;
}

export type TogglePresenceType = (id: number) => void;
export type AddPersonType = (person: Omit<Person, 'id'>) => void;
export type UpdatePersonType = (id: number, person: Omit<Person, 'id'>) => void;
