exports.textInput = (width, id, label, placeholder='') => {
    return `
        <div class="row">
            <div class="input-field col s${width}">
                <input placeholder="${placeholder}" id="${label}" type="text">
                <label for="${label}">${label}</label>
            </div>
        </div>
    `
};

exports.checkbox = (name) => {
    return `
        <p>
            <label>
                <input type="checkbox" class="filled-in" checked="checked" />
                <span>${name}</span>
            </label>
        </p>
    `
};