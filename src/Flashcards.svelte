<script>
    // @ts-nocheck
        import { quiz, chapters } from "./data.js";
        import Cardbox from './Cardbox.svelte';
       
        
        let answer = quiz[0][0].answer;
        let question = quiz[0][0].question;
        let selected=1;
      
    
        let flashcardIndex = 0;
        // let chapterIndex = 0;
       
            $: question = quiz[selected-1][flashcardIndex].question;
            $: answer = quiz[selected-1][flashcardIndex].answer;
            // $: selected = chapters[selected-1].id;
            let showCardBack = false;	
            const toggleShowBack = () => showCardBack = !showCardBack;
        
            const prevCard = () => {
                showCardBack = false;
                if (flashcardIndex === 0) {
                    flashcardIndex = quiz.length-1;
                } else {
                    flashcardIndex -= 1;
                }
            }
            
            const nextCard = () => {
                showCardBack = false;
                if (flashcardIndex === quiz.length-1) {
                    flashcardIndex = 0;
                } else {
                    flashcardIndex += 1;
                }	
            }
        </script>
        <main>
        <section class="flash">
        <h1 class="header">GISP STUDY GUIDE</h1>
        <div class="dropdown">
        <select bind:value={selected} >
            <option value={""} >Choose a chapter</option>
            {#each chapters as chapter (chapter.id)}
                <option value={chapter.id}>{chapter.text}</option>
            {/each}
        </select>
    </div>
    <!-- <div> -->
            <!-- FLASHCARD -->
            <div class="flip-box">
                <div class="flip-box-inner" class:flip-it={showCardBack}>
    
                    <Cardbox {question} 
                                {answer} 
                                {showCardBack} 
                                         />
                </div>
                <div id="btn-cont">
                    <button class="arrow-btn" on:click={prevCard}>&#8592;</button>
                    
                    <button on:click={toggleShowBack}>
                        {showCardBack ? "Hide Answer" : "Show Answer"}
                    </button>
                    
                    <button class="arrow-btn" on:click={nextCard}>&#8594;</button>
                </div>
                
            </div>
           
        
            <!-- BUTTONS -->
           
        <!-- </div> -->
        
    </section>
    </main>
        <style>
            .flip-box{
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                margin: 0 auto;
                width: 100%;
                height: 100%;
                background-color: hsl(65, 6%, 40%);
            }
            .dropdown {
                display: flex;
                flex-direction: column;
                float: left;
                padding-right: 30px;
            }
            .header {
                margin:auto;
                text-align: center;
            }
      
            /* The flip box container - set the width and height to whatever you want. We have added the border property to demonstrate that the flip itself goes out of the box on hover (remove perspective if you don't want the 3D effect */
            .flip-box {
                background-color: transparent;
                width: 400px;
                height: 300px;
        /* 		border: 1px solid #ddd; */
                perspective: 1000px; /* Remove this if you don't want the 3D effect */
            }
        
            /* This container is needed to position the front and back side */
            .flip-box-inner {
                position: relative;
                width: 100%;
                height: 100%;
                text-align: center;
                transition: transform 0.4s;
                transform-style: preserve-3d;
            }
        
            /* Do an horizontal flip on button click */
            .flip-it {
                transform: rotateY(180deg);
            }
            
            #btn-cont {
            display:flex;
                width: 200px;
                padding: 10px 0;
                display: flex;
                justify-content: space-between;
            }
        
            button {
                display: flex;
                background-color: 	hsl(65, 6%, 40%);
                padding: 10px 10px;
                color: white;
                cursor: pointer;
            }
            
            button:active {
                background-color: hsl(50, 65%, 25%);
            }
        </style>