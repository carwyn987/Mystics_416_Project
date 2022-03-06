import { createContext, useContext, useState } from 'react'

export const GlobalStore = createContext({});
export const GlobalStoreActions = {
    //    CHANGE_LIST_NAME: "CHANGE_LIST_NAME",
    LOAD_SIDEPANEL: "LOAD_SIDEPANEL",
    CLOSE_SIDEPANEL: "CLOSE_SIDEPANEL",
    SET_CURRENT_STATE: "SET_CURRENT_STATE",
    SET_CURRENT_DISTRICT: "SET_CURRENT_DISTRICT",
    LOAD_ELECTION_DATA: "LOAD_ELECTION_DATA",
    SET_STATE_AND_DISTRICT: "SET_DATE_AND_DISTRICT",
    ZOOM_TN: "ZOOM_TN",
    ZOOM_MS: "ZOOM_MS",
    UPDATE_MAP: "UPDATE_MAP",
    STATE_FOCUS: "STATE_FOCUS"
    // DISTRICT_MOUSE_HOVER: "DISTRICT_MOUSE_HOVER",
    // DISTRICT_HOVER_NUM: "DISTRICT_HOVER_NUM"
}

function GlobalStoreContextProvider(props){
    const [store, setStore] = useState({
        isSidePanelVisible: false,
        currentState: null,
        currentDist: null,
        TNzoom: false,
        MSzoom: false,
        map: null,
        stateFocus: null
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
                    currentDist: null,            
                    TNzoom: store.TNzoom,
                    MSzoom: store.MSzoom,
                    map: store.map,
                    stateFocus: store.stateFocus
                });
            }
            case GlobalStoreActions.CLOSE_SIDEPANEL:{
                return setStore({
                    isSidePanelVisible: false,
                    currentState: null,
                    currentDist: null,            
                    TNzoom: store.TNzoom,
                    MSzoom: store.MSzoom,
                    map: store.map,
                    stateFocus: store.stateFocus
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
                    currentDist: store.currentDist,
                    TNzoom: store.TNzoom,
                    MSzoom: store.MSzoom,
                    map: store.map,
                    stateFocus: store.stateFocus
                })
            }
            case GlobalStoreActions.SET_CURRENT_DISTRICT:{
                return setStore({
                    isSidePanelVisible: true,
                    currentState: store.currentState,
                    currentDist: payload,
                    TNzoom: store.TNzoom,
                    MSzoom: store.MSzoom,
                    map: store.map,
                    stateFocus: store.stateFocus
                })
            }
            case GlobalStoreActions.ZOOM_TN:{
                return setStore({
                    isSidePanelVisible: store.isSidePanelVisible,
                    currentState: null,
                    currentDist: null,
                    TNzoom: !this.TNzoom,
                    MSzoom: store.MSzoom,
                    map: store.map,
                    stateFocus: store.stateFocus
                });
            }
            case GlobalStoreActions.ZOOM_MS:{
                return setStore({
                    isSidePanelVisible: store.isSidePanelVisible,
                    currentState: null,
                    currentDist: null,
                    TNzoom: store.TNzoom,
                    MSzoom: !this.MSzoom,
                    map: store.map,
                    stateFocus: store.stateFocus
                });
            }
            case GlobalStoreActions.UPDATE_MAP:{
                return setStore({
                    isSidePanelVisible: store.isSidePanelVisible,
                    currentState: null,
                    currentDist: null,
                    TNzoom: store.TNzoom,
                    MSzoom: store.MSzoom,
                    map: payload,
                    stateFocus: store.stateFocus
                });
            }
            case GlobalStoreActions.STATE_FOCUS:{
                return setStore({
                    isSidePanelVisible: store.isSidePanelVisible,
                    currentState: null,
                    TNzoom: store.TNzoom,
                    MSzoom: store.MNSzoom,
                    map: store.map,
                    stateFocus: payload
                })
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
        console.log("store.currentState");
        storeReducer({
            type: GlobalStoreActions.SET_CURRENT_STATE,
            payload: currentState
        })
    }
    store.setCurrentDist=function(currentDist){
        console.log("store.currentDist");
        storeReducer({
            type: GlobalStoreActions.SET_CURRENT_DISTRICT,
            payload: currentDist
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

    store.setStateFocus = function (st) {
        storeReducer({
            type: GlobalStoreActions.STATE_FOCUS,
            payload: st
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