define(["app", "Base/Model", "Base/Collection", "Base/Constants", "Base/Events"], function (App, BaseModel, BaseCollection, Constants, Events) {
    App.Model = App.Model || {};
    App.Collection = App.Collection || {};

    App.Model.Competition = BaseModel.extend({
        urlRoot: Constants.API_URL + "competition",
        idAttribute: "ID"
    });

    App.Collection.Competition = BaseCollection.extend({
        url: Constants.API_URL + "competition",
        model: App.Model.Competition
    });

    var API = {
        getCompetitions: function () {
            var competitions = new App.Collection.Competition();
            var defer = $.Deferred();

            competitions.fetch({
                success: function (data) {
                    defer.resolve(data)
                }
            });
            return defer.promise();
        },

        getCompetition: function (id) {
            var competition = new App.Model.Competition({ID: id});
            var defer = $.Deferred();

            competition.fetch({
                success: function (data) {
                    data.set("UserCompetition", App.request(Events.Model.UserCompetition.castToUserCompetitions, data.get("UserCompetition")));
                    defer.resolve(data)
                }
            });
            return defer.promise();
        }
    }

    App.reqres.setHandler(Events.Model.Competition.getCompetitions, function () {
        return API.getCompetitions();
    });

    App.reqres.setHandler(Events.Model.Competition.getCompetition, function (id) {
        return API.getCompetition(id);
    });



});