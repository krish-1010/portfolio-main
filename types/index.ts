export interface Profile {
  name: string;
  title: string;
  email: string;
  phone: string;
  website: string;
  location: string;
  github: string;
  linkedin: string;
  resumeUrl: string;
  bio: string;
  tagline: string;
  roles: string[];
  iLove: string[];
}

export interface Experience {
  role: string;
  company: string;
  period: string;
  type: string;
  color: string;
  bullets: string[];
}

export interface Project {
  name: string;
  tech: string;
  year: string;
  desc: string;
  color: string;
  github: string | null;
  live: string | null;
}

export interface Projects {
  production: Project[];
  personal: Project[];
  research: Project[];
}

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
}

export interface SpeakingEvent {
  event: string;
  venue: string;
  year: string;
  type: string;
  color: string;
}

export interface Skills {
  [category: string]: string[];
}

export interface Education {
  degree: string;
  school: string;
  period: string;
  notes: string;
}
