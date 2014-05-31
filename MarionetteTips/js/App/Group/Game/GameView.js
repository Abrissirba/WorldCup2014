define(["app", "tpl!Group/Game/GameTemplate.html", "Group/Game/GameItemView", "Base/CompositeView", "Base/Constants"], function (App, Template, GameItemView, CompositeView, Constants) {
    App.Competition = App.Competition || {};
    App.Competition.View = App.Competition.View || {};
    App.Competition.View.GameView = CompositeView.extend({
        template: Template,
        tagName: "table",
        className: "table",
        itemView: GameItemView,
        templateHelpers: {
            getImgSrc: function (team) {
                return Constants.FLAG_PATH + team.get("Logo");
            }
        }
    });

    return App.Competition.View.GameView;
});