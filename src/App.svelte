<script>
	import Router, {location, link} from 'svelte-spa-router';
	
   

	import Home from './Home.svelte';
	import Flashcards from './Flashcards.svelte';
	import Resources from './Resources.svelte';
	
   
  
    
	
</script>
<header>
	<div class="corner">
		<a href="https://www.gisci.org/Exam-Info">
			<img src="https://www.macurisa.org/resources/Pictures/GISP_Logo.jpeg" alt="black" />
		</a>
	</div>
	<nav>
		<a  href="/" use:link>Home</a>
		<a href="/flashcards" use:link>Flashcards</a>
		<a target="_blank" rel="noreferrer noopener" href="https://www.gisci.org/">gisci</a>
		<a target="_blank" rel="noreferrer noopener" href="https://www.gisci.org/About-Us/Contact-Us">About Gisci</a>
		<a target="_blank" rel="noreferrer noopener" href="https://www.gisci.org/Ethics/Code-of-Ethics">Ethics</a>
		<a target="_blank" rel="noreferrer noopener" href="https://www.gisci.org/News/Issues-News-Policy">News</a>
	</nav>
	

	<div class="corner">
		<a href="https://www.gisci.org">
			<img src="https://www.macurisa.org/resources/Pictures/GISP_Logo.jpeg" alt="black" />
		</a>
	</div>
</header>

<h1>Welcome to the GISCI GISP Study guide</h1>
<h2>Resources include links to study guide pdf's, videos's, and flashcards to play with. Good luck on your exam</h2>

<Router routes={{
	'/': Home,
	'/flashcards': Flashcards
	
}} />
<footer>
	<div class="corner">
		<a href="https://www.gisci.org/Exam-Info">
			<img src="https://www.macurisa.org/resources/Pictures/GISP_Logo.jpeg" alt="black" />
		</a>
	</div>
	
	<div >
		<nav class="footer-nav">
	
	</nav>
		<p>701 Lee Street, Suite 960, Des Plaines, IL 60016  |  Phone (847) 824-7768  |  Fax (224) 938-9237</p>
	
	
</div>
	<div class="corner">
		<a href="https://www.gisci.org">
			<img src="https://www.macurisa.org/resources/Pictures/GISP_Logo.jpeg" alt="black" />
		</a>
	</div>
</footer>


<style>
header {
	display: flex;
	justify-content: space-between;
	background-image: linear-gradient(180deg, #435d7d, #5d6f87);
	z-index: -1;
}

footer {
	display: flex;
	justify-content: space-between;
	background-image: linear-gradient(180deg, #435d7d, #5d6f87);
	position: absolute;
  bottom: 0;
  width: 100%;
}
.footer_nav {
	display: flex;
	justify-content: center;
	--background: rgba(255, 255, 255, 0.7);
	padding: 0 0.5rem;
		margin: 30px 30px;
		color: var(--color-text);
		font-weight: 700;
		font-size: 1.8rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
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
	object-fit: cover;
}

nav {
	display: flex;
	justify-content: center;
	--background: rgba(255, 255, 255, 0.7);
}
p {
	color:rgb(231, 240, 243);
	float: left;
	bottom: 0;
	margin: 20px 0px;
}
nav a {
		display: flex;
		height: 50%;
		align-items: center;
		padding: 0 0.5rem;
		margin: 30px 30px;
		color: var(--color-text);
		font-weight: 700;
		font-size: 1.8rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		text-decoration: none;
		
  -webkit-transition: color 2s ease-out;
  -moz-transition: color 2s ease-out;
  -o-transition: color 2s ease-out;
  transition: color 2s ease-out;
	}
 	a:hover {
		color: white;
		
	
	}
</style>