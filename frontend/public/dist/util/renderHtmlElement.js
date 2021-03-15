class docClass {
    render(divId, text) {
        const el = document.getElementById(divId);
        if (el) {
            el.innerHTML = text;
        }
    }
}
export default new docClass();
