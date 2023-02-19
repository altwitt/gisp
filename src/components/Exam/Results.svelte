<script>
  import {
    exam,
    detailedScore,
    reset,
    scorePercentage,
  } from "../../data/store.js";
  import { getDisplayValue, getPercentageColor } from "../utils.js";
  import { fly } from "svelte/transition";
  import { onMount } from "svelte";

  let percentage = 0;

  onMount(async () => {
    percentage = $scorePercentage; // To give the live update CSS effect
  });
</script>

<style>
 
  .final-score {
    padding-bottom: 0.3em;
    margin-bottom: 0;
  }
  .score-scale {
    background: rgba(220, 220, 220, 0.6);
    border: 3px solid #0a0000;
    display: block;
    margin-bottom: 90px;
    position: relative;
    height: 60px;
    width: 100%;
  }
  .score-bar {
    width: 0px;
    position: absolute;
    top: 0;
    left: 0;
    display: block;
    height: 60px;
    background: rgba(220, 220, 220);
    transition: width 1s;
    transition-delay: 1s;
  }

  ul {
    padding: 0;
  }
  li {
    list-style: none;
    display: flex;
    margin-bottom: 1em;
  }

  li p {
    margin: 0;
    margin-bottom: 1em;
    font-size: 0.8em;
    text-align: left;
  }
  li p:nth-child(2) {
    font-size: 100%;
    font-weight: bold;
    text-align: left;
  }

 
</style>

<div 
  in:fly={{ y: 200, duration: 500, delay: 500 }}
  out:fly={{ y: -200, duration: 500 }}>
  

  <div>
    <h1 class="final-score">Final Score: {percentage}%</h1>
    <div class="score-scale">
      <div
        class="score-bar"
        style="width:{percentage}%; background:{getPercentageColor(percentage)}" />
    </div>
  </div>
  {#if $detailedScore != undefined && $detailedScore.length != 0}
  <p>Incorrect Answers</p>    
  <ul>
      {#each $exam as question, index}
     
      <li>
          <div>
           
            
            {#if !$detailedScore[index].correct}
            <p>{question.question}</p>  
            <p>
                Your Answer:
                {getDisplayValue($detailedScore[index].chosenAnswer)}
              </p>
              <p>Correct Answer:
                {getDisplayValue(question.correctAnswer)}</p>
            
              
                {/if}
            
            
          </div>
        </li>
      {/each}
    </ul>
  {/if}

  <button type="button" on:click={reset}>Play Again</button>
</div>
