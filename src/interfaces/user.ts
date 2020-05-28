export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  address: string;
  point: number;
  role: string;
  fis_med: string;
  fis_hard: string;
  kim_med: string;
  kim_hard: string;
}

export interface MenuInterface {
  fis_med: string;
  fis_hard: string;
  kim_med: string;
  kim_hard: string;
}

export interface ControlUser extends MenuInterface {
  id: string;
  name: string;
  username: string;
  email: string;
  address: string;
  point: number;
}
