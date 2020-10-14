function generateID() {
    var idcode = '';
    var codeChars = ["0", "1", "2", "3", "4", "5", "6", "7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]
    for (var len=0; len <7; len++) {
        chooseChar = Math.floor(Math.random()*36);
        idcode += codeChars[chooseChar];
    }
    document.getElementById("codeSpace").innerHTML = "ID: " + idcode;
}