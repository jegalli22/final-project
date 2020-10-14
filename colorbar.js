function calcPartitions(numColors) {
    if (numColors <= 1) {
        return [50];
    } else {
        var p = 100 / (numColors-1);
        var splits = []
        for (i=0; i < numColors; i++) {
            splits.push(p*i);
        }
        return splits;
    }
}
function weightColors(p, color1, color2) {
    var p2 = 100-p;
    var r = Math.round((color1[0]*p + color2[0]*p2)/100).toString(16);
    var g = Math.round((color1[1]*p + color2[1]*p2)/100).toString(16);
    var b = Math.round((color1[2]*p + color2[2]*p2)/100).toString(16);
    if (r.length < 2) {
        r = "0" + r;
    }
    if (g.length < 2) {
        g = "0" + g;
    }
    if (b.length < 2) {
        b = "0" + b;
    }
    return "#"+r+g+b;
}
function makeBar(colArray){
    var ctable = "<table><th><td>Best Availability</td></th>";
    for (i=0; i<colArray.length; i++) {
        ctable += "<tr><td style='background-color: " + colArray[i] + "'></td></tr>";
    }
    ctable += "<th><td>Least Availability</td></th></table>";
    document.getElementById("colorbar").innerHTML = ctable;
}
function calcColors(numColors, color1, color2) {
    splits = calcPartitions(numColors);
    colors = [];
    for (k=0; k < numColors; k++) {
        colors.push(weightColors(splits[k], color1, color2))
    }
    makeBar(colors);
}