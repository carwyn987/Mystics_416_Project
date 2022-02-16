import React, { useState, useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
var tnDistricts = require('./district-data/TN/tnDistricts.geojson');
var msDistricts = require('./district-data/MS/msDistricts.geojson');
//import 'mapbox-gl/dist/mapbox/gl.css';
//const rewind = require('geojson-rewind');
//import tnDistricts from './district-data/TN/TN-Redistricting-Data.geojson';

function DistMap(props) {
    //ReactMapGL.mapboxAccessToken = process.env.REACT_APP_MAPBOX_TOKEN;
    //const tnDistricts = rewind('./district-data/TN/TN-Redistricting-Data.geojson', true);
    const styles = {
        width: "100vw",
        height: "100vh"
    };

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
                zoom: 3.87
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
                    'data': tnDistricts
                 });

                map.addLayer({
                    'id': 'tn-district-layer',
                    'type': 'fill',
                    'source': 'tn-district-source',
                    'layout': {},
                    'paint': {
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
                            .8,
                            0.5
                        ]
                    }
                });

                map.addSource('ms-district-source', {
                    'type': 'geojson',
                    'data': msDistricts
                });

                map.addLayer({
                    'id': 'ms-district-layer',
                    'type': 'fill',
                    'source': 'ms-district-source',
                    'layout': {},
                    'paint': {
                        'fill-color': [
                            'match',
                            ['get', 'DISTRICT'],
                            '2801',
                            '#0006ad',
                            '2802',
                            '#2e6b2c',
                            '2803',
                            '#7a336a',
                            '2804',
                            '#ffec42',
                            '#ffffff'
                        ],
                        'fill-opacity': [
                            'case',
                            ['boolean', ['feature-state', 'hover'], false],
                            .8,
                            0.5
                        ]
                    }
                });

                map.on('mouseover', 'tn-district-layer', function (e) {
                    console.log(e.features[0].properties);
                    if (e.features.length > 0) {
                        if (hoveredDistrictRef.current && hoveredDistrictRef.current > -1) {
                            map.setFeatureState(
                                { source: 'tn-district-source', DISTRICT: hoveredDistrictRef.current, id: hoveredDistrictRef.current },
                                { hover: false }
                            );
                        }
                        let hoveredDistrict1 = e.features[0].properties.DISTRICT;
                        map.setFeatureState(
                            { source: 'tn-district-source', DISTRICT: hoveredDistrict1, id: hoveredDistrictRef.current },
                            { hover: true }
                        );
                        setHoveredDistrict2(hoveredDistrict1);
                    }
                });

                map.on('mouseleave', 'tn-district-layer', function () {
                    if (hoveredDistrictRef.current) {
                        map.setFeatureState(
                            { source: 'tn-district-source', DISTRICT: hoveredDistrictRef.current, id: hoveredDistrictRef.current },
                            { hover: false }
                        );
                    }
                    setHoveredDistrict2(null);
                });
                map.on('mouseover', 'ms-district-layer', function (e) {
                    console.log(e.features[0].properties);
                    if (e.features.length > 0) {
                        if (hoveredDistrictRef.current && hoveredDistrictRef.current > -1) {
                            map.setFeatureState(
                                { source: 'ms-district-source', DISTRICT: hoveredDistrictRef.current, id: hoveredDistrictRef.current },
                                { hover: false }
                            );
                        }
                        let hoveredDistrict1 = e.features[0].properties.DISTRICT;
                        map.setFeatureState(
                            { source: 'ms-district-source', DISTRICT: hoveredDistrict1, id: hoveredDistrictRef.current },
                            { hover: true }
                        );
                        setHoveredDistrict2(hoveredDistrict1);
                    }
                });

                map.on('mouseleave', 'ms-district-layer', function () {
                    if (hoveredDistrictRef.current) {
                        map.setFeatureState(
                            { source: 'ms-district-source', DISTRICT: hoveredDistrictRef.current, id: hoveredDistrictRef.current },
                            { hover: false }
                        );
                    }
                    setHoveredDistrict2(null);
                });
            });
        };
        if (!map) initMap({ setMap, mapContainer });
    }, [map]);

    return (
        <div ref={el => (mapContainer.current = el)} style={styles} />
    );
}

export default DistMap;