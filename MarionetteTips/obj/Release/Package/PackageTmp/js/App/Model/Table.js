define(["app", "Base/Model", "Base/Collection", "Base/Constants", "Base/Events"], function (App, BaseModel, BaseCollection, Constants, Events) {
    App.Model = App.Model || {};
    App.Collection = App.Collection || {};

    App.Model.Table = BaseModel.extend({

    });

    App.Collection.Table = BaseCollection.extend({
        model: App.Model.Table,
        comparator: function (left, right) {
            var returnValue = 0;
            if (left.get("Points") === right.get("Points")) {
                if (left.get("GoalsPlusMinus") === right.get("GoalsPlusMinus")) {
                    returnValue = left.get("GoalsScored") > right.get("GoalsScored") ? -1 : 1;
                }
                else {
                    returnValue = left.get("GoalsPlusMinus") > right.get("GoalsPlusMinus") ? -1 : 1;
                }
            }
            else {
                returnValue = left.get("Points") > right.get("Points") ? -1 : 1;
            }
            return returnValue;
        }
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
            table.sort();
            return table;
        }
    }

    App.reqres.setHandler(Events.Model.Table.castToTable, function (data) {
        return API.castToTable(data);
    });
});