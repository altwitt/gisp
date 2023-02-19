<script>
	import Router, {location, link} from 'svelte-spa-router';
	
   

	import Resources from './components/Resources/Resources.svelte';
	import Flashcards from './components/Flashcards/Flashcards.svelte';
	import App from './components/Exam/App.svelte';
	
	
   
  
    
	
</script>
<body>
<header>
	<div class="corner">
		<a href="https://www.gisci.org/Exam-Info">
			<img src="https://www.macurisa.org/resources/Pictures/GISP_Logo.jpeg" alt="black" />
		</a>
	</div>
	
	<nav>
		<a href="/" use:link>Home</a>
		<a href="/flashcards" use:link>Flashcards</a>
		<a href="/exam" use:link>Exam</a>
		<a target="_blank" rel="noreferrer noopener" href="https://www.gisci.org/">gisci</a>
		
		
	</nav>


	<div class="corner">
		<a href="https://www.gisci.org">
			<img src="https://www.macurisa.org/resources/Pictures/GISP_Logo.jpeg" alt="black" />
		</a>
	</div>

</header>



<Router routes={{
	'/': Resources,
	'/flashcards': Flashcards,
	'/exam': App,
	
}} />

<footer>
	
	<div class="corner">
		<a href="https://www.gisci.org/Exam-Info">
			<img src="https://www.macurisa.org/resources/Pictures/GISP_Logo.jpeg" alt="black" />
		</a>
	</div>

	<p>701 Lee Street, Suite 960, Des Plaines, IL 60016  |  Phone (847) 824-7768  |  Fax (224) 938-9237</p>
	<div class="bottom"><h3>Copyright 2022 by GISCI   |  Privacy Statement  |  Terms of Use  |  Connect</h3><a  href="https://twitter.com/GISCI_GISP"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkNl4i69py000RBi17kQ8crU6Mk5ODvMbHEw&usqp=CAU" height=20px  weight=20px alt="twit" /></a><a href="https://www.linkedin.com/groups/132913/"><img src="https://www.pngkit.com/png/detail/14-145502_linkedin-color-icon-linkedin-logo-round-png.png" height=20px weight=20px alt="lin"/></a></div>
	

	<div class="corner">
		<a href="https://www.gisci.org">
			<img src="https://www.macurisa.org/resources/Pictures/GISP_Logo.jpeg" alt="black" />
		</a>
	</div>

</footer>
</body>

<style>
	body {
  display: flex;
  /* flex-grow: 1; */
  justify-content: space-between;
  flex-direction: column;
	}
	
header {
	display: flex;
	justify-content: space-between;

	/* background: url(/docs/assets/banner.png); */
	background-color: #4f6680;
	align-items: flex-end;
}

footer {
	display: flex;
	justify-content: space-between;
	background-color: #4f6680;
	position: static;
  bottom: 0px;
  width: 100%;
}

.bottom {
	display:inline-block;
}
.corner {
	width: 100px;
	height: 100px;
	background-color: #364c65;
}

.corner a {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 100%;
}

.corner img {
	width: 80px;
	height: 80px;
	object-fit: cover;
}

nav {
	display: flex;
	
	
	background: #4f6680
}
p {
	color:rgb(231, 240, 243);
	float: left;
	bottom: 20;
	margin: 20px 0px;
}
nav a {
		display: flex;
		height: 50%;
		align-items: center;
		padding: 10px 4.9rem;
		margin: 0px 0px;
		color: white;
		background-color: #364c65;
		font-weight: 400;
		
		font-size: 1rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		text-decoration: none;
		
  -webkit-transition: background-color 2s ease-out;
  -moz-transition: background-color 2s ease-out;
  -o-transition: background-color 2s ease-out;
  transition: background-color 2s ease-out;
	}
 	a:hover {
		background-color: #6287B2;
		
	
	}

	@media (max-width: 800px) {
  
  .corner {
		display: none;
}
nav a{
	flex:auto;
	flex-direction: column;
	padding: 0px 0px;
		margin: 5px 5px;
		
		font-weight: 450;
		font-size: 0.9rem;
}
a{
	flex:auto;
	flex-direction: column;
}
	}
</style>