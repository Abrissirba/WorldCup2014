define(["app", "tpl!Common/Modal/ModalTemplate.html", "Base/Layout", "Common/Modal/ModalViewModel"], function (App, Template, Layout, ViewModel) {

    var layout = Layout.extend({
        template: Template,
        tagName: "div",
        className: "modal-dialog",

        initialize: function (options) {
            this.model = new ViewModel(options);
        },

        regions: {
            modalContent: "#modal-content"
        }
    });

    return layout;
});