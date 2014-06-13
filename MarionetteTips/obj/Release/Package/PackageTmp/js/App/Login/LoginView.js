define(["app", "tpl!Login/LoginTemplate.html", "Base/ItemView"], function (App, Template, ItemView) {
    var view = ItemView.extend({
        template: Template,
        tagName: "div",
        className: "",

        events: {
            "click .js-login": "login"
        },

        login: function (e) {
            e.preventDefault();
            e.stopPropagation();
            var data = Backbone.Syphon.serialize(this);
            this.trigger("login", data, this);
        }
    });

    return view;
});