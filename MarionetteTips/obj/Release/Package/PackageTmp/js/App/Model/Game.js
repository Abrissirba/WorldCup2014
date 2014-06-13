define(["app", "Base/Model", "Base/Collection", "Base/Constants", "Base/Events"], function (App, BaseModel, BaseCollection, Constants, Events) {
    App.Model = App.Model || {};
    App.Collection = App.Collection || {};

    App.Model.Game = BaseModel.extend({
        urlRoot: Constants.API_URL + "game/",
        idAttribute: "ID",

        updateUserGame: function () {
            this.save({}, {
                url: this.urlRoot + "/UpdateUserGame/" + this.get(this.idAttribute),
                success: function (data) {
                    data.set("HomeTeam", App.reqres.request(Events.Model.Team.castToTeam, data.get("HomeTeam")));
                    data.set("AwayTeam", App.reqres.request(Events.Model.Team.castToTeam, data.get("AwayTeam")));
                }
            });
        }
    });

    App.Collection.Game = BaseCollection.extend({
        url: Constants.API_URL + "game"
    });

    var API = {
        getGame: function (id) {
            var game = new App.Model.Game({ ID: id });
            var defer = $.Deferred();

            game.fetch({
                success: function (data) {
                    defer.resolve(data)
                }
            });
            return defer.promise();
        },

        getGames: function (id) {
            var games = new App.Collection.Game();
            var defer = $.Deferred();

            games.fetch({
                success: function (data) {
                    defer.resolve(data)
                }
            });
            return defer.promise();
        },

        castToGame: function (data) {
            data.HomeTeam = App.reqres.request(Events.Model.Team.castToTeam, data.HomeTeam);
            data.AwayTeam = App.reqres.request(Events.Model.Team.castToTeam, data.AwayTeam);
            return new App.Model.Game(data);
        },

        castToGames: function (data) {
            var games = new App.Collection.Game();
            _.each(data, function (game) {
                games.push(API.castToGame(game));
            }, this);
            return games;
        }
    }

    App.reqres.setHandler(Events.Model.Game.castToGames, function (data) {
        return API.castToGames(data);
    });

    App.reqres.setHandler(Events.Model.Game.castToGame, function (data) {
        return API.castToGame(data);
    });

    App.reqres.setHandler(Events.Model.Game.getGame, function (id) {
        return API.getGame(id);
    });

    App.reqres.setHandler(Events.Model.Game.getGames, function () {
        return API.getGames();
    });

});