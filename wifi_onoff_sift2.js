// SIFT2 : WIFI ON / OFF SCRIPT
// version 1.4 - 30.05.2018 (Contact: Jason Teo)
// ENABLE: Sirius on Linux (Commands tab)
// CHANGE THE FOLLOWING (optional)

    var maxcount = "1"
// Change this for the script to stop at once count reached  

    var SSID = "TP-Link_2.4Ghz"
    var password = "1234567890"

    var usesetting = "0"
// Change this to 1 if you intend to use the above WIFI settings

// DONT CHANGE ANYTHING ELSE BELOW





// Global Variable declarations
var count = 0
var tap_continue = 0
var errorcode = 0
var onmode = printer.udw("sm.on_off_status")
var printerstatus = printer.udw("ds2.get 65541")
var printer_firmware1 = printer.udw("fwup.get_fw_rev")
var printer_firmware2 = printer.firmwareRev()
var printer_rev = rev()
var printer_serial = printer.serialNumber()
var epochstart = printer.udw("timer.date_get_int")
var epochbreak = 0
var datestart = printer.udw("timer.date_get")
var datearraystart = datestart.split(', ')
var yearstart = datearraystart[5]
var monthstart = datearraystart[4]-1
var daystart = datearraystart[3]
var hourstart = Number(datearraystart[2])
var temp1start = Number(datearraystart[6])
var hoursstart = hourstart+temp1start
var minutestart = datearraystart[1]
var secondstart = datearraystart[0]
var monthsstart = ["Jan","Feb","Mar","Apr","May","June","July","Aug","Sept","Oct","Nov","Dec"]

printer.onShell("-- Assert-related output follows --", "stopscript(errorcode = 5)")

// Start Script
function start_script() {
    var stagecount = 1
    out.clear()
    out.clearScriptOutput()
    out.stopScroll()
    printer.promptAll()
    printer.setConnection("X:")
    printer.udw("smgr_init.auto_reboot_on_assert 3")
    var epoch = printer.udw("timer.date_get_int")
    out.stopScroll()
    printer.setConnection("#:")
    linux("date")
    printer.setConnection("X:")
    print("Printer firmware is: " + printer_firmware1 + " , " + printer_firmware2)
    console.log(printer_rev + "}")
    print("Printer serial number: " + printer_serial)
    console.info("Printer Status Code: " + printerstatus)
    console.warn("Script stage: " + stagecount)
    print("Start time: " + epochstart)
    console.log("Started on: " + daystart + " " + monthsstart[monthstart] + " " + yearstart + " , " + hoursstart + " : " + minutestart + " : " + secondstart)
    console.log(" ")
    console.warn("Script Loaded and Ready..")
    console.warn("Please start script when ready.")

//    printer.onShell("linux(text) commands are available only for Sirius on Linux option", "stopscript(errorcode=7)")

    var startcfm = confirm("Start script?")
    if (startcfm == true) {
   //     tap(4)
   //     var tap_reset = prompt("Enter TAP code for: CHANGE ALL NETWORKING VALUES TO DEFAULT VALUES")
   //     var tap_disable = prompt("Enter TAP code for: DISABLE ALL WIRELESS")
   //     var tap_enable = prompt("Enter TAP code for: ENABLE ALL WIRELESS")
   //     var tap_array = [tap_reset, tap_disable, tap_enable]
   //     script_initialize(tap_array)
        script_initialize()
    }
    else
        stopscript(errorcode=3, stagecount)
}

// Initialize other functions
function script_initialize() {
    var stagecount = 2
//function script_initialize(tap_array) {

    out.clear()
    out.clearScriptOutput()
    if (onmode == 1) {
        if (tap_continue != 1) {
        tap_continue = 1
        //      if (tap_array[0] != undefined){
        //      if (tap_array[0] != undefined){                
        //      tap(tap_array[0])
        //        tap(230)
                out.clearScriptOutput()
                out.stopScroll()
        //        console.error("RESETTING NETWORKS")
                var epochbreak = printer.udw("timer.date_get_int")
                var epochdiff = epochbreak-epochstart
                if (maxcount == 0) {
                    console.warn("Script run count: " + count)
                }
                if (maxcount != 0) {
                    console.warn("Script run count: " + count + " of " + maxcount + " times.")
                }
                console.warn("Script run time: " + epochdiff + " seconds.")
                console.warn("Script run stage: " + stagecount + ".")
                console.info("Printer serial: " + printer_serial + ". On firmware: " + printer_firmware1 + " , " + printer_firmware2 + ".")
                console.log(" ")
                console.log(" ")
                console.error(">> INITIALIZING SCRIPT <<")
                console.log(" ")
                sift.sleep(10)
            }
        //    if (tap_array[0] == undefined)
        //        stopscript(errorcode=4)
        }
//        if (printerstatus != 6) {
//            alert("Printer is not idle!")
//            var cfmidle = confirm("Cancel all jobs?")
//                if (cfmidle == true) {
//                    printer.udw("pe_action.cancel -1")
//                    sift.sleep(1)
//                }
////            }
//        else
//            stopscript(errorcode=2)
//            }
    else
        stopscript(errorcode=1, stagecount)
    
    out.clear()
    out.clearScriptOutput()
    out.stopScroll()
    var epochbreak = printer.udw("timer.date_get_int")
    var epochdiff = epochbreak-epochstart
    if (maxcount == 0) {
        console.warn("Script run count: " + count)
    }
    if (maxcount != 0) {
        console.warn("Script run count: " + count + " of " + maxcount + " times.")
    }
    console.warn("Script run time: " + epochdiff + " seconds.")
    console.warn("Script run stage: " + stagecount + ".")
    console.info("Printer serial: " + printer_serial + ". On firmware: " + printer_firmware1 + " , " + printer_firmware2 + ".")
    console.log(" ")
    console.error("Starting Script..")
    console.log(" ")
    sift.sleep(1)
    
    //getinfo(tap_array)
    getinfo(stagecount)
    }

