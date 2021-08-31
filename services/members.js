var utils = require("../utils/firebase")
var db = utils.db
const dotenv = require('dotenv');
dotenv.config();
let loadMembersJSON = async () => {
    const snapshot = await db.collection('users').get();
    let profiles = {};
    snapshot.forEach((doc) => {
        let key = doc.id
        profiles[key] = doc.data()
    })
    return profiles;
}

membersStats = async () => {
    let members = await loadMembersJSON();
    let profiles = [];
    if (Object.keys(members).length === 0) {
        return {};
    } else {
        //return members;
        let mbs = Object.entries(members);
        let counties = [];
        mbs.forEach((v, k) => {
            if (v[1].id) {
                let userObject = v[1];
                if (userObject['profile_pic']) {
                    userObject['profile_pic'] = formatProfpicURL(userObject['profile_pic']);
                }
                counties = [...counties, userObject['county']];
                userObject['key'] = v[1].id;
                userObject['link'] = `${process.env.CURRENT_APP_CONTROL_DOMAIN_NODE}/user/${v[1].id}`

                profiles = [...profiles, {[v[0]]: userObject}];
            }
        })

        function countOccurrences(arr, n, x) {
            let res = 0;
            for (let i = 0; i < n; i++) {
                if (x == arr[i])
                    res++;
            }
            return res;
        }

        let max_county = {county: counties[0], count: 0};
        counties.forEach((v, k) => {
            let count = countOccurrences(counties, counties.length, v);
            if (count > max_county.count) {
                max_county = {county: v, count: count};
            }
        })
        let response = {
            count: mbs.length,
            members: mbs,
            county_max: max_county
        }
        return response
    }

}

memberInfo = async (key) => {
    const userRef = db.collection('users').doc(key);
    const doc = await userRef.get();
    if (!doc.exists) {
        return null
    } else {
        let user = doc.data();
        user.key = doc.data().id;
        return user;
    }
}
formatProfpicURL = (path)=>{
    let url = "";
    url = `${process.env.MAIN_APP_CONTROLLER_URL}${path}`;
    return url;
}
membersList = async()=>{
   let members =  Object.entries(await loadMembersJSON());
   let profiles = {};
    members.forEach((v, k) => {
        if (v[1].id) {
            let userObject = v[1];
            if (userObject['profile_pic']) {
                userObject['profile_pic'] = formatProfpicURL(userObject['profile_pic']);
            }
            userObject['key'] = v[1].id;
            userObject['link'] = `${process.env.CURRENT_APP_CONTROL_DOMAIN_NODE}/user/${v[1].id}`
            profiles[v[1].id] = {...userObject};
          //  profiles = [...profiles, {[v[0]]: userObject}];
        }
    })


   return  (profiles);
}
module.exports = {
    memberInfo,
    membersStats,
    membersList
};