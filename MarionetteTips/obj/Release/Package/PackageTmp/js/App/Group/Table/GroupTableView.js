define(["app", "tpl!Group/Table/GroupTableTemplate.html", "Base/CompositeView", "Group/Table/GroupTableItemView"], function (App, Template, CompositeView, GroupTableItemView) {
    App.Competition = App.Competition || {};
    App.Competition.View = App.Competition.View || {};
    App.Competition.View.TableGroupView = CompositeView.extend({
        template: Template,
        tagName: "table",
        className: "table table-hover table-striped group-table",
        itemView: GroupTableItemView,
        itemViewContainer: "tbody",
    });

    return App.Competition.View.TableGroupView;
});