function getinfo(stagecount) {
    var stagecount = stagecount + 1
//function getinfo(tap_array) {

// set printer timeout
console.warn("Script run stage: " + stagecount + ".")
    console.log(" ")
    console.log("Resetting sleep timers to 6000 seconds for the test.")
    console.log(" ")
    printer.udw("smgr_power.set_sleep1_timeout 6000")
    sift.sleep(1)
//    pool2stage(tap_array)
    pool2stage(stagecount)
}

function pool2stage(stagecount) {
    var stagecount = stagecount + 1
//function pool2stage(tap_array) {

// "POOL 2" - stage 1 in scriptrunner
console.warn("Script run stage: " + stagecount + ".")
    console.log(" ")
    console.error("Listing Pools..")
    console.log(" ")
    printer.udw("mem.list_pools")
    console.log(" ")
    console.error("Pools Listed.")
    console.log(" ")
    out.stopScroll()
    sift.sleep(2)

//    wifi_OFF(tap_array)
    wifi_OFF(stagecount)

}

function wifi_OFF(stagecount) {
    var stagecount = stagecount + 1
//function wifi_OFF(tap_array) {    

// "OFF WIFI" - stage 2 in scriptrunner

    out.clear()
    out.clearScriptOutput()
    out.stopScroll()
    var epochbreak = printer.udw("timer.date_get_int")
    var epochdiff = epochbreak-epochstart
    if (maxcount == 0) {
        console.warn("Script run count: " + count)
    }
    if (maxcount != 0) {
        console.warn("Script run count: " + count + " of " + maxcount + " times.")
    }
    console.warn("Script run time: " + epochdiff + " seconds.")
    console.warn("Script run stage: " + stagecount + ".")
    console.info("Printer serial: " + printer_serial + ". On firmware: " + printer_firmware1 + " , " + printer_firmware2 + ".")
    console.log(" ")
    console.error("Setting WIFI to OFF..")
    console.log(" ")
    sift.sleep(1)
//    tap(tap_array[1])
    printer.udw("nca.disable_adaptor 1")

//    printer.onShell("    wlan0 power is 0", "wait_3()")

//    wait_2(tap_array)
    wait_2(stagecount)
}

function wait_3(stagecount) {
    var stagecount = stagecount + 1

    out.stopScroll()
    console.warn("Script run stage: " + stagecount + ".")
    console.log(" ")
    console.error("Detected disabled adaptor.")
    console.log(" ")
    console.error("SIFT waiting 10 seconds for stabilization.")
    console.log(" ")
    sift.sleep(10)

    wifi_ON(stagecount)
}

function wait_2(stagecount) {
    var stagecount = stagecount + 1
//function wait_2(tap_array) {    
// "WAIT 2" - stage 3 in scriptrunner

    out.stopScroll()
    console.warn("Script run stage: " + stagecount + ".")
    console.log(" ")
    console.error("SIFT WAIT 20 SECONDS FOR WIFI DISABLE CONFIRMATION.")
    console.log(" ")
    sift.sleep(20)

//    wifi_ON(tap_array)
    wifi_ON(stagecount)
}

