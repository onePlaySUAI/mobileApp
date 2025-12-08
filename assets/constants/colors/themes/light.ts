const lightColors = {
  white: '#FFFFFF',
  gray900: '#000000',
  gray800: '#282828',
  gray100: '#F5F5F5',
  gray300: '#dfdfdfff',
  gray400: '#939393',
};

const Text = {
  background: lightColors.gray100,
  primary: lightColors.gray900,
  secondary: lightColors.gray400,
  placeholder: lightColors.gray400,
  link: lightColors.gray900,
};

export const lightTheme = {
  background: lightColors.white,

  Header: {
    background: lightColors.gray100,
    icon: Text.secondary,
    divider: lightColors.gray400,
  },

  Bottom: {
    background: lightColors.gray100,
    tabActive: lightColors.gray300,
    iconInactive: Text.primary,
  },

  Button: {
    background: lightColors.gray100,
    text: Text.primary,
    border: lightColors.gray400,
    disabledBackground: '#E5E5E5',
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
    background: lightColors.white,
    text: Text.primary,
    secondaryText: Text.secondary,
    divider: lightColors.gray400,
    destructive: '#ff4d4f',
  },

  threeDots: { 
    background: Text.primary
  }
};
