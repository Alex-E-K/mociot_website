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

    document.getElementById("UA").innerText = os;
    OSName = os;
}

$(function() {
    getOSName();
    setPermissionButton();
});

function getAccel() {
    DeviceMotionEvent.requestPermission().then(response => {
        if (response == 'granted') {
            acclPermission = true;
            setPermissionButton();
            console.log("accelerometer permission granted");
            // Do stuff here
            window.ondevicemotion = function(event) {
                var ax = event.accelerationIncludingGravity.x;
                var ay = event.accelerationIncludingGravity.y;
                var az = event.accelerationIncludingGravity.z;

                document.querySelector('#x').innerHTML = "X = " + ax;
                document.querySelector('#y').innerHTML = "Y = " + navigator.userAgentData.platform;
                document.querySelector('#z').innerHTML = "Z = " + az;
            }
        } else {
            acclPermission = false;
            setPermissionButton();
        }
    });
}

function setPermissionButton() {
    if (OSName === 'iOS' && acclPermission === false) {
        document.getElementById("acclPermissionBtn").style.display = "block";
    } else {
        document.getElementById("acclPermissionBtn").style.display = "none";
    }
}