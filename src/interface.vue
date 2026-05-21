<template>
	<div :id="editorId" class="multiple-editor sans-serif bordered">		
		<div class="grid grid-cols-2">
			<div><EditorComponent :value="left" @input="(output) => handleEditorInput('left', output)" /></div>
			<div><EditorComponent :value="right" @input="(output) => handleEditorInput('right', output)" /></div>
		</div>				
	</div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { v4 as uuidv4 } from 'uuid';
import { cloneDeep } from 'lodash';
import EditorComponent from './editor/editor.vue'

type Side = 'left' | 'right'

const props = withDefaults(
	defineProps<{		
		value?: Record<Side, any> | null;				
		tools?: string[];
		folder?: string;		
	}>(),
	{
		value: null,		
		tools: () => ['header', 'nestedlist', 'code', 'image', 'paragraph', 'checklist', 'quote', 'underline'],		
	},
);

const emit = defineEmits<{ input: Record<Side, EditorJS.OutputData | null> }>();
const content = ref<Record<Side, EditorJS.OutputData | null>>({left:null, right:null})
const left = ref(null)
const right = ref(null)
const editorId = uuidv4();

watch(
	() => props.value,
	async (newVal, _oldVal) => {
		if(!newVal) return;
		const cont = typeof newVal === 'string' ? JSON.parse(newVal) : newVal
		left.value = cloneDeep(cont.left);
		right.value = cloneDeep(cont.right);
		content.value.left = cloneDeep(cont.left);
		content.value.right = cloneDeep(cont.right);		
	}
)

const handleEditorInput = (position: Side, editorInput: EditorJS.OutputData) => {
  console.log(`Editor ${position} received new message:`, editorInput);
  if(editorInput) {
	  content.value[position] = editorInput;
	  emit('input', content.value);
  }
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