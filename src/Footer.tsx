import { DefaultFooter } from '@ant-design/pro-components';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      style={{
        background: '#00000038',
        position: 'fixed',
        bottom: 0,
        left: 0,
        width: '100%',
        borderTop: '1px solid #00000038',
        padding: '13px 0',
        textAlign: 'center'
      }}
 
     
    >
        <span style={{color: 'gray'}}>{`${currentYear} ${'Copyright © 2023 DevBetcrypto. All rights reserved.'}`}</span>
        </footer>
  );
};

export default Footer;
