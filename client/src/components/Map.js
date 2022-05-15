import * as React from 'react';
import { useState, useEffect, useRef, useCallback, useContext} from 'react';
import mapboxgl from 'mapbox-gl';
import { GlobalStore } from './DataStore';
import MouseTooltip from 'react-sticky-mouse-tooltip';
import SidePanel from './SidePanel';
import {getState}  from '../Controllers/StateController';
import MapSettings from './MapSettings';

var tnDistricts = require('../district-data/TN/tnDistricts.geojson');
var msDistricts = require('../district-data/MS/msDistricts.geojson');
var ncDistricts = require('../district-data/NC/ncDistricts.json');
var tnCounties = require('../district-data/TN/tnCounties.geojson');
var msCounties = require('../district-data/MS/msCounties.geojson');
var ncCounties = require('../district-data/NC/NCCounties.json');
var oldMSDistricts = require('../district-data/MS/OldMSDistricts.json');
var oldTNDistricts = require('../district-data/TN/OldTNDistricts.json');
var oldNCDistricts = require('../district-data/NC/OldNCDistricts.json');
var tnBoundary = require('../district-data/TN/Tennessee-State.json');
var msBoundary = require('../district-data/MS/Mississippi-State.json');
var ncBoundary = require('../district-data/NC/NorthCarolina-State.json');
var msProposed = require('../district-data/MS/MS-Dem-proposed.json');
var ncProposed = require('../district-data/NC/NCProposed-Rejected.json');
var tnOldSplitCounties = require('../district-data/TN/tnOldSplitCounties.json');
var tnEnactedSplitCounties = require('../district-data/TN/tnEnactedSplitCounties.json');
var msOldSplitCounties = require('../district-data/MS/msOldSplitCounties.json');
var msEnactedSplitCounties = require('../district-data/MS/msEnactedSplitCounties.json');
var msProposedSplitCounties = require('../district-data/MS/msProposedSplitCounties.json');
var ncOldSplitCounties = require('../district-data/NC/ncOldSplitCounties.json');
var ncEnactedSplitCounties = require('../district-data/NC/ncEnactedSplitCounties.json');
var ncProposedSplitCounties = require('../district-data/NC/ncProposedSplitCounties.json');

const STATE_ID={
    TN: "TN",
    MS: "MS",
    NC: "NC"
}
const TN = 1
const MS = 2
const NC = 3

