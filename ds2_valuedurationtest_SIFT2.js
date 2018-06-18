// SIFT2 : DS2 VALUE DURATION TEST SCRIPT
// version 0.2 - 18.06.2018 (Contact: Jason Teo)

// CHANGE THE FOLLOWING :

var ds2_value = 73570
var ds2_count = 600
var ds2_time = 1

// 'value' is for the required ds2 setting.
// 'count' is for the stop set value
// 'time' is for the time delay between 'value' in seconds





var ds2_startcount = 0
printer.promptAll()
sift.mSleep(10)
printer.setConnection("X:")

function start() {

    var ds2_actualcount = 0
    var ds2_newtime = ds2_time / 2
    while (ds2_startcount <= ds2_count) {
        printer.udw("ds2.set " + ds2_value + " " + ds2_actualcount)
        sift.sleep(ds2_newtime)
        var ds2_status = printer.udw("ds2.get " + ds2_value)
        console.log("DS2 STATUS: " + ds2_status)
        ds2_startcount = ds2_startcount + 1
        ds2_actualcount = ds2_actualcount + 1
        sift.sleep(ds2_newtime)
    }
    
}

start()