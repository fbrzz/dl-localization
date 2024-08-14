//Dentalink Localization v.2.0.1 — Añade funciones de cierre de banner
function setCookie(name, value, days) {
    const d = new Date();
    d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + d.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

const banner = document.getElementById('localization-banner');
const localizationCountries = banner.getAttribute('localization-country-banner').split(',');
const globalNavbar = document.querySelector('.global-navbar');

const closeDays = parseInt(banner.getAttribute('localization-close-days'), 10);
const bannerClosed = getCookie('localizationBannerClosed');

if (!bannerClosed) {
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
                    adjustNavbar();
                }
            } else {
                if (localizationCountries.includes(userCountry)) {
                    banner.style.display = 'block';
                    adjustNavbar();
                }
            }
        })
        .catch(error => {
            console.error('Error al obtener la ubicación:', error);
        });
}

document.getElementById('localization-top-banner-close').addEventListener('click', (event) => {
    event.stopPropagation();
    banner.style.display = 'none';
    setCookie('localizationBannerClosed', 'true', closeDays);
    globalNavbar.style.top = '';
});

function adjustNavbar() {
    if (window.innerWidth <= 479) {
        globalNavbar.style.top = '90px';
    } else {
        globalNavbar.style.top = '55px';
    }
}

window.addEventListener('resize', () => {
    if (banner.style.display === 'block') {
        adjustNavbar();
    }
});