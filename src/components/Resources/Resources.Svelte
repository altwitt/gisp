<div class="cards">
    <div class="card">
      <div class="content">
        <h2>Websites</h2>
        <p>These sites have online resources for GISP exam prep</p>
          
        <a target="_blank" rel="noreferrer noopener" href="https://www.directionsmag.com/article/8411">Direction Magazine article referencing their podcast and other resources</a>
        <a target="_blank" rel="noreferrer noopener" href="https://www.geotechcenter.org/concept-modules-and-demonstration-videos8203.html">Geotech Concept Modules and Demonstration Videos</a>
        <a target="_blank" rel="noreferrer noopener" href="https://www.geotechcenter.org/personal-assessment-center.html">GeoTech Center Personal Assessment Center</a>
       
      </div>
    </div>
    <div class="card">
      <div class="content">
        <h2>Literature</h2>
       <p>These direct you to books online
        </p> 
        <a target="_blank" rel="noreferrer noopener" href="https://www.paulbolstad.net/gisbook.html">Free GIS Fundamentals, 6th Edition book</a>
        <a target="_blank" rel="noreferrer noopener" href="https://archive.org/details/tozgisillustrate0000unse">A to Z GIS: An Illustrated Dictionary of Geographic Information Systems</a>
      </div>
    </div>
    <div class="card">
      <div class="content">
        <h2>Downloads</h2>
        <p>Official gisci.org documents and more</p>
        <a href="https://www.gisci.org/Portals/0/PDF's/GISP%20Unofficial%20Study%20Guide%202019%20v2.pdf?ver=hWEX0NspSVz4XcX0FFf3YA%3d%3d">UNOFFICIAL EXAM STUDY GUIDE</a>
        <a href="https://www.gisci.org/Portals/0/PDF's/REVISED%20BP%20-%20Official%20-%20July%202019.pdf">EXAM BLUEPRINT (2019) REVISED BP CROSSWALK</a>
        <a href="https://www.gisci.org/Portals/0/PDF's/Exam%20Candidate%20Manual%20Word%20June%202022.pdf?ver=EDJzxaULPf3ORUrX_YjxcQ%3d%3d">EXAM CANDIDATE MANUAL</a>
        <a href="https://www.gisci.org/Portals/0/PDF's/Exam%20Candidate%20Manual%20Word%20June%202022.pdf?ver=EDJzxaULPf3ORUrX_YjxcQ%3d%3d">TEACHMEGIS PREP COURSE</a>
        <a href="https://ucgis.memberclicks.net/assets/docs/gist_body_of_knowledge.pdf">GIS&T BODY OF KNOWLEDGE</a>
       
      </div>
    </div>
    <div class="card">
      <div class="content">
        <h2>Media</h2>
        <p>Videos, podcasts, and a talk from Bill Hodge himself</p>
        <a target="_blank" rel="noreferrer noopener" href="https://www.youtube.com/watch?v=maisz8INlt8">Getting started on your GISP</a>
        <a target="_blank" rel="noreferrer noopener" href="https://www.youtube.com/watch?v=Qwn3xuJ7YT0">MAGIC Webinar: GISP Certification</a>
        <a target="_blank" rel="noreferrer noopener" href="https://www.youtube.com/watch?v=f4gIfJSwaZw">Why Pursue the GISP Designation - Lunch and Learn</a>
        <a target="_blank" rel="noreferrer noopener" href="https://snhu.adobeconnect.com/_a798560077/p18d75wxkj8/?OWASP_CSRFTOKEN=9349efa6d6e2165ddbd37aa389f54fa3c2d7ef724f9d428d4d3f9446ed5b4db1">GISP - A Student Perspective Webinar (Nov. 18th, 2015, BIll Hodge, GISP</a>
        <a target="_blank" rel="noreferrer noopener" href="https://mapscaping.com/podcast/how-to-become-a-certified-gis-professional/">Mapscaping Podcast: How to Become a Certified GIS Professional</a>
       
      </div>
      
    </div>
    
  </div>
  <p class="title">Your favorite GISP study guide.</p>
<style>
  :root {
    --duration: 1400ms;
    --timing-func: cubic-bezier(0.19, 1, 0.22, 1);
    --font-sans: "Rubik", sans-serif;
    --font-serif: "Cardo", serif;
  }
  
  * {
    box-sizing: border-box;
  }
  
  
  
  /* the container holding the cards */
  .cards {
    /* cards is a direct child of body, which is
       a flexbox. Center cards using align-self */
    align-self: center;
  
    /* cards is also a flexbox */
    display: flex;
    /* this is for the mobile version */
    flex-direction: column;
  
    /* spacing between cards */
    gap: 1rem;
  margin:140px 30px 10px 70px;
    /* some padding here leaves room for the card's box shadows and
        animations */
    /* padding: 1rem 0; */
  
    /* this keeps cards from expanding more than 1200px */
    max-width: 1600px;
    font-family: var(--font-sans);
  }

  .title {
		padding-left: 100px;
		font-size: 200%;
		text-align: center;
		font-style: italic;
		color: #435d7d;
		}
    
  p {
	color:rgb(7, 53, 68);
	float: left;
	bottom: 20;
	margin: 20px 0px;
}
  .card {
    /* this is a clue that something will be position 
       on top of the card */
    position: relative;
    display: flex;
    align-items: flex-end;
    /* this hides any overflow -- the slide up div overflows below the
       card -- can be fixed with some scaling */
    overflow: hidden;
    /* padding: 0.5rem; */
  
    /* the overlay text is different widths and will cause the
       cards to be different widths -- better to fix with flex */
    width: 100%;
  
    text-align: center;
    color: whitesmoke;
    background-color: whitesmoke;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1), 0 2px 2px rgba(0, 0, 0, 0.1),
      0 4px 4px rgba(0, 0, 0, 0.1), 0 8px 8px rgba(0, 0, 0, 0.1),
      0 16px 16px rgba(0, 0, 0, 0.1);
  }
  
  .card::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
  
    /* the 110% is to allow the image to "bump" up slightly on hover */
    height: 110%;
  
    /* this is similar to object-fit, but for backgrounds */
    background-size: cover;
  
    /* these can be changed to "pin" the image */
    background-position: center center;
    transition: transform calc(var(--duration) * 1.5) var(--timing-func);
  
    /* allow any clicks to pass through this element 
    (which will contain a background image) */
    pointer-events: none;
  }
  
  /* gradient that is under the text */
  .card::after {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 150%;
    pointer-events: none;
    background-image: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0.1) 50%,
      rgba(0, 0, 0, 0.3) 75%,
      rgba(0, 0, 0, 0.6) 100%
    );
    transform: translateY(-50%);
    transition: transform calc(var(--duration) * 2) var(--timing-func);
  }
  
  /* add the images to the ::before for each cards */
  .card:nth-child(1)::before {
    background-image: url(https://www.giscloud.com/assets/wp-content/themes/wp-boomerang/images/Cover-Hero2-s_1644413106.jpg);
  }
  .card:nth-child(2)::before {
    background-image: url(https://www.esri.com/about/newsroom/wp-content/uploads/2018/06/Arcnews-banner-ArcGISOnline-wide.jpg);
  }
  .card:nth-child(3)::before {
    background-image: url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2WGbJ-_KZJcjqEKRhEOHry3HCICKnZdFgXQq_YJaVi2Dd_MTshbpVwpt0gPzbk4TbvU8&usqp=CAU);
  }
  .card:nth-child(4)::before {
    background-image: url(https://images.squarespace-cdn.com/content/v1/55223b6ee4b098a11a898a5a/1435180067240-WKD5IXSRC26BOITN9ADJ/Gis-what+we+do.jpg?format=2500w);
  }
  
  .content {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    /* padding: 1rem; */
    transition: transform var(--duration) var(--timing-func);
    z-index: 1;
    user-select: none;
  }
  
  .content > * + * {
    /* margin-top: 1rem; */
  }
  
  
  .cards h2 {
    font-size: 1.3rem;
    font-weight: bold;
    line-height: 1.2;
    margin: 0;
  }
  
  .cards p {
    font-family: var(--font-serif);
    font-size: 1.125rem;
    font-style: italic;
    line-height: 0.85;
  }
  
  .card a {
    display: block;
    cursor: pointer;
    margin-top: 10px;
    padding: 10px 10px;
    font-size: 0.65rem;
    font-weight: bold;
    letter-spacing: 0.025rem;
    text-transform: uppercase;
    color: white;
    background-color: black;
    text-decoration: none;
  }
  
  .card a:hover {
    background-color: #0d0d0d;
  }
  
  .card a:focus {
    outline: 1px dashed yellow;
    outline-offset: 3px;
  }
  
  @media (min-width: 600px) {
    .cards {
      flex-direction: row;
      flex-wrap: wrap;
    }
  
    .card {
      flex: 1 1 45%;
      height: 350px;
    }
  }
  @media (min-width: 900px) {
    .cards {
      flex-wrap: nowrap;
    }
  }
  
  /* add hover effects except on mobile, which is any width
     under 600px */
  @media (hover: hover) and (min-width: 600px) {
    .card:after {
      transform: translateY(0);
    }
  
    .content {
      transform: translateY(calc(100% - 4.5rem));
    }
  
    .content > *:not(h2) {
      opacity: 0;
      transform: translateY(1rem);
      transition: transform var(--duration) var(--timing-func),
        opacity var(--duration) var(--timing-func);
    }
  
    .card:hover,
    .card:focus-within {
      align-items: center;
    }
    .card:hover:before,
    .card:focus-within:before {
      transform: translateY(-4%);
    }
    .card:hover:after,
    .card:focus-within:after {
      transform: translateY(-50%);
    }
    .card:hover .content,
    .card:focus-within .content {
      transform: translateY(0);
    }
    .card:hover .content > *:not(h2),
    .card:focus-within .content > *:not(h2) {
      opacity: 1;
      transform: translateY(0);
      transition-delay: calc(var(--duration) / 8);
    }
  
    .card:focus-within:before,
    .card:focus-within:after,
    .card:focus-within .content,
    .card:focus-within .content > *:not(h2) {
      transition-duration: 0s;
    }
  }
</style>