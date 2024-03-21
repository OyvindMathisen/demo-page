
const inputForm = document.getElementById("script-input-form");
const inputField = document.getElementById("script-input");
const textField = document.getElementById("debug-logger");
inputForm.addEventListener("submit", function(event) {
    event.preventDefault();
    openPaymentMenu();
});
let instrument = null;
let redirectUrl = null;
let config = {
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

function openPaymentMenu() {
    cleanUpInstrument();

    const scriptUrl = inputField.value;
    let url;

    try {
        url = new URL(scriptUrl);
    }
    catch (e) {
        console.warn(`Unable to create script from url: ${url}`);
        return;
    }

    const script = document.createElement("script");
    script.src = scriptUrl;
    script.type = "text/javascript";
    script.id = "payex-payment-menu-script";
    script.onload = function () {
        const instrumentName = getInstrumentFromUrl(scriptUrl);
        instrument = window.payex.hostedView[instrumentName](config);
        instrument.open();
    }
    document.body.insertAdjacentElement("afterbegin", script);
}

function handleEvent(event, data) {
    textField.value += `${JSON.stringify(data)}\n`;
    console.log(`${event}: ${JSON.stringify(data)}`);

    // TODO: Improve this 'whitelist'
    if ((event === "onExternalRedirect" || event === "onOutOfViewRedirect") && data.redirectUrl !== undefined)
        window.location.assign(data.redirectUrl);
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
        return "creditCard";
    else if (url.includes("carpay"))
        return "carPay";
    else if (url.includes("trustly"))
        return "trustly";
    return "checkout";
}

function cleanUpInstrument() {
    if (instrument) {
        instrument.close();
        const payexScript = document.getElementById("payex-payment-menu-script");
        const payairScript = document.getElementById("px-xpay-script");
        payexScript?.remove();
        payairScript?.remove();
    }
}

function openScript() {
    if (instrument) {
        textField.value += `open() called\n`;
        cleanUpInstrument();
        instrument.open();
    }
}

function updateScript() {
    // TODO: Add field to update script (language, style, etc);
    if (instrument) {
        // textField.value += `update() called\n`;
    }
}

function refreshScript() {
    if (instrument) {
        textField.value += `refresh() called\n`;
        instrument.refresh();
    }
}

function closeScript() {
    if (instrument) {
        textField.value += `close() called\n`;
        cleanUpInstrument();
    }
}

function cancelScript() {
    if (instrument) {
        textField.value += `cancel() called\n`;
        instrument.cancel();
    }
}
