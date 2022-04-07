import {extendTheme} from 'native-base';

export const fontSize = {
  xl: 36,
  slg: 28,
  mlg: 24,
  lg: 18,
  md: 16,
  sm: 14,
  xs: 12,
};

export const colors = {
  primary: '#FF7C52',
  secondary: '#FFE5D2',
  tertiary: '#FFA780',
  black: '#393939',
  white: '#fff',
  green: '#087E0D',
  red: '#9B0A0A',
  gray: '#DFDEDE',

  primaryDark: '#da5531',
  secondaryDark: '#ffd6b8',
  tertiaryDark: '#ff9e5a',
  whiteDark: '#ebebeb',
  grayDark: '#616167',
  graySemiDark: '#f2f2f2',
};

export const fontFamily = {
  primary: 'Nunito',
  secondary: 'Roboto',
};

export const fontStyle = (FontFamily, fontWeight) => {
  switch (fontWeight) {
    case 'black': {
      return `${FontFamily}-Black`;
    }
    case 'bold': {
      return `${FontFamily}-Bold`;
    }
    case 'medium': {
      return `${FontFamily}-Medium`;
    }
    case 'light': {
      return `${FontFamily}-Light`;
    }
    case 'semiBold': {
      return `${FontFamily}-SemiBold`;
    }
    default: {
      return `${FontFamily}-Regular`;
    }
  }
};
