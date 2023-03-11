//multiple geometry types
//fetch track display
//


// function QueryDraw() {
//     map.addInteraction(query);

//     query.setActive(false);

//     fetch('Api Url', {
//         method: 'GET',
//         body: JSON.stringify({
//             title: 'QueryLineData',
//             body: UserName,
//             number,
//             Coordinates
//         }),
//         headers: {
//             'Content-type': 'application/json; charset=UTF-8',
//             "Access-Control-Allow-Origin": "*"
//         }
//     }).then(function (response) {
//         if (response.ok) {
//             return response.json();
//         }
//         return Promise.reject(response);
//     }).then(function (data) {
//         console.log(data);
//     }).catch(function (error) {
//         console.warn('Something went wrong.', error);
//     });


//     query.on('click',
//         (event) => {
//             console.log(event.target.UserName);
//             query.setActive(true);

//             jsPanel.create({
//                 headerTitle: 'Info',
//                 theme: 'success',
//                 content: `row table`,
//             })
//         })
// }

//add input
// document.getElementById('draw-form').addEventListener('submit', (event) => {
//     event.preventDefault()
//     this.jsPanel({
//         username: document.getElementById('username'),
//         number: document.getElementById('number'),
//         Coordinates: document.getElementById('Coordinates'),
//     })
// })




// queryDrawing = () => {
//     QueryDraw.setActive(true)
// }



// showLine = new ol.layer.Vector({
//    source: vectorSource,
//    format: new ol.format.GeoJSON()
// })

//const Line = new ol.format.GeoJSON().readFeatures(data);

// if (Line.length > 0) {
//     const coordinates = Line.map(function (LineString) {
//         const xy = LineString.getGeometry().getCoordinates();
//         const properties = LineString.getProperties();
//         return [xy[0], xy[1], properties.ele, properties.time];
//     });
// }


// const lineString = new ol.Feature(
//     new ol.geom.LineString(coordinates).transform(
//         "EPSG:4326",
//         map.getView().getProjection()
//     )
// );
// layer.addFeature(lineString);

// var format = new ol.format.WKT();
// LineString = format.writeFeature(data);
// var feature = format.readFeature(LineString, {
//     dataProjection: 'EPSG:4326',
//     featureProjection: 'EPSG:3857',
// });


//track ıd
// document.getElementById("fetch").addEventListener("click", function () {
//         const trackId = document.getElementById("trackId").value;
//         fetch(url + trackId + "trackData"
//         )
//                 .then(function (response) {
//                         return response.text();
//                 })
//                 .then(function (result) {
//                         var points = new ol.geom.Point(result)
//                         if (points.length > 0) {
//                                 const coordinates = points.map(function (point) {
//                                         const xy = point.getGeometry().getCoordinates();
//                                         const properties = point.getProperties();
//                                         return [xy[0], xy[1], properties.ele, properties.time];
//                                 });
//                                 const lineString = new ol.Feature(
//                                         new ol.geom.LineString(coordinates).transform(
//                                                 "EPSG:4326",
//                                                 map.getView().getProjection()
//                                         )
//                                 );
//                                 lineString.setId(trackId);
//                                 vectorSource.addFeature(lineString);
//                                 map.getView().fit(lineString.getGeometry().getExtent());
//                         }
//                 });
// });




// document.getElementById("fetch").addEventListener("click", function () {
//     const trackId = document.getElementById("trackId").value;
//     fetch(url + "trackDraws?id=" + trackId)
//         .then(function (response) {
//             return response.json();
//         })
//         .then(function (result) {
//             const trackData = new ol.geom.LineString(
//                 JSON.parse(result.coordinates)
//             );
//             if (trackData.length > 0) {
//                 trackData.setId(trackId);
//                 vectorSource.addFeature(trackData);
//                 map.getView().fit(trackData.getGeometry().getExtent());
//             }
//         });
// });




 // fetch(url + "trackDraws?id=" + id)
        //     .then(function (response) {
        //         return response.json();
        //     })
        //     .then(function (result) {
        //         var modifyData = new ol.geom.LineString(
        //             JSON.parse(result.coordinates)
        //         );
        //         if (modifyData.length > 0) {
        //             var coordinate = modifyData.map(function (modify) {
        //                 var XY = modify.getGeometry().getCoordinates();
        //                 for (var i = 0; i < XY.length; i++) {
        //                     XY[i]
        //                 }
        //                 return [XY[i]]
        //             })
        //             const lineString = new ol.feature(new ol.geom.LineString(coordinate).transform(
        //                 "EPSG:4326",
        //                 map.getView().getProjection()
        //             ))

        //             lineString.setId(id);
        //             vectorSource.addFeature(lineString);
        //             map.getView().fit(lineString.getGeometry().getExtent());
        //         }

        //         modifyend fetch put?
        //     });




       //  handleClickModify = (id, username, number, coordinates) => {
       //        var features = vector.getSource().getFeatures();
       //        for (let i = 0; i < features.length; i++) {
       //            let item = features[i];
       //            if (item.getId() != id) {
       //                vector.getSource().removeFeature(item);
       //            }
       //        }
      
       //        select.setActive(true);
       //        modify.setActive(true);
       //        select.getFeatures().push(vector.getSource().getFeatureById(id));
      
       //        modify.on('modifyend', function (e) {
       //            var changedFeatures = e.features.getFeatures();
       //            var newFeature = changedFeatures[changedFeatures.length - 1]
      
       //            var data = {
       //                Id: newFeature.id,
       //                username: newFeature.username,
       //                number: newFeature.number,
       //                coordinates: newFeature.getGeometry().getCoordinates(),
       //            }
       //            fetch("https://localhost:7130/api/UpdateDraw?id=" + data.Id, {
       //                method: "PUT",
       //                mode: "cors",
       //                body: JSON.stringify(data),
      
       //                headers: {
       //                    "Access-Control-Allow-Origin": "*",
       //                    "Content-type": "application/json; charset=UTF-8",
       //                },
       //            })
       //                .then(function (response) {
       //                    if (response.ok) {
       //                        console.log(response);
       //                        return response.json();
       //                    }
       //                    return Promise.reject(response);
       //                })
       //                .then(function (data) {
       //                    console.log(data);
       //                })
       //                .catch(function (error) {
       //                    console.warn("Something went wrong.", error);
       //                });
       //        })
       //    };
      