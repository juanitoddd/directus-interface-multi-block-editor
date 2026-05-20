<template>
	<div class="editor sans-serif bordered">
		<div>Here there is something</div>
		<div :class="divLayoutClass">
			<div><EditorComponent /></div>
			<div><EditorComponent /></div>
		</div>
		<div>Current cols: {{ gridCols }}</div>
		<div class="p-2">
			<input v-model="gridCols"/>
		</div>
		<div class="p-2">
			<input :value="value" />
		</div>
	</div>
</template>

<script setup lang="ts">
import { defineComponent, computed, ref } from 'vue';
import EditorJS from '@editorjs/editorjs';
import EditorComponent from './editor/editor.vue'

const gridCols = ref(1)

const divLayoutClass = computed(() => {	
	return `grid grid-cols-${gridCols.value}`
})

</script>
<style lang="scss" scoped>
.bordered {
	padding: var(--theme--form--field--input--padding) max(32px, calc(var(--theme--form--field--input--padding) + 16px));
	background-color: var(--theme--background);
	border: var(--theme--border-width) solid var(--theme--form--field--input--border-color);
	border-radius: var(--theme--border-radius);

	&:hover {
		border-color: var(--theme--form--field--input--border-color-hover);
	}

	&:focus-within {
		border-color: var(--theme--form--field--input--border-color-focus);
	}
}

.grid {
	display: grid;
}
.grid-cols-1 {
	grid-template-columns: 1fr;
}
.grid-cols-2 {
	grid-template-columns: repeat(2, minmax(0, 1fr));
}
.grid-cols-3 {
	grid-template-columns: repeat(3, minmax(0, 1fr));
}
.grid-cols-4 {
	grid-template-columns: repeat(4, minmax(0, 1fr));
}
.p-2 {
	padding: 10px;
}
</style>