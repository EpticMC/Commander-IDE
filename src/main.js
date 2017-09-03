const { ipcRenderer, remote } = require("electron");
const loader = require("monaco-loader");
const fs = require("fs");
const FileManager = require("./api/fileManager");

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

        $("#f__open").click(function() { fileManager.openFile() });
        $("#f__save").click(function() { fileManager.saveFile() });
    });
}
