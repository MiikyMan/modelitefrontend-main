import { ThemeConfig } from 'antd';
import { Poppins } from 'next/font/google';

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  adjustFontFallback: false,
  weight: '400',
});

export const theme: ThemeConfig = {
  token: {
    colorPrimary: '#6E62E5',
    colorInfo: '#46A8E1',
    colorTextBase: '#000000',
    colorLink: '#142074',
    colorError: '#E45A59',
    colorWarning: '#ffc041',
    colorSuccess: '#77de44',
    fontSize: 16,
    fontFamily: `${poppins.style.fontFamily}, sans-serif`,
  },
  components: {
    Input: {
      controlPaddingHorizontal: 4,
      paddingContentHorizontal: 8,
    },
    Collapse: {
      /* here is your component tokens */
      contentPadding: '0px 0px',
      headerPadding: '12px 0px',
    },
  },
};
