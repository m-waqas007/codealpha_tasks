// Theme toggle functionality
const html = document.documentElement;
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const iconPath = document.getElementById('icon-path');

// Available themes
const themes = ['vaporwave', 'neon', 'dark'];
let currentTheme = localStorage.getItem('theme') || 'vaporwave';

// Set initial theme
html.className = `theme-${currentTheme}`;
updateIcon(currentTheme);

// Update SVG icon based on theme
function updateIcon(theme) {
    if (theme === 'vaporwave') {
        iconPath.setAttribute('d', 'M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z'); // Moon
    } else if (theme === 'neon') {
        iconPath.setAttribute('d', 'M12 2l2.5 5.5 5.5.5-4 4.5.5 5.5-4-2.5-4 2.5.5-5.5-4-4.5 5.5-.5L12 2z'); // Star
    } else {
        iconPath.setAttribute('d', 'M12 3v1m0 16v1m9-9h-1m-16 0H3m17.071-4.929l-.707.707M5.636 5.636l-.707.707m13.435 11.828l-.707-.707M6.343 18.364l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z'); // Sun
    }
}

// Toggle theme
themeToggle.addEventListener('click', () => {
    const currentIndex = themes.indexOf(currentTheme);
    const nextIndex = (currentIndex + 1) % themes.length;
    currentTheme = themes[nextIndex];
    html.className = `theme-${currentTheme}`;
    localStorage.setItem('theme', currentTheme);
    updateIcon(currentTheme);
});

function calculateAge() {
    const dobInput = document.getElementById('dob').value;
    const resultDiv = document.getElementById('result');
    const errorDiv = document.getElementById('error');

    // Reset previous messages
    resultDiv.innerHTML = '';
    errorDiv.innerHTML = '';

    // Input validation
    if (!dobInput) {
        errorDiv.innerHTML = 'Please select a date of birth.';
        return;
    }

    const inputDate = new Date(dobInput);
    const today = new Date('2025-07-23T06:10:00'); // Current date and time as provided

    if (inputDate > today) {
        errorDiv.innerHTML = 'Date of birth cannot be in the future.';
        return;
    }

    if (isNaN(inputDate.getTime())) {
        errorDiv.innerHTML = 'Invalid date. Please check your input.';
        return;
    }

    // Calculate age
    let years = today.getFullYear() - inputDate.getFullYear();
    let months = today.getMonth() - inputDate.getMonth();
    let days = today.getDate() - inputDate.getDate();

    if (days < 0) {
        months--;
        days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    }

    if (months < 0) {
        years--;
        months += 12;
    }

    // Display result
    resultDiv.innerHTML = `You are ${years} years, ${months} months, and ${days} days old.`;
}
