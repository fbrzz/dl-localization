//Dentalink Redirection v.1.0.1 - Header Part
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

const countryCode = getCookie('localization-country-code');

if (countryCode && countryUrls[countryCode] && !window.location.href.startsWith(countryUrls[countryCode])) {
    window.location.href = countryUrls[countryCode];
}