define(["app", "Base/Model", "Base/Collection", "Base/Constants", "Base/Events"], function (App, BaseModel, BaseCollection, Constants, Events) {
    App.Model = App.Model || {};
    App.Collection = App.Collection || {};

    App.Model.Team = BaseModel.extend({
        urlRoot: Constants.API_URL + "team",
        idAttribute: "ID"
    });

    App.Collection.Team = BaseCollection.extend({
        url: Constants.API_URL + "team"
    });

    var API = {
        getTeam: function (id) {
            var team = new App.Model.Team({ ID: id });
            var defer = $.Deferred();

            team.fetch({
                success: function (data) {
                    defer.resolve(data)
                }
            });
            return defer.promise();
        },

        getTeams: function (id) {
            var teams = new App.Collection.Team();
            var defer = $.Deferred();

            teams.fetch({
                success: function (data) {
                    defer.resolve(data)
                }
            });
            return defer.promise();
        },

        castToTeam: function (data) {
            return new App.Model.Team(data);
        },

        castToTeams: function (data) {
            var teams = new App.Collection.Team();
            _.each(data, function (team) {
                teams.push(API.castToTeam(team));
            }, this);
            return teams;
        }
    }

    App.reqres.setHandler(Events.Model.Team.castToTeams, function (data) {
        return API.castToTeams(data);
    });

    App.reqres.setHandler(Events.Model.Team.castToTeam, function (data) {
        return API.castToTeam(data);
    });

    App.reqres.setHandler(Events.Model.Team.getTeam, function (id) {
        return API.getTeam(id);
    });

    App.reqres.setHandler(Events.Model.Team.getTeams, function () {
        return API.getTeams();
    });

});