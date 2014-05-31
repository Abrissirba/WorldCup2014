define(["app", "tpl!Login/Register/RegisterTemplate.html", "Base/ItemView"], function (App, Template, ItemView) {
    App.Login = App.Login || {};
    App.Login.Register = App.Login.Register || {};

    App.Login.Register.View = ItemView.extend({
        template: Template,
        tagName: "div",
        className: "",

        events: {
            "click .js-register": "register"
        },

        onInvalid: function(errors){
            var $view = this.$el;
            var clearFormErrors = function(){
                var $form = $view.find("form");
                $form.find(".help-inline.error").each(function(){
                    $(this).remove();
                });
                $form.find(".control-group.error").each(function(){
                    $(this).removeClass("error");
                });
                $form.find(".invalid").each(function () {
                    $(this).removeClass("invalid");
                });

                }
            var markErrors = function(value, key){
                var $controlGroup = $view.find("[name=" + key + "]").parent();
                $view.find("[name=" + key + "]").addClass("invalid");
                var $errorEl = $("<span>", { class: "help-inline error", text: value });
                $controlGroup.append($errorEl).addClass("error");
            }

            clearFormErrors();
            _.each(errors, markErrors);
        },

        register: function (e) {
            e.preventDefault();
            e.stopPropagation();
            var data = Backbone.Syphon.serialize(this);
            this.trigger("register", data, this);
        }
    });

    return App.Login.Register.View;
});