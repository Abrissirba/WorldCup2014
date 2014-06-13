define(["app", "tpl!Competition/ListCompetition/List/ListCompetitionCompositeTemplate.html", "Competition/ListCompetition/List/ListCompetitionItemView",
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