define(["Login/Register/RegisterView", "app", "marionette", "backbone", "Base/Events", "Base/Constants"],
        function (View, App, Marionette, Backbone, Events, Constants) {
            App.Login = App.Login || {};
            App.Login.Register = App.Login.Register || {};

            App.Login.Register.Controller = App.Base.Controller.extend({
                initialize: function (options) {
                    App.Base.Controller.prototype.initialize.apply(this, [options]);
                    this.user = new App.Model.User();
                    this.show();
                },

                show: function () {
                    this.region.show(this.getRegisterView());
                },

                getRegisterView: function () {
                    var view = new View({ model: this.user });
                    this.listenTo(view, "register", this.register, this);
                    return view;
                },
                
                register: function (data, view) {
                    var self = this;
                    if (this.user.set(data, { validate: true })) {
                        this.user.saveUser().done(function (data) {
                            App.trigger(Events.Router.Home);
                        }).fail(function (data) {
                            view.triggerMethod("invalid", self.user.validationError);
                        });
                    }
                    else {
                        view.triggerMethod("invalid", this.user.validationError);
                    }
                }
            });
            return App.Login.Register.Controller;
        });