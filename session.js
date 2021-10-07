module.exports = class Session {
    constructor(options) {
        this.account = options.account;
        this.password = options.password;
    }

    json() {
        return {
            ispremium: true,
            status: "active",
            isreturner: true,
            lastlogintime: 0,
            fpstracking: false,
            optiontracking: false,
            showrewardnews: false,
            emailcoderequest: false,
            premiumuntil: this.account.lastday,
            returnernotification: false,
            tournamentticketpurchasestate: 0,
            sessionkey: this.account.name + '\n' + this.password,
        };
    }
}
