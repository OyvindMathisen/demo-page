function launchLink(method) {
    const inputElement = document.getElementById("launch-link-input");
    const input = inputElement.value;
    switch (method) {
        case "window_location_href":
            window.location.href = input;
            break;
        case "window_open":
            window.open(input, "_blank", "noopener,noreferrer");
            break;
        case "document_location":
            this.document.location.href = input;
            break;
        case "location_assign":
            window.location.assign(input);
            break;
        case "location_top_assign":
            window.top.location.assign(input);
            break;
        default:
            console.warn(`Unknown launch method '${method}'`);
    }
}
