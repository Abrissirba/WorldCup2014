define(["app", "tpl!Navigation/Top/TopNavigationTemplate.html", "Base/Layout"], function (App, Template, Layout) {
    App.Navigation = App.Navigation || {};
    App.Navigation.Top = App.Navigation.Top || {};

    App.Navigation.Top.Layout = Layout.extend({
        template: Template,
        tagName: "div",
        className: "",

        events: {
            "click .js-nav": "navigate"
        },
        
        navigate: function (e) {
            e.stopPropagation();
            e.preventDefault();
            this.trigger("navigate", $(e.target).attr("Destination"));
        }
    });

    return App.Navigation.Top.Layout;
});