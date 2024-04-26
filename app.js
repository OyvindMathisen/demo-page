const inputForm = document.getElementById("script-input-form");
const styleForm = document.getElementById("modal");
const inputField = document.getElementById("script-input");
const textField = document.getElementById("debug-logger");
inputForm.addEventListener("submit", function(event) {
    event.preventDefault();
    openPaymentMenu();
});
styleForm.addEventListener("submit", function(event) {
    event.preventDefault();
    updateScript();
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
    culture: string = "sv-SE"
};
resetCustomStyle();

function openPaymentMenu() {
    cleanUpInstrument();

    const scriptUrl = inputField.value;
    let url;

    try {
        url = new URL(scriptUrl);
    }
    catch (e) {
        const error = `Unable to create script from url: '${scriptUrl}'`;
        addLogText(error);
        console.warn(error);
        return;
    }

    const script = document.createElement("script");
    script.src = url.href;
    script.type = "text/javascript";
    script.id = "payex-payment-menu-script";
    script.onload = function () {
        const instrumentName = getInstrumentFromUrl(url.href);
        instrument = window.payex.hostedView[instrumentName](config);
        instrument.open();
    }
    document.body.insertAdjacentElement("afterbegin", script);
}

function handleEvent(event, data) {
    const json = JSON.stringify(data);
    addLogText(json);
    console.log(`${event}: ${json}`);

    // TODO: Improve this 'whitelist'
    if ((event === "onExternalRedirect" || event === "onOutOfViewRedirect") && data.redirectUrl !== undefined)
        window.location.assign(data.redirectUrl);
}

function getInstrumentFromUrl(url) {
    if (url.includes("carpay"))
        return "carpay";
    if (url.includes("creditaccount"))
        return "creditaccount";
    if (url.includes("creditcard"))
        return "creditcard";
    if (url.includes("invoice"))
        return "invoice";
    if (url.includes("mobilepay"))
        return "mobilepay";
    if (url.includes("swish"))
        return "swish";
    if (url.includes("trustly"))
        return "trustly";
    if (url.includes("vipps"))
        return "vipps";
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

function openScriptModal() {
    styleForm.style.display = 'flex';
}

function closeScriptModal() {
    styleForm.style.display = 'none';
}

function openScript() {
    if (instrument) {
        addLogText("open() called");
        cleanUpInstrument();
        instrument.open();
    }
}

function updateScript() {
    const form = new FormData(styleForm);
    const update = {
        "culture": form.get("culture"),
        "style": this.getCustomStyle()
    };

    if (instrument) {
        addLogText("update() called");
        instrument.update(update);
    }

    this.closeScriptModal();
}

function refreshScript() {
    if (instrument) {
        addLogText("refresh() called");
        instrument.refresh();
    }
}

function closeScript() {
    if (instrument) {
        addLogText("close() called");
        cleanUpInstrument();
    }
}

function cancelScript() {
    if (instrument) {
        addLogText("cancel() called");
        instrument.cancel();
    }
}

function addLogText(text) {
    textField.value += `${text}\n`;
    textField.scrollTop = textField.scrollHeight;
}

function clearLogBlock() {
    textField.value = "";
}

function getCustomStyle() {
    const form = new FormData(styleForm);
    const style = {
        "button": {
            "enabled": {
                "backgroundColor": form.get("primary-enabled-color"),
                "color": form.get("primary-enabled-text-color"),
                "outline": form.get("primary-enabled-outline"),
                "hover": {
                    "backgroundColor": form.get("primary-enabled-hover-color"),
                    "color": form.get("primary-enabled-hover-text-color"),
                    "outline": form.get("primary-enabled-hover-outline")
                }
            },
            "disabled": {
                "backgroundColor": form.get("primary-disabled-color"),
                "color": form.get("primary-disabled-text-color"),
                "outline": form.get("primary-disabled-outline"),
                "hover": {
                    "backgroundColor": form.get("primary-disabled-hover-color"),
                    "color": form.get("primary-disabled-hover-text-color"),
                    "outline": form.get("primary-disabled-hover-outline")
                }
            },
            "borderRadius": form.get("primary-border-radius")
        },
        "secondaryButton": {
            "enabled": {
                "backgroundColor": form.get("secondary-enabled-color"),
                "color": form.get("secondary-enabled-text-color"),
                "outline": form.get("secondary-enabled-outline"),
                "hover": {
                    "backgroundColor": form.get("secondary-enabled-hover-color"),
                    "color": form.get("secondary-enabled-hover-text-color"),
                    "outline": form.get("secondary-enabled-hover-outline")
                }
            },
            "disabled": {
                "backgroundColor": form.get("secondary-disabled-color"),
                "color": form.get("secondary-disabled-text-color"),
                "outline": form.get("secondary-disabled-outline"),
                "hover": {
                    "backgroundColor": form.get("secondary-disabled-hover-color"),
                    "color": form.get("secondary-disabled-hover-text-color"),
                    "outline": form.get("secondary-disabled-hover-outline")
                }
            },
            "borderRadius": form.get("secondary-border-radius")
        },
    };

    return style;
}

function resetCustomStyle() {
    const form = new FormData(styleForm);
    form.set("primary-enabled-color", "#2F2424");
    form.set("primary-enabled-text-color", "#FFFFFF");
    form.set("primary-enabled-outline", "1px solid transparent");
    form.set("primary-enabled-hover-color", "#72605E");
    form.set("primary-enabled-hover-text-color", "#FFFFFF");
    form.set("primary-enabled-hover-outline", "");
    form.set("primary-disabled-color", "#EBE7E2");
    form.set("primary-disabled-text-color", "#72605E");
    form.set("primary-disabled-outline", "1px solid transparent");
    form.set("primary-disabled-hover-color", "");
    form.set("primary-disabled-hover-text-color", "");
    form.set("primary-disabled-hover-outline", "");
    form.set("primary-border-radius", 8);
    form.set("secondary-enabled-color", "#FFFFFF");
    form.set("secondary-enabled-text-color", "#2F2424");
    form.set("secondary-enabled-outline", "1px solid #72605E");
    form.set("secondary-enabled-hover-color", "#72605E");
    form.set("secondary-enabled-hover-text-color", "");
    form.set("secondary-enabled-hover-outline", "")
    form.set("secondary-disabled-color", "#EBE7E2");
    form.set("secondary-disabled-text-color", "#72605E");
    form.set("secondary-disabled-outline", "1px solid transparent");
    form.set("secondary-disabled-hover-color", "");
    form.set("secondary-disabled-hover-text-color", "");
    form.set("secondary-disabled-hover-outline", "");
    form.set("secondary-border-radius", 8);

    for (const [key, value] of form) {
        const input = styleForm.elements[key];
        input.value = value;
    };
}
