// Dentalink  Localization Banners
const banner = document.getElementById('localization-banner');
const localizationCountries = banner.getAttribute('localization-country').split(',');

fetch('https://api.ipify.org?format=json')
    .then(response => response.json())
    .then(data => {
        const ip = data.ip;
        return fetch(`https://ipinfo.io/${ip}/json?token=0ccaafaab8123b`);
     })
        .then(response => response.json())
        .then(location => {
            const userCountry = location.country.toLowerCase();
            if (localizationCountries.length === 1 && localizationCountries[0] !== '') {
                const siteCountry = localizationCountries[0];
                if (userCountry !== siteCountry) {
                    banner.style.display = 'block';
                }
            } else {
                if (localizationCountries.includes(userCountry)) {
                    banner.style.display = 'block';
                }
            }
        })
        .catch(error => {
            console.error('Error al obtener la ubicación:', error);
        });