exports.textInput = (width, id, label) => {
    return `
        <div class="row">
            <div class="input-field col s${width}">
                <input id="${label}" type="text">
                <label for="${label}">${label}</label>
            </div>
        </div>
    `
};

exports.checkbox = (name) => {
    return `
        <p>
            <label>
                <input type="checkbox" class="filled-in" />
                <span>${name}</span>
            </label>
        </p>
    `
};