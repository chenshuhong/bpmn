import BpmnModeler from 'bpmn-js/lib/Modeler';
import style from 'bpmn-js/dist/assets/diagram-js.css';
import icons from 'bpmn-font/dist/css/bpmn-embedded.css';

let bpmnModeler = new BpmnModeler({
  container: '#bpmn-canvas'
});
bpmnModeler.createDiagram()