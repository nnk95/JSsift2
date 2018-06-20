// code not complete, please do not use.

var count = 0

function script1(count) {

    var nextcfm = confirm("next?")
    if (nextcfm == true) {
    var pcode = printer.udw("ds2.set 65541 ")
    var everything = shell("udws 'ds2.set 65541 '" + count)
        console.warn(everything)
    var stat = printer.udw("ds2.get 65541")
        script3(count)
    }
    else
        script2()
}

function script2(){
    console.log("end")
}

function script3(count) {
    var count = count + 1
    script1(count)
}

script1(count)
