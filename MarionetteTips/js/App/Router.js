define(["app", "marionette", "backbone", "Base/Events"], function (App, Marionette, Backbone, Events) {
    Router = Marionette.AppRouter.extend({
        appRoutes: {
            ""      : "Home",
            "home": "Home",
            "register": "Register",
            "competition": "ListCompetition",
            "competition/:id": "CompetitionInfo",
            "competition/:id/usercompetition/:id": "UserCompetition"
        }
    });

    var API = {
        Home: function () {
            require(["Competition/UserCompetition/UserCompetitionController"], function (Controller) {
                console.log("Navigation: Home");
                Controller.show();
            });
        },

        Register: function () {
            require(["Login/Register/RegisterController"], function (Controller) {
                console.log("Navigation: Register");
                var controller = new Controller({ region: App.mainRegion });
            });
        },

        LogIn: function () {
            require(["Login/LoginController"], function (Controller) {
                console.log("Navigation: LogIn");
                var controller = new Controller({ region: App.modalRegion });
            });
        },

        ListCompetition: function () {
            require(["Competition/ListCompetition/ListCompetitionController"], function (Controller) {
                console.log("Navigation: ListCompetition");
                var controller = new Controller({ region: App.mainRegion });
            });
        },

        CompetitionInfo: function (id) {
            require(["Competition/CompetitionInfo/CompetitionInfoController"], function (Controller) {
                console.log("Navigation: CompetitionInfo");
                var controller = new Controller({ region: App.mainRegion, CompetitionID: id });
            });
        },

        UserCompetition: function (competitionID, usercompetitionID) {
            console.log("Navigate: Competition(" + competitionID + ", " + usercompetitionID + ")");
            require(["Competition/UserCompetition/UserCompetitionController"], function (Controller) {
                console.log("Navigation: competition/Usercompetition");
                var controller = new Controller({ region: App.mainRegion, UserCompetitionID: usercompetitionID });
            });
        },
    };


    App.on(Events.Router.Register, function(){
        App.navigate("register");
        API.Register();
    });

    App.on(Events.Router.Home, function () {
        App.navigate("");
        API.Home();
    });

    App.on(Events.Router.ListCompetition, function () {
        App.navigate("competition");
        API.ListCompetition();
    });

    App.on(Events.Router.CompetitionInfo, function (id) {
        App.navigate("competition/" + id);
        API.CompetitionInfo(id);
    });

    App.on(Events.Router.UserCompetition, function (competitionID, userCompetitionID) {
        App.navigate("competition/" + competitionID + "/usercompetition/" + userCompetitionID);
        API.UserCompetition(competitionID, userCompetitionID);
    });

    App.on(Events.Router.LogIn, function () {
        API.LogIn();
    });

    App.on(Events.Router.LogOut, function () {
        App.navigate("");
        API.Home();
        App.vent.trigger(Events.logoutUser);
    });

    var router = {
        Router: Router,
        API: API
    }

    return router;
});