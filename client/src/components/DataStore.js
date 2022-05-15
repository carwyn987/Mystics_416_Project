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
    PANEL_VIS: "PANEL_VIS",
    ENABLE_ENACTED_PLAN: "ENABLE_ENACTED_PLAN",
    DISABLE_ENACTED_PLAN: "DISABLE_ENACTED_PLAN",
    ENABLE_PROPOSED_PLAN: "ENABLE_PROPOSED_PLAN",
    DISABLE_PROPOSED_PLAN: "DISABLE_PROPOSED_PLAN",
    ENABLE_OLD_PLAN: "ENABLE_OLD_PLAN",
    DISABLE_OLD_PLAN: "DISABLE_OLD_PLAN",
    ENABLE_DEM_PLAN: "ENABLE_DEM_PLAN",
    DISABLE_DEM_PLAN: "DISABLE_DEM_PLAN",
    ENABLE_REP_PLAN: "ENABLE_REP_PLAN",
    DISABLE_REP_PLAN: "DISABLE_REP_PLAN",
    RESET_APP: "RESET_APP"
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
        statePop: 0,
        enactedPlanToggle: true,
        proposedPlanToggle: false,
        oldPlanToggle: false,
        demPlanToggle: false,
        repPlanToggle: false,
        reset: false
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
                    statePop: store.statePop,
                    enactedPlanToggle: store.enactedPlanToggle,
                    proposedPlanToggle: store.proposedPlanToggle,
                    oldPlanToggle: store.oldPlanToggle,
                    demPlanToggle: store.demPlanToggle,
                    repPlanToggle: store.repPlanToggle,
                    reset: store.reset
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
                    statePop: store.statePop,
                    enactedPlanToggle: store.enactedPlanToggle,
                    proposedPlanToggle: store.proposedPlanToggle,
                    oldPlanToggle: store.oldPlanToggle,
                    demPlanToggle: store.demPlanToggle,
                    repPlanToggle: store.repPlanToggle,
                    reset: store.reset
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
                    statePop: store.statePop,
                    enactedPlanToggle: store.enactedPlanToggle,
                    proposedPlanToggle: store.proposedPlanToggle,
                    oldPlanToggle: store.oldPlanToggle,
                    demPlanToggle: store.demPlanToggle,
                    repPlanToggle: store.repPlanToggle,
                    reset: store.reset
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
                    statePop: store.statePop,
                    enactedPlanToggle: store.enactedPlanToggle,
                    proposedPlanToggle: store.proposedPlanToggle,
                    oldPlanToggle: store.oldPlanToggle,
                    demPlanToggle: store.demPlanToggle,
                    repPlanToggle: store.repPlanToggle,
                    reset: store.reset
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
                    statePop: store.statePop,
                    enactedPlanToggle: store.enactedPlanToggle,
                    proposedPlanToggle: store.proposedPlanToggle,
                    oldPlanToggle: store.oldPlanToggle,
                    demPlanToggle: store.demPlanToggle,
                    repPlanToggle: store.repPlanToggle,
                    reset: store.reset
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
                    statePop: store.statePop,
                    enactedPlanToggle: store.enactedPlanToggle,
                    proposedPlanToggle: store.proposedPlanToggle,
                    oldPlanToggle: store.oldPlanToggle,
                    demPlanToggle: store.demPlanToggle,
                    repPlanToggle: store.repPlanToggle,
                    reset: store.reset
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
                    statePop: store.statePop,
                    enactedPlanToggle: store.enactedPlanToggle,
                    proposedPlanToggle: store.proposedPlanToggle,
                    oldPlanToggle: store.oldPlanToggle,
                    demPlanToggle: store.demPlanToggle,
                    repPlanToggle: store.repPlanToggle,
                    reset: store.reset
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
                    statePop: store.statePop,
                    reset: store.reset
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
                    statePop: store.statePop,
                    enactedPlanToggle: store.enactedPlanToggle,
                    proposedPlanToggle: store.proposedPlanToggle,
                    oldPlanToggle: store.oldPlanToggle,
                    demPlanToggle: store.demPlanToggle,
                    repPlanToggle: store.repPlanToggle,
                    reset: store.reset
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
                    statePop: store.statePop,
                    enactedPlanToggle: store.enactedPlanToggle,
                    proposedPlanToggle: store.proposedPlanToggle,
                    oldPlanToggle: store.oldPlanToggle,
                    demPlanToggle: store.demPlanToggle,
                    repPlanToggle: store.repPlanToggle,
                    reset: store.reset
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
                    statePop: store.statePop,
                    enactedPlanToggle: store.enactedPlanToggle,
                    proposedPlanToggle: store.proposedPlanToggle,
                    oldPlanToggle: store.oldPlanToggle,
                    demPlanToggle: store.demPlanToggle,
                    repPlanToggle: store.repPlanToggle,
                    reset: store.reset
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
                    statePop: payload,
                    enactedPlanToggle: store.enactedPlanToggle,
                    proposedPlanToggle: store.proposedPlanToggle,
                    oldPlanToggle: store.oldPlanToggle,
                    demPlanToggle: store.demPlanToggle,
                    repPlanToggle: store.repPlanToggle,
                    reset: store.reset
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
                    statePop: store.statePop,
                    enactedPlanToggle: store.enactedPlanToggle,
                    proposedPlanToggle: store.proposedPlanToggle,
                    oldPlanToggle: store.oldPlanToggle,
                    demPlanToggle: store.demPlanToggle,
                    repPlanToggle: store.repPlanToggle,
                    reset: store.reset
                });
            }
            case GlobalStoreActions.ENABLE_ENACTED_PLAN:{
                return setStore({
                    isSidePanelVisible: store.isSidePanelVisible,
                    isMapSettingsVisible: store.isMapSettingsVisible,
                    currentDistrict: store.currentDistrict,
                    TNzoom: store.TNzoom,
                    MSzoom: store.MSzoom,
                    map: store.map,
                    currentState: store.currentState,
                    districtPlan: store.districtPlan,
                    countyToggle: store.countyToggle,
                    statePop: store.statePop,
                    enactedPlanToggle: true,
                    proposedPlanToggle: store.proposedPlanToggle,
                    oldPlanToggle: store.oldPlanToggle,
                    demPlanToggle: store.demPlanToggle,
                    repPlanToggle: store.repPlanToggle,
                    reset: store.reset
                });
            }
            case GlobalStoreActions.DISABLE_ENACTED_PLAN:{
                return setStore({
                    isSidePanelVisible: store.isSidePanelVisible,
                    isMapSettingsVisible: store.isMapSettingsVisible,
                    currentDistrict: store.currentDistrict,
                    TNzoom: store.TNzoom,
                    MSzoom: store.MSzoom,
                    map: store.map,
                    currentState: store.currentState,
                    districtPlan: store.districtPlan,
                    countyToggle: store.countyToggle,
                    statePop: store.statePop,
                    enactedPlanToggle: false,
                    proposedPlanToggle: store.proposedPlanToggle,
                    oldPlanToggle: store.oldPlanToggle,
                    demPlanToggle: store.demPlanToggle,
                    repPlanToggle: store.repPlanToggle,
                    reset: store.reset
                });
            }
            case GlobalStoreActions.ENABLE_PROPOSED_PLAN:{
                return setStore({
                    isSidePanelVisible: store.isSidePanelVisible,
                    isMapSettingsVisible: store.isMapSettingsVisible,
                    currentDistrict: store.currentDistrict,
                    TNzoom: store.TNzoom,
                    MSzoom: store.MSzoom,
                    map: store.map,
                    currentState: store.currentState,
                    districtPlan: store.districtPlan,
                    countyToggle: store.countyToggle,
                    statePop: store.statePop,
                    enactedPlanToggle: store.enactedPlanToggle,
                    proposedPlanToggle: true,
                    oldPlanToggle: store.oldPlanToggle,
                    demPlanToggle: store.demPlanToggle,
                    repPlanToggle: store.repPlanToggle,
                    reset: store.reset
                });
            }
            case GlobalStoreActions.DISABLE_PROPOSED_PLAN:{
                return setStore({
                    isSidePanelVisible: store.isSidePanelVisible,
                    isMapSettingsVisible: store.isMapSettingsVisible,
                    currentDistrict: store.currentDistrict,
                    TNzoom: store.TNzoom,
                    MSzoom: store.MSzoom,
                    map: store.map,
                    currentState: store.currentState,
                    districtPlan: store.districtPlan,
                    countyToggle: store.countyToggle,
                    statePop: store.statePop,
                    enactedPlanToggle: store.enactedPlanToggle,
                    proposedPlanToggle: false,
                    oldPlanToggle: store.oldPlanToggle,
                    demPlanToggle: store.demPlanToggle,
                    repPlanToggle: store.repPlanToggle,
                    reset: store.reset
                });
            }
            case GlobalStoreActions.ENABLE_OLD_PLAN:{
                return setStore({
                    isSidePanelVisible: store.isSidePanelVisible,
                    isMapSettingsVisible: store.isMapSettingsVisible,
                    currentDistrict: store.currentDistrict,
                    TNzoom: store.TNzoom,
                    MSzoom: store.MSzoom,
                    map: store.map,
                    currentState: store.currentState,
                    districtPlan: store.districtPlan,
                    countyToggle: store.countyToggle,
                    statePop: store.statePop,
                    enactedPlanToggle: store.enactedPlanToggle,
                    proposedPlanToggle: store.proposedPlanToggle,
                    oldPlanToggle: true,
                    demPlanToggle: store.demPlanToggle,
                    repPlanToggle: store.repPlanToggle,
                    reset: store.reset
                });
            }
            case GlobalStoreActions.DISABLE_OLD_PLAN:{
                return setStore({
                    isSidePanelVisible: store.isSidePanelVisible,
                    isMapSettingsVisible: store.isMapSettingsVisible,
                    currentDistrict: store.currentDistrict,
                    TNzoom: store.TNzoom,
                    MSzoom: store.MSzoom,
                    map: store.map,
                    currentState: store.currentState,
                    districtPlan: store.districtPlan,
                    countyToggle: store.countyToggle,
                    statePop: store.statePop,
                    enactedPlanToggle: store.enactedPlanToggle,
                    proposedPlanToggle: store.proposedPlanToggle,
                    oldPlanToggle: false,
                    demPlanToggle: store.demPlanToggle,
                    repPlanToggle: store.repPlanToggle,
                    reset: store.reset
                });
            }
            case GlobalStoreActions.ENABLE_DEM_PLAN:{
                return setStore({
                    isSidePanelVisible: store.isSidePanelVisible,
                    isMapSettingsVisible: store.isMapSettingsVisible,
                    currentDistrict: store.currentDistrict,
                    TNzoom: store.TNzoom,
                    MSzoom: store.MSzoom,
                    map: store.map,
                    currentState: store.currentState,
                    districtPlan: store.districtPlan,
                    countyToggle: store.countyToggle,
                    statePop: store.statePop,
                    enactedPlanToggle: store.enactedPlanToggle,
                    proposedPlanToggle: store.proposedPlanToggle,
                    oldPlanToggle: store.oldPlanToggle,
                    demPlanToggle: true,
                    repPlanToggle: store.repPlanToggle,
                    reset: store.reset
                });
            }
            case GlobalStoreActions.DISABLE_DEM_PLAN:{
                return setStore({
                    isSidePanelVisible: store.isSidePanelVisible,
                    isMapSettingsVisible: store.isMapSettingsVisible,
                    currentDistrict: store.currentDistrict,
                    TNzoom: store.TNzoom,
                    MSzoom: store.MSzoom,
                    map: store.map,
                    currentState: store.currentState,
                    districtPlan: store.districtPlan,
                    countyToggle: store.countyToggle,
                    statePop: store.statePop,
                    enactedPlanToggle: store.enactedPlanToggle,
                    proposedPlanToggle: store.proposedPlanToggle,
                    oldPlanToggle: store.oldPlanToggle,
                    demPlanToggle: false,
                    repPlanToggle: store.repPlanToggle,
                    reset: store.reset
                });
            }
            case GlobalStoreActions.ENABLE_REP_PLAN:{
                return setStore({
                    isSidePanelVisible: store.isSidePanelVisible,
                    isMapSettingsVisible: store.isMapSettingsVisible,
                    currentDistrict: store.currentDistrict,
                    TNzoom: store.TNzoom,
                    MSzoom: store.MSzoom,
                    map: store.map,
                    currentState: store.currentState,
                    districtPlan: store.districtPlan,
                    countyToggle: store.countyToggle,
                    statePop: store.statePop,
                    enactedPlanToggle: store.enactedPlanToggle,
                    proposedPlanToggle: store.proposedPlanToggle,
                    oldPlanToggle: store.oldPlanToggle,
                    demPlanToggle: store.demPlanToggle,
                    repPlanToggle: true,
                    reset: store.reset
                });
            }
            case GlobalStoreActions.DISABLE_REP_PLAN:{
                return setStore({
                    isSidePanelVisible: store.isSidePanelVisible,
                    isMapSettingsVisible: store.isMapSettingsVisible,
                    currentDistrict: store.currentDistrict,
                    TNzoom: store.TNzoom,
                    MSzoom: store.MSzoom,
                    map: store.map,
                    currentState: store.currentState,
                    districtPlan: store.districtPlan,
                    countyToggle: store.countyToggle,
                    statePop: store.statePop,
                    enactedPlanToggle: store.enactedPlanToggle,
                    proposedPlanToggle: store.proposedPlanToggle,
                    oldPlanToggle: store.oldPlanToggle,
                    demPlanToggle: store.demPlanToggle,
                    repPlanToggle: false,
                    reset: store.reset
                });
            }
            case GlobalStoreActions.RESET_APP:{
                return setStore({
                    isSidePanelVisible: false,
                    isMapSettingsVisible: false,
                    currentDistrict: null,
                    TNzoom: false,
                    MSzoom: false,
                    map: null,
                    currentState: null,
                    districtPlan: 0,
                    countyToggle: false,
                    statePop: 0,
                    enactedPlanToggle: true,
                    proposedPlanToggle: false,
                    oldPlanToggle: false,
                    demPlanToggle: false,
                    repPlanToggle: false,
                    reset: payload
                });
            }
            default:
                return store;
        }
    }

    store.enableEnactedPlan = async function () {
        let val = true;
        storeReducer({
            type: GlobalStoreActions.ENABLE_ENACTED_PLAN,
            payload:{}
        });
    }
    store.disableEnactedPlan = async function(){
        storeReducer({
            type: GlobalStoreActions.DISABLE_ENACTED_PLAN,
            payload:{}
        });
    }

    store.enableProposedPlan = async function(){
        storeReducer({
            type: GlobalStoreActions.ENABLE_PROPOSED_PLAN,
            payload:{}
        });
    }
    store.disableProposedPlan = async function(){
        storeReducer({
            type: GlobalStoreActions.DISABLE_PROPOSED_PLAN,
            payload:{}
        });
    }

    store.enableOldPlan = async function(){
        storeReducer({
            type: GlobalStoreActions.ENABLE_OLD_PLAN,
            payload:{}
        });
    }
    store.disableOldPlan = async function(){
        storeReducer({
            type: GlobalStoreActions.DISABLE_OLD_PLAN,
            payload:{}
        });
    }

    store.enableDemPlan = async function(){
        storeReducer({
            type: GlobalStoreActions.ENABLE_DEM_PLAN,
            payload:{}
        });
    }
    store.disableDemPlan = async function(){
        storeReducer({
            type: GlobalStoreActions.DISABLE_DEM_PLAN,
            payload:{}
        });
    }
    
    store.enableRepPlan = async function(){
        storeReducer({
            type: GlobalStoreActions.ENABLE_REP_PLAN,
            payload:{}
        });
    }
    store.disableRepPlan = async function (){
        storeReducer({
            type: GlobalStoreActions.DISABLE_REP_PLAN,
            payload:{}
        });
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
    store.resetApp = function (bool) {
        storeReducer({
            type: GlobalStoreActions.RESET_APP,
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