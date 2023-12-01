function openPaymentMenu() {
    const input = document.getElementById("script-input");
    const scriptUrl = input.value;
    const script = document.createElement("script");
    script.src = scriptUrl;
    script.type = "text/javascript";
    script.id = "payex-payment-menu-script";
    document.body.insertAdjacentElement("afterbegin", script);

    setTimeout(() => {
        const config = {
            onPaymentAttemptStarted: Function = (data) => console.log(`onPaymentAttemptStarted: ${JSON.stringify(data)}`),
            onPaymentAttemptFailed: Function = (data) => console.log(`onPaymentAttemptFailed: ${JSON.stringify(data)}`),
            onPaymentAttemptAborted: Function = (data) => console.log(`onPaymentAttemptAborted: ${JSON.stringify(data)}`),
            onPaymentTransactionFailed: Function = (data) => console.log(`onPaymentTransactionFailed: ${JSON.stringify(data)}`),
            onOutOfViewRedirect: Function = (data) => console.log(`onOutOfViewRedirect: ${JSON.stringify(data)}`),
            onPaid: Function = (data) => console.log(`onPaid: ${JSON.stringify(data)}`),
            onOutOfViewOpen: Function = (data) => console.log(`onOutOfViewOpen: ${JSON.stringify(data)}`),
            onPaymentCreated: Function = (data) => console.log(`onPaymentCreated: ${JSON.stringify(data)}`),
            // onExternalRedirect: Function = (data) => console.log(`onExternalRedirect: ${JSON.stringify(data)}`),
            onPaymentCompleted: Function = (data) => console.log(`onPaymentCompleted: ${JSON.stringify(data)}`),
            onError: Function = (data) => console.log(`onError: ${JSON.stringify(data)}`),
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
        else
            window.payex.hostedView.checkout(config).open();
    }, 1000);
}