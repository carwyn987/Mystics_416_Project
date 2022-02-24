import React, { useState, useEffect, useRef, useCallback, useContext} from 'react';
import mapboxgl from 'mapbox-gl';
import { GlobalStore } from './dataStore'

var tnDistricts = require('./district-data/TN/tnDistricts.geojson');
var msDistricts = require('./district-data/MS/msDistricts.geojson');

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

    const bounds = [
        [-128.947, 22.802],
        [-62.548, 51.201]
    ];

    //const DistMap = () => {
    const [map, setMap] = useState(null);
    const mapContainer = useRef(null);
    //const [hoveredDistrict, setHoveredDistrict1] = useState(null)
    const [hoveredDistrict, setHoveredDistrict1] = useState(null);
    const hoveredDistrictRef = useRef(hoveredDistrict);

    const setHoveredDistrict2 = data => {
        hoveredDistrictRef.current = data;
        setHoveredDistrict1(data);
    };

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

            //map.addControl(new mapboxgl.NavigationControl());

            // map.on("load", () => {
            //     setMap(map);
            //     //map.resize();
            // });

            map.on("load", function () {

                setMap(map);

                map.addSource('tn-district-source', {
                    'type': 'geojson',
                    'data': tnDistricts,
                    'promoteId': 'DISTRICT'
                 });

                map.addLayer({
                    'id': 'tn-district-layer',
                    'type': 'fill',
                    'source': 'tn-district-source',
                    'layout': {},
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

                map.addSource('ms-district-source', {
                    'type': 'geojson',
                    'data': msDistricts,
                    'promoteId': 'District'
                });

                map.addLayer({
                    'id': 'ms-district-layer',
                    'type': 'fill',
                    'source': 'ms-district-source',
                    'layout': {},
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

                map.on('mouseleave', 'ms-district-layer', function () {
                    if (hoveredDistrictRef.current) {
                        map.setFeatureState(
                            { source: 'ms-district-source', id: hoveredDistrictRef.current },
                            { hover: false }
                        );
                    }
                    setHoveredDistrict2(null);
                });

                map.on('mouseleave', 'tn-district-layer', function () {
                    if (hoveredDistrictRef.current) {
                        map.setFeatureState(
                            { source: 'tn-district-source', id: hoveredDistrictRef.current },
                            { hover: false }
                        );
                    }
                    setHoveredDistrict2(null);
                });

                map.on('mousemove', 'tn-district-layer', function (e) {
                    //console.log(e.features[0].properties);
                    if (e.features.length > 0) {
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
                    }
                });

                map.on('mousemove', 'ms-district-layer', function (e) {
                    //console.log(e.features[0].properties);
                    if (e.features.length > 0) {
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
                    }
                });

                map.on('click', 'tn-district-layer', function (e) {
                    map.flyTo({
                        center: [-87.956, 35.761],
                        zoom: 5.77
                    });
                    store.loadSidePanel();
                });
                map.on('click', 'ms-district-layer', function (e) {
                    map.flyTo({
                        center: [-91.665, 32.780],
                        zoom: 5.83
                    });
                    store.loadSidePanel();
                });
            });
            store.setMap(map);
        };
        if (!map) initMap({ setMap, mapContainer });
    }, [map]);

    //render() {
    return (
        <div ref={el => (mapContainer.current = el)} style={styles}/>
    );
    //}
}

export default DistMap;