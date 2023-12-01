function launch() {
    const inputElement = document.getElementById("launch-link-input");
    const input = inputElement.value;
    window.location.assign(input);
}

function launchTop() {
    const inputElement = document.getElementById("launch-link-input");
    const input = inputElement.value;
    window.top.location.assign(input);
}