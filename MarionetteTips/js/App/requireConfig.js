requirejs.config({
    baseUrl: "js/App",
    paths: {
        backbone: "../resources/backbone/backbone",
        jquery: "../resources/jquery/jquery",
        json2: "../resources/json2/json2",
        marionette: "../resources/marionette/backbone.marionette",
        underscore: "../resources/underscore/underscore",
        tpl: "../resources/tpl/tpl",
        bootstrap: "../resources/bootstrap/bootstrap",
        syphon: "../resources/backbone/backbone.syphon"
    },

    shim: {
        underscore: {
            exports: "_"
        },
        backbone: {
            deps: ["jquery", "underscore", "json2"],
            exports: "Backbone"
        },
        marionette: {
            deps: ["backbone"],
            exports: "Marionette"
        },
        bootstrap: {
            deps: ["jquery"]
        }
    }
});

var App;
require(["app", "Router", "Base/Constants", "Base/Events", "Base/Controller", "Base/Model", "Base/ItemView", "Base/CompositeView", "Base/Layout", "Base/Collection",
         "Common/Modal/ModalRegion",
         "Model/Country", "Model/Competition", "Model/UserCompetition", "Model/Game", "Model/Team", "Model/Group", "Model/Table", "Model/User",
         "Common/Extensions"],
        function (app, router, constants, events, controller, model, itemView, compositeView, layout, collection,
                  ModalRegion) {
    App = app;
    App.Base = {};
    App.Base.Constants = constants;
    App.Base.Events = events;
    App.Base.Controller = controller;
    App.Base.Model = model;
    App.Base.Collection = collection;
    App.Base.ItemView = itemView;
    App.Base.CompositeView = compositeView;
    App.Common = App.Common || {}
    App.Common.Region = App.Common.Region || {}
    App.Common.Region.ModalRegion = ModalRegion;
    require(["Navigation/Top/TopNavigationController", "Model/TopNavigationViewModel"], function (TopNavigationController) {
        App.addInitializer(function () {
            this.TopNavigationController = new TopNavigationController({ region: App.navigationTop });

            App.addRegions({
                modalRegion: App.Common.Region.ModalRegion
            });

            App.reqres.setHandler(App.Base.Events.App.getCurrentUser, function () {
                return App.User.currentUser;
            });

            App.reqres.setHandler(App.Base.Events.App.getCurrentUser, this.getCurrentUser);


            new router.Router({
                controller: router.API
            });
        });


        App.start();
    });
});
console.log("Inititialization done!");