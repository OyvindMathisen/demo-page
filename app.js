function openPaymentMenu() {
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

        if (scriptUrl.includes("swish"))
            window.payex.hostedView.swish(config).open();
        else if (scriptUrl.includes("mobilepay"))
            window.payex.hostedView.mobilepay(config).open();
        else if (scriptUrl.includes("vipps"))
            window.payex.hostedView.vipps(config).open();
        else if (scriptUrl.includes("invoice"))
            window.payex.hostedView.invoice(config).open();
        else if (scriptUrl.includes("creditcard"))
            window.payex.hostedView.creditCard(config).open();
        else if (scriptUrl.includes("carpay"))
            window.payex.hostedView.carPay(config).open();
        else if (scriptUrl.includes("trustly"))
            window.payex.hostedView.trustly(config).open();
        else
            window.payex.hostedView.checkout(config).open();
    }
    document.body.insertAdjacentElement("afterbegin", script);
}

function handleEvent(event, data) {
    console.log(`${event}: ${JSON.stringify(data)}`);

    const textField = document.getElementById("debug-logger");
    textField.value += `${JSON.stringify(data)}\n`;
}