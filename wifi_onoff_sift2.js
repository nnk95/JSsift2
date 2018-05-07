// SIFT2 : WIFI ON / OFF SCRIPT
// version 1 - 04.05.2018 (Contact: Jason Teo)
// ENABLE: Sirius on Linux (Commands tab)
// CHANGE THE FOLLOWING (optional)

    var SSID = "TP-Link_2.4Ghz"
    var password = "1234567890"

// Change this to 1 if you intend to use the above settings

    var usesetting = "0"

// DONT CHANGE ANYTHING ELSE BELOW





// Global Variable declarations

var count = 0
var tap_continue = 0
var errorcode = 0
var onmode = printer.udw("sm.on_off_status")
var printerstatus = printer.udw("ds2.get 65541")

// Start Script
function start_script() {
    out.clear()
    out.clearScriptOutput()
    printer.promptAll()
    printer.setConnection("X:")
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
        stopscript(errorcode=3)
}

// Initialize other functions
function script_initialize() {
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
                console.warn("Script run count: " + count)
                sift.sleep(10)
            }
        //    if (tap_array[0] == undefined)
        //        stopscript(errorcode=4)
        }

        if (printerstatus != 6) {
            alert("Printer is not idle!")
            var cfmidle = confirm("Cancel all jobs?")
                if (cfmidle == true) {
                    printer.udw("pe_action.cancel -1")
                    sift.sleep(1)
                }
//            }
        else
            stopscript(errorcode=2)
            }
    else
        stopscript(errorcode=1)
    
    out.clear()
    out.clearScriptOutput()
    console.error("Starting Script..")
    console.warn("Script run count: " + count)
    sift.sleep(1)
    
    //getinfo(tap_array)
    getinfo()
    }

function getinfo() {
//function getinfo(tap_array) {

// basic printer information

    var printer_firmware = printer.udw("fwup.get_fw_rev")
    var printer_serial = printer.udw("ds2.get_rec_array_str_by_name DSID_SERIAL_NUMBER")
    print("Printer firmware is: " + printer_firmware)
    print("Printer serial number: " + printer_serial)
    printer.udw("smgr_power.set_sleep1_timeout 6000")
    sift.sleep(1)

//    pool2stage(tap_array)
    pool2stage()
}

function pool2stage() {
//function pool2stage(tap_array) {

// "POOL 2" - stage 1 in scriptrunner

    console.error("Listing Pools..")
    printer.udw("mem.list_pools")
    console.error("Pools Listed.")
    out.stopScroll()
    sift.sleep(2)

//    wifi_OFF(tap_array)
    wifi_OFF()

}

function wifi_OFF() {
//function wifi_OFF(tap_array) {    

// "OFF WIFI" - stage 2 in scriptrunner

    out.clear()
    out.clearScriptOutput()
    console.error("Setting WIFI to OFF..")
    console.warn("Script run count: " + count)
    sift.sleep(1)
//    tap(tap_array[1])
    printer.udw("nca.disable_adaptor 1")

//    wait_2(tap_array)
    wait_2()
}

function wait_2() {
//function wait_2(tap_array) {    
// "WAIT 2" - stage 3 in scriptrunner

    out.stopScroll()
    console.error("SIFT WAIT 20 SECONDS FOR WIFI DISABLE.")
    sift.sleep(20)

//    wifi_ON(tap_array)
    wifi_ON()
}

function wifi_ON() {
//function wifi_ON(tap_array) {    
// "ON WIFI" - stage 4 in scriptrunner

    out.clear()
    out.clearScriptOutput()
    console.error("Setting WIFI back ON..")
    console.warn("Script run count: " + count)
    sift.sleep(1)
//    tap(tap_array[2])
    printer.udw("nca.enable_adaptor 1")

//    wait_1(tap_array)
    wait_1()
}

function wait_1() {
//function wait_1(tap_array) {
// "WAIT" - stage 5 in scriptrunner

    out.stopScroll()
    console.error("SIFT WAIT 20 SECONDS FOR WIFI ENABLE.")
    sift.sleep(20)

//    wifi_scan(tap_array)
    wifi_scan()
}

function wifi_scan(usesetting) {
//function wifi_scan(tap_array) {
// wifi scan

    if (usesetting == 1) {
        out.clear()
        out.clearScriptOutput()
        out.stopScroll()
        console.error("Scanning for WIFI channels..")
        console.warn("Script run count: " + count)
        sift.sleep(1)
        printer.udw("nca.get_wireless_scan")
        sift.sleep(7)
    }
    else {
//    wifi_reconnect(tap_array)
        wifi_reconnect()
    }
}

function wifi_reconnect(usesetting) {
//function wifi_reconnect(tap_array) {
// Reconnect to given WIFI information
    
    if (usesetting == 1) {
        out.clear()
        out.clearScriptOutput()
        out.stopScroll()
        console.error("Reconnecting to WIFI network..")
        console.warn("Script run count: " + count)
        printer.udw("nca.set_dot11_cfg wlan0 " + SSID + " " + password)
        console.error("SIFT WAIT 20 SECONDS FOR WIFI RECONNECTION.")
        sift.sleep(20)
    }
    else {
//    wifi_IP(tap_array)
        wifi_IP()
    }
}

function wifi_IP() {
//function wifi_IP(tap_array) {
// "CHECK WIFI IP" - stage 6 in scriptrunner

    out.clear()
    out.clearScriptOutput()
    out.stopScroll()
    console.error("Checking printer WIFI IP..")
    console.warn("Script run count: " + count)
    printer.setConnection("#:")
    sift.mSleep(100)
    //var wifiip = printer.shell("ifconfig eth0 | grep 'inet addr:' | cut -d: -f2 | awk '{ print $1}'")
    //console.info("WIFI IP is: " + wifiip)
    //printer.shell("ifconfig wlan0 | grep 'inet addr' ")
    linux("ifconfig wlan0 | grep 'inet addr' ")
    sift.mSleep(100)
    printer.setConnection("X:")
    sift.sleep(5)

//    script_restart(tap_array)
    script_restart()
}

function script_restart() {
//function script_restart(tap_array) {
// restart script
    console.error("Restarting Script..")
    count = count + 1
    console.info(" ")
    console.error("Script has run for: " + count + " times.")
    sift.sleep(5)
    out.clear()
    out.clearScriptOutput()

//    script_initialize(tap_array)
    script_initialize()
    }

function stopscript(errorcode) {
    printer.udw("pe_action.cancel -1")
    out.clear()
    out.clearScriptOutput()
    out.stopScroll()
    console.error("Stopping Script..")
    console.warn("Script stopped at: " + count + " runs.")
    console.log(" ")
    console.warn("ERROR CODE: " + errorcode)
    console.log(" ")

    if (errorcode == 1)
    console.error("Printer not detected. Please check printer.")
    if (errorcode == 2)
    console.error("Printer is not in IDLE mode. Please check printer.")
    if (errorcode == 3)
    console.error("Script starting cancelled by user.")
    if (errorcode == 4)
    console.error("No TAP code detected.")
}

start_script()