const darkColors = {
  black: '#000000',
  gray100: '#D9D9D9',
  gray800: '#282828',
  gray900: '#1D1D1D',
  gray400: '#939393',
  gray700: `#1E1E1E`,
};

const Text = {
  background: darkColors.gray900,
  primary: darkColors.gray100,
  secondary: darkColors.gray400,
  placeholder: darkColors.gray400,
  link: darkColors.gray100,
};

export const darkTheme = {
  background: darkColors.gray800,

  Header: {
    background: darkColors.black,
    icon: Text.secondary,
    divider: darkColors.gray400,
  },

  Bottom: {
    background: darkColors.black,
    tabActive: darkColors.gray900,
    iconInactive: Text.primary,
  },

  Button: {
    background: darkColors.gray900,
    text: Text.primary,
    disabledBackground: '#2a2a2a',
    disabledText: Text.secondary,
  },

  Text: Text,

  Item: {
    inActiveBackground: 'transparent',
    activeBackground: 'transparent',
    title: Text.primary,
    subtitle: Text.secondary,
    optionIcon: Text.primary,
  },

  OptionsModal: {
    background: darkColors.gray800,
    text: Text.primary,
    secondaryText: Text.secondary,
    divider: darkColors.gray400,
    destructive: '#ff4d4f',
  },

  threeDots: { 
    background: Text.primary
  }
};
