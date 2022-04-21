import { createContext, useContext, useState } from 'react'

export const GlobalStore = createContext({});
export const GlobalStoreActions = {
    //    CHANGE_LIST_NAME: "CHANGE_LIST_NAME",
    LOAD_SIDEPANEL: "LOAD_SIDEPANEL",
    CLOSE_SIDEPANEL: "CLOSE_SIDEPANEL",
    LOAD_MAP_SETTINGS: "LOAD_MAP_SETTINGS",
    CLOSE_MAP_SETTINGS: "CLOSE_MAP_SETTINGS",
    LOAD_ELECTION_DATA: "LOAD_ELECTION_DATA",
    SET_STATE_AND_DISTRICT: "SET_DATE_AND_DISTRICT",
    ZOOM_TN: "ZOOM_TN",
    ZOOM_MS: "ZOOM_MS",
    UPDATE_MAP: "UPDATE_MAP",
    CURRENT_STATE: "CURRENT_STATE",
    DISTRICT_PLAN: "DISTRICT_PLAN",
    COUNTY_TOGGLE: "COUNTY_TOGGLE"
    // DISTRICT_MOUSE_HOVER: "DISTRICT_MOUSE_HOVER",
    // DISTRICT_HOVER_NUM: "DISTRICT_HOVER_NUM"
}

