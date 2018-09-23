import BpmnModeler from 'bpmn-js/lib/Modeler';
import propertiesPanelModule from 'bpmn-js-properties-panel';
import propertiesProviderModule from 'bpmn-js-properties-panel/lib/provider/camunda';
import camundaModdleDescriptor from 'camunda-bpmn-moddle/resources/camunda';
import 'normalize.css'
import './index.less'
import 'bpmn-js/dist/assets/diagram-js.css';
import 'bpmn-font/dist/css/bpmn-embedded.css';
import "bpmn-js-properties-panel/styles/properties.less";

let bpmnModeler = new BpmnModeler({
  container: '#bpmn-canvas',
  propertiesPanel: {
    parent: '#properties-panel-parent',
  },
  additionalModules: [
    propertiesPanelModule,
    propertiesProviderModule
  ],
  moddleExtensions: {
    camunda: camundaModdleDescriptor
  }
});
bpmnModeler.createDiagram()