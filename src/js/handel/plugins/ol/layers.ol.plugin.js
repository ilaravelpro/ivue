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
        iPath.set(this.layers, target + '.osm', new TileLayer({
            title: 'OSM',
            type: 'base',
            visible: iPath.get(OpenLayers.maps, target + '.params.osm.status', true),
            source: new OSM({
                attributions: $this.attributions(target),
            })
        }));
    },
    init(target, callback = null) {
        var $layers = [];
        if (callback)
            $layers = callback(this, target, this.attributions(target))
        else{
            this.fetchLayerOSM(target);
            $layers.push(iPath.get(this.layers, target + '.osm'))
        }
        iPath.set(this.layers, target + '.main', new GroupLayer({
            'title': 'Base maps',
            layers: $layers
        }));
    },

};

export default OpenLayersLayers;
