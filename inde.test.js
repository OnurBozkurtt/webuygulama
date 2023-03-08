// <!DOCTYPE html>
// <html lang="en">
//   <head>
//     <link
//       rel="stylesheet"
//       href="https://cdn.jsdelivr.net/gh/openlayers/openlayers.github.io@master/en/v6.4.3/css/ol.css"
//       type="text/css"
//     />
//     <link rel="stylesheet" href="main.css" type="text/css" />
//     <script src="https://cdn.jsdelivr.net/gh/openlayers/openlayers.github.io@master/en/v6.4.3/build/ol.js"></script>
//     <script src="https://cdn.jsdelivr.net/npm/elm-pep@1.0.6/dist/elm-pep.js"></script>
//     <script type="text/javascript" src="main.js"></script>
//     <title>Ol Sample</title>
//     <link
//       rel="stylesheet"
//       href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/css/bootstrap.min.css"
//     />
//     <!-- jsPanel CSS -->
//     <link
//       href="https://cdn.jsdelivr.net/npm/jspanel4@4.15.0/dist/jspanel.css"
//       rel="stylesheet"
//     />
//     <!-- jsPanel JavaScript -->
//     <script src="https://cdn.jsdelivr.net/npm/jspanel4@4.15.0/dist/jspanel.js"></script>

//     <!-- optional jsPanel extensions -->
//     <script src="https://cdn.jsdelivr.net/npm/jspanel4@4.15.0/dist/extensions/modal/jspanel.modal.js"></script>
//     <script src="https://cdn.jsdelivr.net/npm/jspanel4@4.15.0/dist/extensions/tooltip/jspanel.tooltip.js"></script>
//     <script src="https://cdn.jsdelivr.net/npm/jspanel4@4.15.0/dist/extensions/hint/jspanel.hint.js"></script>
//     <script src="https://cdn.jsdelivr.net/npm/jspanel4@4.15.0/dist/extensions/layout/jspanel.layout.js"></script>
//     <script src="https://cdn.jsdelivr.net/npm/jspanel4@4.15.0/dist/extensions/contextmenu/jspanel.contextmenu.js"></script>
//     <script src="https://cdn.jsdelivr.net/npm/jspanel4@4.15.0/dist/extensions/dock/jspanel.dock.js"></script>

//     <!--Datatables -->
//     <script src="https://code.jquery.com/jquery-3.6.3.min.js"></script>
//     <link
//       rel="stylesheet"
//       type="text/css"
//       href="https://cdn.datatables.net/v/dt/dt-1.10.20/datatables.min.css"
//     />
//     <script
//       type="text/javascript"
//       src="https://cdn.datatables.net/1.13.2/js/jquery.dataTables.min.js"
//     ></script>
 
//   </head>

//   <body>
//     <div class="menu">
//       <ul>
//         <li><a onclick="addDrawing()" href="#">Add Drawing</a></li>
//         <li>
//           <a id="queryDraw" onclick="queryDrawing()" href="#">Query Drawing</a>
//         </li>
//       </ul>
//     </div>
//     <div id="map" class="map"></div>

//     <div class="row">
//       <div class="col-auto">
//         <span class="input-group">
//           <label class="input-group-text" for="type">Geometry type:</label>
//           <select class="form-select" id="type">
//             <!-- <option value="Point">Point</option> -->
//             <option value="LineString">LineString</option>
//             <!-- <option value="Polygon">Polygon</option> -->
//             <!-- <option value="Circle">Circle</option> -->
//             <option value="None">None</option>
//           </select>
//           <input class="form-control" type="button" value="Undo" id="undo" />
//           <span>&nbsp;&nbsp;</span>
//           <input class="form-control" type="number" id="trackId" value="1" />
//           <button class="form-control" id="fetch">Fetch Track</button>
//         </span>
//       </div>
//     </div>

//     <script>
//       queryDrawing = () => {
//         jsPanel.create({
//           headerTitle: "QueryInfo",
//           theme: "success",
//           content: `<div id="demo_info" class="box"></div>
//         <div id="example_wrapper" class="dataTables_wrapper">
//             <table id="example" class="display dataTable" style="width:100%" aria-describedby="example_info">
//                 <thead>
//                     <tr>
//                         <th class="sorting sorting_asc" tabindex="0" aria-controls="example" rowspan="1" colspan="1"
//                             aria-sort="ascending" aria-label="Update/Delete: activate to sort column descending"
//                             style="width: 131.163px;">Update/Delete</th>
//                         <th class="sorting sorting_asc" tabindex="0" aria-controls="example" rowspan="1" colspan="1"
//                             aria-sort="ascending" aria-label="Id: activate to sort column descending"
//                             style="width: 131.163px;">Id</th>
//                         <th class="sorting sorting_asc" tabindex="0" aria-controls="example" rowspan="1" colspan="1"
//                             aria-sort="ascending" aria-label="UserName: activate to sort column descending"
//                             style="width: 131.163px;">UserName</th>
//                         <th class="sorting" tabindex="0" aria-controls="example" rowspan="1" colspan="1"
//                             aria-label="Number: activate to sort column ascending" style="width: 218.163px;">Number</th>
//                         <th class="sorting" tabindex="0" aria-controls="example" rowspan="1" colspan="1"
//                             aria-label="Coordinates: activate to sort column ascending" style="width: 96.9625px;">
//                             Coordinates</th>
//                 </thead>
//                 <tbody>
                  
//                 </tbody>
//             </table>
      
//         </div>`,
//         });
        

//         //popup for update row
//         //fetch for Update
//         //jspanel for delete row on button click
//         //fetch for delete
//       };
//     </script>

//     <script>
//       document.addEventListener("DOMContentLoaded", () => {
//         initializeMap();
//         addInteraction();
//       });
//     </script>
//   </body>
// </html>
