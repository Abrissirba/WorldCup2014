define(["app", "tpl!Competition/ListCompetition/ListCompetitionTemplate.html", "Base/Layout"], function (App, Template, ItemView) {
    var view = ItemView.extend({
        template: Template,
        tagName: "div",
        id: "list-competition",
        regions: {
            tableRegion: "#list-competition-table"
        }
    });

    return view;
});