function GlobalStoreContextProvider(props){
    const [store, setStore] = useState({
        isSidePanelVisible: false,
        isMapSettingsVisible: false,
        currentDistrict: null,
        TNzoom: false,
        MSzoom: false,
        map: null,
        currentState: null,
        districtPlan: 0,
        countyToggle: false
        // isDistMouseHoverVisible: false,
        // distHoverNum: 0
    });

    const storeReducer = (action) => {
        const {type, payload} = action;
        switch(type){
            case GlobalStoreActions.LOAD_SIDEPANEL:{
                return setStore({
                    isSidePanelVisible: true,
                    isMapSettingsVisible: store.isMapSettingsVisible,
                    currentDistrict: payload.dist,            
                    TNzoom: store.TNzoom,
                    MSzoom: store.MSzoom,
                    map: store.map,
                    currentState: store.currentState,
                    districtPlan: store.districtPlan,
                    countyToggle: store.countyToggle
                });
            }
            case GlobalStoreActions.CLOSE_SIDEPANEL:{
                return setStore({
                    isSidePanelVisible: false,
                    isMapSettingsVisible: store.isMapSettingsVisible,
                    currentDistrict: null,            
                    TNzoom: store.TNzoom,
                    MSzoom: store.MSzoom,
                    map: store.map,
                    currentState: store.currentState,
                    districtPlan: store.districtPlan,
                    countyToggle: store.countyToggle
                });
            }
            case GlobalStoreActions.LOAD_MAP_SETTINGS:{
                return setStore({
                    isSidePanelVisible: store.isSidePanelVisible,
                    isMapSettingsVisible: true,
                    currentDistrict: store.currentDistrict,            
                    TNzoom: store.TNzoom,
                    MSzoom: store.MSzoom,
                    map: store.map,
                    currentState: store.currentState,
                    districtPlan: store.districtPlan,
                    countyToggle: store.countyToggle
                })
            }
            case GlobalStoreActions.CLOSE_MAP_SETTINGS:{
                return setStore({
                    isSidePanelVisible: store.isSidePanelVisible,
                    isMapSettingsVisible: false,
                    currentDistrict: store.currentDistrict,            
                    TNzoom: store.TNzoom,
                    MSzoom: store.MSzoom,
                    map: store.map,
                    currentState: store.currentState,
                    districtPlan: store.districtPlan,
                    countyToggle: store.countyToggle
                })
            }
            case GlobalStoreActions.LOAD_ELECTION_DATA:{
                return setStore({
                    isSidePanelVisible: true,
                    countyToggle: store.countyToggle
                })
            }
            case GlobalStoreActions.ZOOM_TN:{
                return setStore({
                    isSidePanelVisible: store.isSidePanelVisible,
                    isMapSettingsVisible: store.isMapSettingsVisible,
                    currentDistrict: null,
                    TNzoom: !this.TNzoom,
                    MSzoom: store.MSzoom,
                    map: store.map,
                    currentState: store.currentState,
                    districtPlan: store.districtPlan,
                    countyToggle: store.countyToggle
                });
            }
            case GlobalStoreActions.ZOOM_MS:{
                return setStore({
                    isSidePanelVisible: store.isSidePanelVisible,
                    isMapSettingsVisible: store.isMapSettingsVisible,
                    currentDistrict: null,
                    TNzoom: store.TNzoom,
                    MSzoom: !this.MSzoom,
                    map: store.map,
                    currentState: store.currentState,
                    districtPlan: store.districtPlan,
                    countyToggle: store.countyToggle
                });
            }
            case GlobalStoreActions.UPDATE_MAP:{
                return setStore({
                    isSidePanelVisible: store.isSidePanelVisible,
                    isMapSettingsVisible: store.isMapSettingsVisible,
                    currentDistrict: store.currentDistrict,
                    TNzoom: store.TNzoom,
                    MSzoom: store.MSzoom,
                    map: payload,
                    currentState: store.currentState,
                    districtPlan: store.districtPlan,
                    countyToggle: store.countyToggle
                });
            }
            case GlobalStoreActions.CURRENT_STATE:{
                return setStore({
                    isSidePanelVisible: store.isSidePanelVisible,
                    isMapSettingsVisible: store.isMapSettingsVisible,
                    currentDistrict: store.currentDistrict,
                    TNzoom: store.TNzoom,
                    MSzoom: store.MNSzoom,
                    map: store.map,
                    currentState: payload,
                    districtPlan: store.districtPlan,
                    countyToggle: store.countyToggle
                });
            }
            case GlobalStoreActions.DISTRICT_PLAN:{
                return setStore({
                    isSidePanelVisible: store.isSidePanelVisible,
                    isMapSettingsVisible: store.isMapSettingsVisible,
                    currentDistrict: store.currentDistrict,
                    TNzoom: store.TNzoom,
                    MSzoom: store.MNSzoom,
                    map: store.map,
                    currentState: store.currentState,
                    districtPlan: payload,
                    countyToggle: store.countyToggle
                });
            }

            case GlobalStoreActions.COUNTY_TOGGLE:{
                return setStore({
                    isSidePanelVisible: store.isSidePanelVisible,
                    isMapSettingsVisible: store.isMapSettingsVisible,
                    currentDistrict: store.currentDistrict,
                    TNzoom: store.TNzoom,
                    MSzoom: store.MNSzoom,
                    map: store.map,
                    currentState: store.currentState,
                    districtPlan: store.districtPlan,
                    countyToggle: !store.countyToggle
                });
            }
            default:
                return store;
        }
    }

    store.loadSidePanel = function (state,dist) {
        console.log('loading side panel');
        storeReducer({
            type: GlobalStoreActions.LOAD_SIDEPANEL,
            payload: {
                state: state,
                dist: dist
            }
        });
    }
    store.closeSidePanel = function (){
        storeReducer({
            type: GlobalStoreActions.CLOSE_SIDEPANEL,
            payload:{}
        });
    }
    store.loadMapSettings = function(){
        storeReducer({
            type: GlobalStoreActions.LOAD_MAP_SETTINGS,
        })
    }
    store.closeMapSettings = function(){
        storeReducer({
            type: GlobalStoreActions.CLOSE_MAP_SETTINGS,
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

    store.setCurrentState = function (st) {
        storeReducer({
            type: GlobalStoreActions.CURRENT_STATE,
            payload: st
        });
    }
    store.setDistrictPlan = function(id){
        storeReducer({
            type: GlobalStoreActions.DISTRICT_PLAN,
            payload: id
        });
    }

    store.toggleCounty = function () {
        storeReducer({
            type: GlobalStoreActions.COUNTY_TOGGLE,
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