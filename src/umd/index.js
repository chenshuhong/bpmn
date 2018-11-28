import Modeler from 'bpmn-js/lib/Modeler';
import propertiesPanelModule from 'bpmn-js-properties-panel';
import customPropertiesProviderModule from './custom-property/CustomPropertiesProviderModule';
import camundaModdleDescriptor from 'camunda-bpmn-moddle/resources/camunda';
import customTranslate from './customTranslate/customTranslate';
import './app.less';
import 'bpmn-js-properties-panel/styles/properties.less';

import inherits from 'inherits';

// Our custom translation module
// We need to use the array syntax that is used by bpmn-js internally
// 'value' tells bmpn-js to use the function instead of trying to instanciate it
let customTranslateModule = {
	translate: [ 'value', customTranslate ]
};
export default function CustomModeler(options) {
  options.additionalModules=[
  	propertiesPanelModule,
	  customPropertiesProviderModule,
	  customTranslateModule
  ]
  options.moddleExtensions={
		camunda: camundaModdleDescriptor,
	}
  Modeler.call(this, options);
}

inherits(CustomModeler, Modeler);
