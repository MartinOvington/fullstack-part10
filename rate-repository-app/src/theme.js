import { Platform } from 'react-native';

const theme = {
  colors: {
    textPrimary: '#24292e',
    textSecondary: '#586069',
    textButton: '#FFFFFF',
    blueButton: '#0366d6',
    appBarBackground: '#24292e',
    primary: '#0366d6',
    background: '#dcdcdc',
    mainBackGround: '#FFFFFF',
    errorMessage: '#d73a4a',
  },
  fontSizes: {
    body: 14,
    subheading: 16,
  },
  fonts: {
    main: Platform.select({
      android: 'Roboto',
      ios: 'Arial',
      default: 'System',
    }),
  },
  fontWeights: {
    normal: '400',
    bold: '700',
  },
  tab: {
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
};

export default theme;
