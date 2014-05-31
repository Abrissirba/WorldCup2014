define(["app", "tpl!Competition/CompetitionInfo/CompetitionInfoTemplate.html", "Base/Layout"], function (App, Template, ItemView) {
    var view = ItemView.extend({
        template: Template,
        tagName: "div",
        id: "list-competition",
        regions: {
            tableRegion: "#user-competition-table"
        },

        events: {
            "click .js-join": "join"
        },

        join: function (e) {
            e.preventDefault();
            e.stopPropagation();
            this.trigger("join");
        }
    });

    return view;
});