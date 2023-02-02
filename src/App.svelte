<script>
	import Router, {location, link} from 'svelte-spa-router';
	
   

	import Home from './Home.svelte';
	import Flashcards from './Flashcards.svelte';
	import Resources from './Resources.svelte';
	
   
  
    
	
</script>
<header>
	<div class="corner">
		<a href="https://www.gisci.org/Exam-Info">
			<img src="https://altwitt.github.io/gisp/blob/main/public/black.png" alt="black" />
		</a>
	</div>
	<nav>
		<a  href="/" use:link>Home</a>
		<a href="/flashcards" use:link>Flashcards</a>
		<a href="/resources"use:link>Resources</a>
	</nav>
	

	<div class="corner">
		<a href="https://www.gisci.org">
			<img src="https://altwitt.github.io/gisp/blob/main/public/black.png" alt="black" />
		</a>
	</div>
</header>

<h1>Welcome to the GISCI GISP Study guide</h1>
<h2>Resources include links to study guide pdf's, videos's, and flashcards to play with. Good luck on your exam</h2>

<Router routes={{
	'/': Home,
	'/flashcards': Flashcards,
	'/resources': Resources
}} />



<style>
header {
	display: flex;
	justify-content: space-between;
	background-image: linear-gradient(180deg, #435d7d, #5d6f87);
}

.corner {
	width: 100px;
	height: 100px;
}

.corner a {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 100%;
}

.corner img {
	width: 100px;
	height: 100px;
	object-fit: contain;
}

nav {
	display: flex;
	justify-content: center;
	--background: rgba(255, 255, 255, 0.7);
}

nav a {
		display: flex;
		height: 100%;
		align-items: center;
		padding: 0 0.5rem;
		color: var(--color-text);
		font-weight: 700;
		font-size: 0.8rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		text-decoration: none;
		transition: color 0.2s linear;
	}

	a:hover {
		color: var(--color-theme-1);
	}
</style>