define(["marionette"], function (Marionette) {
    var controller = Marionette.Controller.extend({
        initialize: function (options) {
            this.region = options.region;
            this.model = options.model;
        }
    });

    return controller;
});