export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  link?: string;
  image?: string;
  size: 'small' | 'medium' | 'large' | 'tall';
}

export interface SocialLink {
  platform: string;
  url: string;
  iconName: 'Github' | 'Twitter' | 'Linkedin' | 'Mail' | 'Globe';
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  description: string;
}

export interface Milestone {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
  isError?: boolean;
}