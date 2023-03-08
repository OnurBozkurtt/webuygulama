$(document).ready(function () {
    document.title = "Simple DataTable";
    // DataTable initialisation
    $("#example").DataTable({
        dom: '<"dt-buttons"Bf><"clear">lirtp',
        paging: true,
        autoWidth: true,
        columnDefs: [{ orderable: false, targets: 5 }],
    });
    //Add row button
    $(".dt-add").each(function () {
        $(this).on("click", function (evt) {
            //Create some data and insert it
            var rowData = [];
            var table = $("#example").DataTable();
            var info = table.page.info();
            //fetch all data
            rowData.push(info.recordsTotal + 1);

            //Inserting the buttons ???
            rowData.push(
                '<button type="button" class="btn btn-primary btn-xs dt-edit" style="margin-right:16px;"><span class="glyphicon glyphicon-pencil" aria-hidden="true"></span></button><'
            );
            //Looping over columns is possible
            //var colCount = table.columns()[0].length;
            //for(var i=0; i < colCount; i++){			}

            //INSERT THE ROW
            table.row.add(rowData).draw(false);
            //REMOVE EDIT AND DELETE EVENTS FROM ALL BUTTONS
            $(".dt-edit").off("click");
            $(".dt-delete").off("click");
            //CREATE NEW CLICK EVENTS
            $(".dt-edit").each(function () {
                $(this).on("click", function (evt) {


                    $this = $(this);
                    var dtRow = $this.parents("tr");
                    $("div.modal-body").innerHTML = "";
                    $("div.modal-body").append(
                        "Row index: " + dtRow[0].rowIndex + "<br/>"
                    );
                    $("div.modal-body").append(
                        "Number of columns: " + dtRow[0].cells.length + "<br/>"
                    );
                    for (var i = 0; i < dtRow[0].cells.length; i++) {
                        $("div.modal-body").append(
                            "Cell (column, row) " +
                            dtRow[0].cells[i]._DT_CellIndex.column +
                            ", " +
                            dtRow[0].cells[i]._DT_CellIndex.row +
                            " => innerHTML : " +
                            dtRow[0].cells[i].innerHTML +
                            "<br/>"
                        );
                    }
                    $("#myModal").modal("show");
                });
            });
            $(".dt-delete").each(function () {
                $(this).on("click", function (evt) {
                    $this = $(this);
                    var dtRow = $this.parents("tr");
                    if (confirm("Are you sure to delete this row?")) {
                        //fetch delete
                        var table = $("#example").DataTable();
                        table
                            .row(dtRow[0].rowIndex - 1)
                            .remove()
                            .draw(false);
                    }
                });
            });
        });
    });
    //Edit row buttons
    $(".dt-edit").each(function () {
        $(this).on("click", function (evt) {
            $this = $(this);
            var dtRow = $this.parents("tr");
            $("div.modal-body").innerHTML = "";
            $("div.modal-body").append("Row index: " + dtRow[0].rowIndex + "<br/>");
            $("div.modal-body").append(
                "Number of columns: " + dtRow[0].cells.length + "<br/>"
            );
            for (var i = 0; i < dtRow[0].cells.length; i++) {
                $("div.modal-body").append(
                    "Cell (column, row) " +
                    dtRow[0].cells[i]._DT_CellIndex.column +
                    ", " +
                    dtRow[0].cells[i]._DT_CellIndex.row +
                    " => innerHTML : " +
                    dtRow[0].cells[i].innerHTML +
                    "<br/>"
                );
            }
            $("#myModal").modal("show");
        });
    });
    //Delete buttons
    $(".dt-delete").each(function () {
        $(this).on("click", function (evt) {
            $this = $(this);
            var dtRow = $this.parents("tr");
            if (confirm("Are you sure to delete this row?")) {
                var table = $("#example").DataTable();
                table
                    .row(dtRow[0].rowIndex - 1)
                    .remove()
                    .draw(false);
            }
        });
    });
    $("#myModal").on("hidden.bs.modal", function (evt) {
        $(".modal .modal-body").empty();
    });
});
