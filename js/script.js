function updateChargeStatus(mediaQueryStatus, percent) {
    console.log(mediaQueryStatus)
    if (mediaQueryStatus) {
        //for mobile view
        //charge
        let style = {
            backgroundColor: "#409940",
            status: "Charging",
            batteryWidth: `${percent}%`,
            logoWidth: 25,
            logoHeight: 6,
            batteryPercentContainerWidth: 100,
            rotate: 180
        }
        return style;

    } else {
        let style = {
            backgroundColor: "#409940",
            status: "Charging",
            batteryWidth: `${percent}%`,
            logoWidth: 5,
            logoHeight: 15,
            batteryPercentContainerWidth: 60,
            rotate: 180
        }

        return style;
    }

}

function changeDeviceIcon(mediaQueryStatus) {
    if (mediaQueryStatus) {
        let iconStyle = {
            path: "./images/phone-icon.jpg",
            iconWidth: "40px",
            iconHeigth: "40px"

        }
        return iconStyle;
    }
    else {
        let iconStyle = {
            path: "./images/pc.png",
            iconWidth: "60px",
            iconHeigth: "60px",

        }
        return iconStyle;
    }
}

function adjustBatteryPosition(status, batteryPercentage) {
    if (status) {
        let batterybar = {
            containerWidth: "100%",
            marginTop: "2rem",
            batteryHeight: "320px",
            batteryWidth: "120px",
            batteryMargin: "auto",
            batteryBarHeight: `${batteryPercentage}%`,
            batterybarWidth: "100%",
            rotateBattery: "rotate(180deg)",
            rotateBatteryCase: "rotate(180deg)",
            flexDirection: "column-reverse",
            batterySideStyle: "width : 50px; height: 10px; margin: auto "


        }
        return batterybar;
    } else {
        let batterybar = {
            containerWidth: "97%",
            marginTop: "1.5rem",
            batteryHeight: "130px",
            batteryWidth: "500px",
            batteryMargin: "auto 0px auto auto",
            batteryBarHeight: "130px",
            batterybarWidth: `${batteryPercentage}%`,
            rotateBattery: "rotate(360deg)",
            rotateBatteryCase: "rotate(0deg)",
            flexDirection: "row",
            batterySideStyle: "width : 10px; height: 50px; margin: auto auto auto 0px"

        }
        return batterybar;

    }
}
function adjustFooter(querystatus) {
    if (querystatus) {
        let style = {
            flexDirection: "column",
            gap: "1"
        }
        return style;
    } else {
        let style = {
            flexDirection: "row",
            gap: "1"
        }
        return style
    }
}




async function mediaQuery() {
    let batteryInfo = await navigator.getBattery();
    console.log(Math.round(batteryInfo.level * 100));
    let batteryPercent = Math.round(batteryInfo.level * 100);
    let chargeStatus = batteryInfo.charging;
    let query = matchMedia("(max-width:375px)");
    let queryStatus = query.matches;

    //Battery charge status
    if (chargeStatus) {
        let styleObject = updateChargeStatus(queryStatus, batteryPercent);

        document.querySelector(".batteryLevel").style.backgroundColor = styleObject.backgroundColor;
        document.querySelector(".batteryStatus").innerHTML = `${batteryPercent}%`;
        document.querySelector(".chargeStatus").innerHTML = styleObject.status;
        document.querySelector(".batteryPercentage ").innerHTML = `${batteryPercent}% &nbsp`
        document.querySelector(".chargeSymbol").innerHTML =
            `<img src='./images/thunderbolt.png' style='width:${styleObject.logoWidth}% ; height:${styleObject.logoHeight}%; margin:auto; '/>`
        document.querySelector(".batteryPercentage").style.width = `${styleObject.batteryPercentContainerWidth}%`;
        document.querySelector(".batteryLevel").style.transform = `rotate(${styleObject.rotate}deg)`
        document.querySelector(".batteryLevel").style.flexDirection = "row";
    } else {
        document.querySelector(".batteryStatus").innerHTML = `${batteryPercent}%`;
        document.querySelector(".chargeStatus").innerHTML = "Not charging";
        document.querySelector(".batteryPercentage ").innerHTML = `${batteryPercent}% &nbsp`;


    }

    //  changing Device icon 
    let iconStyle = changeDeviceIcon(queryStatus);
    document.querySelector(".deviceIcon").innerHTML = `<img src='${iconStyle.path}' style='width: ${iconStyle.iconWidth}; height: ${iconStyle.iconHeigth}; margin:auto;'/>`



}



// events //
document.addEventListener('DOMContentLoaded', mediaQuery);
window.addEventListener('resize', mediaQuery);

