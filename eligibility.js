window.addEventListener("load", (_) => {
    displayUserAgent();
});

async function checkEligibility() {
    displayUserAgent();
    
    const acceptedWallets = await payex.getAcceptedWallets();
    console.log("Available instruments: " + acceptedWallets.join(", "));

    const container = document.getElementById("container");
    container.textContent = "";
    
    acceptedWallets.forEach(element => {
        const paragraph = document.createElement("p");
        paragraph.innerHTML = element;
        container.appendChild(paragraph);
    });
}

function displayUserAgent() {
    const userAgentContainer = document.getElementById("userAgent");
    userAgentContainer.textContent = "";

    const paragraph = document.createElement("p");
    paragraph.innerHTML = navigator.userAgent;
    userAgentContainer.appendChild(paragraph);
}
