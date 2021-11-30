var OSName = "Unknown OS";
var acclPermission = false;

function getOSName() {
    var userAgent = window.navigator.userAgent,
      platform = window.navigator.platform,
      macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'],
      windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'],
      iosPlatforms = ['iPhone', 'iPad', 'iPod'],
      os = null;

    if (macosPlatforms.indexOf(platform) !== -1) {
        os = 'Mac OS';
    } else if (iosPlatforms.indexOf(platform) !== -1) {
        os = 'iOS';
    } else if (windowsPlatforms.indexOf(platform) !== -1) {
        os = 'Windows';
    } else if (/Android/.test(userAgent)) {
        os = 'Android';
    } else if (!os && /Linux/.test(platform)) {
        os = 'Linux';
    }
    OSName = os;
}

$(function() {
    document.getElementById("game").style.display = "block";
    getOSName();
    setPermissionButton();
});

function getAccel() {
    DeviceMotionEvent.requestPermission().then(response => {
        if (response == 'granted') {
            acclPermission = true;
            setPermissionButton();
            console.log("accelerometer permission granted");
        } else {
            acclPermission = false;
            setPermissionButton();
        }
    });
}

function setPermissionButton() {
    if (OSName === 'iOS' && acclPermission === false) {
        document.getElementById("accl").style.display = "block";
        document.getElementById("ifIos").style.display = "block";
        document.getElementById("ifRefused").style.display = "block";
        document.getElementById("acclPermissionBtn").style.display = "block";
    } else {
        document.getElementById("acclPermissionBtn").style.display = "none";
        document.getElementById("ifRefused").style.display = "none";
        document.getElementById("ifIos").style.display = "none";
        document.getElementById("accl").style.display = "none";
        loadGame();
    }
}

function loadGame() {
    document.getElementById("game").innerHTML='<object type="text/html" data="game.html"></object>';
}