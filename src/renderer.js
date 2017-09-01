const { ipcRenderer } = require("electron");
const loader = require("monaco-loader");
const fs = require("fs");
const FileManager = require("./filemanager");

window.onload = () => {
    loader().then((monaco) => {
        let editor = monaco.editor.create(document.getElementById("container"), {
            language: "javascript",
            theme: "vs-dark",
            cursorBlinking: "smooth",
            cursorStyle: "line"
        });
        let fileManager = new FileManager({editor});
        ipcRenderer.on("navigate", (e, url) => {
            url = url.slice(8);
            fs.readFile(url, "utf8", (error, result) => { if(!error) editor.setModel(monaco.editor.createModel(result, "javascript")); });
        });
    });
}