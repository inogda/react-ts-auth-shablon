import {useDispatch} from "react-redux";
import {bindActionCreators} from "redux";
import {allActionCreators} from "../store/redusers/action-creators";


export const useActionsAll = () => {
    const dispatch = useDispatch();
    //debugger
    return bindActionCreators(allActionCreators, dispatch);
};

