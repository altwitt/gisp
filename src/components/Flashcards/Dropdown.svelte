<script>
// @ts-nocheck
import { chapters } from "./quizSectioned.js";
    
    export let selected;
   
    
    function handleSubmit() {
		 let the_thing = chapters.filter(chapter => chapter.id === selected);
         return the_thing;
	}

    </script> 
    
    <div style={{display: "flex", justifyContent: "center", }}>
       
        <form on:submit|preventDefault={handleSubmit}>
            <select bind:value={selected} >
                          <option  >Choose a chapter</option>
                          {#each chapters as chapter (chapter.id)}
                              <option value={chapter.id}>{chapter.text}</option>
                          {/each}
                      </select>
                      <button disabled={!selected} type=submit>
                        Get Chapter
                    </button>
                </form>
</div>



