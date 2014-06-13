define(["Login/LoginView", "app", "marionette", "backbone", "Base/Events", "Base/Constants"],
        function (View, App, Marionette, Backbone, Events, Constants) {

            var controller = App.Base.Controller.extend({
                initialize: function (options) {
                    App.Base.Controller.prototype.initialize.apply(this, [options]);
                    this.show();
                },

                show: function () {
                    this.region.show(this.getView(), { Modal: {Title: "Sign In"}});
                },

                getView: function () {
                    var view = new View({ model: new App.Model.User() });
                    this.listenTo(view, "login", this.login, this);
                    return view;
                },

                login: function (data, view) {
                    var self = this;
                    var user = new App.Model.User(data);

                    $.ajax({
                        type: "POST",
                        url: Constants.LOGIN_URL,
                        data: data,
                        success: function (response) {
                            user.set(response);
                            App.setCurrentUser(user);
                            self.region.close();
                        },
                        error: function (response) {
                            console.log(response);
                        }
                    });
                }
            });
            return controller;
        });