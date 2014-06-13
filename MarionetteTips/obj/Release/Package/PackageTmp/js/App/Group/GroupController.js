define(["Group/GroupLayout", "Group/Table/GroupTableView", "Group/Game/GameView", "app", "marionette", "backbone", "Base/Events", "Base/Constants"],
        function (Layout, TableView, GameView, App, Marionette, Backbone, Events, Constants) {
            App.Group = App.Group || {};
            App.Group.Controller = App.Base.Controller.extend({
                initialize: function (options) {
                    App.Base.Controller.prototype.initialize.apply(this, [options]);
                    this.layout = new Layout({ model: this.model });
                    this.listenTo(App.vent, Events.App.onCurrentUserChanged, this.updateGameView, this);
                    this.show();
                },
                show: function () {
                    this.region.show(this.layout);
                    this.layout.tableRegion.show(this.getTableView());
                    this.layout.gameRegion.show(this.getGameView());
                },

                updateGameView: function(){
                    this.layout.gameRegion.show(this.getGameView());
                },
                getTableView: function () {
                    var tableView = new TableView({ collection: this.model.getTable() });
                    return tableView;
                },

                getGameView: function () {
                    var gameView = new GameView({ collection: this.model.get("Games") });
                    this.listenTo(gameView, "itemview:updateResult", this.updateGameResult, this);
                    return gameView;
                },

                updateGameResult: function (view, gameModel, team, result) {
                    if (team === "home") {
                        gameModel.set("userExcpectedHomeResult", result);
                    }
                    else if (team === "away") {
                        gameModel.set("userExcpectedAwayResult", result);
                    }
                    gameModel.updateUserGame();
                    this.layout.tableRegion.show(this.getTableView());
                }
            });
            return App.Group.Controller;
        });