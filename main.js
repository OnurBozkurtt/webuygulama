let map, draw, snap, source, layer, query;
let Id, username, number, Coordinates, coordinates;
let typeSelect, vectorSource;
let select, modify, feature;

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
        target: "map",
        layers: [
            new ol.layer.Tile({
                source: new ol.source.OSM(),
            }),
            layer,
            new ol.layer.Vector({
                source: vectorSource,
            }),
        ],
        view: new ol.View({
            center: [3875337.272593909, 4673762.797695817],
            zoom: 7,
        }),
    });

    typeSelect = document.getElementById("type");

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

                vector = new ol.layer.Vector({
                    source: new ol.source.Vector(),

                });
                map.addLayer(vector);

                feature = new ol.Feature({
                    geometry: LineString,
                    name: "LineString",
                    data: data,
                });

                vector.getSource().addFeature(feature);
            }
        })
        .catch(function (error) {
            console.warn("Something went wrong.", error);
        });
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

        jsPanel.create({
            panelSize: {
                width: () => window.innerWidth * 0.21,
                height: "52vh",
            },
            headerTitle: "DrawInfo",
            theme: "1a41c0",
            content: `<form id="form">
            <div>
                    <label class="input-label1">Id</label>
                    <div class="input-box">
                      <input id='drawId' type="number" class="input-1" step="1" readonly placeholder="Id will generate automatically once submitted."/>
                    </div>
                    <label class="input-label1">Username</label>
                    <div class="input-box">
                      <input id='username' type="text" class="input-1" placeholder="UserName"/>
                    </div>
                    <label class="input-label2">Number</label>
                    <div class="input-box">
                      <input id=number type="number" class="input-1" placeholder="Number" 
                      />
                    </div>
                    <label class="input-label3">Coordinates</label>
                    <div class="input-box">
                      <input id="coordinates" class="input-1" placeholder="${Coordinates}" readonly  />
                    </div>
                    <button id="Click1" type="button" class="btn btn-primary ">Button</button>
                    <div/>
                    <form/> `,
        });

        document.getElementById("Click1").addEventListener("click", function (evt) {
            evt.preventDefault();
            username = document.getElementById("username").value;
            number = document.getElementById("number").value;
            Coordinates = event.feature.getGeometry().getCoordinates();

            var data = {
                Id: Id,
                username: username,
                number: number,
                coordinates: JSON.stringify(Coordinates).toString(),
            };
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
                        console.log(response);
                        return response.json();
                    }
                    return Promise.reject(response);
                })
                .then(function (data) {
                    console.log(data);
                })
                .catch(function (error) {
                    console.warn("Something went wrong.", error);
                });
        });
    });

};

