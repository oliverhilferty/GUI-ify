exports.textInput = (width, id, label, placeholder='') => {
    return `
        <div class="row">
            <div class="input-field col s${width}">
              <input placeholder="${placeholder}" id="${label}" type="text" class="validate">
              <label for="${label}">${label}</label>
            </div>
        </div>
    `
};