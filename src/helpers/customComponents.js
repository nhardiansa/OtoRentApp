import {extendTheme} from 'native-base';
import {colors, fontFamily, fontSize, fontStyle} from './styleConstants';

export const theme = extendTheme({
  components: {
    Input: {
      baseStyle: {
        bg: colors.gray,
        py: 3,
        borderRadius: 10,
        fontFamily: fontStyle(fontFamily.primary),
        fontSize: fontSize.lg,
        _focus: {
          borderColor: colors.gray,
        },
        paddingLeft: 3,
        color: colors.black,
      },
      sizes: {
        md: {
          fontSize: fontSize.md,
        },
      },
      defaultProps: {
        size: 'md',
      },
    },
  },
});
