let map, draw, snap, source, layer, query;
let Id, Name, number, Coordinates, coordinates;
let typeSelect, vectorSource, vector;
let select, modify, feature, getDraw;

const url = "https://localhost:7130/api/";

initializeMap = () => {

    vectorSource = new ol.source.Vector();

    select = new ol.interaction.Select({
        wrapX: false
    })
    modify = new ol.interaction.Modify({
        features: select.getFeatures(),
    })
    source = new ol.source.Vector({ wrapX: false });

    layer = new ol.layer.Vector({
        source: source,
    });


    map = new ol.Map({
        layers: [
            new ol.layer.Tile({
                source: new ol.source.OSM(),
            }),
            new ol.layer.Vector({
                source: vectorSource,
            }),
            new ol.layer.Tile({
                extent: [-13884991, 2870341, -7455066, 6338219],
                source: new ol.source.TileWMS({
                    url: 'https://ahocevar.com/geoserver/wms',
                    params: { 'LAYERS': 'topp:states', 'TILED': true },
                    serverType: 'geoserver',
                    transition: 0,
                }),
            }),
        ],
        target: "map",
        view: new ol.View({
            center: [3875337.272593909, 4673762.797695817],
            zoom: 7,
        }),
    });

    vector = new ol.layer.Vector({
        source: new ol.source.Vector(),

    });

    map.addLayer(vector);

    typeSelect = document.getElementById("type");

    getDraw = () => {
        fetch(url + "GetDraws", {
            method: "GET",
            mode: "cors",
            headers: {
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*",
                "Content-type": "application/json; charset=UTF-8",
            },
        })
            .then(function (response) {
                if (response.ok) {
                    return response.json();
                }
                return Promise.reject(response);
            })
            .then(function (data) {
                console.log(data);

                for (var i = 0; i < data.length; i++) {
                    var LineString = new ol.geom.LineString(
                        JSON.parse(data[i].coordinates)
                    );

                    feature = new ol.Feature({
                        geometry: LineString,
                        name: "LineString",
                        data: data,
                    });

                    feature.setId(data[i].id);

                    vector.getSource().addFeature(feature);
                }
            })
            .catch(function (error) {
                console.warn("Something went wrong.", error);
            });
    }
    getDraw();
};

