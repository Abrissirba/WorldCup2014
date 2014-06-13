define(["app", "Base/Model", "Base/Collection", "Base/Constants", "Base/Events"], function (App, BaseModel, BaseCollection, Constants, Events) {
    App.Model = App.Model || {};
    App.Collection = App.Collection || {};

    App.Model.UserCompetition = BaseModel.extend({
        urlRoot: Constants.API_URL + "usercompetition/",
        idAttribute: "ID"
    });

    App.Collection.UserCompetition = BaseCollection.extend({
        url: Constants.API_URL + "usercompetition",
        model: App.Model.UserCompetition,

        comparator: function (item) {
            return -item.get("Points");
        }
    });

    var API = {
       getUserCompetition: function (id) {
            var competition = new App.Model.UserCompetition({ ID: id });
            var defer = $.Deferred();

            competition.fetch({
                success: function (data) {
                    data.attributes.Groups = App.reqres.request(Events.Model.Group.castToGroups, data.attributes.Groups);
                    defer.resolve(data)
                }
            });
            return defer.promise();
       },

       createUserCompetition: function(competitionID){
           var competition = new App.Model.UserCompetition();
           var defer = $.Deferred();

           competition.save({ CompetitionID: competitionID }, {
               success: function (data) {
                   defer.resolve(data)
               }
           });
           return defer.promise();
       },

       castToUserCompetition: function (data) {
           return new App.Model.UserCompetition(data);
       },

       castToUserCompetitions: function (data) {
           var userCompetitions = new App.Collection.UserCompetition();
           _.each(data, function (userCompetition) {
               userCompetitions.push(API.castToUserCompetition(userCompetition));
           }, this);
           return userCompetitions;
       }
    }

    App.reqres.setHandler(Events.Model.UserCompetition.getUserCompetition, function (id) {
        return API.getUserCompetition(id);
    });

    App.reqres.setHandler(Events.Model.UserCompetition.castToUserCompetition, function (data) {
        return API.castToUserCompetition(data);
    });

    App.reqres.setHandler(Events.Model.UserCompetition.castToUserCompetitions, function (data) {
        return API.castToUserCompetitions(data);
    });

    App.reqres.setHandler(Events.Model.UserCompetition.joinCompetition, function (competitionID) {
        return API.createUserCompetition(competitionID);
    });

});