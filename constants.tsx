import React from 'react';
import { Project, SocialLink, Experience, Milestone } from './types';

export const PORTFOLIO_OWNER = "Chunwen Wang";
export const OWNER_ROLE = "Business Developer at BOSIDENG(UK)";
export const OWNER_BIO = `Driving business' international growth through strategic partnerships and innovative solutions.`;

export const EXPERIENCES: Experience[] = [];

export const PROJECTS: Project[] = [];

export const MILESTONES: Milestone[] = [
  {
    id: 'm1',
    title: 'Retail Tech Innovation',
    description: 'Independently created a retail stock control solution, including RFID deployment and a custom stock control app.',
    icon: 'ScanBarcode'
  },
  {
    id: 'm2',
    title: 'Strategic Partnerships',
    description: 'Successfully secured and established a key business partnership with John Lewis & Partners.',
    icon: 'Handshake'
  },
  {
    id: 'm3',
    title: 'AI Integration',
    description: 'Sourcing and deployment of the latest AI solutions to optimize business operations.',
    icon: 'BrainCircuit'
  }
];

export const SOCIALS: SocialLink[] = [
  { platform: "LinkedIn", url: "https://www.linkedin.com/in/chunwen-wang-5592b126b/", iconName: "Linkedin" },
];