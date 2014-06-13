define(["app", "Base/Model", "Base/Collection", "Base/Constants", "Base/Events"], function (App, BaseModel, BaseCollection, Constants, Events) {
    App.Model = App.Model || {};
    App.Collection = App.Collection || {};

    App.Model.User = BaseModel.extend({
        urlRoot: Constants.API_URL + "user",

        defaults: {
            Email: "",
            FirstName: "",
            LastName: "",
            Password: ""
        },

        saveUser: function () {
            var self = this;
            var defer = $.Deferred();
            this.save().done(function (response) {
                defer.resolve({ status: "success" });
            }).fail(function (response) {
                errorCode = JSON.parse(response.error().responseText).Message
                if (errorCode === "1") {
                    self.validationError = { Email: "An account with the choosen email already exists" };
                    defer.reject({ status: "fail", code: errorCode, reason: "Email already exists" });
                }
            });
            return defer.promise();
        },

        validate: function (attrs, options) {
            var errors = {}
            if (!attrs.Email && attrs.Email === "") {
                errors.Email = "Please enter a valid email address";
            }
            if (!attrs.FirstName && attrs.FirstName === "") {
                errors.FirstName = "Please enter your first name";
            }
            if (!attrs.LastName && attrs.LastName === "") {
                errors.LastName = "Please enter your last name";
            }
            if (!attrs.Password && attrs.Password === "") {
                errors.Password = "Please enter a valid password";
            }
            if (!_.isEmpty(errors)) {
                return errors;
            }
        }
    });

    App.Collection.User = BaseCollection.extend({
        url: Constants.API_URL + "user"
    });

    var API = {
        getUsers: function () {
            var users = new App.Collection.User();
            var defer = $.Deferred();

            users.fetch({
                success: function (data) {
                    defer.resolve(data)
                }
            });
            return defer.promise();
        },

        getUser: function () {
            var user = new App.Model.User();
            var defer = $.Deferred();

            user.fetch({
                success: function (data) {
                    defer.resolve(data)
                }
            });
            return defer.promise();
        },

        registerUser: function (data) {
            var user = new App.Model.User();
            $.ajax({
                type: "POST",
                url: user.url() + "/register",
                data: data,
                success: function (d) {
                    console.log(d);
                }
            });
        }
    }

    App.reqres.setHandler(Events.Model.User.getUsers, function () {
        return API.getUsers();
    });

    App.reqres.setHandler(Events.Model.User.getUser, function () {
        return API.getUser();
    });

    App.reqres.setHandler(Events.Model.User.registerUser, function (data) {
        return API.registerUser(data);
    });

});