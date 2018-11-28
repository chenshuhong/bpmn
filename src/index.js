import BpmnModeler from 'bpmn-js/lib/Modeler';
import propertiesPanelModule from 'bpmn-js-properties-panel';
import customPropertiesProviderModule from './CustomPropertiesProviderModule';
import camundaModdleDescriptor from 'camunda-bpmn-moddle/resources/camunda';
import magicModdleDescriptor from './magic';
import customTranslate from './customTranslate';
import $ from 'jquery'
import 'normalize.css'
import './index.less'
import 'bpmn-js/dist/assets/diagram-js.css';
import 'bpmn-font/dist/css/bpmn-embedded.css';
import "bpmn-js-properties-panel/styles/properties.less";

let customTranslateModule = {
	translate: [ 'value', customTranslate ]
};
let bpmnModeler = new BpmnModeler({
  container: '#bpmn-canvas',
  propertiesPanel: {
    parent: '#properties-panel-parent',
  },
  additionalModules: [
    propertiesPanelModule,
	  customPropertiesProviderModule,
	  customTranslateModule
  ],
  moddleExtensions: {
	  camunda: camundaModdleDescriptor,
  }
});
bpmnModeler.createDiagram()

function updateProperties(id,propertiy,defalutValue=''){
  let value=prompt("请输入值",defalutValue);
  if (value){
    bpmnModeler.invoke(function(elementRegistry, modeling) {
      var serviceTaskShape = elementRegistry.get(id);
      modeling.updateProperties(serviceTaskShape, {
        [propertiy]: value
      });
    });
  }
}

$(document).ready(function(){
  $('#btn-console').click(function exportDiagram() {
	  bpmnModeler.saveXML({ format: true }, function(err, xml) {
		  if (err) {
			  return console.error('could not save BPMN 2.0 diagram', err);
		  }
		  console.log(xml);
	  });
  })
  $('#properties-panel-parent').click(function (e) {
    let clickId = e.target.id
    if (clickId === 'camunda-assignee'){
      console.log('camunda-assignee click')
      let camundaId = $('#camunda-id').val()
      let defaultValue = $('#camunda-assignee').val()
      updateProperties(camundaId,'camunda:assignee',defaultValue)
    }else if (clickId === 'camunda-candidateUsers'){
      console.log('camunda-candidateUsers click')
      let camundaId = $('#camunda-id').val()
      let defaultValue = $('#camunda-candidateUsers').val()
      updateProperties(camundaId,'camunda:candidateUsers',defaultValue)
    } else if (clickId === 'camunda-candidateGroups'){
      console.log('camunda-candidateGroups click')
      let camundaId = $('#camunda-id').val()
      let defaultValue = $('#camunda-candidateGroups').val()
      updateProperties(camundaId,'camunda:candidateGroups',defaultValue)
    }
  })
  $ ('#bt-xml').click(function (e) {
    bpmnModeler.saveXML({
      format: true
    }, function (err, xml) {
      if (err) {
        console.error(err);
      } else {
        console.log(xml);
      }
    });
    e.preventDefault();
  })
});



