define(["app", "tpl!Group/Game/GameItemTemplate.html", "Base/ItemView", "Base/Constants"], function (App, Template, ItemView, Constants) {
    App.Competition = App.Competition || {};
    App.Competition.View = App.Competition.View || {};
    App.Competition.View.GameItemView = ItemView.extend({
        template: Template,
        tagName: "div",
        className: "",
        templateHelpers: {
            getImgSrc: function (team) {
                return Constants.FLAG_PATH + team.get("Logo");
            },

            isGroupCreatedByUser: function(){
                var currentUser = App.getCurrentUser();
                if (!isEmpty(currentUser) && this.UserID === currentUser.get("ID")) {
                    return true;
                }
                else {
                    return false;
                }
            },

            getScoreText: function () {
                var correctSign = "Correct Sign: 10p <br/>";
                var incorrectSign = "Incorrect Sign: 0p <br/>";
                var incorrectResult = "Incorrect result: -3p <br/>";
                var homeResult = "Incorrect home result: ";
                var awayResult = "Incorrect away result: ";
                var totalScore = "Total score: " + this.Score + "p";
                var text = "";
                if (!isEmpty(this.HomeResult) && !isEmpty(this.AwayResult)) {
                    text = correctSign;
                    if (this.HomeResult == this.userExcpectedHomeResult && this.AwayResult == this.userExcpectedAwayResult)
                        text += correctSign;
                    else if (this.HomeResult > this.AwayResult && this.userExcpectedHomeResult > this.userExcpectedAwayResult) {
                        text += incorrectResult;
                        text += (this.HomeResult - this.userExcpectedHomeResult !== 0) ? homeResult + (Math.min(this.HomeResult, this.userExcpectedHomeResult) - Math.max(this.HomeResult, this.userExcpectedHomeResult)) + "p<br/>" : "";
                        text += (this.AwayResult - this.userExcpectedAwayResult !== 0) ? awayResult + (Math.min(this.AwayResult, this.userExcpectedAwayResult) - Math.max(this.AwayResult, this.userExcpectedAwayResult)) + "p<br/>" : "";
                    }
                    else if (this.HomeResult == this.AwayResult && this.userExcpectedHomeResult == this.userExcpectedAwayResult) {
                        text += incorrectResult;
                        text += (this.HomeResult - this.userExcpectedHomeResult !== 0) ? homeResult + (Math.min(this.HomeResult, this.userExcpectedHomeResult) - Math.max(this.HomeResult, this.userExcpectedHomeResult)) + "p<br/>" : "";
                        text += (this.AwayResult - this.userExcpectedAwayResult !== 0) ? awayResult + (Math.min(this.AwayResult, this.userExcpectedAwayResult) - Math.max(this.AwayResult, this.userExcpectedAwayResult)) + "p<br/>" : "";
                    }
                    else if (this.HomeResult < this.AwayResult && this.userExcpectedHomeResult < this.userExcpectedAwayResult) {
                        text += incorrectResult;
                        text += (this.HomeResult - this.userExcpectedHomeResult !== 0) ? homeResult + (Math.min(this.HomeResult, this.userExcpectedHomeResult) - Math.max(this.HomeResult, this.userExcpectedHomeResult)) + "p<br/>" : "";
                        text += (this.AwayResult - this.userExcpectedAwayResult !== 0) ? awayResult + (Math.min(this.AwayResult, this.userExcpectedAwayResult) - Math.max(this.AwayResult, this.userExcpectedAwayResult)) + "p<br/>" : "";
                    }
                    else {
                        text = incorrectSign;
                    }
                    text += totalScore;
                }
                return text;
            },
            getRowColor: function () {
                if (this.Score != null && this.Score > 0)
                    return "correct-sign";
                else if (this.Score != null && this.Score === 0)
                    return "incorrect-sign";
                else
                    return "";
            },

            getScore: function () {
                if (!isEmpty(this.Score)) {
                    return this.Score + "p";
                }
            }
        },
        events: {
            "keyup input": "updateResult",
            "window resize": "updateName",
            "click .game-row": "toggleResult",
            "mouseup input": "markRow"
        },

        markRow: function(e){
            $(e.target).select();
        },
        toggleResult: function (e) {
            if (!$(e.target).hasClass("result")) {
                e.stopPropagation();
                e.preventDefault(e);
                var resultRow = $(e.target).closest(".game-row").siblings(".game-result-row");
                if (resultRow.hasClass("shown")) {
                    resultRow.removeClass("shown");
                }
                else {
                    resultRow.addClass("shown");
                }
                console.log("toggle");
            }
        },

        updateName: function () {
            if ($(window).width() < 500) {
                var homeTeam = this.$el.find(".leftColumn").find(".team-name");
                var awayTeam = this.$el.find(".rigthColumn").find(".team-name");
                homeTeam.html(homeTeam.html().substr(0, 3));
                awayTeam.html(awayTeam.html().substr(0, 3));
            }
            else {
                this.$el.find(".leftColumn").find(".team-name").html(this.model.get("HomeTeam").get("Title"));
                this.$el.find(".rigthColumn").find(".team-name").html(this.model.get("AwayTeam").get("Title"));
            }
        },

        initialize: function () {
            var self = this;

            $(window).on("resize", function () {
                self.updateName();
            });
        },
        
        onShow: function(){
            this.updateName();
        },

        remove: function() {
            $(window).off("resize",this.updateName);
            //call the superclass remove method
            ItemView.prototype.remove.apply(this, arguments);
        },

        updateResult: function (e) {
            var result = parseInt(e.target.value);
            if (typeof (result !== "undefined") && result !== null && !isNaN(result)) {
                if ($(e.target).hasClass("home")) {
                    this.trigger("updateResult", this.model, "home", result);

                }
                else if ($(e.target).hasClass("away")) {
                    this.trigger("updateResult", this.model, "away", result);
                }
            }
            console.log(this.model);
        }
    });

    return App.Competition.View.GameItemView;
});