import * as React from 'react';
import { useState, useEffect, useRef, useCallback, useContext} from 'react';
import mapboxgl from 'mapbox-gl';
import { GlobalStore } from './DataStore';
import MouseTooltip from 'react-sticky-mouse-tooltip';
import SidePanel from './SidePanel';

var tnDistricts = require('../district-data/TN/tnDistricts.geojson');
var msDistricts = require('../district-data/MS/msDistricts.geojson');
var ncDistricts = require('../district-data/NC/ncDistricts.json');
var tnCounties = require('../district-data/TN/tnCounties.geojson');
var msCounties = require('../district-data/MS/msCounties.geojson');
var oldMSDistricts = require('../district-data/MS/OldMSDistricts.json');
var oldTNDistricts = require('../district-data/TN/OldTNDistricts.json');
var stateBoundaries = require('../district-data/StateBoundaries.json');
var tnBoundary = require('../district-data/TN/Tennessee-State.json');
var msBoundary = require('../district-data/MS/Mississippi-State.json');
var ncBoundary = require('../district-data/NC/NorthCarolina-State.json');



//import 'mapbox-gl/dist/mapbox/gl.css';
//const rewind = require('geojson-rewind');
//import tnDistricts from './district-data/TN/TN-Redistricting-Data.geojson';

