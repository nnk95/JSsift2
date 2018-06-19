// SIFT2 : DS2 VALUE DURATION TEST SCRIPT
// version 0.3 - 19.06.2018 (Contact: Jason Teo)

// CHANGE THE FOLLOWING :

var ds2_value = 73570
var ds2_count = 600
var ds2_time = 1

// 'value' is for the required ds2 setting
// 'count' is for the stop set value
// 'time' is for the time delay between 'value' in seconds





var ds2_startcount = 0
printer.promptAll()
sift.mSleep(10)
printer.setConnection("X:")
printer.udw("smgr_init.auto_reboot_on_assert 10")
var ds2_before = printer.udw("ds2.get " + ds2_value)
var ds2_name = printer.udw("ds2.get_name " + ds2_value)

printer.onShell("-- Assert-related output follows --", "console.log(' '); console.error('ASSERT DETECTED! STOPPING SCRIPT.'); printer.ZTOP()")

function start() {

    out.clear()
    out.clearScriptOutput()
    out.stopScroll()

    console.error("Starting DS2 value duration test script..")
    console.log(" ")
    sift.sleep(2)
    console.warn("Setting DS2: " + ds2_value + ", " + ds2_name)
    var ds2_actualcount = 0
    while (ds2_startcount <= ds2_count) {
        printer.udw("ds2.set " + ds2_value + " " + ds2_actualcount)
        var ds2_status = printer.udw("ds2.get " + ds2_value)
        console.log("DS2 STATUS: " + ds2_status)
        ds2_startcount = ds2_startcount + 1
        ds2_actualcount = ds2_actualcount + 1
        sift.sleep(ds2_time)
    }
    
    sift.sleep(ds2_time)
    console.log(" ")
    console.error("END OF TEST SCRIPT")
    console.warn("Reverting DS2: " + ds2_value + ", " + ds2_name + " to: " + ds2_before)
    printer.udw("ds2.set " + ds2_value + " " + ds2_before)
    var ds2_statusaft = printer.udw("ds2.get " + ds2_value)
    console.log("DS2 STATUS: " + ds2_statusaft)
}

start()