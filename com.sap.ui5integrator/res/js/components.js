sap.ui.commons.ApplicationHeader.extend("com.sap.sample.ui5.ApplicationHeader", {
	initDesignStudio: function() {
		this.attachLogoff(function() {
			this.fireDesignStudioEvent("onLogoff");
		});
	},
	renderer: {}
});

sap.ui.commons.ColorPicker.extend("com.sap.sample.ui5.ColorPicker", {
	initDesignStudio: function() {
		this.attachChange(function() {
			this.fireDesignStudioPropertiesChanged(["colorString"]);
			this.fireDesignStudioEvent("onColorChange");
		});
	},
	renderer: {}
});

sap.ui.commons.FormattedTextView.extend("com.sap.sample.ui5.FormattedTextView", {
	initDesignStudio: function() {
	},
	renderer: {}
});

sap.ui.commons.Paginator.extend("com.sap.sample.ui5.Paginator", {
	initDesignStudio: function() {
		this.attachPage(function() {
			this.fireDesignStudioPropertiesChanged(["currentPage"]);
			this.fireDesignStudioEvent("onPageChange");
		});
	},
	renderer: {}
});

sap.ui.commons.ProgressIndicator.extend("com.sap.sample.ui5.ProgressIndicator", {
	initDesignStudio: function() {
	},
	renderer: {}
});

sap.ui.commons.RatingIndicator.extend("com.sap.sample.ui5.RatingIndicator", {
	initDesignStudio: function() {
		this.attachChange(function() {
			this.fireDesignStudioPropertiesChanged(["value"]);
			this.fireDesignStudioEvent("onChange");
		});
	},
	renderer: {}
});

sap.ui.commons.Slider.extend("com.sap.sample.ui5.Slider", {
	initDesignStudio: function() {
		this.attachChange(function() {
			this.fireDesignStudioPropertiesChanged(["value"]);
			this.fireDesignStudioEvent("onChange");
		});
	},
	renderer: {}
});