async function checkEligibility() {
    const acceptedWallets = await payex.getAcceptedWallets();
    console.log("Available instruments: " + acceptedWallets.join(", "));

    // The following code is just to visually display the instruments in the HTML document
    const container = document.getElementById("container");
    container.textContent = "";
    
    acceptedWallets.forEach(element => {
        const paragraph = document.createElement("p");
        paragraph.innerHTML = element;
        container.appendChild(paragraph);
    });
}
