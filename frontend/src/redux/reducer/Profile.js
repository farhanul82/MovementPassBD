import {FETCH_USER_PROFILE} from "../Type";


const ProfileReducer = (state = {
    userProfile:[]
},action) => {
    switch (action.type){
        default:
            return state;
        case FETCH_USER_PROFILE:
            
            return({
                ...state,
                userProfile:action.payload
            })
    }
};

export default ProfileReducer;