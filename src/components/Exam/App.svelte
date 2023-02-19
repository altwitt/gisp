<script>
	import Exam from "./Exam.svelte";

	import Results from "./Results.svelte";
	import { hasExamBegun, isExamDone } from "../../data/store.js";
</script>


	{#if $hasExamBegun}
		<Exam />
	{:else if $isExamDone}
		<Results />

	{/if}

