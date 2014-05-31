define(["View", "app", "marionette", "backbone", "Base/Events", "Base/Constants"],
        function (View, App, Marionette, Backbone, Events, Constants) {

            var controller = App.Base.Controller.extend({
                initialize: function (options) {
                    App.Base.Controller.prototype.initialize.apply(this, [options]);
                    this.show();
                },

                show: function () {
                    this.region.show(this.getView());
                },

                getView: function () {
                    var view = new View({ model: this.model });
                    return view;
                }
            });
            return controller;
        });