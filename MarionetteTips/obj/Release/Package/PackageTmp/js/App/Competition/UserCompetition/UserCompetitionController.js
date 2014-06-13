define(["Competition/UserCompetition/UserCompetitionLayout", "Group/GroupController", "app", "marionette", "backbone", "Base/Events", "Base/Constants"],
        function (Layout, GroupController, App, Marionette, Backbone, Events, Constants) {
    App.Competition = App.Competition || {};
    App.Competition.Controller = App.Base.Controller.extend({
        initialize: function (options) {
            App.Base.Controller.prototype.initialize.apply(this, [options]);
            this.userCompetitionID = options.UserCompetitionID;
            this.show();
        },

        show: function () {
            var self = this;
            this.Layout = new Layout();
            App.mainRegion.show(this.Layout);
            var fetchingCountries = App.reqres.request(Events.Model.UserCompetition.getUserCompetition, self.userCompetitionID);
            $.when(fetchingCountries).done(function (data) {
                var id = 0;
                data.get("Groups").each(function (group) {
                    var groupRegion = self.Layout.createNewGroupRegion(++id);
                    var groupController = new GroupController({ region: groupRegion, model: group });
                }, self);
            });
        }
    });
    return App.Competition.Controller;
});