module.exports.createBuffer = (e) => {
    let buffer;
    let type;
    let name;
    const file = e.target.files[0];
    const reader = new window.FileReader();

    reader.readAsArrayBuffer(file);
    reader.onloadend = () => {
        buffer = Buffer(reader.result);
        type = file.type;
        name = file.name;
    }

    return { buffer, type, name }

}