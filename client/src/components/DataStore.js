import { createContext, useContext, useState } from 'react'

export const GlobalStore = createContext({});
export const GlobalStoreActions = {
    LOAD_SIDEPANEL: "LOAD_SIDEPANEL",
    CLOSE_SIDEPANEL: "CLOSE_SIDEPANEL",
    LOAD_MAP_SETTINGS: "LOAD_MAP_SETTINGS",
    CLOSE_MAP_SETTINGS: "CLOSE_MAP_SETTINGS",
    LOAD_ELECTION_DATA: "LOAD_ELECTION_DATA",
    SET_STATE_AND_DISTRICT: "SET_STATE_AND_DISTRICT",
    ZOOM_TN: "ZOOM_TN",
    ZOOM_MS: "ZOOM_MS",
    UPDATE_MAP: "UPDATE_MAP",
    SET_CURRENT_STATE: "SET_CURRENT_STATE",
    DISTRICT_PLAN: "DISTRICT_PLAN",
    COUNTY_TOGGLE: "COUNTY_TOGGLE",
    STATE_POP: "STATE_POP",
    PANEL_VIS: "PANEL_VIS"
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
        countyToggle: false,
        statePop: 0
    });

    const storeReducer = (action) => {
        const {type, payload} = action;
        switch(type){
            case GlobalStoreActions.LOAD_SIDEPANEL:{
                return setStore({
                    isSidePanelVisible: true,
                    isMapSettingsVisible: store.isMapSettingsVisible,
                    currentDistrict: store.currentDistrict,            
                    TNzoom: store.TNzoom,
                    MSzoom: store.MSzoom,
                    map: store.map,
                    currentState: store.currentState,
                    districtPlan: store.districtPlan,
                    countyToggle: store.countyToggle,
                    statePop: store.statePop
                });
            }
            case GlobalStoreActions.CLOSE_SIDEPANEL:{
                return setStore({
                    isSidePanelVisible: false,
                    isMapSettingsVisible: store.isMapSettingsVisible,
                    currentDistrict: store.currentDistrict,            
                    TNzoom: store.TNzoom,
                    MSzoom: store.MSzoom,
                    map: store.map,
                    currentState: store.currentState,
                    districtPlan: store.districtPlan,
                    countyToggle: store.countyToggle,
                    statePop: store.statePop
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
                    countyToggle: store.countyToggle,
                    statePop: store.statePop
                });
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
                    countyToggle: store.countyToggle,
                    statePop: store.statePop
                });
            }
            case GlobalStoreActions.LOAD_ELECTION_DATA:{
                return setStore({
                    isSidePanelVisible: true,
                    countyToggle: store.countyToggle,
                    isMapSettingsVisible: store.isMapSettingsVisible,
                    currentDistrict: null,
                    TNzoom: !this.TNzoom,
                    MSzoom: store.MSzoom,
                    map: store.map,
                    currentState: store.currentState,
                    districtPlan: store.districtPlan,
                    statePop: store.statePop
                });
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
                    countyToggle: store.countyToggle,
                    statePop: store.statePop
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
                    countyToggle: store.countyToggle,
                    statePop: store.statePop
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
                    countyToggle: store.countyToggle,
                    statePop: store.statePop
                });
            }
            case GlobalStoreActions.SET_CURRENT_STATE:{
                return setStore({
                    isSidePanelVisible: store.isSidePanelVisible,
                    isMapSettingsVisible: store.isMapSettingsVisible,
                    currentDistrict: store.currentDistrict,
                    TNzoom: store.TNzoom,
                    MSzoom: store.MSzoom,
                    map: store.map,
                    currentState: payload,
                    districtPlan: store.districtPlan,
                    countyToggle: store.countyToggle,
                    statePop: store.statePop
                });
            }
            case GlobalStoreActions.DISTRICT_PLAN:{
                return setStore({
                    isSidePanelVisible: store.isSidePanelVisible,
                    isMapSettingsVisible: store.isMapSettingsVisible,
                    currentDistrict: store.currentDistrict,
                    TNzoom: store.TNzoom,
                    MSzoom: store.MSzoom,
                    map: store.map,
                    currentState: store.currentState,
                    districtPlan: payload,
                    countyToggle: store.countyToggle,
                    statePop: store.statePop
                });
            }

            case GlobalStoreActions.COUNTY_TOGGLE:{
                return setStore({
                    isSidePanelVisible: store.isSidePanelVisible,
                    isMapSettingsVisible: store.isMapSettingsVisible,
                    currentDistrict: store.currentDistrict,
                    TNzoom: store.TNzoom,
                    MSzoom: store.MSzoom,
                    map: store.map,
                    currentState: store.currentState,
                    districtPlan: store.districtPlan,
                    countyToggle: !store.countyToggle,
                    statePop: store.statePop
                });
            }
            case GlobalStoreActions.STATE_POP:{
                return setStore({
                    isSidePanelVisible: store.isSidePanelVisible,
                    isMapSettingsVisible: store.isMapSettingsVisible,
                    currentDistrict: store.currentDistrict,
                    TNzoom: store.TNzoom,
                    MSzoom: store.MSzoom,
                    map: store.map,
                    currentState: store.currentState,
                    districtPlan: store.districtPlan,
                    countyToggle: !store.countyToggle,
                    statePop: payload
                });
            }
            case GlobalStoreActions.PANEL_VIS:{
                return setStore({
                    isSidePanelVisible: payload,
                    isMapSettingsVisible: store.isMapSettingsVisible,
                    currentDistrict: store.currentDistrict,
                    TNzoom: store.TNzoom,
                    MSzoom: store.MSzoom,
                    map: store.map,
                    currentState: store.currentState,
                    districtPlan: store.districtPlan,
                    countyToggle: !store.countyToggle,
                    statePop: store.statePop
                });
            }
            default:
                return store;
        }
    }

    store.loadSidePanel = function () {
        storeReducer({
            type: GlobalStoreActions.LOAD_SIDEPANEL,
            payload:{}
        });
    }
    store.closeSidePanel = async function (){
        storeReducer({
            type: GlobalStoreActions.CLOSE_SIDEPANEL,
            payload:{}
        });
    }
    store.loadMapSettings = async function(){
        storeReducer({
            type: GlobalStoreActions.LOAD_MAP_SETTINGS,
            payload:{}
        });
    }
    store.closeMapSettings = async function(){
        storeReducer({
            type: GlobalStoreActions.CLOSE_MAP_SETTINGS,
            payload:{}
        });
    }
    store.zoomTN = async function () {
        storeReducer({
            type: GlobalStoreActions.ZOOM_TN,
            payload: {}
        });
    }

    store.updateMap = async function (mapInput) {
        storeReducer({
            type: GlobalStoreActions.UPDATE_MAP,
            payload: mapInput
        });
    }

    store.zoomMS = async function () {
        storeReducer({
            type: GlobalStoreActions.ZOOM_MS,
            payload: {}
        });
    }

    store.setCurrentState = async function (stateID) {
        storeReducer({
            type: GlobalStoreActions.SET_CURRENT_STATE,
            payload: stateID
        });
    }
    store.setDistrictPlan = async function(id){
        storeReducer({
            type: GlobalStoreActions.DISTRICT_PLAN,
            payload: id
        });
    }

    store.toggleCounty = async function () {
        storeReducer({
            type: GlobalStoreActions.COUNTY_TOGGLE,
            payload: {}
        });
    }
    store.statePop = async function(httpResponse){
        let pop = httpResponse.population;
        storeReducer({
            type: GlobalStoreActions.STATE_POP,
            payload: {pop}
        });
    }
    store.setSidePanelVis = async function (bool) {
        storeReducer({
            type: GlobalStoreActions.PANEL_VIS,
            payload: {bool}
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