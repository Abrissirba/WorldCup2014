define([], function () {
    var Events = {
        App:{
            getCurrentUser: "app:user:getCurentUser",
            onCurrentUserChanged: "app:user:userLoggedIn",
            logoutUser: "app:user:logOut"
        },
        Router:{
            Home: "home",
            Register: "login:register",
            LogIn: "login",
            LogOut: "logout",
            ListCompetition: "competition:list",
            CompetitionInfo: "competition:info",
            UserCompetition: "competition:bet"
        },
        Model: {
            Country: {
                getCountries: "model:country:getCountries"
            },
            Competition: {
                getCompetitions: "model:competition:getCompetitions",
                getCompetition: "model:competition:getCompetition"
            },
            UserCompetition: {
                getUserCompetition: "model:competition:getUserCompetition",
                castToUserCompetitions: "model:competition:castToUserCompetitions",
                castToUserCompetition: "model:competition:castToUserCompetition",
                joinCompetition: "model:competition:createUserCompetition"
            },
            Group: {
                getGroup: "model:group:getGroup",
                castToGroup: "model:group:castToGroup",
                castToGroups: "model:group:castToGroups"
            },
            Team: {
                getTeam: "model:team:getTeam",
                getTeams: "model:team:getTeams",
                castToTeam: "model:team:castToTeam",
                castToTeams: "model:team:castToTeams"
            },
            Game: {
                getGame: "model:game:getGame",
                getGames: "model:game:getGames",
                castToGame: "model:game:castToGame",
                castToGames: "model:game:castToGames"
            },
            Table: {
                castToTable: "model:table:castToTable"
            },
            User: {
                getUsers: "model:user:getUsers",
                getUser: "model:user:getUser",
                registerUser: "model:user:registerUser"
            }
        }
    }
    return Events;
});