queryDrawing = () => {
    jsPanel.create({
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
                        aria-sort="ascending" aria-label="UserName: activate to sort column descending"
                        style="width: 131.163px;">UserName</th>
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

    handleClickModify = (id) => {
        fetch(url + "trackDraws?id=" + id)
            .then(function (response) {
                return response.json();
            })
            .then(function (result) {
                // var modifyData = new ol.geom.LineString(
                //     JSON.parse(result.coordinates)
                // );
                // if (modifyData.length > 0) {
                //     var coordinate = modifyData.map(function (modify) {
                //         var XY = modify.getGeometry().getCoordinates();
                //         for (var i = 0; i < XY.length; i++) {
                //             XY[i]
                //         }
                //         return [XY[i]]
                //     })
                //     const lineString = new ol.feature(new ol.geom.LineString(coordinate).transform(
                //         "EPSG:4326",
                //         map.getView().getProjection()
                //     ))

                //     lineString.setId(id);
                //     vectorSource.addFeature(lineString);
                //     map.getView().fit(lineString.getGeometry().getExtent());
                // }

                if (feature.values_.data[id].id == id) {
                    select.setActive(feature.values_.data[id].coordinates);
                    modify.setActive(feature.values_.data[id].coordinates);
                }
                //modifyend fetch put?
            });
    };

    handleClickUpdate = (id, username, number, coordinates) => {
        jsPanel.create({
            headerTitle: "UpdateRow",
            theme: "1a41c0",
            content: `<form id="form">
                <label class="input-label1">Id</label>
                <div class="input-box">
                  <input id='Id' type="number" class="input-1" step="1" readonly placeholder="${id}"/>
                </div>
                <label class="input-label1">Username</label>
                <div class="input-box">
                  <input id='UpdateUsername' type="text" class="input-1" placeholder="${username}"/>
                </div>
                <label class="input-label2">Number</label>
                <div class="input-box">
                  <input id=UpdateNumber type="number" class="input-1" placeholder="${number}" 
                  />
                </div>
                <label class="input-label3">Coordinates</label>
                <div class="input-box">
                  <input id="coordinates" class="input-1" placeholder="${coordinates}" readonly />
                </div>
                <button id="updateClick" type="button" class="btn btn-primary ">Update</button>
                <form/> `,
        });

        document
            .getElementById("updateClick")
            .addEventListener("click", function () {
                username = document.getElementById("UpdateUsername").value;
                number = document.getElementById("UpdateUsername").value;

                var data = {
                    Id: id,
                    username: username,
                    number: number,
                    coordinates: JSON.stringify(coordinates.toString()),
                };

                fetch("https://localhost:7130/api/UpdateDraw?id=" + data.Id, {
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
                            console.log(response);
                            return response.json();
                        }
                        return Promise.reject(response);
                    })
                    .then(function (data) {
                        console.log(data);
                    })
                    .catch(function (error) {
                        console.warn("Something went wrong.", error);
                    });
            });
    };

    handleClickDelete = (id, username, number, coordinates) => {
        jsPanel.create({
            resizeit: {
                aspectRatio: "content",
            },
            headerTitle: "DeleteRow",
            theme: "DANGER",
            content: `<form id="form">
                <label class="input-label1">Id</label>
                <div class="input-box">
                  <input id='Id' type="number" class="input-1" step="1" readonly placeholder="${id}"/>
                </div>
                <label class="input-label1">Username</label>
                <div class="input-box">
                  <input id='deleteUsername' type="text" class="input-1" placeholder="${username} "/>
                </div>
                <label class="input-label2">Number</label>
                <div class="input-box">
                  <input id=deleteNumber type="number" class="input-1" placeholder="${number} " />
                </div>
                <label class="input-label3">Coordinates</label>
                <div class="input-box">
                  <input id="coordinates" class="input-1" placeholder="${coordinates}" readonly  />
                </div>
                <button onclick=handleFetchDelete('${id}') type="button" class="btn btn-anger ">Delete</button>
                <form/> `,
        });
        handleFetchDelete = () => {
            fetch("https://localhost:7130/api/DeleteDraw?id=" + id, {
                method: "DELETE",
            })
                .then((res) => res.json())
                .then((res) => console.log(res));
        };
    };

    async function displayData(data) {
        let html = "";
        await data.forEach((dataInfo, index, array) => {
            html += "<tr>";
            html += `
                    <td>${dataInfo.id}</td>
                    <td>${dataInfo.username}</td>
                    <td>${dataInfo.number}</td>

                    <td>
                    <div style="
                    display: inline-grid;">
                    <button onclick="handleClickModify('${dataInfo.id}','${dataInfo.username}','${dataInfo.number}','${dataInfo.coordinates}')" id="modifyGeo" type="button" class="btn btn-warning btn-xs dt-Modify"/>Modify  
                    <button onclick="handleClickUpdate('${dataInfo.id}','${dataInfo.username}','${dataInfo.number}','${dataInfo.coordinates}')" id="updateRow" type="button" class="btn btn-primary btn-xs dt-edit"/>Edit 
                    <button onclick="handleClickDelete('${dataInfo.id}','${dataInfo.username}','${dataInfo.number}','${dataInfo.coordinates}')" id="deleteRow" type="button" class="btn btn-danger btn-xs dt-delete"/>Delete
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
                select: {
                    style: "multi",
                },
            });

            var selData = table.rows({ selected: true }).data();
        });
    }
};

addDrawing = () => {
    typeSelect.onchange = function () {
        map.removeInteraction(draw);
        addInteraction();
    };

    document.getElementById("undo").addEventListener("click", function () {
        draw.removeLastPoint();
    });
    draw.setActive(true);
};
