define(["tpl!Competition/UserCompetition/UserCompetitionLayoutTemplate.html", "app", "Base/Layout"], function (template, App, Layout) {
    App.Competition = App.Competition || {};
    App.Competition.Layout = Layout.extend({
        template: template,
        tagName: "div",
        id: "competition-container",
        createNewGroupRegion: function(id){
            var id = "group-region-" + id;
            var html = "<div id='" + id + "' class='group-region'></div>";
            var region = {};
            region[id] = "#" + id;
            this.addRegions(region);
            $("#competition-container").append(html);
            return this[id];
        }

    });
    return App.Competition.Layout;
});

