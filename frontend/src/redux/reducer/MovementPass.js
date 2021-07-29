import {
    FETCH_USER_ALL_MOVEMENT_PASS,
    FETCH_USER_MOVEMENT_PASS
} from "../Type";


const MovementPass = (state = {
    userPass: [],
    userSinglePass: []
}, action) => {
    switch (action.type) {
        default:
            return state;
        case FETCH_USER_ALL_MOVEMENT_PASS:

            return ({
                ...state,
                userPass: action.payload
            })

        case FETCH_USER_MOVEMENT_PASS:
            console.log(action.payload)
            return ({
                ...state,
                userSinglePass: action.payload
            })
    }
};

export default MovementPass;