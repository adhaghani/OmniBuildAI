export const APP_NAME = 'OmniBuild AI';
export const APP_DESCRIPTION = 'AI-Powered Green Building Compliance & Optimization';

export const SUPPORTED_STANDARDS = [
  { code: 'GBL', name: 'China Green Building Label', region: 'China', logo:'🇨🇳' },
  { code: 'GBI', name: 'Green Building Index', region: 'Malaysia', logo:'🇲🇾' },
  { code: 'LEED', name: 'Leadership in Energy and Environmental Design', region: 'Global', logo:'🌍' },
  { code: 'BREEAM', name: 'Building Research Establishment Environmental Assessment Method', region: 'UK/Global', logo:'🇬🇧' },
] as const;

export const ROUTES = {
  HOME: '/',
  DASHBOARD: '/dashboard',
  PROJECTS: '/dashboard/projects',
  SETTINGS: '/dashboard/settings',
  AUTH: {
    LOGIN: '/login',
    REGISTER: '/register',
  },
};
