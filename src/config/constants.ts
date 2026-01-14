export const APP_NAME = 'OmniBuild AI';
export const APP_DESCRIPTION = 'AI-Powered Green Building Compliance & Optimization';

export const SUPPORTED_STANDARDS = [
  { code: 'GBL', name: 'China Green Building Label', region: 'China' },
  { code: 'GBI', name: 'Green Building Index', region: 'Malaysia' },
  { code: 'LEED', name: 'Leadership in Energy and Environmental Design', region: 'Global' },
  { code: 'BREEAM', name: 'Building Research Establishment Environmental Assessment Method', region: 'UK/Global' },
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