function DistMap(props) {
    let { store } = useContext(GlobalStore);
    const [map, setMap] = useState(null);
    const mapContainer = useRef("");
    const [hoveredDistrict, setHoveredDistrict1] = useState(null);
    const [hoveredState, setHoveredState1] = useState(null);
    const [demVotes, setDemVotes] = useState(0);
    const [repVotes, setRepVotes] = useState(0);
    const hoveredDistrictRef = useRef(hoveredDistrict);
    const hoveredStateRef = useRef(hoveredState);
    const [distHover, setDistHover] = useState(false);
    const [stateHover, setStateHover] = useState(false);
    const [distHoverNum, setDistHoverNum] = useState(0);
    const [distClicked, setDistClicked] = useState(false);
    const [clickedState, setClickedState] = useState(null);
    const clickedStateRef = useRef(clickedState);
    const [stateClicked, setStateClicked] = useState(false);
    const [distPlan, setDistPlan] = useState(0);
    const [enactedSelected, setEnactedSelect] = useState(true);
    const [oldSelected, setOldSelect] = useState(false);
    const [proposedSelected, setProposedSelect] = useState(false);
    const [mapFlag, setMapFlag] = useState(0);
    let countyVis;

    if (store.enactedPlanToggle !== enactedSelected || store.proposedPlanToggle !== proposedSelected || store.oldPlanToggle !== oldSelected) {
        let enacted = store.enactedPlanToggle;
        let proposed = store.proposedPlanToggle;
        let old = store.oldPlanToggle;
        setMapFlag(1);
        setEnactedSelect(enacted);
        setProposedSelect(proposed);
        setOldSelect(old);
    }

    const styles = {
        width: "100vw",
        height: "100vh"
    };
    const hoverStyles = {
        backgroundColor: '#191970',
        color: 'white',
        padding: '2px',
        borderRadius: '5px'
    };
    const bounds = [
        [-128.947, 22.802],
        [-62.548, 51.201]
    ];
    const clickedDist=()=> {
        setDistClicked(true);
    }
    const updateStoreMap=(map)=>{
        store.updateMap(map);
    }
    const openSidePanel=()=>{
        store.loadSidePanel();
    }
    const toggleDistHover=(bool)=>{
        setDistHover(bool);
    }
    const setDistrict=(id)=>{
        setDistHoverNum(id);
    }
    const setHoveredDistrict2 = data => {
        hoveredDistrictRef.current = data;
        setHoveredDistrict1(data);
    };
    const setHoveredState2 = data => {
        hoveredStateRef.current = data;
        setStateHover(true);
        setHoveredState1(data);
    }

    const setStoreState = (id) => {
        store.setCurrentState(id);
    }

    //The id will be in the form of a 2 character string, namely "TN", "MS", or "NC." The STATE_ID constant maps the character codes to the string,
    //and the direct constants TN, MS and NC refer to enums that match those on the server side (since the function to getById from the database must be an int).
    const setState=(response)=>{
        console.log("SET STATE: ",response);
    }
    const clickState = (id) => {
        setStateClicked(true);
        setClickedState(id);
        //store.setCurrentState(id);
        store.loadSidePanel();
        store.setCurrentState(id);
        //store.loadSidePanel();
        //setStoreState(id);
        //store.loadSidePanel();
        let response;
        switch(id){
            case STATE_ID.TN:
               // fetch(`http://localhost:8080/getState?stateID=${TN}`).then(response => response.json()).then(response => {setState(response)});
                console.log('dingbat');
                break;
            case STATE_ID.MS:
                response=getState(MS);
                break;
            case STATE_ID.NC:
                response=getState(NC);
                break;
            default:
                break;
        }
    }

    const planSwitchComplete = () => {
        setMapFlag(0);
    }

    useEffect(() => {
        mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;
        const initMap = ({ setMap, mapContainer }) => {
            const map = new mapboxgl.Map({
                container: mapContainer.current,
                style: process.env.REACT_APP_MAPBOX_STYLE,
                center: [-95.953, 38.473],
                zoom: 3.87,
                maxBounds: bounds
            });

            map.on("load", function () {

                setMap(map);
                map.addSource('tn-boundary', {
                    'type': 'geojson',
                    'data': tnBoundary,
                    'promoteId': 'NAME'
                });

                map.addLayer({
                    'id': 'tn-boundary-layer',
                    'type': 'fill',
                    'source': 'tn-boundary',
                    'layout': {
                        'visibility': 'visible'
                    },
                    'paint': {
                        'fill-outline-color': 'black',
                        'fill-color': [
                            'match',
                            ['get', 'NAME'],
                            'Tennessee',
                            '#00ff1a',
                            '#ffffff'
                        ],
                        'fill-opacity': [
                            'case',
                            ['boolean', ['feature-state', 'hover'], false],
                            .9,
                            0.5
                        ]
                    }
                });

                map.addSource('ms-boundary', {
                    'type': 'geojson',
                    'data': msBoundary,
                    'promoteId': 'NAME'
                });

                map.addLayer({
                    'id': 'ms-boundary-layer',
                    'type': 'fill',
                    'source': 'ms-boundary',
                    'layout': {
                        'visibility': 'visible'
                    },
                    'paint': {
                        'fill-outline-color': 'black',
                        'fill-color': [
                            'match',
                            ['get', 'NAME'],
                            'Mississippi',
                            '#ff7700',
                            '#ffffff'
                        ],
                        'fill-opacity': [
                            'case',
                            ['boolean', ['feature-state', 'hover'], false],
                            .9,
                            0.5
                        ]
                    }
                });

                map.addSource('nc-boundary', {
                    'type': 'geojson',
                    'data': ncBoundary,
                    'promoteId': 'NAME'
                });

                map.addLayer({
                    'id': 'nc-boundary-layer',
                    'type': 'fill',
                    'source': 'nc-boundary',
                    'layout': {
                        'visibility': 'visible'
                    },
                    'paint': {
                        'fill-outline-color': 'black',
                        'fill-color': [
                            'match',
                            ['get', 'NAME'],
                            'North Carolina',
                            '#9900ff',
                            '#ffffff'
                        ],
                        'fill-opacity': [
                            'case',
                            ['boolean', ['feature-state', 'hover'], false],
                            .9,
                            0.5
                        ]
                    }
                });

                map.addSource('tn-district-source', {
                    'type': 'geojson',
                    'data': tnDistricts,
                    'promoteId': 'DISTRICT'
                 });

                map.addLayer({
                    'id': 'tn-district-layer',
                    'type': 'fill',
                    'source': 'tn-district-source',
                    'layout': {
                        'visibility': 'none'
                    },
                    'paint': {
                        'fill-outline-color': 'black',
                        'fill-color': [
                            'match',
                            ['get', 'SHORTNAME'],
                            'D1',
                            '#84a8e3',
                            'D2',
                            '#e38484',
                            'D3',
                            '#94e384',
                            'D4',
                            '#c384e3',
                            'D5',
                            '#deb06a',
                            'D6',
                            '#ed85d7',
                            'D7',
                            '#f0f086',
                            'D8',
                            '#95f0e8',
                            'D9',
                            '#4c7357',
                            '#ffffff'
                        ],
                        'fill-opacity': [
                            'case',
                            ['boolean', ['feature-state', 'hover'], false],
                            .9,
                            0.5
                        ]
                    }
                });

                map.addSource('tn-old-districts', {
                    'type': 'geojson',
                    'data': oldTNDistricts,
                    'promoteId': 'DISTRICT'
                });

                map.addLayer({
                    'id': 'tn-old-dist-layer',
                    'type': 'fill',
                    'source': 'tn-old-districts',
                    'layout': {
                        'visibility': 'none'
                    },
                    'paint': {
                        'fill-outline-color': 'black',
                        'fill-color': [
                            'match',
                            ['get', 'DISTRICT'],
                            '1',
                            '#84a8e3',
                            '2',
                            '#e38484',
                            '3',
                            '#94e384',
                            '4',
                            '#c384e3',
                            '5',
                            '#deb06a',
                            '6',
                            '#ed85d7',
                            '7',
                            '#f0f086',
                            '8',
                            '#95f0e8',
                            '9',
                            '#4c7357',
                            '#ffffff'
                        ],
                        'fill-opacity': [
                            'case',
                            ['boolean', ['feature-state', 'hover'], false],
                            .9,
                            0.5
                        ]
                    }
                });

                map.addSource('ms-district-source', {
                    'type': 'geojson',
                    'data': msDistricts,
                    'promoteId': 'District'
                });

                map.addLayer({
                    'id': 'ms-district-layer',
                    'type': 'fill',
                    'source': 'ms-district-source',
                    'layout': {
                        'visibility': 'none'
                    },
                    'paint': {
                        'fill-outline-color': 'black',
                        'fill-color': [
                            'match',
                            ['get', 'District'],
                            1,
                            '#0006ad',
                            2,
                            '#2e6b2c',
                            3,
                            '#7a336a',
                            4,
                            '#ffec42',
                            '#ffffff'
                        ],
                        'fill-opacity': [
                            'case',
                            ['boolean', ['feature-state', 'hover'], false],
                            .9,
                            0.5
                        ]
                    }
                });

                map.addSource('ms-old-districts', {
                    'type': 'geojson',
                    'data': oldMSDistricts,
                    'promoteId': "DISTRICT"
                });

                map.addLayer({
                    'id': 'ms-old-dist-layer',
                    'type': 'fill',
                    'source': 'ms-old-districts',
                    'layout': {
                        'visibility': 'none'
                    },
                    'paint': {
                        'fill-outline-color': 'black',
                        'fill-color': [
                            'match',
                            ['get', 'DISTRICT'],
                            '1',
                            '#0006ad',
                            '2',
                            '#2e6b2c',
                            '3',
                            '#7a336a',
                            '4',
                            '#ffec42',
                            '#ffffff'
                        ],
                        'fill-opacity': [
                            'case',
                            ['boolean', ['feature-state', 'hover'], false],
                            .9,
                            0.5
                        ]
                    }
                });

                map.addSource('ms-proposed-districts', {
                    'type': 'geojson',
                    'data': msProposed,
                    'promoteId': "DISTRICT"
                });

                map.addLayer({
                    'id': 'ms-proposed-layer',
                    'type': 'fill',
                    'source': 'ms-proposed-districts',
                    'layout': {
                        'visibility': 'none'
                    },
                    'paint': {
                        'fill-outline-color': 'black',
                        'fill-color': [
                            'match',
                            ['get', 'DISTRICT'],
                            '01',
                            '#0006ad',
                            '02',
                            '#2e6b2c',
                            '03',
                            '#7a336a',
                            '04',
                            '#ffec42',
                            '#ffffff'
                        ],
                        'fill-opacity': [
                            'case',
                            ['boolean', ['feature-state', 'hover'], false],
                            .9,
                            0.5
                        ]
                    }
                });

                map.addSource('nc-district-source', {
                    'type': 'geojson',
                    'data': ncDistricts,
                    'promoteId': 'District_A'
                });

                map.addLayer({
                    'id': 'nc-district-layer',
                    'type': 'fill',
                    'source': 'nc-district-source',
                    'layout': {
                        'visibility': 'none'
                    },
                    'paint': {
                        'fill-outline-color': 'black',
                        'fill-color': [
                            'match',
                            ['get', 'District_A'],
                            1,
                            '#e6194B',
                            2,
                            '#4363d8',
                            3,
                            '#ffe119',
                            4,
                            '#911eb4',
                            5,
                            '#800000',
                            6,
                            '#42d4f4',
                            7,
                            '#aaffc3',
                            8,
                            '#f032e6',
                            9,
                            '#3cb44b',
                            10,
                            '#f58231',
                            11,
                            '#469990',
                            12,
                            '#bfef45',
                            13,
                            '#9A6324',
                            14,
                            '#000075',
                            '#ffffff'
                        ],
                        'fill-opacity': [
                            'case',
                            ['boolean', ['feature-state', 'hover'], false],
                            .9, 
                            0.5
                        ]
                    }
                });

                map.addSource('nc-old-districts', {
                    'type': 'geojson',
                    'data': oldNCDistricts,
                    'promoteId': 'DISTRICT'
                });

                map.addLayer({
                    'id': 'nc-old-dist-layer',
                    'type': 'fill',
                    'source': 'nc-old-districts',
                    'layout': {
                        'visibility': 'none'
                    },
                    'paint': {
                        'fill-outline-color': 'black',
                        'fill-color': [
                            'match',
                            ['get', 'DISTRICT'],
                            '1',
                            '#e6194B',
                            '2',
                            '#4363d8',
                            '3',
                            '#ffe119',
                            '4',
                            '#911eb4',
                            '5',
                            '#800000',
                            '6',
                            '#42d4f4',
                            '7',
                            '#aaffc3',
                            '8',
                            '#f032e6',
                            '9',
                            '#3cb44b',
                            '10',
                            '#f58231',
                            '11',
                            '#469990',
                            '12',
                            '#bfef45',
                            '13',
                            '#9A6324',
                            '#ffffff'
                        ],
                        'fill-opacity': [
                            'case',
                            ['boolean', ['feature-state', 'hover'], false],
                            .9, 
                            0.5
                        ]
                    }
                });

                map.addSource('nc-proposed-districts', {
                    'type': 'geojson',
                    'data': ncProposed,
                    'promoteId': 'DISTRICT'
                });

                map.addLayer({
                    'id': 'nc-proposed-layer',
                    'type': 'fill',
                    'source': 'nc-proposed-districts',
                    'layout': {
                        'visibility': 'none'
                    },
                    'paint': {
                        'fill-outline-color': 'black',
                        'fill-color': [
                            'match',
                            ['get', 'DISTRICT'],
                            '1',
                            '#e6194B',
                            '2',
                            '#4363d8',
                            '3',
                            '#ffe119',
                            '4',
                            '#911eb4',
                            '5',
                            '#800000',
                            '6',
                            '#42d4f4',
                            '7',
                            '#aaffc3',
                            '8',
                            '#f032e6',
                            '9',
                            '#3cb44b',
                            '10',
                            '#f58231',
                            '11',
                            '#469990',
                            '12',
                            '#bfef45',
                            '13',
                            '#9A6324',
                            '14',
                            '#000075',
                            '#ffffff'
                        ],
                        'fill-opacity': [
                            'case',
                            ['boolean', ['feature-state', 'hover'], false],
                            .9, 
                            0.5
                        ]
                    }
                });

                map.addSource('tn-county-source', {
                    'type': 'geojson',
                    'data': tnCounties,
                    'promoteId': 'NAME'
                });

                map.addLayer({
                    'id': 'tn-county-layer',
                    'type': 'line',
                    'source': 'tn-county-source',
                    'layout': {
                        'visibility': 'none'
                    },
                    'paint': {
                        'line-color': '#808080',
                        'line-width': 1
                    }
                });

                map.addSource('ms-county-source', {
                    'type': 'geojson',
                    'data': msCounties,
                    'promoteId': 'NAME'
                });

                map.addLayer({
                    'id': 'ms-county-layer',
                    'type': 'line',
                    'source': 'ms-county-source',
                    'layout': {
                        'visibility': 'none'
                    },
                    'paint': {
                        'line-color': '#808080',
                        'line-width': 0.7
                    }
                });

                map.addSource('nc-county-source', {
                    'type': 'geojson',
                    'data': ncCounties,
                    'promoteId': 'NAME'
                });

                map.addLayer({
                    'id': 'nc-county-layer',
                    'type': 'line',
                    'source': 'nc-county-source',
                    'layout': {
                        'visibility': 'none'
                    },
                    'paint': {
                        'line-color': '#808080',
                        'line-width': 0.7
                    }
                });

                map.addSource('tn-old-split-county-source', {
                    'type': 'geojson',
                    'data': tnOldSplitCounties,
                    'promoteId': 'NAME'
                });

                map.addLayer({
                    'id': 'tn-old-split-layer',
                    'type': 'line',
                    'source': 'tn-old-split-county-source',
                    'layout': {
                        'visibility': 'none'
                    },
                    'paint': {
                        'line-color': '#808080',
                        'line-width': 0.7
                    }
                });

                map.addSource('tn-enacted-split-county-source', {
                    'type': 'geojson',
                    'data': tnEnactedSplitCounties,
                    'promoteId': 'NAME'
                });

                map.addLayer({
                    'id': 'tn-enacted-split-layer',
                    'type': 'line',
                    'source': 'tn-enacted-split-county-source',
                    'layout': {
                        'visibility': 'none'
                    },
                    'paint': {
                        'line-color': '#808080',
                        'line-width': 0.7
                    }
                });

                map.addSource('ms-old-split-county-source', {
                    'type': 'geojson',
                    'data': msOldSplitCounties,
                    'promoteId': 'NAME'
                });

                map.addLayer({
                    'id': 'ms-old-split-layer',
                    'type': 'line',
                    'source': 'ms-old-split-county-source',
                    'layout': {
                        'visibility': 'none'
                    },
                    'paint': {
                        'line-color': '#808080',
                        'line-width': 0.7
                    }
                });

                // map.addSource('ms-enacted-split-county-source', {
                //     'type': 'geojson',
                //     'data': msEnactedSplitCounties,
                //     'promoteId': 'NAME'
                // });

                // map.addLayer({
                //     'id': 'ms-old-split-layer',
                //     'type': 'line',
                //     'source': 'ms-old-split-county-source',
                //     'layout': {
                //         'visibility': 'none'
                //     },
                //     'paint': {
                //         'line-color': '#808080',
                //         'line-width': 0.7
                //     }
                // });

                map.on('mouseleave', 'tn-boundary-layer', function () {
                    if (hoveredStateRef.current) {
                        map.setFeatureState(
                            {source: 'tn-boundary', id: hoveredStateRef.current },
                            {hover: false}
                        );
                    }
                    setHoveredState2(null);
                    setStateHover(false);
                });
                map.on('mouseleave', 'ms-boundary-layer', function () {
                    if (hoveredStateRef.current) {
                        map.setFeatureState(
                            {source: 'ms-boundary', id: hoveredStateRef.current },
                            {hover: false}
                        );
                    }
                    setHoveredState2(null);
                    setStateHover(false);
                });
                map.on('mouseleave', 'nc-boundary-layer', function () {
                    setStateHover(false);
                    if (hoveredStateRef.current) {
                        map.setFeatureState(
                            {source: 'nc-boundary', id: hoveredStateRef.current },
                            {hover: false}
                        );
                    }
                    setHoveredState2(null);
                    setStateHover(false);
                });

                map.on('mouseleave', 'ms-district-layer', function () {
                    console.log(store.map);
                    if (hoveredDistrictRef.current) {
                        map.setFeatureState(
                            { source: 'ms-district-source', id: hoveredDistrictRef.current },
                            { hover: false }
                        );
                    }
                    setHoveredDistrict2(null);
                    toggleDistHover(false);
                });

                map.on('mouseleave', 'ms-old-dist-layer', function () {
                    //console.log(store.map);
                    if (hoveredDistrictRef.current) {
                        map.setFeatureState(
                            { source: 'ms-old-districts', id: hoveredDistrictRef.current },
                            { hover: false }
                        );
                    }
                    setHoveredDistrict2(null);
                    toggleDistHover(false);
                });

                map.on('mouseleave', 'ms-proposed-layer', function () {
                    if (hoveredDistrictRef.current) {
                        map.setFeatureState(
                            { source: 'ms-proposed-districts', id: hoveredDistrictRef.current },
                            { hover: false }
                        );
                    }
                    setHoveredDistrict2(null);
                    toggleDistHover(false);
                });

                map.on('mouseleave', 'tn-district-layer', function () {
                    if (hoveredDistrictRef.current) {
                        map.setFeatureState(
                            { source: 'tn-district-source', id: hoveredDistrictRef.current },
                            { hover: false }
                        );
                    }
                    setHoveredDistrict2(null);
                    toggleDistHover(false);
                });

                map.on('mouseleave', 'tn-old-dist-layer', function () {
                    if (hoveredDistrictRef.current) {
                        map.setFeatureState(
                            { source: 'tn-old-districts', id: hoveredDistrictRef.current },
                            { hover: false }
                        );
                    }
                    setHoveredDistrict2(null);
                    toggleDistHover(false);
                });

                map.on('mouseleave', 'nc-district-layer', function () {
                    if (hoveredDistrictRef.current) {
                        map.setFeatureState(
                            { source: 'nc-district-source', id: hoveredDistrictRef.current },
                            { hover: false }
                        );
                    }
                    setHoveredDistrict2(null);
                    toggleDistHover(false);
                });

                map.on('mouseleave', 'nc-old-dist-layer', function () {
                    if (hoveredDistrictRef.current) {
                        map.setFeatureState(
                            { source: 'nc-old-districts', id: hoveredDistrictRef.current },
                            { hover: false }
                        );
                    }
                    setHoveredDistrict2(null);
                    toggleDistHover(false);
                });

                map.on('mouseleave', 'nc-proposed-layer', function () {
                    if (hoveredDistrictRef.current) {
                        map.setFeatureState(
                            { source: 'nc-proposed-districts', id: hoveredDistrictRef.current },
                            { hover: false }
                        );
                    }
                    setHoveredDistrict2(null);
                    toggleDistHover(false);
                });

                map.on('mousemove', 'tn-boundary-layer', function (e) {
                    setStateHover(true);
                    if ((e.features.length > 0) && !stateClicked) {
                        let hoveredState1 = e.features[0].id;
                        map.setFeatureState(
                            { source: 'tn-boundary', id: hoveredState1 },
                            { hover: true }
                        );
                        setHoveredState2(hoveredState1);
                    }
                });
                map.on('mousemove', 'ms-boundary-layer', function (e) {
                    setStateHover(true);
                    if ((e.features.length > 0) && !stateClicked) {
                        let hoveredState1 = e.features[0].id;
                        map.setFeatureState(
                            { source: 'ms-boundary', id: hoveredState1 },
                            { hover: true }
                        );
                        setHoveredState2(hoveredState1);
                    }
                });
                map.on('mousemove', 'nc-boundary-layer', function (e) {
                    setStateHover(true);
                    if ((e.features.length > 0) && !stateClicked) {
                        let hoveredState1 = e.features[0].id;
                        map.setFeatureState(
                            { source: 'nc-boundary', id: hoveredState1 },
                            { hover: true }
                        );
                        setHoveredState2(hoveredState1);
                    }
                });

                map.on('mousemove', 'tn-district-layer', function (e) {
                    if ((e.features.length > 0) && !distClicked) {
                        if (hoveredDistrictRef.current && hoveredDistrictRef.current > -1) {
                            map.setFeatureState(
                                { source: 'tn-district-source', id: hoveredDistrictRef.current },
                                { hover: false }
                            );
                        }
                        let hoveredDistrict1 = e.features[0].properties.DISTRICT;
                        map.setFeatureState(
                            { source: 'tn-district-source', id: hoveredDistrict1 },
                            { hover: true }
                        );
                        setHoveredDistrict2(hoveredDistrict1);
                        toggleDistHover(true);
                        setDistrict(hoveredDistrict1);
                    }
                });

                map.on('mousemove', 'tn-old-dist-layer', function (e) {
                    if ((e.features.length > 0) && !distClicked) {
                        if (hoveredDistrictRef.current && hoveredDistrictRef.current > -1) {
                            map.setFeatureState(
                                { source: 'tn-old-districts', id: hoveredDistrictRef.current },
                                { hover: false }
                            );
                        }
                        let hoveredDistrict1 = parseInt(e.features[0].properties.DISTRICT);
                        map.setFeatureState(
                            { source: 'tn-old-districts', id: hoveredDistrict1 },
                            { hover: true }
                        );
                        setHoveredDistrict2(hoveredDistrict1);
                        toggleDistHover(true);
                        setDistrict(hoveredDistrict1);
                    }
                });

                map.on('mousemove', 'ms-district-layer', function (e) {
                    if ((e.features.length > 0) && !distClicked) {
                        if (hoveredDistrictRef.current && hoveredDistrictRef.current > -1) {
                            map.setFeatureState(
                                { source: 'ms-district-source', id: hoveredDistrictRef.current },
                                { hover: false }
                            );
                        }
                        let hoveredDistrict1 = e.features[0].properties.District;
                        map.setFeatureState(
                            { source: 'ms-district-source', id: hoveredDistrict1 },
                            { hover: true }
                        );
                        setHoveredDistrict2(hoveredDistrict1);
                        toggleDistHover(true);
                        setDistrict(hoveredDistrict1);                        
                    }
                });

                map.on('mousemove', 'ms-old-dist-layer', function (e) {
                    if ((e.features.length > 0) && !distClicked) {
                        if (hoveredDistrictRef.current && hoveredDistrictRef.current > -1) {
                            map.setFeatureState(
                                { source: 'ms-old-districts', id: hoveredDistrictRef.current },
                                { hover: false }
                            );
                        }
                        let hoveredDistrict1 = parseInt(e.features[0].properties.DISTRICT);
                        map.setFeatureState(
                            { source: 'ms-old-districts', id: hoveredDistrict1 },
                            { hover: true }
                        );
                        setHoveredDistrict2(hoveredDistrict1);
                        toggleDistHover(true);
                        setDistrict(hoveredDistrict1);
                    }
                });

                map.on('mousemove', 'ms-proposed-layer', function (e) {
                    if ((e.features.length > 0) && !distClicked) {
                        if (hoveredDistrictRef.current && hoveredDistrictRef.current > -1) {
                            map.setFeatureState(
                                { source: 'ms-proposed-districts', id: hoveredDistrictRef.current },
                                { hover: false }
                            );
                        }
                        let hoveredDistrict1 = parseInt(e.features[0].properties.DISTRICT);
                        map.setFeatureState(
                            { source: 'ms-proposed-districts', id: hoveredDistrict1 },
                            { hover: true }
                        );
                        setHoveredDistrict2(hoveredDistrict1);
                        toggleDistHover(true);
                        setDistrict(hoveredDistrict1);
                    }
                });

                map.on('mousemove', 'nc-district-layer', function (e) {
                    if ((e.features.length > 0) && !distClicked) {
                        if (hoveredDistrictRef.current && hoveredDistrictRef.current > -1) {
                            map.setFeatureState(
                                { source: 'nc-district-source', id: hoveredDistrictRef.current },
                                { hover: false }
                            );
                        }
                        let hoveredDistrict1 = e.features[0].properties.District_A;
                        map.setFeatureState(
                            { source: 'nc-district-source', id: hoveredDistrict1 },
                            { hover: true }
                        );
                        setHoveredDistrict2(hoveredDistrict1);
                        toggleDistHover(true);
                        setDistrict(hoveredDistrict1);                        
                    }
                });

                map.on('mousemove', 'nc-old-dist-layer', function (e) {
                    if ((e.features.length > 0) && !distClicked) {
                        if (hoveredDistrictRef.current && hoveredDistrictRef.current > -1) {
                            map.setFeatureState(
                                { source: 'nc-old-districts', id: hoveredDistrictRef.current },
                                { hover: false }
                            );
                        }
                        let hoveredDistrict1 = parseInt(e.features[0].properties.DISTRICT);
                        map.setFeatureState(
                            { source: 'nc-old-districts', id: hoveredDistrict1 },
                            { hover: true }
                        );
                        setHoveredDistrict2(hoveredDistrict1);
                        toggleDistHover(true);
                        setDistrict(hoveredDistrict1);
                    }
                });

                map.on('mousemove', 'nc-proposed-layer', function (e) {
                    if ((e.features.length > 0) && !distClicked) {
                        if (hoveredDistrictRef.current && hoveredDistrictRef.current > -1) {
                            map.setFeatureState(
                                { source: 'nc-proposed-districts', id: hoveredDistrictRef.current },
                                { hover: false }
                            );
                        }
                        let hoveredDistrict1 = parseInt(e.features[0].properties.DISTRICT);
                        map.setFeatureState(
                            { source: 'nc-proposed-districts', id: hoveredDistrict1 },
                            { hover: true }
                        );
                        setHoveredDistrict2(hoveredDistrict1);
                        toggleDistHover(true);
                        setDistrict(hoveredDistrict1);
                    }
                });

                map.on('click', 'tn-boundary-layer', function (e) {
                    clickState("TN");
                    map.setLayoutProperty('ms-district-layer', 'visibility', 'none');
                    map.setLayoutProperty('ms-old-dist-layer', 'visibility', 'none');
                    map.setLayoutProperty('ms-proposed-layer', 'visibility', 'none');
                    map.setLayoutProperty('ms-boundary-layer', 'visibility', 'visible');
                    map.setLayoutProperty('nc-district-layer', 'visibility', 'none');
                    map.setLayoutProperty('nc-old-dist-layer', 'visibility', 'none');
                    map.setLayoutProperty('nc-proposed-layer', 'visibility', 'none');
                    map.setLayoutProperty('nc-boundary-layer', 'visibility', 'visible');
                    map.flyTo({
                        center: [-88.956, 35.761],
                        zoom: 5.77
                    });
                    map.setLayoutProperty('tn-boundary-layer', 'visibility', 'none');
                    map.setLayoutProperty('tn-district-layer', 'visibility', 'visible');
                });

                map.on('click', 'ms-boundary-layer', function (e) {
                    clickState("MS");
                    map.setLayoutProperty('tn-district-layer', 'visibility', 'none');
                    map.setLayoutProperty('tn-old-dist-layer', 'visibility', 'none');
                    map.setLayoutProperty('tn-boundary-layer', 'visibility', 'visible');
                    map.setLayoutProperty('nc-district-layer', 'visibility', 'none');
                    map.setLayoutProperty('nc-old-dist-layer', 'visibility', 'none');
                    map.setLayoutProperty('nc-proposed-layer', 'visibility', 'none');
                    map.setLayoutProperty('nc-boundary-layer', 'visibility', 'visible');
                    map.flyTo({
                        center: [-91.665, 32.780],
                        zoom: 5.83
                    });
                    map.setLayoutProperty('ms-boundary-layer', 'visibility', 'none');
                    map.setLayoutProperty('ms-district-layer', 'visibility', 'visible');
                });

                map.on('click', 'nc-boundary-layer', function (e) {
                    clickState("NC");
                    map.setLayoutProperty('ms-district-layer', 'visibility', 'none');
                    map.setLayoutProperty('ms-old-dist-layer', 'visibility', 'none');
                    map.setLayoutProperty('ms-proposed-layer', 'visibility', 'none');
                    map.setLayoutProperty('ms-boundary-layer', 'visibility', 'visible');
                    map.setLayoutProperty('tn-district-layer', 'visibility', 'none');
                    map.setLayoutProperty('tn-old-dist-layer', 'visibility', 'none');
                    map.setLayoutProperty('nc-boundary-layer', 'visibility', 'visible');
                    map.flyTo({
                        center: [-82.121, 35.480],
                        zoom: 5.61
                    });
                    map.setLayoutProperty('nc-boundary-layer', 'visibility', 'none');
                    map.setLayoutProperty('nc-district-layer', 'visibility', 'visible');
                });
            });
            if (!map) {
                updateStoreMap(mapContainer);
            } else {
                updateStoreMap(map);
            }
        };
        if (!map) {initMap({ setMap, mapContainer });}
        if (mapFlag === 1) {
            if (enactedSelected) {
                if(clickedState === 'TN'){
                    map.setLayoutProperty('tn-district-layer', 'visibility', 'visible');
                }
                else if(clickedState === 'MS') {
                    map.setLayoutProperty('ms-district-layer', 'visibility', 'visible');
                }
                else if(clickedState === 'NC') {
                    map.setLayoutProperty('nc-district-layer', 'visibility', 'visible');
                }
            }
            else {
                if(clickedState === 'TN'){
                    map.setLayoutProperty('tn-district-layer', 'visibility', 'none');
                }
                else if(clickedState === 'MS') {
                    map.setLayoutProperty('ms-district-layer', 'visibility', 'none');
                }
                else if(clickedState === 'NC') {
                    map.setLayoutProperty('nc-district-layer', 'visibility', 'none');
                }
            }
            if (oldSelected) {
                if(clickedState === 'TN'){
                    map.setLayoutProperty('tn-old-dist-layer', 'visibility', 'visible');
                }
                else if(clickedState === 'MS'){
                    map.setLayoutProperty('ms-old-dist-layer', 'visibility', 'visible');
                }
                else if(clickedState === 'NC'){
                    map.setLayoutProperty('nc-old-dist-layer', 'visibility', 'visible');
                }
            }
            else {
                if(clickedState === 'TN'){
                    map.setLayoutProperty('tn-old-dist-layer', 'visibility', 'none');
                }
                else if(clickedState === 'MS'){
                    map.setLayoutProperty('ms-old-dist-layer', 'visibility', 'none');
                }
                else if(clickedState === 'NC'){
                    map.setLayoutProperty('nc-old-dist-layer', 'visibility', 'none');
                }
            }
            if (proposedSelected) {
                if(clickedState === 'MS'){
                    map.setLayoutProperty('ms-proposed-layer', 'visibility', 'visible');
                }
                else if(clickedState === 'NC'){
                    map.setLayoutProperty('nc-proposed-layer', 'visibility', 'visible');
                }
            }
            else {
                if(clickedState === 'MS'){
                    map.setLayoutProperty('ms-proposed-layer', 'visibility', 'none');
                }
                else if(clickedState === 'NC'){
                    map.setLayoutProperty('nc-proposed-layer', 'visibility', 'none');
                }
            }
            planSwitchComplete();
        }
    }, [map, mapFlag, clickedState]);
    //console.log("map rerender");
    return (
        <div>
            <MouseTooltip visible={stateHover} offsetX={10} offsetY={10} style={hoverStyles}>
                <div>
                    {hoveredState}
                </div>
            </MouseTooltip>
            <MouseTooltip visible={distHover} offsetX={10} offsetY={10} style={hoverStyles}>
                <div>District: {distHoverNum}
                </div>
            </MouseTooltip>
            <div ref={el => (mapContainer.current = el)} style={styles}/>
            {/* <MapSettings></MapSettings> */}
        </div>
    );
}

export default DistMap;