addInteraction = () => {
    const value = typeSelect.value;
    if (value !== "None") {
        draw = new ol.interaction.Draw({
            source: source,
            type: typeSelect.value,
        });
        map.addInteraction(draw);
    }

    map.addInteraction(draw);
    snap = new ol.interaction.Snap({ source: source });
    map.addInteraction(snap);

    map.addInteraction(select);
    map.addInteraction(modify);

    select.setActive(false);
    modify.setActive(false);
    draw.setActive(false);

    draw.on("drawend", (event) => {
        console.log(event.feature.getGeometry().getCoordinates());
        Coordinates = event.feature.getGeometry().getCoordinates();
        draw.setActive(false);

        var panel = jsPanel.create({
            panelSize: {
                width: () => window.innerWidth * 0.1,
                height: "50vh",

            },
            headerTitle: "DrawInfo",
            theme: "1a41c0",
            content: ` <form name="RegForm" id="form" method="post">
            <div>
              <label class="input-label1">Name</label>
              <div class="input-box">
                <input id='Name' type="text" class="input-1" required  placeholder="Name" />
              </div>
            
        
              <label class="input-label2">Number</label>
              <div class="input-box">
                <input id=number type="text" class="input-1"  step="0.01" required  placeholder="Number" />
              </div>
        
              <label class="input-label3">Coordinates</label>
              <div class="input-box">
                <textarea id="coordinates" class="textarea-1" placeholder="${Coordinates}" readonly></textarea>
              </div>
              <button id="Click1" type="button" class="btn-primary1">Button</button>
              <div />
              <form /> `,
            position: "center",
        });

        function validateForm() {
            var name =
                document.forms.RegForm.Name.value;
            var number =
                document.forms.RegForm.number.value;
            var regName = /[^a-zA-Z]+/g;
            var regnumber = /[^0-9]+/g;

            if (name == "" || regName.test(name)) {
                Toastify({
                    text: "Please enter your name properly",
                    duration: 5000,
                    destination: "https://github.com/apvarun/toastify-js",
                    newWindow: true,
                    close: true,
                    gravity: "top",
                    position: "center",
                    stopOnFocus: true,
                    style: {
                        background: 'linear-gradient(to right, #870000, #190a05)'
                    },
                }).showToast();
                return false;
            }

            if (number == "" || regnumber.test(number)) {
                Toastify({
                    text: "Please enter your number properly",
                    duration: 5000,
                    destination: "https://github.com/apvarun/toastify-js",
                    newWindow: true,
                    close: true,
                    gravity: "top",
                    position: "center",
                    stopOnFocus: true,
                    style: {
                        background: 'linear-gradient(to right, #870000, #190a05)'
                    },
                }).showToast();
                return false;
            }

            return true;
        }
        document.getElementById("Click1").addEventListener("click", function (evt) {
            evt.preventDefault();

            Name = document.getElementById("Name").value;
            number = document.getElementById("number").value;
            Coordinates = event.feature.getGeometry().getCoordinates();

            var data = {
                Id: Id,
                Name: Name,
                number: number,
                coordinates: JSON.stringify(Coordinates).toString(),
            };

            if (validateForm() == true) {
                fetch(url + "SendDraw", {
                    method: "POST",
                    mode: "cors",
                    body: JSON.stringify(data),

                    headers: {
                        "Access-Control-Allow-Origin": "*",
                        "Content-type": "application/json; charset=UTF-8",
                    },
                })
                    .then(function (response) {
                        if (response.ok) {
                            panel.close();
                            Toastify({
                                text: "Draw added successfully",
                                duration: 5000,
                                destination: "https://github.com/apvarun/toastify-js",
                                newWindow: true,
                                close: true,
                                gravity: "top",
                                position: "right",
                                stopOnFocus: true,
                                style: {
                                    background: 'linear-gradient(90deg, rgba(0,71,4,1) 0%, rgba(9,121,24,1) 45%, rgba(0,255,68,1) 100%)'
                                },
                            }).showToast();
                            vector.removeFeature(data.coordinates)
                            console.log(response);

                            return response.json();

                        } else {
                            Toastify({
                                text: "Something went wrong. Please try again",
                                duration: 5000,
                                destination: "https://github.com/apvarun/toastify-js",
                                newWindow: true,
                                close: true,
                                gravity: "top",
                                position: "right",
                                stopOnFocus: true,
                                style: {
                                    background: 'linear-gradient(to right, #870000, #190a05)'
                                },
                            }).showToast();
                        }
                        return Promise.reject(response);
                    })
                    .then(function (data) {
                        getDraw();
                        console.log(data);
                    })
                    .catch(function (error) {
                        console.log(error)
                    });
            }

        });
    });

};

