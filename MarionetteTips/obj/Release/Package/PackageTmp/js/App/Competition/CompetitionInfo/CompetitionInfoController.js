define(["Competition/CompetitionInfo/CompetitionInfoLayout", "Competition/CompetitionInfo/UserCompetitions/UserCompetitionsCompositeView", "app", "marionette", "backbone", "Base/Events", "Base/Constants"],
        function (Layout, ListCompositeView, App, Marionette, Backbone, Events, Constants) {

            var controller = App.Base.Controller.extend({
                initialize: function (options) {
                    var self = this;
                    App.Base.Controller.prototype.initialize.apply(this, [options]);
                    this.listenTo(App.vent, Events.App.onCurrentUserChanged, this.show, this);
                    var fetchingCompetitions = App.request(Events.Model.Competition.getCompetition, options.CompetitionID);
                    $.when(fetchingCompetitions).done(function (competition) {
                        self.competition = competition;
                        self.show();
                    });
                    
                },

                getUserCompetition: function(){
                    var currentUser = App.getCurrentUser();
                    var userCompetition;
                    if (!isEmpty(currentUser)) {
                        this.competition.get("UserCompetition").each(function (uc) {
                            if (uc.get("User").ID == currentUser.get("ID")) {
                                userCompetition = uc;
                            }
                        });
                    }
                    return userCompetition;
                },

                show: function () {
                    this.userCompetition = this.getUserCompetition();
                    var layout = this.getLayout();
                    this.region.show(layout);
                    layout.tableRegion.show(this.getUserCompetitionsView());
                },

                getLayout: function () {
                    var self = this;
                    var layoutViewModel = new Backbone.Model({ Competition: this.competition, UserCompetition: this.userCompetition });
                    var layout = new Layout({ model: layoutViewModel });
                    this.listenTo(layout, "goToUsersCompetition", function (){self.goToUserCompetition(null, self.userCompetition.get("ID"));}, this)
                    this.listenTo(layout, "join", this.joinCompetition, this);
                    return layout;
                },

                getUserCompetitionsView: function () {
                    var view = new ListCompositeView({collection: this.competition.get("UserCompetition").sort()});
                    this.listenTo(view, "itemview:goToUserCompetition", this.goToUserCompetition, this);
                    return view;
                },

                goToUserCompetition: function (view, id) {
                    App.trigger(Events.Router.UserCompetition, this.competition.get("Competition").ID, id);
                },

                joinCompetition: function () {
                    if (isEmpty(App.getCurrentUser())) {
                        App.trigger(Events.Router.Register);
                    }
                    else {
                        var joinCompetition = App.request(Events.Model.UserCompetition.joinCompetition, this.competition.get("Competition").ID);
                        $.when(joinCompetition).done(function (data) {
                            App.trigger(Events.Router.UserCompetition, data.get("CompetitionID"), data.get("ID"));
                        }).fail(function (data) {
                            console.log(data)
                        });
                    }
                }
            });
            return controller;
        });