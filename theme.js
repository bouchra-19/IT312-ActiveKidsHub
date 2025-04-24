console.log("Theme script loaded successfully");

document.addEventListener("DOMContentLoaded", () => {
    // Load saved theme on page load
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.body.className = savedTheme === 'dark' ? 'theme-dark' : '';
    
    const themeButton = document.querySelector('button[onclick="toggleTheme()"]');
    if (themeButton) {
        themeButton.textContent = savedTheme === 'dark' ? 'Switch to Light Theme' : 'Switch to Dark Theme';
    } else {
        console.error("Theme toggle button not found in the DOM");
    }

    // Listen for full-screen changes to re-apply the theme
    document.addEventListener('fullscreenchange', () => {
        const currentTheme = localStorage.getItem('theme') || 'light';
        requestAnimationFrame(() => {
            document.body.className = currentTheme === 'dark' ? 'theme-dark' : '';
        });
    });
});

// Toggle theme function
function toggleTheme() {
    console.log("toggleTheme function called");
    const currentTheme = localStorage.getItem('theme') || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';

    // Use requestAnimationFrame to ensure the class update is applied
    requestAnimationFrame(() => {
        document.body.className = newTheme === 'dark' ? 'theme-dark' : '';
        const themeButton = document.querySelector('button[onclick="toggleTheme()"]');
        if (themeButton) {
            themeButton.textContent = newTheme === 'dark' ? 'Switch to Light Theme' : 'Switch to Dark Theme';
        } else {
            console.error("Theme toggle button not found when toggling theme");
        }
    });

    // Save the new theme to localStorage
    localStorage.setItem('theme', newTheme);
}