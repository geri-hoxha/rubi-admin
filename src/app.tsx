import { ProLayoutProps } from '@ant-design/pro-components';
import Footer from './Footer';
import './global.css';

import 'ag-grid-enterprise';
import { LicenseManager } from 'ag-grid-enterprise';

// ：https://umijs.org/docs/api/runtime-config#getinitialstate
export async function getInitialState(): Promise<{ name: string }> {
  return { name: 'Dashboard' };
}

LicenseManager.setLicenseKey(
  'For_Trialing_ag-Grid_Only-Not_For_Real_Development_Or_Production_Projects-Valid_Until-21_April_2022_[v2]_MTY1MDQ5NTYwMDAwMA==f734ac0864b66e282a092463d38d2ef3',
);

export const layout = (): ProLayoutProps => {
  return {
    // logo: 'https://img.alicdn.com/tfs/TB1YHEpwUT1gK0jSZFhXXaAtVXa-28-27.svg',
    menu: {
      locale: true,
    },
    contentWidth: 'Fluid',
    layout: 'mix',
    footerRender: () => <Footer />,
  };
};
