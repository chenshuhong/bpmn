import BpmnModeler from 'bpmn-js/lib/Modeler';
import 'normalize.css'
import './index.less'
import 'bpmn-js/dist/assets/diagram-js.css';
import 'bpmn-font/dist/css/bpmn-embedded.css';

let bpmnModeler = new BpmnModeler({
  container: '#bpmn-canvas'
});
bpmnModeler.createDiagram()