define(["app", "tpl!Competition/CompetitionInfo/CompetitionInfoTemplate.html", "Base/Layout"], function (App, Template, ItemView) {
    var view = ItemView.extend({
        template: Template,
        tagName: "div",
        id: "list-competition",
        regions: {
            tableRegion: "#user-competition-table"
        },

        triggers:{
            "click .js-goto-users-competition": "goToUsersCompetition"
        },

        events: {
            "click .js-join": "join",
            "click .js-goto-users-competition": "goToUsersCompetition"

        },
        goToUsersCompetition: function(e){
            console.log(2);
        },
        join: function (e) {
            e.preventDefault();
            e.stopPropagation();
            this.trigger("join");
        }
    });

    return view;
});