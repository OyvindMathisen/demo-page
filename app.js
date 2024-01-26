function openPaymentMenu() {
    if (instrument) {
        instrument.close();
        const payexScript = document.getElementById("payex-payment-menu-script");
        const payairScript = document.getElementById("px-xpay-script");
        payexScript.remove();
        payairScript.remove();
    }

    const input = document.getElementById("script-input");
    const scriptUrl = input.value;
    const script = document.createElement("script");
    script.src = scriptUrl;
    script.type = "text/javascript";
    script.id = "payex-payment-menu-script";
    script.onload = function () {
        const config = {
            onPaymentAttemptStarted: Function = (data) => handleEvent("onPaymentAttemptStarted", data),
            onPaymentAttemptFailed: Function = (data) => handleEvent("onPaymentAttemptFailed", data),
            onPaymentAttemptAborted: Function = (data) => handleEvent("onPaymentAttemptAborted", data),
            onPaymentTransactionFailed: Function = (data) => handleEvent("onPaymentTransactionFailed", data),
            onOutOfViewRedirect: Function = (data) => handleEvent("onOutOfViewRedirect", data),
            onPaid: Function = (data) => handleEvent("onPaid", data),
            onOutOfViewOpen: Function = (data) => handleEvent("onOutOfViewOpen", data),
            onPaymentCreated: Function = (data) => handleEvent("onPaymentCreated", data),
            onExternalRedirect: Function = (data) => handleEvent("onExternalRedirect", data),
            onPaymentCompleted: Function = (data) => handleEvent("onPaymentCompleted", data),
            onError: Function = (data) => handleEvent("onError", data),

            onEventNotification: Function = (data) => handleEvent("onEventNotification", data),
            onInstrumentSelected: Function = (data) => handleEvent("onInstrumentSelected", data),
            onTermsOfServiceRequested: Function = (data) => handleEvent("onTermsOfServiceRequested", data),
            onFailed: Function = (data) => handleEvent("onFailed", data),
            onAborted: Function = (data) => handleEvent("onAborted", data),
            onCheckoutResized: Function = (data) => handleEvent("onCheckoutResized", data),
            onCheckoutLoaded: Function = (data) => handleEvent("onCheckoutLoaded", data),
            onApplicationConfigured: Function = (data) => handleEvent("onApplicationConfigured", data),
            onPaymentMenuInstrumentSelected: Function = (data) => handleEvent("onPaymentMenuInstrumentSelected", data),
            onPaymentToS: Function = (data) => handleEvent("onPaymentToS", data),
            onPaymentFailed: Function = (data) => handleEvent("onPaymentFailed", data),
            onPaymentCanceled: Function = (data) => handleEvent("onPaymentCanceled", data),
            onPaymentPending: Function = (data) => handleEvent("onPaymentPending", data),

            container: any = "paymentmenu-container",
            culture: string = "en-us"
        };

        const instrumentName = getInstrumentFromUrl(scriptUrl);
        instrument = window.payex.hostedView[instrumentName](config);
        instrument.open();
    }
    document.body.insertAdjacentElement("afterbegin", script);
}

function handleEvent(event, data) {
    console.log(`${event}: ${JSON.stringify(data)}`);

    const textField = document.getElementById("debug-logger");
    textField.value += `${JSON.stringify(data)}\n`;
}

function getInstrumentFromUrl(url) {
    if (url.includes("swish"))
        return "swish";
    else if (url.includes("mobilepay"))
        return "mobilepay";
    else if (url.includes("vipps"))
        return "vipps";
    else if (url.includes("invoice"))
        return "invoice";
    else if (url.includes("creditcard"))
        return "creditcard";
    else if (url.includes("carpay"))
        return "carpay";
    else if (url.includes("trustly"))
        return "trustly";
    else if (url.includes("checkout") || url.includes("paymentmenu"))
        return "checkout";
}

let instrument;

function openScript() {
    console.log("open script called");
    if (instrument) {

    }
}

function updateScript() {
    console.log("update script called");
}

function refreshScript() {
    console.log("refresh script called");
}

function closeScript() {
    console.log("close script called");
}

function cancelScript() {
    console.log("cancel script called");
}

const HostedViewCommands = {
    Open: "open",
    Close: "close",
    Update: "update",
    Refresh: "refresh",
    Cancel: "cancel"
}