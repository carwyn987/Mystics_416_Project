import { createContext, useContext, useState } from 'react'

export const GlobalStore = createContext({});
export const GlobalStoreActions = {
    //    CHANGE_LIST_NAME: "CHANGE_LIST_NAME",
    LOAD_SIDEPANEL: "LOAD_SIDEPANEL",
    CLOSE_SIDEPANEL: "CLOSE_SIDEPANEL",
    ZOOM_TN: "ZOOM_TN",
    ZOOM_MS: "ZOOM_MS",
    SET_MAP: "SET_MAP"
}

function GlobalStoreContextProvider(props){
    const [store, setStore] = useState({
        isSidePanelVisible: false,
        TNzoom: false,
        MSzoom: false,
        map: null
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
            case GlobalStoreActions.ZOOM_TN:{
                return setStore({
                    TNzoom: true
                });
            }
            case GlobalStoreActions.ZOOM_MS:{
                return setStore({
                    MSzoom: true
                });
            }
            case GlobalStoreActions.SET_MAP:{
                return setStore({
                    map: payload
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

    store.zoomTN = function () {
        storeReducer({
            type: GlobalStoreActions.ZOOM_TN,
            payload: {}
        });
    }

    store.setMap = function (mapInput) {
        storeReducer({
            type: GlobalStoreActions.SET_MAP,
            payload: mapInput
        });
    }

    store.zoomMS = function () {
        storeReducer({
            type: GlobalStoreActions.ZOOM_MS,
            payload: {}
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