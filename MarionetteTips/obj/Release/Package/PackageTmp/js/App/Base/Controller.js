define(["marionette"], function (Marionette) {
    var controller = Marionette.Controller.extend({
        initialize: function (options) {
            this.region = options.region;
            this.model = options.model;
            this.listenTo(this.region, "close", this.removeController, this);
        },

        removeController: function () {
            console.log(this);
        }
    });

    return controller;
});