function DistMap(props) {
    const { store } = useContext(GlobalStore);
    //ReactMapGL.mapboxAccessToken = process.env.REACT_APP_MAPBOX_TOKEN;
    //const tnDistricts = rewind('./district-data/TN/TN-Redistricting-Data.geojson', true);
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

    //const DistMap = () => {
    const [map, setMap] = useState(null);
    const mapContainer = useRef(null);
    //const [hoveredDistrict, setHoveredDistrict1] = useState(null)
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
    const [cToggle, setCountyToggle] = useState('none');
    //const [statee, setStatee] = useState(null);

    let countyVis;
    
    const clickedDist=()=> {
        setDistClicked(true);
    }

    const updateStoreMap=(map)=>{
        store.updateMap(map);
        console.log(store.map);
    }
    const openSidePanel=(state, dist)=>{
        store.loadSidePanel(state,dist);
    }
    const closeSidePanel=()=>{
        store.closeSidePanel();
    }
    const toggleDistHover=(bool)=>{
        setDistHover(bool);
    }
    const setDistrict=(id)=>{
        setDistHoverNum(id);
    }
    const setStoreStateFocus=(str)=>{
        store.setStateFocus(str);
    }
    const setState=(state)=>{
        store.setCurrentState(state);
    }
    const setDist=(dist)=>{
        store.setCurrentDist(dist);
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
    const showVotes=(demVotes, repVotes)=>{
        setDemVotes(demVotes);
        setRepVotes(repVotes);
    }

    const setHover = data => {
        setStateHover(data);
    }

    const clickState = id => {
        setStateClicked(true);
        setClickedState(id);
        store.setStateFocus(id);
    }

    // if (store.countyToggle){
    //     setCountyToggle('visible');
    // } else {
    //     setCountyToggle('none');
    // }

    useEffect(() => {
        // if (map.current){
        //     return;
        // }
        mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;
        const initMap = ({ setMap, mapContainer }) => {
            const map = new mapboxgl.Map({
                container: mapContainer.current,
                style: process.env.REACT_APP_MAPBOX_STYLE,
                center: [-95.953, 38.473],
                zoom: 3.87,
                maxBounds: bounds
            });

            //map.addControl(new mapboxgl.NavigationControl());

            // map.on("load", () => {
            //     setMap(map);
            //     //map.resize();
            // });

            map.on("load", function () {
                console.log(countyVis);

                setMap(map);
                //store.setMap(map);
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
                            // 'Mississippi',
                            // '#ff7700',
                            // 'North Carolina',
                            // '#9900ff',
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
                            // 'Mississippi',
                            // '#ff7700',
                            // 'North Carolina',
                            // '#9900ff',
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
                            ['get', 'District'],
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

                map.on('mouseleave', 'tn-boundary-layer', function () {
                    //setStateHover(false);
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
                    //setStateHover(false);
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
                    //setStateHover(false);
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

                map.on('mouseleave', 'tn-district-layer', function () {
                    //setStateHover(false);
                    console.log(store.map);
                    if (hoveredDistrictRef.current) {
                        map.setFeatureState(
                            { source: 'tn-district-source', id: hoveredDistrictRef.current },
                            { hover: false }
                        );
                    }
                    setHoveredDistrict2(null);
                    toggleDistHover(false);
                });

                map.on('mousemove', 'tn-boundary-layer', function (e) {
                    //setHover(true);
                    //console.log(e.features[0].id);
                    setStateHover(true);
                    if ((e.features.length > 0) && !stateClicked) {
                        let hoveredState1 = e.features[0].id;
                        map.setFeatureState(
                            { source: 'tn-boundary', id: hoveredState1 },
                            { hover: true }
                        );
                        setHoveredState2(hoveredState1);
                        setState(hoveredState1);
                    }
                    console.log(hoveredState);
                    console.log(hoveredStateRef);
                    console.log(stateHover);
                });
                map.on('mousemove', 'ms-boundary-layer', function (e) {
                    setStateHover(true);
                    console.log(stateHover);
                    console.log(e.features[0].id);
                    if ((e.features.length > 0) && !stateClicked) {
                        let hoveredState1 = e.features[0].id;
                        map.setFeatureState(
                            { source: 'ms-boundary', id: hoveredState1 },
                            { hover: true }
                        );
                        setHoveredState2(hoveredState1);
                        setState(hoveredState1);
                    }
                    console.log(hoveredState);
                    console.log(hoveredStateRef);
                    console.log(stateHover);
                });
                map.on('mousemove', 'nc-boundary-layer', function (e) {
                    //setHover(true);
                    setStateHover(true);
                    console.log(e.features[0].id);
                    if ((e.features.length > 0) && !stateClicked) {
                        let hoveredState1 = e.features[0].id;
                        map.setFeatureState(
                            { source: 'nc-boundary', id: hoveredState1 },
                            { hover: true }
                        );
                        setHoveredState2(hoveredState1);
                        setState(hoveredState1);
                    }
                    console.log(hoveredState);
                    console.log(hoveredStateRef);
                    console.log(stateHover);
                });

                map.on('mousemove', 'tn-district-layer', function (e) {
                    //console.log(store.map);
                    //console.log(e.features[0].properties);
                    //console.log(distClicked);
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
                        console.log("hoveredDistrict1: ", hoveredDistrict1) 

                    }
                });

                map.on('mousemove', 'ms-district-layer', function (e) {
                    console.log(store.map);
                    //console.log(e.features[0].properties);
                    console.log(distClicked);
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

                map.on('click', 'tn-boundary-layer', function (e) {
                    if (map.getLayoutProperty('ms-district-layer', 'visibility') === 'visible') {
                        map.setLayoutProperty('ms-district-layer', 'visibility', 'none');
                        map.setLayoutProperty('ms-boundary-layer', 'visibility', 'visible');
                    }
                    if (map.getLayoutProperty('nc-district-layer', 'visibility') === 'visible') {
                        map.setLayoutProperty('nc-district-layer', 'visibility', 'none');
                        map.setLayoutProperty('nc-boundary-layer', 'visibility', 'visible');
                    }
                    map.flyTo({
                        center: [-88.956, 35.761],
                        zoom: 5.77
                    });
                    map.setLayoutProperty('tn-boundary-layer', 'visibility', 'none');
                    map.setLayoutProperty('tn-district-layer', 'visibility', 'visible');
                    clickState("Tennessee");
                });

                map.on('click', 'ms-boundary-layer', function (e) {
                    if (map.getLayoutProperty('tn-district-layer', 'visibility') === 'visible') {
                        map.setLayoutProperty('tn-district-layer', 'visibility', 'none');
                        map.setLayoutProperty('tn-boundary-layer', 'visibility', 'visible');
                    }
                    if (map.getLayoutProperty('nc-district-layer', 'visibility') === 'visible') {
                        map.setLayoutProperty('nc-district-layer', 'visibility', 'none');
                        map.setLayoutProperty('nc-boundary-layer', 'visibility', 'visible');
                    }
                    map.flyTo({
                        center: [-91.665, 32.780],
                        zoom: 5.83
                    });
                    map.setLayoutProperty('ms-boundary-layer', 'visibility', 'none');
                    map.setLayoutProperty('ms-district-layer', 'visibility', 'visible');
                    clickState("Mississippi");
                });

                map.on('click', 'nc-boundary-layer', function (e) {
                    if (map.getLayoutProperty('tn-district-layer', 'visibility') === 'visible') {
                        map.setLayoutProperty('tn-district-layer', 'visibility', 'none');
                        map.setLayoutProperty('tn-boundary-layer', 'visibility', 'visible');
                    }
                    if (map.getLayoutProperty('ms-district-layer', 'visibility') === 'visible') {
                        map.setLayoutProperty('ms-district-layer', 'visibility', 'none');
                        map.setLayoutProperty('ms-boundary-layer', 'visibility', 'visible');
                    }
                    map.flyTo({
                        center: [-79.121, 35.480],
                        zoom: 5.61
                    });
                    //5.6135.480,-79.121
                    map.setLayoutProperty('nc-boundary-layer', 'visibility', 'none');
                    map.setLayoutProperty('nc-district-layer', 'visibility', 'visible');
                    clickState("North Carolina");
                });

                map.on('click', 'tn-district-layer', function (e) {
                    console.log(store.map);
                    map.flyTo({
                        center: [-88.956, 35.761],
                        zoom: 5.77
                    });
                    clickedDist();
                    //updateStoreMap(map);                               //Update the map variable in the DataStore to reflect the new zoom status.      
                    openSidePanel("TN",e.features[0].properties.DISTRICT);  //Open the SidePanel, recording the state & district that were clicked on the map.
                    //setStoreStateFocus("TN");
                    // checkStore();
                });
                map.on('click', 'ms-district-layer', function (e) {
                    console.log(store.map);
                    map.flyTo({
                        center: [-91.665, 32.780],
                        zoom: 5.83
                    });
                    // clickedDist();
                    // setDistClicked(true);
                    //updateStoreMap(map);                               //Update the map variable in the DataStore to reflect the new zoom status.
                    openSidePanel("MI",e.features[0].properties.District);  //Open the SidePanel, recording the state & district that were clicked on the map.
                    //NOTE: BE CAREFUL, IT's .District for MI & .DISTRICT (ALL CAPS) for TN
                });
            });
            if (!map) {
                updateStoreMap(mapContainer);
            } else {
                updateStoreMap(map);
            }
            //store.setMap(map);
        };
        if (!map) initMap({ setMap, mapContainer });
    }, [map]);
    //render() {
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
        </div>
    );
    //}
}

export default DistMap;