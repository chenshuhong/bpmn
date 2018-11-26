import Modeler from 'bpmn-js/lib/Modeler';
import propertiesPanelModule from 'bpmn-js-properties-panel';
import propertiesProviderModule from 'bpmn-js-properties-panel/lib/provider/camunda';
import camundaModdleDescriptor from 'camunda-bpmn-moddle/resources/camunda';
import customTranslate from './customTranslate/customTranslate';
import './app.less';
import 'bpmn-js-properties-panel/styles/properties.less';
import {
  assign,
  isArray
} from 'min-dash';

import inherits from 'inherits';

import CustomModule from './custom-modeler/custom/index';


export default function CustomModeler(options) {
  options.additionalModules={
      propertiesPanelModule,
      propertiesProviderModule
  }
  Modeler.call(this, options);

  this._customElements = [];
}

inherits(CustomModeler, Modeler);

// Our custom translation module
// We need to use the array syntax that is used by bpmn-js internally
// 'value' tells bmpn-js to use the function instead of trying to instanciate it
let customTranslateModule = {
    translate: [ 'value', customTranslate ]
};
let additionalModules = [
    propertiesPanelModule,
    propertiesProviderModule,
];
let moddleExtensions = {
    camunda: camundaModdleDescriptor
};
CustomModeler.prototype._modules = [].concat(
    CustomModeler.prototype._modules,
    [
        CustomModule
    ]
)
CustomModeler.prototype._moddleExtensions = Object.assign({},CustomModeler.prototype._moddleExtensions,moddleExtensions);

/**
 * Add a single custom element to the underlying diagram
 *
 * @param {Object} customElement
 */
CustomModeler.prototype._addCustomShape = function(customElement) {

  this._customElements.push(customElement);

  var canvas = this.get('canvas'),
      elementFactory = this.get('elementFactory');

  var customAttrs = assign({ businessObject: customElement }, customElement);

  var customShape = elementFactory.create('shape', customAttrs);

  return canvas.addShape(customShape);

};

CustomModeler.prototype._addCustomConnection = function(customElement) {

  this._customElements.push(customElement);

  var canvas = this.get('canvas'),
      elementFactory = this.get('elementFactory'),
      elementRegistry = this.get('elementRegistry');

  var customAttrs = assign({ businessObject: customElement }, customElement);

  var connection = elementFactory.create('connection', assign(customAttrs, {
    source: elementRegistry.get(customElement.source),
    target: elementRegistry.get(customElement.target)
  }),
  elementRegistry.get(customElement.source).parent);

  return canvas.addConnection(connection);

};

/**
 * Add a number of custom elements and connections to the underlying diagram.
 *
 * @param {Array<Object>} customElements
 */
CustomModeler.prototype.addCustomElements = function(customElements) {

  if (!isArray(customElements)) {
    throw new Error('argument must be an array');
  }

  var shapes = [],
      connections = [];

  customElements.forEach(function(customElement) {
    if (isCustomConnection(customElement)) {
      connections.push(customElement);
    } else {
      shapes.push(customElement);
    }
  });

  // add shapes before connections so that connections
  // can already rely on the shapes being part of the diagram
  shapes.forEach(this._addCustomShape, this);

  connections.forEach(this._addCustomConnection, this);
};

/**
 * Get custom elements with their current status.
 *
 * @return {Array<Object>} custom elements on the diagram
 */
CustomModeler.prototype.getCustomElements = function() {
  return this._customElements;
};


function isCustomConnection(element) {
  return element.type === 'custom:connection';
}