queryDrawing = () => {
    let panel = jsPanel.create({
        panelSize: {
            width: () => window.innerWidth * 0.7,
            height: "68vh",
        },
        headerTitle: "QueryInfo",
        theme: "success",
        content: `<div id="demo_info" class="box"></div>
    <div id="example_wrapper" class="dataTables_wrapper">
        <table id="example" class="display dataTable" style="width:100% heigth:300%" aria-describedby="example_info">
            <thead>
                <tr>
              
                    <th class="sorting sorting_asc" tabindex="0" aria-controls="example" rowspan="1" colspan="1"
                        aria-sort="ascending" aria-label="Id: activate to sort column descending"
                        style="width: 131.163px;">Id</th>
                    <th class="sorting sorting_asc" tabindex="0" aria-controls="example" rowspan="1" colspan="1"
                        aria-sort="ascending" aria-label="Name: activate to sort column descending"
                        style="width: 131.163px;">Name</th>
                    <th class="sorting" tabindex="0" aria-controls="example" rowspan="1" colspan="1"
                        aria-label="Number: activate to sort column ascending" style="width: 218.163px;">Number</th>
                 
                        <th class="sorting sorting_asc" tabindex="0" aria-controls="example" rowspan="1" colspan="1"
                        aria-sort="ascending" aria-label="Update: activate to sort column descending"
                        style="width: 131.163px;">Operations</th>
                       
            </thead>
            <tbody>
              
            </tbody>
        </table>
  
    </div>`,
    });
    fetch("https://localhost:7130/api/QueryDraws", {
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
        "Content-type": "application/json; charset=UTF-8",
    })
        .then((res) => res.json())
        .then((data) => {
            console.log("data", data);
            displayData(data);
        });


    handleClickModify = (id, name, number, coordinates) => {
        panel.close();
        select.setActive(true);
        modify.setActive(true);

        // select.getFeatures().clear();
        // vector.getSource().clear();
        // vector.getSource().addFeature(feature);
        var Features = vector.getSource().getFeatures();
        for (let i = 0; i < Features.length; i++) {
            let item = Features[i];
            if (item.getId() != parseInt(id)) {
                vector.getSource().removeFeature(item);
                // select.getFeatures().push(vector.getSource().getFeatureById(id));
            }
        }
        console.log(vector.getSource().getFeatureById(id).getGeometry().getCoordinates());
        map.getView().setCenter(ol.extent.getCenter(vector.getSource().getFeatureById(id).getGeometry().getExtent()));
        map.getView().setZoom(8);


        modify.on('modifyend', function (e) {
            // select.getFeatures().clear();
            // vector.getSource().clear();
            // vector.getSource().addFeature(feature);
            let modifyCoordinates = e.features.getArray()[0].getGeometry().getCoordinates();
            select.getFeatures().clear();
            select.setActive(false);
            modify.setActive(false);
            select.getFeatures().clear();
            var panelmodify = jsPanel.create({
                panelSize: {
                    width: () => window.innerWidth * 0.21,
                    height: "60vh",

                },
                headerTitle: "ModifyLine",
                theme: "SUCCESS",
                content: `<form name="RegForm" id="form-modify" method="put">
                    <label class="input-label1">Id</label>
                    <div class="input-box">
                      <input id='Idmodif' type="number" class="input-1" step="1" readonly value="${id}">
                    </div>
                    <label class="input-label1">Name</label>
                    <div class="input-box">
                      <input id="modifName" type="text" class="input-1" value="${name}">
                    </div>
                    <label class="input-label2">Number</label>
                    <div class="input-box">
                      <input id="modifnumber" type="number"  step="0.01" class="input-1" value="${number}">
                    </div>
                    <label class="input-label3">Coordinates</label>
                    <div class="input-box">
                      <textarea id="modifcoordinates" class="textarea-1" readonly >${modifyCoordinates}</textarea>
                    </div>
                    <button id="modifybtn" type="button" class="btn-primary1 ">Modify</button>
                    <form/> `,
            });

            document.getElementById("modifybtn").addEventListener("click", function () {
                let id = document.getElementById("Idmodif").value;
                let Name = document.getElementById("modifName").value;
                let number = document.getElementById("modifnumber").value;

                if (validateForm(Name, number) == true) {

                    var data = {
                        Id: id,
                        Name: Name,
                        number: number,
                        coordinates: JSON.stringify(modifyCoordinates).toString()
                    }

                    fetch("https://localhost:7130/api/UpdateDraw?id=" + id, {
                        method: "PUT",
                        body: JSON.stringify(data),

                        headers: {
                            "Access-Control-Allow-Origin": "*",
                            "Content-type": "application/json; charset=UTF-8",
                        },
                    })
                        .then(function (response) {
                            if (response.ok) {
                                Toastify({
                                    text: "Line modified successfully",
                                    duration: 5000,
                                    destination: "https://github.com/apvarun/toastify-js",
                                    newWindow: true,
                                    close: true,
                                    gravity: "top",
                                    position: "right",
                                    stopOnFocus: true,
                                    style: {
                                        background: 'linear-gradient(90deg, rgba(0,71,4,1) 0%, rgba(9,121,24,1) 45%, rgba(0,255,68,1) 100%)'
                                    },
                                }).showToast();
                                console.log(response);
                                panelmodify.close();

                                var oldFeatures = vector.getSource().getFeatures();

                                for (let i = 0; i < oldFeatures.length; i++) {
                                    let item = oldFeatures[i];

                                    vector.getSource().removeFeature(item);
                                    // select.getFeatures().push(vector.getSource().getFeatureById(id));

                                }
                                // select.getFeatures().clear();
                                // vector.getSource().removeFeature(feature);

                                // var selectCollection = select.getFeatures().push(vector.getSource().getFeatureById(id));
                                // if (selectCollection.length > 0) {

                                //     vector.getSource().removeFeature(selectCollection.item(0));
                                // }

                                // modify.getFeatures().push(vector.getSource().removeFeature());
                                // select.getFeatures().push(vector.getSource().clear());

                                return response.json();
                            } else {
                                Toastify({
                                    text: "Modify is not successful. Please try again. ",
                                    duration: 5000,
                                    destination: "https://github.com/apvarun/toastify-js",
                                    newWindow: true,
                                    close: true,
                                    gravity: "top",
                                    position: "right",
                                    stopOnFocus: true,
                                    style: {
                                        background: 'linear-gradient(to right, #870000, #190a05)'
                                    },
                                }).showToast();

                            }
                            return Promise.reject(false);
                        })
                        .then(data => {

                            for (var i = 0; i < data.length; i++) {
                                var LineString = new ol.geom.LineString(
                                    JSON.parse(data[i].coordinates)
                                );

                                var newFeature = new ol.Feature({
                                    geometry: LineString,
                                    name: "LineString",
                                    data: data[i],
                                });

                                newFeature.setId(data[i].id);

                                vector.getSource().addFeature(newFeature);
                            }
                        })
                        .catch(function (error) {
                            console.warn("Something went wrong.", error);
                        });
                }

            })


        })
    };

    handleClickUpdate = (id, name, number, coordinates) => {
        var panel = jsPanel.create({
            panelSize: {
                width: () => window.innerWidth * 0.1,
                height: "60vh",
            },
            headerTitle: "UpdateRow",
            theme: "1a41c0",
            content: `<form name="RegForm" id="form" method="put">
                <label class="input-label1">Id</label>
                <div class="input-box">
                  <input id='Id' type="number" class="input-1"  step="1" readonly placeholder="${id}"/>
                </div>
                <label class="input-label1">Name</label>
                <div class="input-box">
                  <input id='Updatename' type="text" class="input-1" value="${name}" placeholder="${name}"/>
                </div>
                <label class="input-label2">Number</label>
                <div class="input-box">
                  <input id=UpdateNumber type="number" class="input-1"  step="0.01" value="${number}" placeholder="${number}" 
                  />
                </div>
                <label class="input-label3">Coordinates</label>
                <div class="input-box">
                <textarea id="coordinates" class="textarea-1" placeholder="${coordinates}" readonly  ></textarea>
                </div>
                <button id="updateClick" type="button" class="btn-primary1">Update</button>
                <form/> `,
        });



        document
            .getElementById("updateClick")
            .addEventListener("click", function () {
                let name = document.getElementById("Updatename").value;
                let number = document.getElementById("UpdateNumber").value;
                if (validateForm(Name, number) == true) {

                    var data = {
                        Id: id,
                        Name: name,
                        number: number,
                        coordinates: JSON.stringify(coordinates.toString()),
                    };

                    fetch("https://localhost:7130/api/Update?id=" + data.Id, {
                        method: "PUT",
                        mode: "cors",
                        body: JSON.stringify(data),

                        headers: {
                            "Access-Control-Allow-Origin": "*",
                            "Content-type": "application/json; charset=UTF-8",
                        },
                    })
                        .then(function (response) {
                            if (response.ok) {
                                panel.close();
                                Toastify({
                                    text: "Row updated successfully",
                                    duration: 5000,
                                    destination: "https://github.com/apvarun/toastify-js",
                                    newWindow: true,
                                    close: true,
                                    gravity: "top",
                                    position: "right",
                                    stopOnFocus: true,
                                    style: {
                                        background: 'linear-gradient(90deg, rgba(0,71,4,1) 0%, rgba(9,121,24,1) 45%, rgba(0,255,68,1) 100%)'
                                    },
                                }).showToast();
                                console.log(response);
                                return response.json();
                            } else {
                                Toastify({
                                    text: "Row is not updated successfully. Please try again.",
                                    duration: 5000,
                                    destination: "https://github.com/apvarun/toastify-js",
                                    newWindow: true,
                                    close: true,
                                    gravity: "top",
                                    position: "right",
                                    stopOnFocus: true,
                                    style: {
                                        background: 'linear-gradient(to right, #870000, #190a05)'
                                    },
                                }).showToast();
                            }
                            return Promise.reject(response);
                        })
                        .then(function (data) {
                            console.log(data);
                        })
                        .catch(function (error) {

                            console.warn("Something went wrong.", error);
                        });
                }
            });
    };

    handleClickDelete = (id, name, number, coordinates) => {
        var panel = jsPanel.create({
            panelSize: {
                width: () => window.innerWidth * 0.1,
                height: "60vh",
            },
            headerTitle: "DeleteRow",
            theme: "DANGER",
            content: `<form id="form">
                <label class="input-label1">Id</label>
                <div class="input-box">
                  <input id='Id' type="number" class="input-1"  step="1" readonly placeholder="${id}"/>
                </div>
                <label class="input-label1">Name</label>
                <div class="input-box">
                  <input id='deleteName' type="text" class="input-1" readonly placeholder="${name} "/>
                </div>
                <label class="input-label2">Number</label>
                <div class="input-box">
                  <input id=deleteNumber type="number" class="input-1" readonly step="0.01" placeholder="${number} " />
                </div>
                <label class="input-label3">Coordinates</label>
                <div class="input-box">
                <textarea id="coordinates" class="textarea-1" placeholder="${coordinates}" readonly  ></textarea>
                </div>
                <button onclick=handleFetchDelete('${id}') type="button" class="btn-primary2">Delete</button>
                <form/> `,
        });
        handleFetchDelete = () => {
            fetch("https://localhost:7130/api/DeleteDraw?id=" + id, {
                method: "DELETE",
            })
                .then(function (response) {
                    if (response.ok) {
                        panel.close();
                        Toastify({
                            text: "Row Deleted successfully",
                            duration: 5000,
                            destination: "https://github.com/apvarun/toastify-js",
                            newWindow: true,
                            close: true,
                            gravity: "top",
                            position: "right",
                            stopOnFocus: true,
                            style: {
                                background: 'linear-gradient(90deg, rgba(0,71,4,1) 0%, rgba(9,121,24,1) 45%, rgba(0,255,68,1) 100%)'
                            },
                        }).showToast();
                        console.log(response);
                        return response.json();
                    } else {
                        Toastify({
                            text: "Row is not deleted successfully. Please try again.",
                            duration: 5000,
                            destination: "https://github.com/apvarun/toastify-js",
                            newWindow: true,
                            close: true,
                            gravity: "top",
                            position: "right",
                            stopOnFocus: true,
                            style: {
                                background: 'linear-gradient(to right, #870000, #190a05)'
                            },
                        }).showToast();
                    }
                    return Promise.reject(response);
                })
                .then(function (data) {
                    console.log(data);
                })
                .catch(function (error) {

                    console.warn("Something went wrong.", error);
                });
        };
    };

    function validateForm(Name, number) {

        var regName = /[^a-zA-Z]+/g;
        var regnumber = /[^0-9]+/g;

        if (Name == "" || regName.test(Name)) {
            Toastify({
                text: "Please enter your name properly",
                duration: 5000,
                destination: "https://github.com/apvarun/toastify-js",
                newWindow: true,
                close: true,
                gravity: "top",
                position: "center",
                stopOnFocus: true,
                style: {
                    background: 'linear-gradient(to right, #870000, #190a05)'
                },
            }).showToast();
            return false;
        }

        if (number == "" || regnumber.test(number)) {
            Toastify({
                text: "Please enter your number properly",
                duration: 5000,
                destination: "https://github.com/apvarun/toastify-js",
                newWindow: true,
                close: true,
                gravity: "top",
                position: "center",
                stopOnFocus: true,
                style: {
                    background: 'linear-gradient(to right, #870000, #190a05)'
                },
            }).showToast();
            return false;
        }

        return true;
    }


    async function displayData(data) {
        let html = "";
        await data.forEach((dataInfo, index, array) => {
            html += "<tr>";
            html += `
                    <td>${dataInfo.id}</td>
                    <td>${dataInfo.name}</td>
                    <td>${dataInfo.number}</td>

                    <td>
                    <div style="
                    display: inline-grid;">
                    <button onclick="handleClickModify('${dataInfo.id}','${dataInfo.name}','${dataInfo.number}','${dataInfo.coordinates}')" id="modifyGeo" type="button" class="btn btn-warning btn-xs dt-Modify"/>Modify  
                    <button onclick="handleClickUpdate('${dataInfo.id}','${dataInfo.name}','${dataInfo.number}','${dataInfo.coordinates}')" id="updateRow" type="button" class="btn btn-primary btn-xs dt-edit"/>Edit 
                    <button onclick="handleClickDelete('${dataInfo.id}','${dataInfo.name}','${dataInfo.number}','${dataInfo.coordinates}')" id="deleteRow" type="button" class="btn btn-danger btn-xs dt-delete"/>Delete
                    <div/>
                    </td>
                    `;
            html += "</tr>";
        });
        document.querySelector("tbody").innerHTML = await html;
        //
        $(document).ready(function () {
            var table = $("#example").DataTable({
                responsive: true,
                // select: {
                //     style: "multi",
                // },
            });

            // var selData = table.rows({ selected: true }).data();
        });
    }
};

addDrawing = () => {
    typeSelect.onchange = function () {
        map.removeInteraction(draw);
        addInteraction();
    };

    draw.setActive(true);
};
