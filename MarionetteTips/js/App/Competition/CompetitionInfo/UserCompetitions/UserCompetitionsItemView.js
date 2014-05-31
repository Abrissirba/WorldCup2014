define(["app", "tpl!Competition/CompetitionInfo/UserCompetitions/UserCompetitionsItemTemplate.html", "Base/ItemView"], function (App, Template, ItemView) {
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
            this.trigger("goToUserCompetition", this.model.get("ID"));
        }
    });

    return view;
});