function wifi_ON(stagecount) {
    var stagecount = stagecount + 1
//function wifi_ON(tap_array) {    
// "ON WIFI" - stage 4 in scriptrunner

    out.clear()
    out.clearScriptOutput()
    out.stopScroll()
    var epochbreak = printer.udw("timer.date_get_int")
    var epochdiff = epochbreak-epochstart
    if (maxcount == 0) {
        console.warn("Script run count: " + count)
    }
    if (maxcount != 0) {
        console.warn("Script run count: " + count + " of " + maxcount + " times.")
    }
    console.warn("Script run time: " + epochdiff + " seconds.")
    console.warn("Script run stage: " + stagecount + ".")
    console.info("Printer serial: " + printer_serial + ". On firmware: " + printer_firmware1 + " , " + printer_firmware2 + ".")
    console.log(" ")
    console.error("Setting WIFI back ON..")
    console.log(" ")
    sift.sleep(1)
//    tap(tap_array[2])
    printer.udw("nca.enable_adaptor 1")

//    printer.onShell("    wlan0 power is 1", "wait_4()")

//    wait_1(tap_array)
    wait_1(stagecount)
}

function wait_4(stagecount) {
    var stagecount = stagecount + 1

    out.stopScroll()
    console.warn("Script run stage: " + stagecount + ".")
    console.log(" ")
    console.error("Detected enabled adaptor.")
    console.log(" ")
    console.error(" SIFT waiting 10 seconds for stabilization.")
    console.log(" ")
    sift.sleep(10)

    wifi_scan(stagecount)

}
function wait_1(stagecount) {
    var stagecount = stagecount + 1
//function wait_1(tap_array) {
// "WAIT" - stage 5 in scriptrunner

    out.stopScroll()
    console.warn("Script run stage: " + stagecount + ".")
    console.log(" ")
    console.error("SIFT WAIT 20 SECONDS FOR WIFI ENABLE CONFIRMATION.")
    console.log(" ")
    sift.sleep(20)

//    wifi_scan(tap_array)
    wifi_scan(stagecount)
}

function wifi_scan(usesetting, stagecount) {
    var stagecount = stagecount + 1
//function wifi_scan(tap_array) {
// wifi scan

    if (usesetting == 1) {
        out.clear()
        out.clearScriptOutput()
        out.stopScroll()
        var epochbreak = printer.udw("timer.date_get_int")
        var epochdiff = epochbreak-epochstart
        if (maxcount == 0) {
            console.warn("Script run count: " + count)
        }
        if (maxcount != 0) {
            console.warn("Script run count: " + count + " of " + maxcount + " times.")
        }
        console.warn("Script run time: " + epochdiff + " seconds.")
        console.warn("Script run stage: " + stagecount + ".")
        console.info("Printer serial: " + printer_serial + ". On firmware: " + printer_firmware1 + " , " + printer_firmware2 + ".")
        console.log(" ")
        console.error("Scanning for WIFI channels..")
        console.log(" ")
        sift.sleep(1)
        printer.udw("nca.get_wireless_scan")
        sift.sleep(7)

        wifi_reconnect(usesetting, stagecount)
    }
    else {
//    wifi_reconnect(tap_array)
        script_restart(stagecount)
    }
}

function wifi_reconnect(usesetting, stagecount) {
    var stagecount = stagecount + 1
//function wifi_reconnect(tap_array) {
// Reconnect to given WIFI information
    
    if (usesetting == 1) {
        out.clear()
        out.clearScriptOutput()
        out.stopScroll()
        var epochbreak = printer.udw("timer.date_get_int")
        var epochdiff = epochbreak-epochstart
        if (maxcount == 0) {
            console.warn("Script run count: " + count)
        }
        if (maxcount != 0) {
            console.warn("Script run count: " + count + " of " + maxcount + " times.")
        }
        console.warn("Script run time: " + epochdiff + " seconds.")
        console.warn("Script run stage: " + stagecount + ".")
        console.info("Printer serial: " + printer_serial + ". On firmware: " + printer_firmware1 + " , " + printer_firmware2 + ".")
        console.log(" ")
        console.error("Reconnecting to WIFI network..")
        console.log(" ")
        printer.udw("nca.set_dot11_cfg wlan0 " + SSID + " " + password)
        console.error("SIFT WAIT 20 SECONDS FOR WIFI RECONNECTION.")
        console.log(" ")
        sift.sleep(20)

        wifi_IP(stagecount)
    }
    else {
//    wifi_IP(tap_array)
        wifi_IP(stagecount)
    }
}

