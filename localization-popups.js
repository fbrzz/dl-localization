const countryUrls = {
    co: "https://www.softwaredentalink.com/co/",
    mx: "https://www.softwaredentalink.com/mx/",
    cl: "https://www.softwaredentalink.com/?c=cl",
    latam: "https://www.softwaredentalink.com/"
};

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

// Obtener la cookie del código de país
const countryCode = getCookie('localization-country-code');

if (!countryCode) {
    // Mostrar el selector de país
    const selectorMain = document.getElementById('localization-selector-main');
    selectorMain.style.display = 'flex';

    // Obtener el número de días para la cookie
    const closeDays = parseInt(document.getElementById('localization-banner').getAttribute('localization-close-days'), 10);

    // Asignar evento a todos los enlaces con atributo "localization-country"
    document.querySelectorAll('[localization-country]').forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const selectedCountry = this.getAttribute('localization-country');
            setCookie('localization-country-code', selectedCountry, closeDays);
        });
    });

    // Asignar evento para cerrar el popup y guardar la cookie correspondiente al país actual
    document.querySelector('.localization-close-popup').addEventListener('click', function() {
        const userCountry = Object.keys(countryUrls).find(code => window.location.href.startsWith(countryUrls[code])) || 'latam';
        setCookie('localization-country-code', userCountry, closeDays);
        selectorMain.style.display = 'none';
    });

} else {
    // Redirigir automáticamente al usuario si la cookie existe
    if (countryUrls[countryCode] && !window.location.href.startsWith(countryUrls[countryCode])) {
        window.location.href = countryUrls[countryCode];
    }
}