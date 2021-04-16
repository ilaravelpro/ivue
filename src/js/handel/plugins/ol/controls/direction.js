/*
 * Author: Amir Hossein Jahani | iAmir.net
 * Last modified: 3/17/21, 7:36 PM
 * Copyright (c) 2021. Powered by iamir.net
 */

import {Control} from 'ol/control';

const OpenLayersControlsDirectionControl = {
    controls: {},
    init: /*@__PURE__*/(function (Control) {
        var $context = this;
        function DirectionControl(opt_options) {
            var options = opt_options || {};
            var element = document.createElement('div');
            element.className = 'ol-unselectable ol-control';
            element.style = 'bottom: .5em;left: .5em;';
            var topButton = document.createElement('button');
            topButton.style = 'margin: 0 auto;';
            var topIconButton = document.createElement('i');
            topIconButton.className = 'fa fa-chevron-up';
            topButton.appendChild(topIconButton)
            var bottomButton = document.createElement('button');
            bottomButton.style = 'margin: 0 auto;';
            var bottomIconButton = document.createElement('i');
            bottomIconButton.className = 'fa fa-chevron-down';
            bottomButton.appendChild(bottomIconButton)
            var leftButton = document.createElement('button');
            leftButton.style = 'margin-right: 3px;';
            var leftIconButton = document.createElement('i');
            leftIconButton.className = 'fa fa-chevron-left';
            leftButton.appendChild(leftIconButton)
            var rightButton = document.createElement('button');
            rightButton.style = 'margin-left: 3px;';
            var rightIconButton = document.createElement('i');
            rightIconButton.className = 'fa fa-chevron-right';
            rightButton.appendChild(rightIconButton)
            element.appendChild(topButton)
            var xElements = document.createElement('div');
            xElements.appendChild(leftButton)
            xElements.appendChild(rightButton)
            xElements.style = 'display: flex;margin: 3px 0;';
            element.appendChild(xElements)
            element.appendChild(bottomButton)

            topButton.addEventListener('click', this.topAction.bind(this), false);
            bottomButton.addEventListener('click', this.bottomAction.bind(this), false);
            leftButton.addEventListener('click', this.leftAction.bind(this), false);
            rightButton.addEventListener('click', this.rightAction.bind(this), false);
            this.ratio = 200000;
            Control.call(this, {
                element: element,
                target: options.target,
            });
        }

        if (Control) DirectionControl.__proto__ = Control;
        DirectionControl.prototype = Object.create(Control && Control.prototype);
        DirectionControl.prototype.constructor = DirectionControl;

        DirectionControl.prototype.topAction = function topAction($element, $elementValue) {
            var [x, y] = this.getMap().getView().getCenter();
            this.getMap().getView().setCenter([x, y + this.ratio])
        };

        DirectionControl.prototype.bottomAction = function bottomAction($element, $elementValue) {
            var [x, y] = this.getMap().getView().getCenter();
            this.getMap().getView().setCenter([x, y - this.ratio])
        };

        DirectionControl.prototype.leftAction = function leftAction($element, $elementValue) {
            var [x, y] = this.getMap().getView().getCenter();
            this.getMap().getView().setCenter([x - this.ratio, y])
        };

        DirectionControl.prototype.rightAction = function rightAction($element, $elementValue) {
            var [x, y] = this.getMap().getView().getCenter();
            this.getMap().getView().setCenter([x + this.ratio, y])
        };

        return DirectionControl;
    }(Control))
}

export default OpenLayersControlsDirectionControl;
