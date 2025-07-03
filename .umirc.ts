import { defineConfig } from '@umijs/max';

export default defineConfig({
  antd: {
    dark: true,
    compact: true,
    theme: {
      token: {
        colorBgBase: '#141414',
        colorBgContainer: '#141414',
      },
    },
  },
  locale: {
    default: 'en-US',
    baseSeparator: '-',
    antd: true,
    baseNavigator: true,
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
      name: 'Agents',
      path: '/agents',
      wrappers: ['@/components/ProtectedRoute'],
      routes: [
        {
          name: 'Agent List',
          path: '/agents/list',
          component: './Agents/List',
        },
        {
          name: 'Create Agent',
          path: '/agents/create',
          component: './Agents/Create',
        },
      ],
    },
    {
      name: 'Transactions',
      path: '/transactions',
      wrappers: ['@/components/ProtectedRoute'],
      routes: [
        {
          name: 'All Transactions',
          path: '/transactions/all',
          component: './Transactions',
        },
        {
          name: 'Casino Transactions',
          path: '/transactions/casino',
          component: './Transactions/Casino',
        },
        {
          name: 'Sport Transactions',
          path: '/transactions/sport',
          component: './Transactions/Sport',
        },
        {
          name: 'Users Transactions',
          path: '/transactions/users',
          component: './Transactions/Users',
        },
        {
          name: 'Agents Transactions',
          path: '/transactions/agents',
          component: './Transactions/Agents',
        },
      ],
    },
    {
      name: 'Reports',
      path: '/reports',
      wrappers: ['@/components/ProtectedRoute'],
      routes: [
        {
          name: 'Agents Reports',
          path: '/reports/agents',
          component: './Reports/Agents',
        },
        {
          name: 'Users reports',
          path: '/reports/users',
          component: './Reports/Users',
        },
      ],
    },
    {
      name: 'Login',
      path: '/login',
      component: './Login',
      layout: false,
    },
  ],
  npmClient: 'npm',
});
