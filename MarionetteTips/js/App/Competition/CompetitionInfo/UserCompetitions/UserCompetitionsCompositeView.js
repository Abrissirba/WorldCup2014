define(["app", "tpl!Competition/CompetitionInfo/UserCompetitions/UserCompetitionsCompositeTemplate.html", "Competition/CompetitionInfo/UserCompetitions/UserCompetitionsItemView",
    "Base/CompositeView"],
    function (App, Template, ListItemView, CompositeView) {
    var view = CompositeView.extend({
        template: Template,
        tagName: "table",
        className: "table table-hover",
        itemView: ListItemView,
        itemViewContainer: "tbody",

    });

    return view;
});