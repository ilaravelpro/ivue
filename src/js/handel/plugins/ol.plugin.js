import "ol/ol.css";
import "../../../sass/skins/ol/init.scss";

import Map from "ol/Map";
import View from "ol/View";
import {fromLonLat, toLonLat} from "ol/proj";
import OpenLayersLayers from "./ol/layers.ol.plugin";
import Overlay from "ol/Overlay";
import LayerSwitcher from "ol-layerswitcher";

const OpenLayers = {
    maps: {},
    params: {
        attributions: '<a href="https://vue.iamir.net/packages/ivue" target="_blank">&copy; iVue</a> ',
        center: [58.79793706596032, 30.77233020730077]
    },
    init(target, inits = {}, callbacks = {}, params = {}) {
        var $this = this;
        if (iPath.get($this.maps, target + '.callbacks.onStart')) iPath.get($this.maps, target + '.callbacks.onStart')($this, target, inits, callbacks, params)
        iPath.set(this.maps, target + '.callbacks', callbacks)
        iPath.set(this.maps, target + '.params', params)
        this.initMap(target);
        if (iPath.get(inits, target + '.initClick.status') !== false) this.initClick(target)
        if (iPath.get(inits, target + '.initMoveEnd.status') !== false) this.initMoveEnd(target)
        if (iPath.get(inits, target + '.initLayerSwitcher.status') !== false) this.initLayerSwitcher(target)
        if (iPath.get($this.maps, target + '.callbacks.onEnd')) iPath.get($this.maps, target + '.callbacks.onEnd')($this, target, inits, callbacks, params)
    },
    initMap(target) {
        OpenLayersLayers.init(target, iPath.get(this.maps, target + '.callbacks.onLayers'))
        iPath.set(this.maps, target + '.map', new Map({
            target: target,
            layers: [
                iPath.get(OpenLayersLayers.layers, target + '.main', [])
            ],
            view: new View(iPath.get(this.maps, target + '.params.view', {
                center: fromLonLat(this.params.center),
                zoom: 5,
                minZoom: 3,
            }))
        }));
    },
    initClick(target) {
        var $this = this;
        var
            container = document.getElementById('popup'),
            content_element = document.getElementById('popup-content'),
            closer = document.getElementById('popup-closer');

        closer.onclick = function () {
            overlay.setPosition(undefined);
            closer.blur();
            return false;
        };
        var overlay = new Overlay({
            element: container,
            autoPan: true,
            offset: [0, -10]
        });
        iPath.get($this.maps, target + '.map').addOverlay(overlay);
        iPath.get($this.maps, target + '.map').on('click', function (evt) {
            var feature = iPath.get($this.maps, target + '.map').forEachFeatureAtPixel(evt.pixel,
                function (feature, layer) {
                    return feature;
                });
            if (feature && iPath.get($this.maps, target + '.callbacks.onTemps')) {
                var geometry = feature.getGeometry();
                var coord = geometry.getCoordinates();
                var content = iPath.get($this.maps, target + '.callbacks.onTemps')(feature, evt);
                if (content){
                    content_element.innerHTML = content;
                    overlay.setPosition(evt.coordinate);
                }
            }
        });
    },
    initMoveEnd(target) {
        var $this = this;
        iPath.get($this.maps, target + '.map').on('moveend', function (evt) {
            var $extend = iPath.get($this.maps, target + '.map').getView().calculateExtent(iPath.get($this.maps, target + '.map').getSize());
            var $start = toLonLat([$extend[0], $extend[1]]);
            var $end = toLonLat([$extend[2], $extend[3]]);
            if (!iPath.get($this.maps, target + '.extent') ||
                (iPath.get($this.maps, target + '.extent.minLon') > $start[0] &&
                    iPath.get($this.maps, target + '.extent.minLat') > $start[1] &&
                    iPath.get($this.maps, target + '.extent.maxLon') < $end[0] &&
                    iPath.get($this.maps, target + '.extent.maxLat') < $end[1]
                )
                ||
                (
                    iPath.get($this.maps, target + '.extent.minLon') > $start[0] &&
                    iPath.get($this.maps, target + '.extent.minLat') < $start[1] &&
                    iPath.get($this.maps, target + '.extent.maxLon') > $end[0]  &&
                    iPath.get($this.maps, target + '.extent.maxLat') < $end[1]
                )
            ) {
                var $extent = {
                    minLon: $start[0],
                    minLat: $start[1],
                    maxLon: $end[0],
                    maxLat: $end[1],
                };
                iPath.set(this.maps, target + '.extent', $extent)
                if (iPath.get($this.maps, target + '.callbacks.onMoveEnd')) iPath.get($this.maps, target + '.callbacks.onMoveEnd')(evt, $extent, $this)
            }
        });
    },
    initLayerSwitcher(target) {
        var $this = this;
        var toc = document.getElementById(target + "Sidebar");
        LayerSwitcher.renderPanel(iPath.get($this.maps, target + '.map'), toc);
        LayerSwitcher.forEachRecursive(iPath.get($this.maps, target + '.map'), (layer) => {
            layer.on('change:visible', (e) => {
                if (iPath.get($this.maps, target + '.callbacks.onLayerSwitcher')) iPath.get($this.maps, target + '.callbacks.onLayerSwitcher')(e, $this)
            });
        });
    },

}

export default OpenLayers;
