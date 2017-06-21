
function initParams(param) {
	param.log = [];
	
	param.measures = _.find(param.dims, function(_item) {
        return _item.axis == "COLUMNS" 
            && _item.members.length == param.rs.columnCount;
    });
    
    param.axisRows = _.filter(param.dims, function(_item) {
        return _item.axis == "ROWS";
    });
    
    param.listRowRembers = _.pluck(param.axisRows, "members");
    
    //colKeys: metadata: "axis":"COLUMNS", "members".key
    param.colKeys = _.pluck(param.measures.members, "key");
    //rowKeys: metadata: "axis":"ROWS", "members".key
    param.rowKeys = _.pluck(param.axisRows, "key");
    
    param.descartesData = [];
    //the data will be used in chart which calculate ResultCellSet by descartes logic
    param.chartData = []; 
}

function manipulateBarSeries(_series, param) {
	var _dCategories = param.colKeys;//param.yAxis || param.colKeys;
	
	$.each(_dCategories, function(_idx, _c) {
        var _d = {};
        
        _d.name = _c;
        _d.data = _.pluck(param.chartData, _c);
        
        _series.push(_d);
    });
}//manipulateBarSeries

function manipulateScatterSeries(_series, param) {
	var maxIdx = _.max(_.pluck(param.axisRows, "axis_index"));
    var maxRow = _.find(param.axisRows, function(_r) {
    	return _r.axis_index == maxIdx;
    });
    
    $.each(maxRow.members, function (_idx, _m) {
    	var _s = {};
    	
    	_s.name = _m.key;
    	//_s.xAxis = param.measures.members[0].text;
    	//_s.yAxis = param.measures.members[1].text;
    	_s.data = [];
    	
    	var legendPoints = _.filter(param.chartData, function(_item) {
            return _item[maxRow.key] == _m.key;
        });
    	
    	$.each(legendPoints, function(_idx, _p) {
    		_s.data.push([_p[param.measures.members[0].key], _p[param.measures.members[1].key]]);
    	});
    	
    	_series.push(_s);
    });
}

/**
 *  Descartes algorithm to convert mutiple arrays
 *  [[a, b], [1, 2, 3], ...] -> 
 *  a, 1
 *  a, 2
 *  a, 3
 *  b, 1
 *  b, 2
 *  b, 3
 */    
function calcDescartesRS (_result, _list, _index, _tempRs) {
	if (_index >= _list.length) {
		_result.push(_tempRs);
		return;
	}

	var elm = _list[_index];

	if (!_tempRs)
		_tempRs = [];

	$.each(elm, function (_idx, _item) {
		var newTempRs = _tempRs.slice(0);

        newTempRs.push(_item);

        calcDescartesRS(_result, _list, _index + 1, newTempRs);
	});
};//end calcDescartesRS

//fill the values of each cell in descartes result by manipulating them
// as an object list, which will be used to high chart.
function fillCells(param) {
	$.each(param.descartesData, function (_idx, _rs) {
        var newO = {};
        
        $.each(param.rowKeys, function (_idx, _k) {
            newO[_k] = _rs[_idx].key;
        });
        
        $.each(param.colKeys, function (_idx, _k) {
            var tuple = [_idx];
            
            newTupleOfValue(param, newO, tuple);
            
            newO[_k] = findValueByTuple(param, tuple.slice(0));
        });//loop column keys
        
        param.chartData.push(newO);
    });//loop desc
}//fillCells

//manipulate the tuple against metadata information and it will be used to
//find the actual value of cell in chart data object list.
function newTupleOfValue(param, _newO, _tuple) {
	$.each(param.axisRows, function (_idx, _row) {
        var _m = _row.members;
        var _cellIdx = null;
        
        for (var i = 0; i < _m.length; i++) {
            if (_m[i].key == _newO[_row.key]) {
                _cellIdx = i;
                break;
            }
        }//
        
        _tuple.push(_cellIdx);
    });
}//newTupleOfValue

//find the real value against tuple and data of resultcellset
function findValueByTuple(param, _tuple) {
	//return param.rs.data[_.findIndex(param.rs.tuples, _tuple)];
	for (var i = 0; i < param.rs.tuples.length; i++) {
		if (_.isEqual(param.rs.tuples[i], _tuple)) {
			return param.rs.data[i];
		}
	}
	
	return null;
}//findValueByTuple