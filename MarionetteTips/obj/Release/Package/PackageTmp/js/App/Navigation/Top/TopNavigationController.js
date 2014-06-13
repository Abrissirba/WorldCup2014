define(["Navigation/Top/TopNavigationLayout", "app", "marionette", "backbone", "Base/Events", "Base/Constants", "Navigation/Top/TopNavigationViewModel"],
        function (Layout, App, Marionette, Backbone, Events, Constants, ViewModel) {
            App.Navigation = App.Navigation || {};
            App.Navigation.Top = App.Navigation.Top || {};

            App.Navigation.Top.Controller = App.Base.Controller.extend({
                initialize: function (options) {
                    App.Base.Controller.prototype.initialize.apply(this, [options]);
                    this.viewModel = new ViewModel();
                    this.show();

                    this.listenTo(App.vent, App.Base.Events.App.onCurrentUserChanged, this.updateTopNavigation, this);
                },

                show: function () {
                    this.region.show(this.getTopNavigationView());
                },

                getTopNavigationView: function () {
                    this.viewModel.set("user", App.request(App.Base.Events.App.getCurrentUser));
                    var view = new Layout({model: this.viewModel});
                    this.listenTo(view, "navigate", this.navigate, this);
                    return view;
                },

                navigate: function (destination) {
                    if (destination === "home")
                        App.trigger(Events.Router.Home);
                    else if(destination === "register")
                        App.trigger(Events.Router.Register);
                    else if (destination === "login")
                        App.trigger(Events.Router.LogIn);
                    else if (destination === "logout")
                        App.trigger(Events.Router.LogOut);
                    else if (destination === "competition")
                        App.trigger(Events.Router.ListCompetition);
                },

                updateTopNavigation: function(){
                    this.show();

                }
            });
            return App.Navigation.Top.Controller;
        });