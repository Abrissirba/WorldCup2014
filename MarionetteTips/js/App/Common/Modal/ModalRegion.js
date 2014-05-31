define(["app", "marionette", "Common/Modal/ModalLayout"], function (App, Marionette, Layout) {
    var ModalRegion = Backbone.Marionette.Region.extend({
        el: "#modal-region",

        constructor: function () {
            Backbone.Marionette.Region.prototype.constructor.apply(this, arguments);
            this.on("show", this.showModal, this);
        },

        getEl: function (selector) {
            var $el = $(selector);
            $el.on("hidden", this.close);
            return $el;
        },

        show: function(view, options){
            var modalLayout = new Layout(options.Modal);
            Backbone.Marionette.Region.prototype.show.apply(this, [modalLayout, options]);
            modalLayout.modalContent.show(view);
        },

        showModal: function (view) {
            view.on("close", this.hideModal, this);
            this.$el.modal('show');
        },

        hideModal: function () {
            this.$el.modal('hide');
        }
    });

    return ModalRegion;
});