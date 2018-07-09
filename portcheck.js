// SIFT2: port changer / checker script
// version 0.2 - 20.06.2018 (Contact: Jason Teo)

printer.promptAll()
var wrongport = 0

printer.onShell("/bin/sh: udws: not found", "console.log('onshell entering backontrack prog'); backontrack(wrongport = 1)")

function backontrack(wrongport) {
        console.log("backontrack prog starting")
    while (wrongport == 1) {
        console.log("while loop active")
    printer.promptAll()
    sift.mSleep(10)
    printer.setConnection("X:")
        console.log("Port resetting to X")
    var wrongport = 0
    printer.clearOneWatcher("/bin/sh: udws: not found")
    }
        console.log("exiting backontrack prog")
}

function mainfunct() {
        console.log("main function start")
    printer.udw(" ")
    var v001 = printer.udw("ds2.get 65541")
        console.log(v001)
        console.log("main function end")
}

mainfunct()