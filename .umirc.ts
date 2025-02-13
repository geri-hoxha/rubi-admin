import { defineConfig } from '@umijs/max';

export default defineConfig({
  antd: {
    dark: true,
    theme: {
      token: {
        colorBgBase: '#000',
      }
    }
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
      name: 'DevBetcrypto',
      path: '/',
      component: './Home',
    },
    {
      name: ' CRUD 示例',
      path: '/table',
      component: './Table',
    },
  ],
  npmClient: 'npm',
});

