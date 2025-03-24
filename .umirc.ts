import { defineConfig } from '@umijs/max';

export default defineConfig({
  antd: {
    dark: true,
    // theme: {
    //   token: {
    //     colorBgBase: '#15171C', 
    //   }
    // }
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
      wrappers: ['@/components/ProtectedRoute'], // Use ProtectedRoute wrapper to guard this route
    },
    {
      name: 'Users',
      path: '/users',
      component: './Users',
      wrappers: ['@/components/ProtectedRoute'], // Use ProtectedRoute wrapper to guard this route
    },
    {
      name: 'Login',
      path: '/login',
      component: './Login',
      layout: false
    }
  ],
  npmClient: 'npm',
});

