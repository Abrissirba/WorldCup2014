define(["app", "tpl!Template.html", "Base/ItemView"], function (App, Template, ItemView) {
    var view = ItemView.extend({
        template: Template,
        tagName: "div",
        className: ""
    });

    return view;
});