export const fontSize = {
  xl: 36,
  lg: 18,
  md: 16,
  sm: 14,
  xs: 12,
};

export const colors = {
  primary: '#FF7C52',
  secondary: '#FFE5D2',
  tertiary: '#FFA780',
  black: '#000',
  white: '#fff',

  primaryDark: '#da5531',
  secondaryDark: '#ffd6b8',
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
    default: {
      return `${FontFamily}-Regular`;
    }
  }
};
