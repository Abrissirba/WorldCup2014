define(["app", "tpl!Group/Table/GroupTableItemTemplate.html", "Base/ItemView", "Base/Constants"], function (App, Template, ItemView, Constants) {
    App.Competition = App.Competition || {};
    App.Competition.View = App.Competition.View || {};
    App.Competition.View.TableGroupItemView = ItemView.extend({
        template: Template,
        tagName: "tr",

        templateHelpers: {
            getLogoImg: function (src) {
                return Constants.FLAG_PATH + src;
            }
        }
    });

    return App.Competition.View.TableGroupItemView;
});