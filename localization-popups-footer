//Dentalink Redirection v.1.0.1 - Footer Part
document.addEventListener("DOMContentLoaded", function() {
    const countryCode = getCookie('localization-country-code');
    
    if (!countryCode) {
        const selectorMain = document.getElementById('localization-selector-main');
        if (selectorMain) {
            selectorMain.style.display = 'flex';
        }

        const closeDays = parseInt(document.getElementById('localization-banner').getAttribute('localization-close-days'), 10);

        document.querySelectorAll('[localization-country]').forEach(link => {
            link.addEventListener('click', function() {
                const selectedCountry = this.getAttribute('localization-country');
                setCookie('localization-country-code', selectedCountry, closeDays);
            });
        });

        document.querySelectorAll('.localization-close-popup').forEach(button => {
            button.addEventListener('click', function() {
                const userCountry = Object.keys(countryUrls).find(code => window.location.href.startsWith(countryUrls[code])) || 'latam';
                setCookie('localization-country-code', userCountry, closeDays);
                if (selectorMain) {
                    selectorMain.style.display = 'none';
                }
            });
        });
    } else {
        document.querySelectorAll('[localization-country]').forEach(link => {
            link.addEventListener('click', function() {
                const selectedCountry = this.getAttribute('localization-country');
                setCookie('localization-country-code', selectedCountry, closeDays);
            });
        });
    }
});