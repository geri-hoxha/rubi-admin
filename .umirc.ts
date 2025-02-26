import { defineConfig } from '@umijs/max';

export default defineConfig({
  antd: {
    dark: true,
    theme: {
      token: {
        colorBgBase: '#FF0000',
      }
    }
  },
  locale: {
    default: 'en-US',
    baseSeparator: '-',
  },
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
    title: 'admin',
  },
  routes: [
    {
      name: 'Dashboard',
      path: '/',
      component: './Home',
    },
    {
      name: 'Players',
      path: '/players',
      component: './Players',
    },
  ],
  npmClient: 'npm',
});

