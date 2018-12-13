import BpmnModeler from 'bpmn-js/lib/Modeler';
import propertiesPanelModule from 'bpmn-js-properties-panel';
import customPropertiesProviderModule from './CustomPropertiesProviderModule';
import camundaModdleDescriptor from 'camunda-bpmn-moddle/resources/camunda';
import customTranslate from './customTranslate';
import $ from 'jquery'
import 'normalize.css'
import './index.less'
import 'bpmn-js/dist/assets/diagram-js.css';
import 'bpmn-font/dist/css/bpmn-embedded.css';
import "bpmn-js-properties-panel/styles/properties.less";

camundaModdleDescriptor.types.push({
	"name": "BewitchedStartEvent",
	"extends": [
		"bpmn:UserTask"
	],
	"properties": [
		{
			"name": "nodeType",
			"isAttr": true,
			"type": "String"
		},
		{
			"name": "selected",
			"isAttr": true,
			"type": "String"
		}
	]
})
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
      updateProperties(camundaId,'camunda:selected',JSON.stringify([{userId:'123456',userName:'csh'}]))
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
});



