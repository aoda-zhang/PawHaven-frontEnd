const designTokens = {
  colors: {
    primary: '#f7823a',
    primaryLight: '#f89c61', // softer light orange
    primaryDark: '#e06716', // deeper warm orange

    secondary: '#4CAF50',
    secondaryLight: '#81C784',
    secondaryDark: '#388E3C',

    background: '#FAF6F1', // warm off-white
    surface: '#FFFFFF', // pure white for cards

    textPrimary: '#2F2F2F',
    textSecondary: '#6B6B6B',

    divider: '#E0DCD6', // softer border
    accent: '#3B82F6', // sky blue

    neutral: '#9E9E9E', // neutral grey
    muted: '#F0EEEB', // muted background

    error: '#EF4444',
    success: '#4CAF50',
    warning: '#F59E0B',
  },
  spacing: {
    base: 4, // used for MUI (4px)
  },
  font: {
    familySans: `'Inter', 'Nunito', sans-serif`,
    familyFriendly: `'Poppins', 'Nunito', 'Helvetica', 'Arial', sans-serif`,
    familySerif: `'Merriweather', serif`,
    familyHandwriting: `'Patrick Hand', cursive`,
    baseSize: 16,
  },
};

export default designTokens;
