import { createContext, useContext, useState } from 'react'

export const GlobalStore = createContext({});
export const GlobalStoreActions = {
    //    CHANGE_LIST_NAME: "CHANGE_LIST_NAME",
    LOAD_SIDEPANEL: "LOAD_SIDEPANEL",
    CLOSE_SIDEPANEL: "CLOSE_SIDEPANEL"
}

function GlobalStoreContextProvider(props){
    const [store, setStore] = useState({
        isSidePanelVisible: false
    });

    const storeReducer = (action) => {
        const {type, payload} = action;
        switch(type){
            case GlobalStoreActions.LOAD_SIDEPANEL:{
                return setStore({
                    isSidePanelVisible: true
                });
            }
            case GlobalStoreActions.CLOSE_SIDEPANEL:{
                return setStore({
                    isSidePanelVisible: false
                });
            }
            default:
                return store;
        }
        //}
    }

    store.loadSidePanel = function () {
        console.log("load func called in data store");
        storeReducer({
            type: GlobalStoreActions.LOAD_SIDEPANEL,
            payload: {}
        });
    }

    store.closeSidePanel = function (){
        storeReducer({
            type: GlobalStoreActions.CLOSE_SIDEPANEL,
            payload:{}
        });
    }
    
    return (
        <GlobalStore.Provider value={{ store }}>
            {props.children}
        </GlobalStore.Provider>
    );
}
export default GlobalStore;
export { GlobalStoreContextProvider };