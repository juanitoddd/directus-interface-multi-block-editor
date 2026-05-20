<template>
	<div :id="editorId" class="multiple-editor sans-serif bordered">		
		<div :class="divLayoutClass">
			<div><EditorComponent @input="(output) => handleEditorInput(1, output)" /></div>
			<div><EditorComponent @input="(output) => handleEditorInput(2, output)	" /></div>
		</div>
		<div>Current cols: {{ gridCols }}</div>
		<div class="p-2">
			<input v-model="gridCols"/>
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { v4 as uuidv4 } from 'uuid';
import EditorComponent from './editor/editor.vue'

const gridCols = ref(1)

const editorId = uuidv4();

const divLayoutClass = computed(() => `root grid grid-cols-${gridCols.value}`)

watch(gridCols, async (current: number, _previous: number) => {
	console.log("current cols ~~~>", current);
	const otherPossibleEditors = document.querySelectorAll('.multiple-editor .root');
	console.log("otherPossibleEditors:", otherPossibleEditors);
});

const handleEditorInput = (id: number, editorInput: EditorJS.OutputData | null) => {
  console.log(`Editor ${id} received new message:`, editorInput);
}

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