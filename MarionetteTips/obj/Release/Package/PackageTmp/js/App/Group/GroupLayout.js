define(["tpl!Group/GroupTemplate.html", "app", "Base/Layout"], function (template, App, Layout) {
    App.Group = App.Group || {};
    App.Group.Layout = Layout.extend({
        template: template,
        tagName: "div",
        regions: {
            "tableRegion": "#tableRegion",
            "gameRegion": "#gameRegion"
        },
        events: {
            "click .js-collapse": "collapseGroup"
        },

        collapseGroup: function (e) {
            e.preventDefault();
            e.stopPropagation();
            console.log("collapse");
            var group = $(e.target).closest(".group-region").find(".group-table-region");
            var game = $(e.target).closest(".group-region").find(".group-game-region");
            var collapseIcon = $(e.target).closest(".group-region").find(".group-header-collapse-icon");
            if (group.hasClass("hide-region")) {
                group.removeClass("hide-region");
                collapseIcon.removeClass("glyphicon-chevron-up");
                collapseIcon.addClass("glyphicon-chevron-down");
            }
            else {
                group.addClass("hide-region");
                collapseIcon.removeClass("glyphicon-chevron-up");
                collapseIcon.addClass("glyphicon-chevron-down");
            }
            if (game.hasClass("hide-region")) {
                game.removeClass("hide-region");
                collapseIcon.addClass("glyphicon-chevron-up");
                collapseIcon.removeClass("glyphicon-chevron-down");
            }
            else {
                game.addClass("hide-region");
            }
        }
    });
    return App.Group.Layout;
});

