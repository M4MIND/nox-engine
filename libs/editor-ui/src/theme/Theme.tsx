const EditorTheme = {
    spacing: {
        xxs: '0.225rem',
        xs: '0.815rem',
        s: '1.225rem',
        m: '1.5rem',
        l: '2.225rem',
    },
    font: {
        size: {
            h1: '2rem',
            h2: '1.625rem',
            h3: '1.425rem',
            h4: '1.215rem',
            h5: '1rem',
            h6: '0.825rem',
            default: '1rem',
        },
    },
    color: {
        blue: '#556ee6',
        indigo: '#564ab1',
        purple: '#6f42c1',
        red: '#f46a6a',
        orange: '#f1734f',
        yellow: '#f1b44c',
        green: '#34c38f',
        teal: '#050505',
        cyan: '#50a5f1',
        white: '#fff',
        gray: '#74788d',
        grayDark: '#343a40',
        gray100: '#f8f9fa',
        gray200: '#eff2f7',
        gray300: '#f6f6f6',
        gray400: '#ced4da',
        gray500: '#adb5bd',
        gray600: '#74788d',
        gray700: '#495057',
        gray800: '#343a40',
        gray900: '#212529',
        primary: '#556ee6',
        secondary: '#74788d',
        success: '#34c38f',
        info: '#50a5f1',
        warning: '#f1b44c',
        danger: '#f46a6a',
        pink: '#e83e8c',
        light: '#eff2f7',
        dark: '#343a40',
    },
};

type EditorThemeColors = keyof typeof EditorTheme.color;
type EditorThemeFontSize = keyof typeof EditorTheme.font.size;
type EditorThemeSpacing = keyof typeof EditorTheme.spacing;

export { EditorTheme, EditorThemeColors, EditorThemeFontSize, EditorThemeSpacing };
