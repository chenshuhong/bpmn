import CamundaPropertiesProvider from 'bpmn-js-properties-panel/lib/provider/camunda/CamundaPropertiesProvider'
import inherits from 'inherits'
import PropertiesActivator from 'bpmn-js-properties-panel/lib/PropertiesActivator'

function CustomPropertiesProvider(eventBus, bpmnFactory, elementRegistry, elementTemplates, translate) {
	PropertiesActivator.call(this, eventBus);
	
	let camundaProvider = new CamundaPropertiesProvider(eventBus, bpmnFactory, elementRegistry, elementTemplates, translate);
	this.getTabs = function (element) {
		let results = camundaProvider.getTabs(element);
		/*console.log(results)
		if (results&&results.length){
			if(results[0].id === 'general'){
				let groups = results[0].groups
				if(groups&&groups.length){
					if (groups[0].id === 'general') {
						let entries = groups[0].entries
						if (entries&&entries.length){
							if (entries[0].id === 'id'){
								console.log('ddddd')
								entries.shift()
							}
						}
					}
				}
			}
		}
		console.log(results)*/
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
