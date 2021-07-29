import { FETCH_ADMIN_DASHBOARD, FETCH_All_EXPIRED_PASS, FETCH_All_PENDING_PASS, FETCH_All_APPROVED_PASS, FETCH_RECENT_USERS, FETCH_RECENT_PASS, FETCH_All_PASS, ADMIN_FETCH_All_USER, FETCH_SPECIFIC_USER } from "../Type";


const AdminDashboard = (state = {
    Dashboard: [],
    RecentUser: [],
    RecentPass: [],
    AllPass: [],
    AllapprovedPass: [],
    AllPendingPass: [],
    AllExpiredPass: [],
    Allusers: [],
    specificUser: [],


}, action) => {
    switch (action.type) {
        default:
            return state;
        case FETCH_ADMIN_DASHBOARD:

            return ({
                ...state,
                Dashboard: action.payload
            })

        case FETCH_RECENT_USERS:

            return ({
                ...state,
                RecentUser: action.payload
            })

        case FETCH_RECENT_PASS:

            return ({
                ...state,
                RecentPass: action.payload
            })

        case FETCH_All_PASS:

            return ({
                ...state,
                AllPass: action.payload
            })

        case FETCH_All_APPROVED_PASS:

            return ({
                ...state,
                AllapprovedPass: action.payload
            })


        case FETCH_All_PENDING_PASS:

            return ({
                ...state,
                AllPendingPass: action.payload
            })


        case FETCH_All_EXPIRED_PASS:

            return ({
                ...state,
                AllExpiredPass: action.payload
            })


        case ADMIN_FETCH_All_USER:

            return ({
                ...state,
                Allusers: action.payload
            })


        case FETCH_SPECIFIC_USER:

            return ({
                ...state,
                specificUser: action.payload
            })
    }
};

export default AdminDashboard;
