function buildAvailTable(tableData) {
    var atable = "<table>";
    for (i=0; i<tableData.length; i++) {
        atable += "<tr>";
        for (k=0; k<tableData[i].length; k++) {
            atable += "<td>"+tableData[i][k]+"</td>";
        }
        atable += "</tr>";
    }
    atable += "</table>";
    document.getElementById("availTable").innerHTML = atable;
}