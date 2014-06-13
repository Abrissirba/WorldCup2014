define(["app", "Base/Model", "Base/Collection", "Base/Constants", "Base/Events"], function (App, BaseModel, BaseCollection, Constants, Events) {
    var viewModel = BaseModel.extend({
        defaults: {
            Title: "Modal Title",

        }
    });

    return viewModel;
});