function wifi_IP(stagecount) {
    var stagecount = stagecount + 1
//function wifi_IP(tap_array) {
// "CHECK WIFI IP" - stage 6 in scriptrunner

    out.clear()
    out.clearScriptOutput()
    out.stopScroll()
    var epochbreak = printer.udw("timer.date_get_int")
    var epochdiff = epochbreak-epochstart
    if (maxcount == 0) {
        console.warn("Script run count: " + count)
    }
    if (maxcount != 0) {
        console.warn("Script run count: " + count + " of " + maxcount + " times.")
    }
    console.warn("Script run time: " + epochdiff + " seconds.")
    console.warn("Script run stage: " + stagecount + ".")
    console.info("Printer serial: " + printer_serial + ". On firmware: " + printer_firmware1 + " , " + printer_firmware2 + ".")
    console.log(" ")
    console.error("Checking printer WIFI IP..")
    console.log(" ")
    printer.setConnection("#:")
    sift.mSleep(100)
    //var wifiip = printer.shell("ifconfig eth0 | grep 'inet addr:' | cut -d: -f2 | awk '{ print $1}'")
    //console.info("WIFI IP is: " + wifiip)
    printer.shell("ifconfig wlan0 | grep 'inet addr' ")
    linux("ifconfig wlan0 | grep 'inet addr' ")
    sift.mSleep(100)
    printer.setConnection("X:")
    console.log(" ")
    sift.sleep(5)

//    script_restart(tap_array)
    script_restart(stagecount)
}

function script_restart(stagecount) {
    var stagecount = stagecount + 1
//function script_restart(tap_array) {
// restart script
    count = count + 1
    console.info(" ")
    var epochbreak = printer.udw("timer.date_get_int")
    var epochdiff = epochbreak-epochstart
    console.error("Script has run for: " + count + " times, over: " + epochdiff + " seconds.")
    console.info("Printer serial: " + printer_serial + ". On firmware: " + printer_firmware1 + " , " + printer_firmware2 + ".")
    console.log(" ")
    if (maxcount == count) {
        stopscript(errorcode=6, stagecount) }
    else {
    console.log(" ")
    console.error("Restarting Script..")
    console.log(" ")
    sift.sleep(5)
    out.clear()
    out.clearScriptOutput()
    out.stopScroll()

//    script_initialize(tap_array)
    script_initialize() }
    }

function stopscript(errorcode, stagecount) {
    printer.udw("pe_action.cancel -1")
    out.stopScroll()
    printer.setConnection("#:")
    linux("date")
    printer.setConnection("X:")
    out.clear()
    out.clearScriptOutput()
    out.stopScroll()
    var epochbreak = printer.udw("timer.date_get_int")
    var epochdiff = epochbreak-epochstart
    console.error("Stopping Script..")
    console.log(" ")
    console.info("Printer serial: " + printer_serial)
    console.info("Printer firmware: " + printer_firmware1 + " , " + printer_firmware2)
    console.log(printer_rev + "}")
    console.log(" ")
    console.log("Started on: " + daystart + " " + monthsstart[monthstart] + " " + yearstart + " , " + hoursstart + " : " + minutestart + " : " + secondstart)
    var dateerror = printer.udw("timer.date_get")
    var datearrayerror = dateerror.split(', ')
    var yearerror = datearrayerror[5]
    var montherror = datearrayerror[4]-1
    var dayerror = datearrayerror[3]
    var hourerror = Number(datearrayerror[2])
    var temp1error = Number(datearrayerror[6])
    var hourserror = hourerror+temp1error
    var minuteerror = datearrayerror[1]
    var seconderror = datearrayerror[0]
    var monthserror = ["Jan","Feb","Mar","Apr","May","June","July","Aug","Sept","Oct","Nov","Dec"]
    console.log("Stopped on: " + dayerror + " " + monthserror[montherror] + " " + yearerror + " , " + hourserror + " : " + minuteerror + " : " + seconderror)
    console.log(" ")
    if (isNaN(stagecount) == true) {
        console.warn("Script stopped at: RUN COUNT: " + count + ", " + epochdiff + " seconds.")
    }
    else {
    console.warn("Script stopped at: STAGE: " + stagecount + ", RUN COUNT: " + count + ", " + epochdiff + " seconds.")
    }
    console.log(" ")
    console.warn("ERROR CODE: >> " + errorcode + " <<")
    console.info("Printer Status Code: " + printerstatus)
    console.log(" ")
    console.log("ERROR LOG: ")
    console.log(" ")

    if (errorcode == 1) {
    console.error("Printer not detected. Please check printer.")
    console.log(" ")
    }
    if (errorcode == 2) {
    console.error("Printer is not in IDLE mode. Please check printer.")
    console.log(" ")
    }
    if (errorcode == 3) {
    console.error("Script starting cancelled by user.")
    console.log(" ")
    }
    if (errorcode == 4) {
    console.error("No TAP code detected.")
    console.log(" ")
    }
    if (errorcode == 5) {
    printer.ClearWatchers()
    console.error("PRINTER ASSERT DETECTED!") // still unable to implement this yet
    console.log(" ")
    }
    if (errorcode == 6) {
    console.error("MAX count reached of: " + maxcount)
    console.log(" ")
    }
    if (errorcode == 7 ) {
    console.error("SIRIUS ON LINUX NOT ACTIVE.")
    console.log(" ")
    console.error("Please activate option in COMMANDS tab.")
    }

}

start_script()