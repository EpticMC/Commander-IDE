const { ipcRenderer, remote } = require("electron");
const loader = require("monaco-loader");
const fs = require("fs");


function fileManager({editor}) {
    this.editor = editor
    document.querySelector("#open").onclick = () => openFile();
    document.querySelector("#save").onclick = () => saveFile();

    function openFile() {
        var url = remote.dialog.showOpenDialog();
        fs.readFile(url[0], "utf-8", (err, data) => { this.editor.setModel(monaco.editor.createModel(data, "javascript")); });
    }

    function saveFile() {
        remote.dialog.showSaveDialog(filename => {
            let data = "";
            let model = this.editor.getModel();
            model._lines.forEach(line => data += line.text + model._EOL);
            fs.writeFile(filename, data, "utf-8");
        });
    }
}

window.onload = () => {
    loader().then((monaco) => {
        let editor = monaco.editor.create(document.getElementById("container"), {
            language: "javascript",
            theme: "vs-dark",
            cursorBlinking: "smooth",
            cursorStyle: "line"
        });
        fileManager({editor});
        ipcRenderer.on("navigate", (e, url) => {
            url = url.slice(8);
            fs.readFile(url, "utf8", (error, result) => { if(!error) editor.setModel(monaco.editor.createModel(result, "javascript")); });
        });
    });
}
