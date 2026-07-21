export interface SchoolAdmin {
  name: string;
  email: string;
}

export interface School {
  id: string;
  name: string;
  subdomain: string;
  address: string | null;
  created_at: string;
  school_admins: SchoolAdmin[];
}