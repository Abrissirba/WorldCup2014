define(["app", "tpl!Group/Game/GameItemTemplate.html", "Base/ItemView", "Base/Constants"], function (App, Template, ItemView, Constants) {
    App.Competition = App.Competition || {};
    App.Competition.View = App.Competition.View || {};
    App.Competition.View.GameItemView = ItemView.extend({
        template: Template,
        tagName: "tr",
        className: "",
        templateHelpers: {
            getImgSrc: function (team) {
                return Constants.FLAG_PATH + team.get("Logo");
            }
        },
        events: {
            "change input": "updateResult"
        },

        updateResult: function (e) {
            if ($(e.target).hasClass("home")) {
                this.model.set("userExcpectedHomeResult", e.target.value);
            }
            else if ($(e.target).hasClass("away")) {
                this.model.set("userExcpectedAwayResult", e.target.value);
            }
            console.log(this.model);
            this.model.save();
        }
    });

    return App.Competition.View.GameItemView;
});