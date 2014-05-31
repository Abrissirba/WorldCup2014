define(["app", "Base/Model", "Base/Collection", "Base/Constants", "Base/Events"], function (App, BaseModel, BaseCollection, Constants, Events) {
    App.Model = App.Model || {};
    App.Collection = App.Collection || {};

    App.Model.Country = BaseModel.extend({
        urlRoot: Constants.API_URL + "country"
    });

    App.Collection.Country = BaseCollection.extend({
        url: Constants.API_URL + "country"
    });

    var API = {
        getCountries: function () {
            var countries = new App.Collection.Country();
            var defer = $.Deferred();

            countries.fetch({
                success: function (data) {
                    defer.resolve(data)
                }
            });
            return defer.promise();
        }
    }

    App.reqres.setHandler(Events.Model.Country.getCountries, function () {
        return API.getCountries();
    });

});