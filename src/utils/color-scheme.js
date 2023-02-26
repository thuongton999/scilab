const getDarkModeDetector = () => window.matchMedia('(prefers-color-scheme: dark)');

const getColorScheme = () => {
    const colorScheme = localStorage.getItem('color-scheme');
    if (colorScheme) return colorScheme;
    const isDarkMode = getDarkModeDetector().matches;
    return isDarkMode ? "dark" : "light";
};

const setColorScheme = (mode) => {
    if ((mode !== "light") && (mode !== "dark")) 
        return console.error('Invalid color scheme');
    localStorage.setItem('color-scheme', mode);
    document.documentElement.setAttribute('theme', mode);
}

export {
    getDarkModeDetector,
    getColorScheme,
    setColorScheme,
}