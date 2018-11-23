import entryFactory from 'bpmn-js-properties-panel/lib/factory/EntryFactory';
let getBusinessObject = require('bpmn-js/lib/util/ModelUtil').getBusinessObject;

export default function(group, element) {
	group.entries.push(entryFactory.label({
		id : 'id',
		labelText:getBusinessObject(element).id
	}));
}
