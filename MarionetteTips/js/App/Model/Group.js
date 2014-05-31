define(["app", "Base/Model", "Base/Collection", "Base/Constants", "Base/Events"], function (App, BaseModel, BaseCollection, Constants, Events) {
    App.Model = App.Model || {};
    App.Collection = App.Collection || {};

    App.Model.Group = BaseModel.extend({
        urlRoot: Constants.API_URL + "group",
        idAttribute: "ID",

        getTable: function () {
            var teams = {};
            var self = this;
            var getTeam = function (team) {
                var Team = teams[team.get("Title")];
                if (Team === undefined) {
                    teams[team.get("Title")] = {
                        Title: team.get("Title"),
                        Logo: team.get("Logo"),
                        Games: 0,
                        Victory: 0,
                        Draw: 0,
                        Lost: 0,
                        GoalsScored: 0,
                        GoalsConceded: 0,
                        Points: 0
                    };
                    Team = teams[team.get("Title")];
                }
                return Team;
            }

            this.get("Games").each(function (game, idx, self) {
                var HomeTeam = getTeam( game.get("HomeTeam"));
                var AwayTeam = getTeam(game.get("AwayTeam"));
                if (game.get("HomeResult") !== null && game.get("AwayResult") !== null) {
                    HomeTeam.Games++;
                    AwayTeam.Games++;
                    HomeTeam.GoalsScored += game.get("HomeResult");
                    HomeTeam.GoalsConceded += game.get("AwayResult");
                    AwayTeam.GoalsScored += game.get("AwayResult");
                    AwayTeam.GoalsConceded += game.get("HomeResult");
                    if (game.get("HomeResult") > game.get("AwayResult")) {
                        HomeTeam.Victory++;
                        HomeTeam.Points += 3;
                    }
                    else if (game.get("HomeResult") === game.get("AwayResult")) {
                        HomeTeam.Draw++;
                        HomeTeam.Points += 1;
                        AwayTeam.Draw++;
                        AwayTeam.Points += 1;
                    }
                    else {
                        AwayTeam.Victory++;
                        AwayTeam.Points += 3;
                    }
                }
            });
            return App.reqres.request(Events.Model.Table.castToTable, teams);
        },


    });

    App.Collection.Group = BaseCollection.extend({
        url: Constants.API_URL + "group"
    });

    var API = {
        getGroup: function (id) {
            var group = new App.Model.Group({ ID: id });
            var defer = $.Deferred();

            group.fetch({
                success: function (data) {
                    defer.resolve(data)
                }
            });
            return defer.promise();
        },

        castToGroup: function (data) {
            data.Games = App.reqres.request(Events.Model.Game.castToGames, data.Games);
            return new App.Model.Group(data);
        },

        castToGroups: function (data) {
            var groups = new App.Collection.Group();
            _.each(data, function (group) {
                groups.push(API.castToGroup(group));
            }, this);
            return groups;
        }
    }

    App.reqres.setHandler(Events.Model.Group.castToGroups, function (data) {
        return API.castToGroups(data);
    });

    App.reqres.setHandler(Events.Model.Group.castToGroup, function (data) {
        return API.castToGroup(data);
    });

    App.reqres.setHandler(Events.Model.Group.getGroup, function (id) {
        return API.getGroup(id);
    });

});