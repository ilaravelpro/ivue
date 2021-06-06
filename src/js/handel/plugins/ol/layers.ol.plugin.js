/*
 * Author: Amir Hossein Jahani | iAmir.net
 * Last modified: 10/12/20, 12:42 PM
 * Copyright (c) 2021. Powered by iamir.net
 */

import GroupLayer from "ol/layer/Group";
import {Tile as TileLayer} from "ol/layer";
import {OSM} from "ol/source";
import OpenLayers from "../ol.plugin";

const OpenLayersLayers = {
    attributions(target) {
        return iPath.get(OpenLayers.maps, target + '.params.attributions', OpenLayers.params.attributions)
    },
    layers: {},
    fetchLayerOSM(target) {
        var $this = this;
        iPath.set(this.layers, target + '.base.osm', new TileLayer({
            title: 'OSM',
            type: 'base',
            visible: iPath.get(OpenLayers.maps, target + '.params.layers.base.osm.status', true),
            source: new OSM({
                attributions: $this.attributions(target),
                url: '//basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png',
            })
        }));
    },
    init(target, callback = null) {
        var $layers = [];
        if (callback)
            $layers = callback(this, target, this.attributions(target))
        else{
            this.fetchLayerOSM(target);
            $layers.push(iPath.get(this.layers, target + '.base.osm'))
        }
        iPath.set(this.layers, target + '.base.group', new GroupLayer({
            'title': 'Base maps',
            layers: $layers
        }));
    },

};

export default OpenLayersLayers;
