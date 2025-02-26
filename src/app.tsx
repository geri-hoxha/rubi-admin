import { ProLayoutProps } from '@ant-design/pro-components';
import Footer from './Footer';
// ：https://umijs.org/docs/api/runtime-config#getinitialstate
export async function getInitialState(): Promise<{ name: string }> {
  return { name: 'Dashboard' };
}

export const layout = (): ProLayoutProps => {
  return {
    // logo: 'https://img.alicdn.com/tfs/TB1YHEpwUT1gK0jSZFhXXaAtVXa-28-27.svg',
    menu: {
      locale: true,
    },
    footerRender: () => <Footer />,

  };
};
