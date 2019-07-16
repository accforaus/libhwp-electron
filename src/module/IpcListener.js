class IpcListener {
    init(ipcMain, dialog) {
        this.ipcMain = ipcMain
        this.dialog = dialog

        this.openFileDialog()
        this.chooseDirectoryDialog()
    }

    openFileDialog() {
        this.ipcMain.on('open-file-dialog', e => {
            let options = {
                title: 'Select HWP File',
                buttonLabel: 'Open',
                filters: [
                    {name: 'Hwp', extensions: ['hwp', 'HWP']}
                ],
                properties: ['openFile']
            }

            this.dialog.showOpenDialog(null, options, file => {
                e.sender.send('open-dialog-file-selected', file)
            })
        })
    }

    chooseDirectoryDialog() {
        this.ipcMain.on('open-directory-dialog', event => {
            this.dialog.showOpenDialog(null, {
                properties: ['openDirectory']
            }, directory => {
                event.sender.send('open-dialog-directory-selected', directory)
            })
        })
    }
}

export default new IpcListener()