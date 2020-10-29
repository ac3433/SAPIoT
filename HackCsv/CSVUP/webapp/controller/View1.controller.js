sap.ui.define([
		"sap/ui/core/mvc/Controller",
		"sap/ui/model/json/JSONModel"
	],
	/**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
	function (Controller, JSONModel) {
		"use strict";

		var sensorTypeDisplay = false;
		var capabilityDisplay = false;
		var oRes;
		var dRes;
		
		return Controller.extend("ns.CSVUP.controller.View1", {
			onInit: function () {
				//Retrieve devices and set them to a model
			   $.ajax({  
			       type: "GET",  
			       url: "https://csvhackapi-brash-meerkat.cfapps.eu10.hana.ondemand.com/api/v1/resources/devices",  
			       dataType: "json",
			       async: false,
			       success: function(resp){  
			         dRes = resp;
			       },  
			       error: function(e){  
			         alert('Error121212: ' + e);  
			       }  
			     });
				
				oRes = { "devices" : dRes};
				
			//	var oType = { "devices" : [{"id": "b811e91e-6132-4d1d-842f-5b9d69f68fae", "alternateId": "b811e91e-6132-4d1d-842f-5b9d69f68fae", "name": "Bootcamp-Team1", "gatewayId": "2", "creationTimestamp": 1603565323914, "online": false, "authentications": [{"type": "clientCertificate"}], "customProperties": [{"key": "STORE_CONTENT_AS_FILE_AT_EDGE", "value": "e30="}, {"key": "STORE_CONTENT_AS_FILE_AT_EDGE_STATUS", "value": "UNINSTALLED"}], "sensors": [{"id": "45e842d0-bb96-4866-a0d9-e5111879ee33", "alternateId": "45e842d0-bb96-4866-a0d9-e5111879ee33", "name": "Bootcamp-Team1", "deviceId": "b811e91e-6132-4d1d-842f-5b9d69f68fae", "sensorTypeId": "dd3c7650-9650-4770-9882-2a5b8db500bd"}]}, {"id": "6594d795-8c15-418b-9a9f-132383e46be8", "alternateId": "6594d795-8c15-418b-9a9f-132383e46be8", "name": "Bootcamp-Team2", "gatewayId": "2", "creationTimestamp": 1603565455142, "online": true, "authentications": [{"type": "clientCertificate"}], "customProperties": [{"key": "STORE_CONTENT_AS_FILE_AT_EDGE", "value": "e30="}, {"key": "STORE_CONTENT_AS_FILE_AT_EDGE_STATUS", "value": "UNINSTALLED"}], "sensors": [{"id": "df73a9df-3529-4a79-9b8c-9bc4fe963ab0", "alternateId": "df73a9df-3529-4a79-9b8c-9bc4fe963ab0", "name": "Bootcamp-Team2", "deviceId": "6594d795-8c15-418b-9a9f-132383e46be8", "sensorTypeId": "edb44da0-5c04-48c4-a145-298c88ea2a05"}]}, {"id": "7f3814e7-acca-4965-916c-f85b3a7afc1d", "alternateId": "7f3814e7-acca-4965-916c-f85b3a7afc1d", "name": "Bootcamp-Team3", "gatewayId": "2", "creationTimestamp": 1603565498770, "online": false, "authentications": [{"type": "clientCertificate"}], "customProperties": [{"key": "STORE_CONTENT_AS_FILE_AT_EDGE", "value": "e30="}, {"key": "STORE_CONTENT_AS_FILE_AT_EDGE_STATUS", "value": "UNINSTALLED"}], "sensors": [{"id": "07b7298e-2f31-4e6b-b712-9cda0f14dc6b", "alternateId": "07b7298e-2f31-4e6b-b712-9cda0f14dc6b", "name": "Bootcamp-Team3", "deviceId": "7f3814e7-acca-4965-916c-f85b3a7afc1d", "sensorTypeId": "3fd1569c-2078-4ea5-ac6d-2f6ef8675c95"}]}, {"id": "32ffac73-0cbb-4c77-a6c2-cd13a8231bf2", "alternateId": "32ffac73-0cbb-4c77-a6c2-cd13a8231bf2", "name": "Bootcamp-Team4", "gatewayId": "2", "creationTimestamp": 1603565608704, "online": false, "authentications": [{"type": "clientCertificate"}], "customProperties": [{"key": "STORE_CONTENT_AS_FILE_AT_EDGE", "value": "e30="}, {"key": "STORE_CONTENT_AS_FILE_AT_EDGE_STATUS", "value": "UNINSTALLED"}], "sensors": [{"id": "53be8dc8-8a97-49e4-a327-dc49a3e78ddc", "alternateId": "53be8dc8-8a97-49e4-a327-dc49a3e78ddc", "name": "Bootcamp-Team4", "deviceId": "32ffac73-0cbb-4c77-a6c2-cd13a8231bf2", "sensorTypeId": "3b4865c3-0762-4bb3-b038-0822e941e6cb"}]}, {"id": "b2ed6cfb-0ae2-4005-a5c8-a820cb54c4db", "alternateId": "b2ed6cfb-0ae2-4005-a5c8-a820cb54c4db", "name": "Bootcamp-RKW", "gatewayId": "2", "creationTimestamp": 1603569876749, "online": false, "authentications": [{"type": "clientCertificate"}], "customProperties": [{"key": "STORE_CONTENT_AS_FILE_AT_EDGE", "value": "e30="}, {"key": "STORE_CONTENT_AS_FILE_AT_EDGE_STATUS", "value": "UNINSTALLED"}], "sensors": [{"id": "b9f12c6c-680a-4528-b6aa-ae26de00d9ac", "alternateId": "b9f12c6c-680a-4528-b6aa-ae26de00d9ac", "name": "Bootcamp-RKW", "deviceId": "b2ed6cfb-0ae2-4005-a5c8-a820cb54c4db", "sensorTypeId": "81d9d854-7fcb-4420-8be4-d76db4df4173"}]}]};
				var oModel = new JSONModel(oRes);
				this.getView().setModel(oModel);
			},
			//when the device combo box select, execute this function
			deviceFilterMap : function(oEvent){
				//remove the other combo box if device combo box changes
				if(sensorTypeDisplay){
					this.getView().byId("SensorType").destroy();
					this.getView().byId("Capability").destroy();
					sensorTypeDisplay = false;
				}
				this.getView().byId("btnGenerate").setEnabled(false);
				
				 var deviceObj = this.getView().getModel().getProperty("/devices");
				 
				 //console.log(this.getView().byId("cbxDevice").getValue());
				//manipulate the data of the model based on the device selected choice
				for(var i = 0; i < deviceObj.length; i++){
					if(deviceObj[i].name == this.getView().byId("cbxDevice").getValue()){
						var p = "/devices/"+i+"/sensors";
						// this.getView().byId("cbxSensorType").items.path = p;
						var currentView = this.getView();
						
						//dynamically add combo box of sensortype and capability
						var layout = this.getView().byId("layout0");
						var cbxSensorType = new sap.m.ComboBox(this.getView().createId("SensorType"),{
							items:{
								path: p,
								template: new sap.ui.core.Item({
									key: "{sensorTypeId}",
									text: "{sensorTypeId}"
								})
							},
							//execute function when sensortype is selected
						selectionChange : function(){
							//get capability data
							 var url = currentView.byId("SensorType").getValue();
							var capatabilityRes;
							$.ajax({  
						       type: "GET",  
						       url: "https://csvhackapi-brash-meerkat.cfapps.eu10.hana.ondemand.com/api/v1/resouces/sensortype/"+ url,  
						       dataType: "json",
						       async: false,
						       success: function(resp){  
						       	console.log(resp);
						         capatabilityRes = resp;
						       },  
						       error: function(e){  
						         alert('Error121212: ' + e);  
						       }  
						     });
						     //set new model with capability
						     oRes = { "devices" : dRes,
						     		"capa" : capatabilityRes
						     };
						     
						     var oModel = new JSONModel(oRes);
							currentView.setModel(oModel);
							//create capability combo box
						     var path = "/capa";
						     	var cbxCapability = new sap.m.ComboBox(currentView.createId("Capability"),{
									items:{
										path: path,
										template: new sap.ui.core.Item({
											key: "{name}",
											text: "{name}"
										})
									},
								selectionChange : function(){
									currentView.byId("btnGenerate").setEnabled(true);
								}
								});
						     layout.addContent(cbxCapability.setPlaceholder("Capability"));
						     capabilityDisplay = true;
							}
						});
						layout.addContent(cbxSensorType.setPlaceholder("SensorType"));
						sensorTypeDisplay = true;
						break;
					}
				}
				
			},
			generate : function() {
				var currentView = this.getView();
				var currentCapabilitySelect = currentView.byId("Capability").getValue();
				var currentDeviceSelect = currentView.byId("cbxDevice").getValue();
				var currentSensorSelect = currentView.byId("SensorType").getValue();
				var CapabilityProperty = currentView.getModel().getProperty("/capa");
				
				for(var i = 0; i < CapabilityProperty.length; i++){
					if(CapabilityProperty[i].name == currentCapabilitySelect){
						var property = ["Equipment", "Time"];
						var properties = [];
						for(var j = 0; j < CapabilityProperty[i].properties.length; j++)
						{
							property.push(CapabilityProperty[i].properties[j].name);
						}
						properties.push(property);
						properties.push([currentDeviceSelect]);
						
						let csvContent = "data:text/csv;charset=utf-8," 
    					+ properties.map(e => e.join(",")).join("\n");
    					
    					var encodedUri = encodeURI(csvContent);
						var link = document.createElement("a");
						link.setAttribute("href", encodedUri);
						link.setAttribute("download", "IoTBootcamp3.csv");
						document.body.appendChild(link); // Required for FF
						
						link.click()
					}
				}
				
            },
            
            
			handleUploadComplete: function(oEvent) {
			var sResponse = oEvent.getParameter("response");
			if (sResponse) {
                var sMsg = "";
                console.log(sResponse);
				/*var m = /^\[(\d\d\d)\]:(.*)$/.exec(sResponse);
				if (m[1] == "200") {
					sMsg = "Return Code: " + m[1] + "\n" + m[2] + "(Upload Success)";
					oEvent.getSource().setValue("");
				} else {
					sMsg = "Return Code: " + m[1] + "\n" + m[2] + "(Upload Error)";
				}

				console.log(sMsg);*/
			}
		},

		handleUploadPress: function() {
            var oFileUploader = this.byId("fileUploader");
            
	        var domRef = oFileUploader.getFocusDomRef();
            var file = domRef.files[0];
            var reader = new FileReader();
	        var t = this;
            reader.onload = function(e) {
                var strCSV = e.target.result;
                console.log(strCSV);
            };

            reader.readAsBinaryString(file);
	
	
            //oFileUploader.getSource()
			//oFileUploader.upload();
		}
		});
	});
