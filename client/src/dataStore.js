import { createContext, useContext, useState } from 'react'

export const GlobalStore = createContext({});
export const GlobalStoreActions = {
    //    CHANGE_LIST_NAME: "CHANGE_LIST_NAME",
    LOAD_SIDEPANEL: "LOAD_SIDEPANEL"
}

function GlobalStoreContextProvider(props){
    const [store, setStore] = useState({
        isSidePanelVisible: false
    });

    const storeReducer = (action)=>{
        const {type, payload} = action;
        const storeReducer = (action) =>{
            const{type, payload} = action;
            switch(type){
                case GlobalStoreActions.LOAD_SIDEPANEL:{
                    return setStore({
                        isSidePanelVisible: true
                    });
                }
                default:
                    return store;
            }
        }
    }
}
export default GlobalStore;
export { GlobalStoreContextProvider };