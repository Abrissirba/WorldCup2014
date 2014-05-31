define(["app", "tpl!Competition/ListCompetition/List/ListCompetitionItemTemplate.html", "Base/ItemView"], function (App, Template, ItemView) {
    var view = ItemView.extend({
        template: Template,
        tagName: "tr",
        className: "",
        events: {
            "click": "goToCompetition"
        },

        goToCompetition: function (e) {
            e.preventDefault();
            e.stopPropagation();
            this.trigger("goToCompetition", this.model.get("ID"));
        }
    });

    return view;
});