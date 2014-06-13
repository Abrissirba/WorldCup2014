define(["tpl!Group/GroupTemplate.html", "app", "Base/Layout"], function (template, App, Layout) {
    App.Group = App.Group || {};
    App.Group.Layout = Layout.extend({
        template: template,
        tagName: "div",
        regions: {
            "tableRegion": "#tableRegion",
            "gameRegion": "#gameRegion"
        }
    });
    return App.Group.Layout;
});

