define(["marionette", "backbone", "bootstrap", "syphon"], function (Marionette, Backbone, bootstrap, syphon) {
    var App = new Marionette.Application();
    var currentUser;

    App.addRegions({
        mainRegion: "#main-region",
        navigationTop: "#navigation-top"
    });

    App.navigate = function (route, options) {
        options || (options = {});
        Backbone.history.navigate(route, options);
    };

    App.getCurrentRoute = function () {
        return Backbone.history.fragment;
    };

    App.on("initialize:after", function () {
        if (Backbone.history) {
            Backbone.history.start();
        }
    });

    App.addInitializer(function () {
        this.listenTo(this.vent, App.Base.Events.logoutUser, this.logout, this);

        $.ajax({
            type: "GET",
            url: App.Base.Constants.LOGIN_URL,
            success: function (response) {
                var user = response !== null ? new App.Model.User(response) : null;
                App.setCurrentUser(user);
            },
            error: function (response) {
                console.log(response);
            }
        });
    });

    App.logout = function () {
        $.ajax({
            type: "GET",
            url: App.Base.Constants.LOGIN_URL + "?logout=logout",
            success: function (response) {
                App.setCurrentUser();
            },
            error: function (response) {
                console.log(response);
            }
        });
    },

    App.setCurrentUser = function (user) {
        currentUser = user;
        App.vent.trigger(App.Base.Events.App.onCurrentUserChanged, user);
    };

    App.getCurrentUser = function () {
        return currentUser;
    }

    return App;
});