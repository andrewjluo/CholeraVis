// Based on http://bl.ocks.org/d3noob/473f0cf66196a008cf99

// The table generation function
function tabulate(data, columns) {
    var table = d3.select("body").select("#main_table_v").append("table"),
        colgroup = table.append("colgroup"),
        thead = table.append("thead"),
        tbody = table.append("tbody");
    
    // add each column
    for (var i=1; i<=4; i++) {
        var col = colgroup.append("col");
        col.attr("id", "main_table_v_col" + i);
    }
    
    // append the header row
    thead.append("tr")
        .selectAll("th")
        .data(columns)
        .enter()
        .append("th")
            .text(function(column) { return column; });
            
    // create a row for each object in the data
    var rows = tbody.selectAll("tr")
        .data(data)
        .enter()
        .append("tr");
        
    // create a cell in each row for each column
    var cells = rows.selectAll("td")
        .data(function(row) {
            return columns.map(function(column) {
                return {column: column, value: row[column.toLowerCase()]};
            });
        })
        .enter()
        .append("td")
            .html(function(d) { return d.value; });
    
    return table;
}

(function() {
// render the table
d3.csv("static/fakedata/table_data.csv", function(error, dataset) {
    dataset.forEach(function(d) {});
    console.log(dataset);
    var peopleTable = tabulate(dataset, ["District", "Subdistrict", "Difference", "Updated"]);
});
}).call(this);
