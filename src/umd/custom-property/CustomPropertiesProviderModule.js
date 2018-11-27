import CustomPropertiesProvider from './CustomPropertiesProvider';

export default {
	__depends__: [
		require('bpmn-js-properties-panel/lib/provider/camunda/element-templates'),
		require('diagram-js/lib/i18n/translate').default
	],
	__init__: [ 'propertiesProvider' ],
	propertiesProvider: [ 'type', CustomPropertiesProvider]
};
