// SIFT2 : GET ASSERT LOGS SCRIPT
// version 0.3 - 20.06.2018 (Contact: Jason Teo)

function start() {

    printer.promptAll()
    sift.mSleep(10)
    printer.setConnection("X:")
    out.clear()
    out.clearScriptOutput()
    out.stopScroll()

    var count = 0

    console.error("GETTING ASSERT LOGS:")
    console.log(" ")
    
    while (assertentry != "0, ASSERT: 00000000 type: LINE & FCRC file: .") {
        var assertentry = printer.udw("errlog.get_assert_entry " + count)
        if (assertentry == "0, ASSERT: 00000000 type: LINE & FCRC file: .") {
            break
        }
        else {
            console.log(assertentry)
            count = count + 1
        }
        
    }

    console.log(" ")
    console.error("END OF ASSERT LOGS.")
}

start()