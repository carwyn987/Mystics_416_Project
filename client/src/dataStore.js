import { createContext, useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'

export const GlobalStore = createContext({});
const history = useHistory();

export const Global
const storeReducer = (action)=>{
    const {type, payload} = action;
    export const GlobalStoreActionType = {
        //    CHANGE_LIST_NAME: "CHANGE_LIST_NAME",
        LOAD_SIDEPANEL: "LOAD_SIDEPANEL"
    }

    /*switch(type){
        case GlobalStore.Provider
    }*/

}
