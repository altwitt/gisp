<script>
	import Router, {location, link} from 'svelte-spa-router';
	import Home from './Home.svelte';
	import Flashcards from './Flashcards.svelte';
	import Resources from './Resources.svelte';
	
	
</script>
<header>
	<div class="corner">
		<a href="https://www.gisci.org/Exam-Info">
			<img src="/black.png" alt="black-gisci" />
		</a>
	</div>
	<nav>
		<a  href="/gisp">Home</a>
		<a href="/gisp/flashcards">Flashcards</a>
		<a href="/gisp/resources">Resources</a>
	</nav>
	

	<div class="corner">
		<a href="https://www.gisci.org">
			<img src="/black.png" alt="black-gisci" />
		</a>
	</div>
</header>

<h1>Welcome to the GISCI GISP Study guide</h1>
<p>Resources include links to study guide pdf's, videos's, and flashcards to play with.</p>
<h1>GOOD LUCK!</h1>
<Router routes={{
	'/gisp': Home,
	'/gisp/flashcards': Flashcards,
	'/gisp/resources': Resources
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