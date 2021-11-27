var OSName = "Unknown OS";

function getOSName() {
    if (navigator.userAgentData.platform.indexOf("Win") != -1) {
        OSName = "Windows";
    } else if (navigator.userAgentData.platform.indexOf("mac") != -1) {
        OSName = "MacOS";
    } else if (navigator.userAgentData.platform.indexOf("X11") != -1) {
        OSName = "Unix";
    } else if (navigator.userAgentData.platform.indexOf("Linux") != -1) {
        OSName = "Linux";
    } else if (navigator.userAgentData.platform.indexOf("iPhone") != -1 || navigator.userAgentData.platform.indexOf("iPad") != -1) {
        OSName = "iOS";
    } else if (navigator.userAgentData.platform.indexOf("Android") != -1) {
        OSName = "Android";
    }

    document.getElementById("UA").innerText = OSName;
}

jQuery(window).load(function() {
    getOSName();
});