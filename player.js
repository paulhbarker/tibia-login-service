module.exports = class Player {
    constructor(data) {
        this.sex = data.sex;
        this.name = data.name;
        this.level = data.level;
        this.vocation = data.vocation;
        this.looktype = data.looktype;
        this.lookhead = data.lookhead;
        this.lookbody = data.lookbody;
        this.looklegs = data.looklegs;
        this.lookfeet = data.lookfeet;
        this.deletion = data.deletion;
        this.lookaddons = data.lookaddons;
    }

    json() {
        return {
            worldid: 0,
            name: this.name,
            ismale: this.sex === 1,
            tutorial: false,
            level: this.level,
            vocation: this.getVocationDisplayName(this.vocation),
            outfitid: this.looktype,
            headcolor: this.lookhead,
            torsocolor: this.lookbody,
            legscolor: this.looklegs,
            detailcolor: this.lookfeet,
            addonsflags: this.lookaddons,
            ishidden: this.deletion === 1,
            istournamentparticipant: false,
            remainingdailytournamentplaytime: 0
        }
    }

    getVocationDisplayName(id) {
        switch (id) {
            case 1: return 'Sorceror';
            case 2: return 'Druid';
            case 3: return 'Paladin';
            case 4: return 'Knight';
            case 5: return 'Master Sorceror';
            case 6: return 'Elder Druid';
            case 7: return 'Royal Paladin';
            case 8: return 'Elite Knight';
            default: return 'None'
        }
    }
}
