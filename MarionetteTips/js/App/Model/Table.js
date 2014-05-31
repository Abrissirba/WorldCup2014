define(["app", "Base/Model", "Base/Collection", "Base/Constants", "Base/Events"], function (App, BaseModel, BaseCollection, Constants, Events) {
    App.Model = App.Model || {};
    App.Collection = App.Collection || {};

    App.Model.Table = BaseModel.extend({

    });

    App.Collection.Table = BaseCollection.extend({
        model: App.Model.Table
    });

    var API = {
        castToTeam: function (data) {
            return new App.Model.Team(data);
        },

        castToTable: function (data) {
            var table = new App.Collection.Table();
            _.each(data, function (team) {
                table.push(API.castToTeam(team));
            }, this);
            return table;
        }
    }

    App.reqres.setHandler(Events.Model.Table.castToTable, function (data) {
        return API.castToTable(data);
    });
});