define(["Competition/ListCompetition/ListCompetitionLayout", "Competition/ListCompetition/List/ListCompetitionCompositeView", "app", "marionette", "backbone", "Base/Events", "Base/Constants"],
        function (Layout, ListCompositeView, App, Marionette, Backbone, Events, Constants) {

            var controller = App.Base.Controller.extend({
                initialize: function (options) {
                    var self = this;
                    App.Base.Controller.prototype.initialize.apply(this, [options]);
                    var fetchingCompetitions = App.request(Events.Model.Competition.getCompetitions);
                    $.when(fetchingCompetitions).done(function (competitions) {
                        self.collection = competitions;
                        self.show();
                    });
                    
                },

                show: function () {
                    var layout = this.getLayout();
                    this.region.show(layout);
                    layout.tableRegion.show(this.getCompositeView());
                },

                getLayout: function () {
                    var layout = new Layout();
                    return layout;
                },

                getCompositeView: function () {
                    var view = new ListCompositeView({ collection: this.collection });
                    this.listenTo(view, "itemview:goToCompetition", this.goToCompetition, this);
                    return view;
                },

                goToCompetition: function (view, id) {
                    App.trigger(Events.Router.CompetitionInfo, id);
                }
            });
            return controller;
        });