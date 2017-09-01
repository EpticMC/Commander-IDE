const {ipcRenderer, remote} = require("electron")
const fs = require("fs")

class FileManager {
    constructor({editor}) {
        this.editor = editor
        document.querySelector("#open").onclick = () => this.openFile()
        document.querySelector("#save").onclick = () => this.saveFile()
    }

    openFile() {
        var url = remote.dialog.showOpenDialog();
        fs.readFile(url[0], "utf-8", (err, data) => { this.editor.setModel(monaco.editor.createModel(data, "javascript")); });
    };

    saveFile() {
        remote.dialog.showSaveDialog(filename => {
            let data = ""
            let model = this.editor.getModel()
            model._lines.forEach(line => data += line.text + model._EOL)
            fs.writeFile(filename, data, "utf-8")
        });
    }
}

module.exports = FileManager
