// SIFT2 : GET ASSERT LOGS SCRIPT
// version 0.1 - 19.06.2018 (Contact: Jason Teo)

// End of assert log is marked as:
// 0, ASSERT: 00000000 type: LINE & FCRC file


printer.promptAll()
sift.mSleep(10)
printer.setConnection("X:")
out.clear()
out.clearScriptOutput()
out.stopScroll()

function start() {

    var count = 0
    console.error("GETTING ASSERT LOGS:")
    console.log(" ")
    
    while (assertentry != "0, ASSERT: 00000000 type: LINE & FCRC file: .") {
        var assertentry = printer.udw("errlog.get_assert_entry " + count)
        console.log(assertentry)
        count = count + 1
    }

    console.log(" ")
    console.error("END OF ASSERT LOGS.")
}

start()