define(["sap/designstudio/sdk/component", "css!../css/component.css"], function(Component, css) {
	Component.subclass("com.pwc.sap.hc.barchart1.BarChart1", function() {

		var that = this;
		
		this._compGobalData = {'key': "", "init": false, "colors": {}};
		
		this._type= "column";
		this._title = "barChart Title",
		this._subtitle= "barChart Title";
		this._titleColor= 'black';
		this._subtitleColor = 'grey';
		this.barchart = null;
        this.subtitle="";
        this._showLegend = true;
        this._showGridlines = 1;
        this._showXAxis = true;
        this._showYAxis = true;
     
        
        this._tooltip = {
    			useHTML : true,
    			headerFormat : '<table>',
    			pointFormat : '<tr><th colspan="2"></th></tr>'
    					+ '<tr><th>{series.name}:</th><td>{point.y}</td></tr>',
    			footerFormat : '</table>',
    			followPointer : true
    		};
        this.init = function() {
        	
    	};
    	
    	this.afterUpdate = function() {
    		var param = {};  //put all the calculation results here
			
    		if (!that.metadata() || that._compGobalData.init)
    			return;
    		
    		that._compGobalData.init = true;
    		
			param.dims = that.metadata().dimensions;
			param.rs = that.dataResultCellSet();
			
			initParams(param);
		    
			/*param.log.push("=============================");
			param.log.push("param.dims: " + JSON.stringify(param.dims));
			param.log.push("=============================");
			param.log.push("param.rs: " + JSON.stringify(param.rs));
			param.log.push("=============================");*/
			
		    calcDescartesRS(param.descartesData, param.listRowRembers, 0);
		    
		    fillCells(param);
		    
		    var _series = [];
    		param.xAxis = that.xAxis() || "ATA2";
    	    param.yAxis = that.yAxis() || "LOGS,MESSAGES";
    	    
    	    var _categories = _.uniq(_.pluck(param.chartData, param.xAxis));
    	    
    	    manipulateBarSeries(_series, param);
    	    
	    	var _chartSettings = {
		        chart: {
		            type: that._barChartType
		        },
		        title: {
		            text: that._title,
		            style:{
	                	color: that._titleColor,
	                	display: that._showTitle
	                }
		        },
		        subtitle: {
		            text: that._subtitle,
		            style:{
	                	color:that._subtitleColor
	                }
		        },
		        xAxis: {
		            categories: _categories,
		            title: {
		                text: that._xAxisTitle,
		                style:{
		                	display: that._showXAxisTitle
		                }
		            },
		            crosshair: true,
		            labels: {
		                enabled: that._showXAxis
		            }
		        },
		        yAxis: {
		            min: 0,
		            gridLineWidth: that._showGridlines,
		            title: {
		                text: that._yAxisTitle,
		                style:{
		                	display: that._showYAxisTitle
		                }
		            },
		            labels: {
		                enabled: that._showYAxis
		            }
		        },
		        legend:{
		        	enabled :that._showlegend
		        },
		        
		        tooltip: that._tooltip,
		        
		        plotOptions: {
		            column: {
		                pointPadding: 0.2,
		                borderWidth: 0
		            },
		            series: {
		                point: {
		                    events: /*this.barEvents || {}*/ {
		                        click: function () {
		                        	var s = _.clone(this.category);
		                        	var idx = this.series.columnIndex;
		                        	var c = that._compGobalData.colors;
		                        	
		                        	if (!c[idx + s]) {
		                        		c[idx + s] = this.color;
		                        		
		                        		this.update({ color: '#f00' });
		                        	} else {
		                        		this.update({ color: c[idx + s] });
		                        		
		                        		c[idx + s] = null;
		                        		
		                        		s = "-1";
		                        	}
		                        	
		                        	that._compGobalData.key = s;
		                        	
		                        	that.afterUpdate(false);
		                        	
		                        	that.firePropertiesChanged(["selectedKeys"]);
		                        	that.fireEvent("onclick");
		                        }
		                    }
		                },
		                dataLabels: {
		                    enabled: true,
		                    y: 0,
		                    formatter: function () {
		                        return Highcharts.numberFormat(this.y, 0, ".", ",");
		                    }
		                }
		            }
		        },
		        series: _series
		    };//end _chartSettings
	    	
	    	var html = "<div id='myContainer'></div>";
	    	that.$().append(html);
		    
	    	that.$("#myContainer").highcharts(_chartSettings);
    	}//afterUpdate
    	
    	this.barChartType= function(value) {
    		if (value === undefined) {
				/*this.barchart = barChart();*/
				return this._barChartType;
			} else {
				value =="Vertical" ? this._barChartType= 'column' :this._barChartType = 'bar';
				/*this.barchart = barChart();*/
				return this;
			}
		};
		
		this.tooltip = function(value) {
    		if (  !value.pointFormat) {
    			return this._tooltip;
    		} else {
    			this._tooltip = value;
    			return this;
    		}
    	};
		
		this.selectedKeys = function(value) {
			if (value === undefined) {
				return that._compGobalData.key;
			} else {
				this._selectedKeys = value;
				return this;
			}
		};
		
		this.xAxis = function(value) {
			if (value === undefined) {
				return this._xAxis;
			} else {
				this._xAxis = value;
				return this;
			}
		};
		
		this.yAxis = function(value) {
			if (value === undefined) {
				return this._yAxis;
			} else {
				this._yAxis = value;
				return this;
			}
		};
		
		this.title = function(value) {
			if (value === undefined) {
				return this._title;
			} else {
				this._title = value;
				return this;
			}
		};
		
		this.showTitle = function( value ){
			if (value === undefined) {
				/*this.barchart = barChart();*/
				return this._showTitle;
			} else {
				value ? this._showTitle = 'block' :this._showTitle = 'none';
				/*this.barchart = barChart();*/
				return this;
			}
		};
		
		this.showlegend = function( value ){
			if (value === undefined) {
				/*this.barchart = barChart();*/
				return this._showlegend;
			} else {
			    this._showlegend = value;
				/*this.barchart = barChart();*/
				return this;
			}
		};
		
		this.showGridlines = function( value ){
			if (value === undefined) {
				/*this.barchart = barChart();*/
				return this._showGridlines;
			} else {
				value ? this._showGridlines = 1 :this._showGridlines = 0;
				/*this.barchart = barChart();*/
				return this;
			}
		};
		
    	
		
		
		
		
		this.showXAxis = function( value ){
			if (value === undefined) {
				/*this.barchart = barChart();*/
				return this._showXAxis;
			} else {
				this._showXAxis = value;
				/*this.barchart = barChart();*/
				return this;
			}
		};
		
		
		
		this.showYAxis = function( value ){
			if (value === undefined) {
				/*this.barchart = barChart();*/
				return this._showYAxis;
			} else {
				this._showYAxis = value;
				/*this.barchart = barChart();*/
				return this;
			}
		};
		
		this.subtitle = function(value) {
			if (value === undefined) {
				return this._subtitle;
			} else {
				this._subtitle = value;
				return this;
			}
		};
		
		
		this.titleColor = function(value) {
			if (value === undefined) {
				return this._titleColor;
			} else {
				this._titleColor = value;
				/*this.barchart = barChart();*/
				return this;
			}
		};
		
		this.subtitleColor = function(value) {
			if (value === undefined) {
				return this._subtitleColor;
			} else {
				this._subtitleColor = value;
				/*this.barchart = barChart();*/
				return this;
			}
		};
		
		this.dataResultCellSet = function(value) {
			try{
				if (value === undefined) {
					return this._dataResultCellSet;
				} else {
					this._dataResultCellSet = value;
					return this;
				}
			}catch(e){
				alert(e);
			}
		};
		
		this.metadata = function(value) {
			try{
				if (value === undefined) {
					return this._metadata;	
				} else {
					this._metadata = value;
					return this;
				}
			}catch(e){
				alert(e);
			}
		};
		
		
		this.getMetadataAsString = function() {
			return JSON.stringify(this.metadata());
		};
		
		this.getResultCellSetString = function() {
			return JSON.stringify(this.dataResultCellSet());
		};
	});	
});
    
