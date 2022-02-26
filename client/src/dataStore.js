import { createContext, useContext, useState } from 'react'

export const GlobalStore = createContext({});
export const GlobalStoreActions = {
    //    CHANGE_LIST_NAME: "CHANGE_LIST_NAME",
    LOAD_SIDEPANEL: "LOAD_SIDEPANEL",
    CLOSE_SIDEPANEL: "CLOSE_SIDEPANEL",
    SET_CURRENT_STATE: "SET_CURRENT_STATE",
    LOAD_ELECTION_DATA: "LOAD_ELECTION_DATA",
    ZOOM_TN: "ZOOM_TN",
    ZOOM_MS: "ZOOM_MS",
    UPDATE_MAP: "UPDATE_MAP"
    // DISTRICT_MOUSE_HOVER: "DISTRICT_MOUSE_HOVER",
    // DISTRICT_HOVER_NUM: "DISTRICT_HOVER_NUM"
}

function GlobalStoreContextProvider(props){
    const [store, setStore] = useState({
        isSidePanelVisible: false,
        currentState: null,
        TNzoom: false,
        MSzoom: false,
        map: null
        // isDistMouseHoverVisible: false,
        // distHoverNum: 0
    });

    const storeReducer = (action) => {
        const {type, payload} = action;
        switch(type){
            case GlobalStoreActions.LOAD_SIDEPANEL:{
                return setStore({
                    isSidePanelVisible: true,
                    currentState: null,
                    TNzoom: store.TNzoom,
                    MSzoom: store.MSzoom,
                    map: store.map
                });
            }
            case GlobalStoreActions.CLOSE_SIDEPANEL:{
                return setStore({
                    isSidePanelVisible: false,
                    currentState: null,
                    TNzoom: store.TNzoom,
                    MSzoom: store.MSzoom,
                    map: store.map
                });
            }
            case GlobalStoreActions.LOAD_ELECTION_DATA:{
                return setStore({
                    isSidePanelVisible: true,
                    
                })
            }
            case GlobalStoreActions.SET_CURRENT_STATE:{
                return setStore({
                    isSidePanelVisible: true,
                    currentState: payload,
                    TNzoom: store.TNzoom,
                    MSzoom: store.MSzoom,
                    map: store.map
                })
            }
            case GlobalStoreActions.ZOOM_TN:{
                return setStore({
                    isSidePanelVisible: store.isSidePanelVisible,
                    currentState: null,
                    TNzoom: !this.TNzoom,
                    MSzoom: store.MSzoom,
                    map: store.map
                });
            }
            case GlobalStoreActions.ZOOM_MS:{
                return setStore({
                    isSidePanelVisible: store.isSidePanelVisible,
                    currentState: null,
                    TNzoom: store.TNzoom,
                    MSzoom: !this.MSzoom,
                    map: store.map
                });
            }
            case GlobalStoreActions.UPDATE_MAP:{
                return setStore({
                    isSidePanelVisible: store.isSidePanelVisible,
                    currentState: null,
                    TNzoom: store.TNzoom,
                    MSzoom: store.MSzoom,
                    map: payload
                });
            }
            // case GlobalStoreActions.DISTRICT_MOUSE_HOVER:{
            //     return setStore({
            //         isDistMouseHoverVisible: payload
            //     });
            // }
            // case GlobalStoreActions.DISTRICT_HOVER_NUM:{
            //     return setStore({
            //         distHoverNum: payload
            //     });
            // }
            default:
                return store;
        }
        //}
    }

    store.loadSidePanel = function () {
        console.log('loading side panel');
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
    store.setCurrentState= function(currentState){
        storeReducer({
            type: GlobalStoreActions.SET_CURRENT_STATE,
            payload: currentState
        })
    }
    
    store.zoomTN = function () {
        storeReducer({
            type: GlobalStoreActions.ZOOM_TN,
            payload: {}
        });
    }

    store.updateMap = function (mapInput) {
        storeReducer({
            type: GlobalStoreActions.UPDATE_MAP,
            payload: mapInput
        });
    }

    store.zoomMS = function () {
        storeReducer({
            type: GlobalStoreActions.ZOOM_MS,
            payload: {}
        });
    }

    // store.setDistHover = function (bool) {
    //     storeReducer({
    //         type: GlobalStoreActions.DISTRICT_MOUSE_HOVER,
    //         payload: bool
    //     });
    // }

    // store.setDistHoverNum = function (num) {
    //     storeReducer({
    //         type: GlobalStoreActions.DISTRICT_HOVER_NUM,
    //         payload: num
    //     });
    // }
    
    return (
        <GlobalStore.Provider value={{ store }}>
            {props.children}
        </GlobalStore.Provider>
    );
}
export default GlobalStore;
export { GlobalStoreContextProvider };