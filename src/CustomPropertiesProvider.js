import CamundaPropertiesProvider from 'bpmn-js-properties-panel/lib/provider/camunda/CamundaPropertiesProvider'
import inherits from 'inherits'
import PropertiesActivator from 'bpmn-js-properties-panel/lib/PropertiesActivator'

function CustomPropertiesProvider(eventBus, bpmnFactory, elementRegistry, elementTemplates, translate) {
	PropertiesActivator.call(this, eventBus);
	
	let camundaProvider = new CamundaPropertiesProvider(eventBus, bpmnFactory, elementRegistry, elementTemplates, translate);
	this.getTabs = function (element) {
		let results = camundaProvider.getTabs(element);
		console.log(results)
		return results;
	}
}
CustomPropertiesProvider.$inject = [
	'eventBus',
	'bpmnFactory',
	'elementRegistry',
	'elementTemplates',
	'translate'
];

inherits(CustomPropertiesProvider, PropertiesActivator);
export default CustomPropertiesProvider
