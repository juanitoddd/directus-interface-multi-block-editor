import { defineInterface } from '@directus/extensions-sdk';
import InterfaceComponent from './interface.vue';

export default defineInterface({
	id: 'interface-multiple-block-editor',
	name: 'Multiple block editor',
	icon: 'dataset',
	description: 'Multiple block editor to allow grid-like simultaneous editors',
	component: InterfaceComponent,
	options: null,
	types: ['json'],
});
