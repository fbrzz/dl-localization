const countryUrls = {
    co: "https://dentalink-colombia.webflow.io/",
    mx: "https://dentalink-mexico.webflow.io/",
    cl: "https://dentalink-latam.webflow.io/?c=cl",
    latam: "https://dentalink-latam.webflow.io/"
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

// Obtiene la cookie del código de país
const countryCode = getCookie('localization-country-code');

if (!countryCode) {
    // Muestra el selector de país
    const selectorMain = document.getElementById('localization-selector-main');
    selectorMain.style.display = 'flex';

    // Obtiene el número de días para la cookie
    const closeDays = parseInt(document.getElementById('localization-banner').getAttribute('localization-close-days'), 10);

    // Asigna el evento a todos los enlaces con atributo "localization-country"
    document.querySelectorAll('[localization-country]').forEach(link => {
        link.addEventListener('click', function() {
            const selectedCountry = this.getAttribute('localization-country');
            setCookie('localization-country-code', selectedCountry, closeDays);
            // La redirección ahora se manejará naturalmente por el atributo href del enlace
        });
    });

    // Asigna el evento para cerrar el popup y guardar la cookie del país actual
    document.querySelectorAll('.localization-close-popup').forEach(button => {
        button.addEventListener('click', function() {
            const userCountry = Object.keys(countryUrls).find(code => window.location.href.startsWith(countryUrls[code])) || 'latam';
            setCookie('localization-country-code', userCountry, closeDays);
            selectorMain.style.display = 'none';
        });
    });

} else {
    // Redirección automática si la cookie existe
    if (countryUrls[countryCode] && !window.location.href.startsWith(countryUrls[countryCode])) {
        window.location.href = countryUrls[countryCode];
    }

    // Permitir que el usuario cambie voluntariamente el país haciendo clic en los enlaces
    document.querySelectorAll('[localization-country]').forEach(link => {
        link.addEventListener('click', function() {
            const selectedCountry = this.getAttribute('localization-country');
            setCookie('localization-country-code', selectedCountry, closeDays);
            // No preventDefault, permitiendo que el enlace redirija como lo haría naturalmente
        });
    });
}