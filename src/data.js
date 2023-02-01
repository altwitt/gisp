export let chapters = [
  { id: 1, text: `Chapter 1: Conceptual Foundations` },
  { id: 2, text: `Chapter 2: Geospatial Data Fundamentals` },
  { id: 3, text: `Chapter 3: Cartography and Visualization` },
  { id: 4, text: `Chapter 4: Data Acquisition` },
  { id: 5, text: `Chapter 5: Data Manipulation` },
  { id: 6, text: `Chapter 6: Analytical Methods` },
  { id: 7, text: `Chapter 7: Database Design and Management` },
];

export const resources = [
  [
    {
      name: "Direction Magazine Podcast and many other resources",
      link: "https://www.directionsmag.com/article/8411",
    },
    {
      name: "Geotech Concept Modules and Demonstration Videos",
      link: "https://www.geotechcenter.org/concept-modules-and-demonstration-videos8203.html",
    },
    {
      name: "GeoTech Center Personal Assessment Center",
      link: "https://www.geotechcenter.org/personal-assessment-center.html",
    },
  ],

  [
    {
      name: "Free GIS Fundamentals, 6th Edition book",
      link: "https://www.paulbolstad.net/gisbook.html",
    },
    {
      name: "A to Z GIS: An Illustrated Dictionary of Geographic Information Systems",
      link: "https://archive.org/details/tozgisillustrate0000unse",
    },
  ],

  [
    {
      name: "EXAM BLUEPRINT (2019) REVISED BP CROSSWALK",
      link: "https://www.gisci.org/Portals/0/PDF's/REVISED%20BP%20-%20Official%20-%20July%202019.pdf",
    },
    {
      name: "EXAM CANDIDATE MANUAL",
      link: "https://www.gisci.org/Portals/0/PDF's/Exam%20Candidate%20Manual%20Word%20June%202022.pdf?ver=EDJzxaULPf3ORUrX_YjxcQ%3d%3d",
    },
    {
      name: "GIS&T BODY OF KNOWLEDGE",
      link: "https://ucgis.memberclicks.net/assets/docs/gist_body_of_knowledge.pdf",
    },
    {
      name: "TEACHMEGIS PREP COURSE",
      link: "https://www.gisci.org/Portals/0/PDF's/Exam%20Candidate%20Manual%20Word%20June%202022.pdf?ver=EDJzxaULPf3ORUrX_YjxcQ%3d%3d",
    },
    {
      name: "UNOFFICIAL EXAM STUDY GUIDE",
      link: "https://www.gisci.org/Portals/0/PDF's/GISP%20Unofficial%20Study%20Guide%202019%20v2.pdf?ver=hWEX0NspSVz4XcX0FFf3YA%3d%3d",
    },
  ],

  [
    {
      name: "Getting started on your GISP",
      link: "https://www.youtube.com/watch?v=maisz8INlt8",
    },
    {
      name: "MAGIC Webinar: GISP Certification",
      link: "https://www.youtube.com/watch?v=Qwn3xuJ7YT0",
    },
    {
      name: "Why Pursue the GISP Designation - Lunch and Learn",
      link: "https://www.youtube.com/watch?v=f4gIfJSwaZw",
    },
    {
      name: "GISP - A Student Perspective Webinar (Nov. 18th, 2015, BIll Hodge, GISP)",
      link: "https://snhu.adobeconnect.com/_a798560077/p18d75wxkj8/?OWASP_CSRFTOKEN=9349efa6d6e2165ddbd37aa389f54fa3c2d7ef724f9d428d4d3f9446ed5b4db1",
    },
    {
      name: "Mapscaping Podcast: How to Become a Certified GIS Professional",
      link: "https://mapscaping.com/podcast/how-to-become-a-certified-gis-professional/",
    },
  ],
];

export const quiz = [
  [
    {
      question: "Georeferencing",
      answer: "101- associating a map or image with spatial location",
    },
    {
      question: "control points",
      answer:
        "101- points come in pairs that match the spatial location with a point on an unreferenced image or map",
    },
    {
      question: "Spatial Reference Systems (SRS)",
      answer:
        "101- coordinate based local, regional, or global system used to location geographical entities (aka Coordinate Reference System (CRS))",
    },
    {
      question: "Coordinate Reference System (CRS)",
      answer:
        "101- coordinate based local, regional, or global system used to location geographical entities (aka Spatial Reference Systems (SRS))",
    },
    {
      question: "International Terrestrial Reference System (ITRS)",
      answer:
        "101- a three-dimensional coordinate system with a well-defined origin (the center of mass of the Earth) and three orthogonal coordinate axes (X,Y,Z)",
    },
    {
      question: "Map projection",
      answer:
        "101- transforming coordinated from a curved surface (Earth) to a flat map",
    },
    {
      question: "Horizontal datum",
      answer:
        "101- model of the earth as a spheroid (2 components, reference ellipsoid and a set of survey points both the shape of the spheroid and its position relative to the earth)",
    },
    {
      question: "Vertical Datum",
      answer: "101- reference point for measuring elevations",
    },
    {
      question: "NAVD88",
      answer: "101- Gravity based geodetic datum in North America",
    },
    {
      question: "WGS 84 (World Geodetic System)",
      answer:
        "101- reference coordinate system used by the Global Positioning System (GPS)",
    },
    {
      question: "SRID integer",
      answer:
        "101- Spatial reference system id numbers, including EPSG codes defined by the International Association of Oil and Gas Producers",
    },
    {
      question: "types of distortion",
      answer:
        "101- Distance, Direction, Shape, Area (sometimes bearing and scale)",
    },
    {
      question: "Mercator Projection- distortions",
      answer: "101- preserves shape and direction, area gets distorted",
    },
    {
      question: "Mercator Projection",
      answer: "101- projecting the Earth onto a cylinder tangent to a meridian",
    },
    {
      question: "Azimuthal Projection- distortions",
      answer:
        "101- distance from center is true, other properties distort with distance",
    },
    {
      question: "Azimuthal Projection",
      answer:
        "101- planar or tangent (meaning they are formed when a flat piece of paper is placed on top of the globe and a light source projects the surrounding areas on to a map.) Either the North Pole or the South pole is orientated at the center of the map, giving the viewer an impression of looking up or down at Earth.",
    },
    {
      question: "Cylindrical Projection- distortions",
      answer:
        "101- preserve area and shape, distance gets distorted, especially on upper and lower regions of the map",
    },
    {
      question: "Cylindrical Projection",
      answer:
        "101- 2 types Tangent (1 intersect) and Secant (2 intersects)Straight meridians and parallelsmeridians are equally spaced while parallels are not",
    },
    {
      question: "Conical Projection- distortions",
      answer:
        "101- preserves direction and area in limited areas, distorts distance and scale except along standard parallels",
    },
    {
      question: "Conic Projections",
      answer:
        "101- mapped to equally spaced lines by projecting a spherical surface onto a cone",
    },
    {
      question: "Choosing a Projection- Low LATITUDE, (near Equator)",
      answer: "101- use conical projection",
    },
    {
      question: "Choosing a Projection- High LATITUDE, Polar Regions",
      answer: "101- use azimuthal planar projections",
    },
    {
      question: "Choosing a Projection- EXTENT, broad East-West (e.g. USA)",
      answer: "101- use conical projection",
    },
    {
      question:
        "Choosing a Projection- EXTENT, broad North-South (e.g. Africa)",
      answer: "101- use transverse-case cylindrical projection",
    },
    {
      question:
        "Choosing a Projection- THEMATIC, analysis that compares different values in different locations",
      answer: "101- use an equal-area projection",
    },
    {
      question: "Discrete features",
      answer: "102- feature has a definable boundary (think, vector)",
    },
    {
      question: "continuous phenomena",
      answer:
        "102- each location is a measure of something, often temperature or elevation (think raster, but not always)",
    },
    {
      question: "Geoid",
      answer:
        "103- the shape that the surface of the oceans would take under the influence of Earth's gravitation and rotation alone (absent of the influence of wind or tide)",
    },
    {
      question: "Mean Sea Level (MSL)",
      answer:
        "103- is determined by referencing the geoid model which registers ocean's water level at coastal places using tide gauges",
    },
    {
      question: "Reference Ellipsoid",
      answer:
        "103- is a mathematically defined surface that approximates the geoid (a truer model of shape that geoid)",
    },
    {
      question: "oblate ellipsoid",
      answer:
        "103- fits the geiod model to a first order approximationformed when an ellipse is rotated about its minor axis (The shape of the Earth, slightly bulging at the Equator.)",
    },
    {
      question: "sphere",
      answer:
        "103- can be seen from dimensions of the Earth ellipsoidthe semi-major axis (a) and semi-minor axis (b) differ by little more than 21 kilometers",
    },
    {
      question: "first (direct) geodetic problem",
      answer:
        "103- Given a point (coordinates) and direction (azimuth) and distance from that point to a second point, determine the coordinates of a second pointBe prepared for Word Problems like this one",
    },
    {
      question: "Second (inverse) geodetic problem",
      answer:
        "103- given two points, determine the azimuth and length of the line that connects them (line may be straight, arc, or geodesic)Be prepared for Word Problems like this one",
    },
    {
      question: "Geomatics",
      answer:
        "104- branch of science (and technology) of collection, analysis, interpretation of geographic information(includes surveying, mapping, remote sensing, GIS, GPS)",
    },
    {
      question: "GPS (global positioning system)",
      answer:
        "104- A system that determines the precise position of something on Earth through a series of satellites, tracking stations, and receivers.",
    },
  ],
  [
    {
      question: "Spatial Modeling",
      answer:
        "201- A methodology or set of analytical procedures used to derive information about spatial relationships between geographic phenomena.",
    },
    {
      question: "Types of spatial models",
      answer:
        "201-VectorRasterPixelGeodatabaseGridTINTopologicalHierarchicalNetworkObject Oriented",
    },
    {
      question: "Vector Spatial Modeling",
      answer: "201- coordinated based data model (points, lines, and polygons)",
    },
    {
      question: "Vector Spatial Modeling- Points",
      answer:
        "201- Discrete locations represented by a coordinate pair, attributes can be associated(e.g. Sign, city centers, geocoding addresses)",
    },
    {
      question: "Vector Spatial Modeling- Lines",
      answer:
        "201- Linear features composed of an ordered list of vertices, attributes can be associated(e.g. rivers, roads, utility lines)",
    },
    {
      question: "Vector Spatial Modeling- Polygons",
      answer:
        "201- composed of nodes and vertices forming bounded areas; start and end node are the same, attributes can be associated(e.g. water bodies, parcels, land masses)",
    },
    {
      question: "Raster Spatial Modeling",
      answer:
        "201- composed of a rectangular array of regularly spaced square grid cells, each cell having an independent value (attribute)Single or multi bandRaster coordinated are stored by ordering the matrix(e.g. elevation, temperature)",
    },
    {
      question: "Pixel Spatial Modeling",
      answer:
        "201- smallest resolvable piece of scanned imagea pixel is always a cell but a cell is not always a pixel",
    },
    {
      question: "Geodatabase Spatial Modeling",
      answer:
        "201- object oriented spatial modelBasic Components- feature classes, feature datasets, non-spatial tablesComplex Components- topology, relation ship classes, geometric networksRelationship Classes- model real-world relationships that exist between objects (such as parcels and buildings)",
    },
    {
      question: "Grid Spatial Modeling",
      answer:
        "201- parallel and perpendicular lines for reference as a map projection or coordinate system",
    },
    {
      question: "Triangulated Irregular Network (TIN) Spatial Modeling",
      answer:
        "201- Composite vector data that approximate the terrain with a set of contiguous, non-overlapping (Delaunay) triangles, circumcircle can not contain more than three pointsMay be asked to create Delaunay Triangles",
    },
    {
      question: "Advantages of TIN Spatial Modeling",
      answer:
        "201- small areas with high precision elevation data,more efficient storage than DEM or contour lines",
    },
    {
      question: "Disadvantages of TIN Spatial Modeling",
      answer:
        "201- high cost,requires highly accurate data source,TIN production is computing intensive",
    },
    {
      question: "Topological Spatial Modeling",
      answer:
        "201- topology is implemented through a set of rules that define how features may share a geographic space and a set of editing tools that work with features that share geometry in an integrated fashion. (ESRI). The physical and logical design of a network; examples include mesh, bus, ring and star; the physical layout of the network devices and the vectoring, and how all the components communicate with each other",
    },
    {
      question: "Hierarchical Spatial Modeling",
      answer:
        "201- database that stores related information in a tree-like structure",
    },
    {
      question: "Network Spatial Modeling",
      answer:
        "201- collection of topologically connected network elements (edges, junctions, turns)Each element is associated with a collection of network attributes",
    },
    {
      question: "Object Oriented Spatial Modeling",
      answer:
        "201- data management structure, stores data as objects (classes), instead of rows and tables like a relational database(e.g. SQL Server, Oracle, PostgreSQL)",
    },
    {
      question: "Bolstad Spatial Modeling- Cartographic Model",
      answer:
        "201- Temporally Static, combined spatial datasets, operations and functions for problem-solving",
    },
    {
      question: "Bolstad Spatial Modeling- Spatio-temporal Models",
      answer: "201- dynamic in time and spacetime-driven processes",
    },
    {
      question: "Bolstad Spatial Modeling- Network Models",
      answer:
        "210- modeling of resources (flow, accumulation) as limited to networks",
    },
    {
      question: "Goodchild Spatial Modeling- Data Models",
      answer: "201- entities and fields as conceptual models",
    },
    {
      question: "Goodchild Spatial Modeling- Static Modeling",
      answer:
        "201- taking inputs to transform them into outputs using sets of tools and functions",
    },
    {
      question: "Goodchild Spatial Modeling- Dynamic Modeling",
      answer:
        "201- iterative, sets of initial conditions, apply transformations to obtain a series of predictions at time intervals",
    },
    {
      question: "DeMers Spatial Modeling",
      answer:
        "201- Based on purpose descriptive- passive, description of the study area,perspective- active, imposing beat solution",
    },
    {
      question: "DeMers Spatial Modeling- Methodology Stochastic",
      answer:
        "201- based on statistical probability deterministic- based on knowing functional linkages and interaction",
    },
    {
      question: "DeMers Spatial Modeling- logic inductive",
      answer:
        "201- general models based on individual data, deductive- from general to specific using known factor and relationships",
    },
    {
      question: "Types of Spatial Data Relationships",
      answer:
        "202- 1 to 1- Each object of the origin table can be related to 0 or 1 object of the destination table.. 1 to Many- Each object of the origin table can be related to multiple objects in the destination table. Many to Many- Multiple objects in the origin table can be related to multiple objects in the destination table",
    },
    {
      question: "Equal Spatial Data Relationships (topological relations)",
      answer: "202- a=b (topologically equal)",
    },
    {
      question: "Disjointed Spatial Data Relationships (topological relations)",
      answer:
        "202- a and b are disjointed, have no point in common. They form a set of disconnected geometries.",
    },
    {
      question: "Intersects Spatial Data Relationships (topological relations)",
      answer: "202- some common interior points",
    },
    {
      question: "Touches Spatial Data Relationships (topological relations)",
      answer:
        "202- a touches b, at least one boundary point in common but no interior points",
    },
    {
      question: "Contains Spatial Data Relationships (topological relations)",
      answer: "202- feature b is within feature a",
    },
    {
      question: "Covers by Spatial Data Relationships (topological relations)",
      answer:
        "202- b lies in the interior of a (extends Contains)Other definitions: no points of b lie in the exterior of a, or Every point of b is a point of (the interior of) a",
    },
    {
      question: "Covered by Spatial Data Relationships (topological relations)",
      answer: "202- every point of feature b is a point of feature a",
    },
    {
      question: "Within Spatial Data Relationships (topological relations)",
      answer: "202- a is within b",
    },
    {
      question: "Crosses Spatial Data Relationships (topological relations)",
      answer: "202- a crosses b at some point",
    },
    {
      question: "Overlaps Spatial Data Relationships (topological relations)",
      answer: "202- a and b have common interior points",
    },
    {
      question: "Basic Topology Rules- Polygons",
      answer:
        "202- Must: be larger than cluster tolerance, be covered by feature class of, cover each other, be cover by, boundary must be covered by, area boundary must be covered by, contains pointMust not: overlap, have gaps, not overlap with",
    },
    {
      question: "Basic Topology Rules- Lines",
      answer:
        "202- Must: be larger than cluster tolerance, be covered by feature class of, be covered by boundary of, be inside, endpoint must be covered by, be single part. Must not: overlap, intersect, not intersect with, have dangles, have pseudo nodes, intersect or touch interior, intersect or have interior with, overlap with, self-overlap, self-intersect",
    },
    {
      question: "Basic Topology Rules- Points",
      answer:
        "202- Must: coincide with, be disjoint, be covered by boundary of, be properly inside, be covered by endpoint of, be covered by line",
    },
    {
      question: "Geometric Accuracy- Data Quality",
      answer:
        "203- how close the x-y values of a data set correspond to the actual locations on the earth's surface",
    },
    {
      question: "Root Mean Squared Error (RMS)- Data Quality",
      answer:
        "203- a calculation to describe the difference between the measurement and the true value, applies to georectificationcalculated as the square root of the average squared errors",
    },
    {
      question: "Thematic Accuracy- Data Quality",
      answer: "203- accuracy of non-spatial (attribute) data",
    },
    {
      question: "Resolution- Data Quality",
      answer:
        "203- smallest separation between two coordinate values (e.g. raster cell size)",
    },
    {
      question: "Precision- Data Quality",
      answer: "203- level of measurement and exactness of attribute data",
    },
    {
      question: "Fitness for Use- Data Quality",
      answer: "203- Does the data fulfill the needs of the project",
    },
    {
      question: "Confusion Matrix- Data Quality",
      answer:
        "203- assesses accuracy of image classification based on additional ground truths",
    },
    {
      question: "Quality Assurance- Data Quality",
      answer:
        "203- Process oriented and focuses on defect preventionEstablished a good quality management system and assessment of its adequacy- periodic audits- managerial tool",
    },
    {
      question: "Quality Control- Data Quality",
      answer:
        "203- product oriented and focuses on defect identificationFinding and eliminating sources of quality problems through tools and equipment- corrective tool",
    },
    {
      question: "Imprecision- Data Quality",
      answer:
        "203- all data is taken from a 3D globe and transferred to a 2D surface through spatial transformations (projections and datums) which caused inherent distortions with the data",
    },
    {
      question: "Uncertainty- Data Quality",
      answer:
        "203- The GIS data was created/collected at a certain point of time, may already be out of date",
    },
    {
      question: "Data Resolution",
      answer:
        "204- the cell size of a rasterthat area covered by the ground represented by just one cell",
    },
    {
      question: "Data Validation",
      answer:
        "205- to ensure the accuracy of the data is preserved,-ground observations to ensure data accuracy-can also be compared to model generated data (less accurate)",
    },
    {
      question: "Data Uncertainty",
      answer:
        "205- difference between real world and GIS,-may be visible from the original data or measuring that data,-assumptions made when creating data-model structure-retrieval errors, sampling errors, and inadequate ground observations",
    },
    {
      question: "Metadata",
      answer:
        "206- information that describes the content quality, condition, origin, and other characteristics of data, databases, or other pieces of information",
    },
    {
      question: "Temporal Data",
      answer:
        "207- data that represents a state in time (e.g. rain fall for one day)",
    },
    {
      question: "Federal Geographic Data Committee (FGDC)",
      answer:
        "208- purpose is to build a data infrastructure for improved public and private sector application of geospatial data and decision-makingInclude title, abstract, date, geographic extent and projection info, attribute label definitions and domain values",
    },
    {
      question: "Content Standard for Digital Geospatial Metadata (CSDGM)",
      answer:
        "208-ISO 19115- developed for documenting vector and point data and geospatial services (web-mapping, data catalogs, and data modeling applications)ISO 19115-2 adds elements to describe imagery and grid data, as well as data collected using instruments (monitoring stations and measurement devices)",
    },
    {
      question: "Open GIS Consortium (OGC)",
      answer:
        "208- Describes basic data model for holding geographic data (such as KML)",
    },
  ],
  [
    {
      question: "Thematic Map",
      answer:
        "301- map especially designed to show a particular theme connected with a geographic area (population, income level)",
    },
    {
      question: "Choloropleth Maps",
      answer:
        "301- areas shaded according to prearranged key, each shading or color type represent a range of values",
    },
    {
      question: "Proportional Symbol",
      answer:
        "301- size of the symbol corresponds to the magnitude of the mapped feature",
    },
    {
      question: "Isarithmic or Isopleth",
      answer:
        "301- lines of equal value are drawn (contour lines) or ranges of similar values are filled with similar colors or patterns",
    },
    {
      question: "Dot",
      answer:
        "301- Shows distribution of phenomena where values and location are known - place a dot where the location of variable is",
    },
    {
      question: "Dasymetric",
      answer:
        "301- alternative to choropleth - ancillary information is used to model internal distribution of the phenomenon",
    },
    {
      question: "Multivariate displays",
      answer: "301- more than 2 sets of data on a single map",
    },
    {
      question: "Web Mapping",
      answer:
        "301- The use of the internet to generate and distribute (share) spatial data and maps",
    },
    {
      question: "Map layout elements",
      answer:
        "302- title, map, legend, map scale, supporting media, north arrow, metadata (sources, currency of information, projection, copyright, authorship)",
    },
    {
      question: "Symbols",
      answer: "302- representations of feature of a map",
    },
    {
      question: "Map Accuracy",
      answer:
        "302- difficult to assess, all maps show a selective view of reality - should ask instead if map is appropriate for my purposes",
    },
    {
      question: "Map Scale",
      answer:
        "302- The relationship between the size of an object on a map and the size of the actual feature on Earth's surface.",
    },
    {
      question: "Symbolization Variables",
      answer: "302- size, shape, orientation, pattern, hue, value",
    },
    {
      question: "Quantitative Map Elements",
      answer:
        "302- Size- the size of the point or thickness of lineValue- the shade of the color such as dark red or light red",
    },
    {
      question: "Qualitative Map Elements",
      answer:
        "302- Shape- symbology of a pointPattern- lines having different styles such as dashed linesHue- different colors",
    },
    {
      question: "Typography Map Elements",
      answer:
        "302- the style, arrangement, and appearance of text, point size, line length, typefaces",
    },
    {
      question: "Verbal Map Scale",
      answer:
        "302- States in words the relationship between the distance on the map and the actual distance on Earth's surface",
    },
    {
      question: "Visual Map Scale",
      answer: "302- graphic scale or bar scale",
    },
    {
      question: "Representative Map Scale",
      answer:
        "302- representative fraction or ratio scale 1:24,000 or 1 in-24,000 feet",
    },
    {
      question: "Absolute Map Scale",
      answer:
        "302- system of measurement that begins at a minimum or zero point and progresses in only one direction",
    },
    {
      question: "Relative Map Scale",
      answer:
        "302- Arbitrary; begins as some point defined by author and can progress in both directions",
    },
    {
      question: "Display vs Data",
      answer:
        "302- the data is built at a certain scale/accuracy but once the data is displayed in any other format that the one it was made for, the scale gets warped. Ex. a map made as 9x10 that is then scaled down and printed in a newspaper",
    },
    {
      question: "Large Map Scale",
      answer:
        "302- larg ratio between map units and ground units, zoomed in (USGS Topo map)",
    },
    {
      question: "Small Map Scale",
      answer:
        "302- small ratio between map units and ground units small, zoomed out (whole country)",
    },
    {
      question: "3D Mapping brings... (visualization)",
      answer:
        "304- a z-value, typically elevation or height-including building modeling (BIM)",
    },
    {
      question: "Contour Line (visualization)",
      answer:
        "304- isoline, isopleth, or isarithm; a function of two variables is a curve along which the function has a constant value-joins points of an equal value on a line",
    },
    {
      question: "Contour Interval (visualization)",
      answer: "304- difference in elevation between successive contour lines",
    },
    {
      question: "Index Contour (visualization)",
      answer: "304- the contour that is thicker and typically labeled",
    },
    {
      question: "Iso (line) (visualization)",
      answer: "304- iso=equal, equal distance between lines",
    },
  ],
  [
    {
      question: "Primary Data",
      answer:
        "401- information that is collected for the first time for the author's purpose; used for solving the particular problem under investigation",
    },
    {
      question: "Secondary Data",
      answer:
        "401- information that already exists somewhere, having been collected for another purpose by someone other than the author",
    },
    {
      question: "5 types of measurement",
      answer:
        "physical measurement, observation of behavior, archives, explicit reports, computational modeling",
    },
    {
      question: "Physical Measurement",
      answer:
        "401- Recording physical properties of the earth or its inhabitants - size, number, temperature, chemical makeup, moisture etc.",
    },
    {
      question: "Observation of Behavior",
      answer:
        "401- Observable actions or activities of individuals or groups - not thoughts, feelings or motivations",
    },
    {
      question: "Archives",
      answer:
        "401- records that have been collected primarily for non-research purposes (secondary)",
    },
    {
      question: "Explicit Reports",
      answer: "401- beliefs people express about things -surveys",
    },
    {
      question: "Computational Modeling",
      answer:
        "401- Models as simplified representations of portions of reality",
    },
    {
      question: "Quantitative Data",
      answer:
        "401- numerical values, measured on at least an ordinal level but could be on a metric level",
    },
    {
      question: "Qualitative Data",
      answer:
        "401- non-numerical or numeral (nominal) values that have no quantitative meaning",
    },
    {
      question: "Deceptive Mapping",
      answer:
        "401- a map purposely distorted for gain (e.g. propaganda, military deception)",
    },
    {
      question: "Layer",
      answer: "mechanism to display geographic data",
    },
    {
      question: "Data Transfer Standards- Transfer",
      answer:
        "401- a robust way of transferring GIS data between computers with no information loss, including metadatafollow Spatial Data Transfer Standards (SDTS) or Federal Information Processing Standard (173)-",
    },
    {
      question: "Data Transfer Standards- Industry Standards",
      answer:
        "401- typically don not exchange topology, only graphic info; large number of format translators",
    },
    {
      question: "Data Transfer Standards- Open GIS Consortium (OGC)",
      answer:
        "401- non-profit, international, voluntary consensus standards organization-Created Geography Markup Language (GML) an xML based encoding standard",
    },
    {
      question: "Field Data Collection- Remote Sensing",
      answer:
        "402- 3 resolutions- spatial, spectral (EM Spectrum), and temporal (repeat cycle)",
    },
    {
      question: "Spatial Resolution",
      answer:
        "503- size of object that can be resolved and the most usual measure is the pixel size",
    },
    {
      question: "Spectral Resolution",
      answer: "503- parts of the electromagnetic spectrum that are measurable",
    },
    {
      question: "Temporal Resolution",
      answer:
        "503- repeat cycle- frequency with which images are collected for the same area",
    },
    {
      question: "Field Data Collection- Ground Survey",
      answer:
        "402- based on principle that the 3-D location of any known point can be determined by measuring angles and distances from other known points-expensive and time consuming",
    },
    {
      question: "Field Data Collection- GPS",
      answer:
        "402- Using a GPS receiver to receive signals from the GPS satellites to calculate the current position and time",
    },
    {
      question: "Field Data Collection- Inspection",
      answer:
        "402- data has already been geographically located and needs to be verified",
    },
    {
      question: "Field collection process",
      answer:
        "402- Determine the result of field work-determine what needs to be collected, inspected, or surveyed (field collection survey form)-determine how it will be collected (tablet, pen and paper)-begin collection, review a sample and make adjustments-plan location and timing-start collection",
    },
    {
      question: "Types of Remote Sensing Systems",
      answer:
        "404- passive- gather radiation emitted from objects (photography, infrared) -active- emits energy and measures the amount of energy returned from target objects (RADAR, LIDAR)",
    },
  ],
  [
    {
      question: "Data Format Conversion",
      answer:
        "501- converting data from one form to another (such as a vector to a raster)",
    },
    {
      question: "Data Transformation",
      answer:
        "501- Process of changing the data from their original form to a format suitable for performing a data analysis addressing research objectives. (Converting data from different coordinate systems, or one data structure to another)",
    },
    {
      question: "Spatial Data Generalization",
      answer:
        "502- Selection- only selecting certain features to be displayedRemoving DetailSimplification- smoothing out detailed and complicated featuresDissolve and Merge- combining similar neighbor elementsAggregation- combining features into a new composite featureExaggeration- making features larger or smaller in scale than they are",
    },
    {
      question: "Vector Spatial File Type - Advantages",
      answer:
        "503- Represent point line and area accurately-more efficient that raters in storage-supports topology-interactive retrieval-enables map generalization",
    },
    {
      question: "Vector Spatial File Type - Disadvantages",
      answer:
        "503- Less intuitively understood-multiple vectors overlay is computationally intensive-display and plotting vectors can be expensive",
    },
    {
      question: "Raster Spatial File Type - Advantages",
      answer:
        "503- Easy to understand-good to represent surfaces-easy to input and outputeasy to draw on a screen-analytical operations are easier",
    },
    {
      question: "Raster Spatial File Type - Disadvantages",
      answer:
        "503- inefficient for storage-compression techniques not efficient with variable data-large cells could potentially cause information loss-poor at representing points, lines, areas-each cell can be owned buy only one feature-must include redundant or missing data",
    },
    {
      question: "Vector File Types",
      answer:
        "503- PostScript- page definition language to export or print a map Digital Exchange Format (DXF)- AutoCAD- no topology but lots of detail Digital Line Graph (DLG)- distributed by the government and most GIS packages will import but extra manipulation is needed TIGER- block level maps of every village, town, and city in the US Shapefile- vector data format stores location, shape and attributes Scalable Vector Graphics (SVG)- extension of the XML language ArcInfo Coverage- stores set of thematically associated data considered to be a unit ArcInfo Interchange File (.eoo) - known as ArcGIS export file Geodatabase- object oriented data model represents features and attributes as objects",
    },
    {
      question: "Raster File Types",
      answer:
        "503- standard- rows and columns with header information Tagged Image File Formats (TIFF)- associated with scanners GEO-TIFF- puts latitude/longitude at edge of pixels Graphic Interchange Format (GIF)- image files for sharp edges and few gradations of color Joint Photograph Experts Group (JPEG)- variable-resolution compression system with both partial and full resolution recovery Digital Elevation Model (DEM)- 30 meter elevation data 1:24,000, 7.5 minute quadrangle maps or 1:250,000 3 second arc second digital terrain data Band Interleaved by Pixel (BIP) or by Line (BIL)- good as storing different brightness levels RS Landsat- satellite imagery and BIL information are combined",
    },
    {
      question: "Vector and Raster Transformations",
      answer:
        "503- R to V- not difficult based on pixel valueV to R- very difficult because pixels may distort the lines or exact point locations and would need to be re-digitized",
    },
    {
      question: "Shapefile File Type (SHP)",
      answer:
        "503- .shp** - shape format -feature geometry itself-.shx- shape index format- positional index of the feature geometry to allow seeking forward and backwards quickly-.dbf**- Database File- attribute information-.prj**- projection format- information pertaining to coordinate system, all text on a single line with no extra spaces-.sbn & .sbx- optional spatial index files to optimize spatial queries shp.xml - geospatial metadata in XML format**required for proper visualization of a Shapefile and its attributes",
    },
    {
      question: "Geodatabase (.gdb)",
      answer:
        "503- data structure for ArcGIS and is the primary data format used for editing and data management-.gdb- file geodatabase-.mdb- personal geodatabase based on Microsoft Access",
    },
    {
      question: "Coverage File",
      answer:
        "503- point, arc, node, route, route system, section, polygon, and region",
    },
    {
      question: "DGN File",
      answer: "503- A file format supported by MicroStation and AutoCAD",
    },
    {
      question: "TXT File",
      answer:
        "A simple file consisting of lines of text with no formatting that almost any computer can open and display",
    },
    {
      question: "IMG File",
      answer: "503- image",
    },
    {
      question: "LAS File",
      answer:
        "503- an industry-standard binary format for storing airborne LiDAR data, point cloud file",
    },
    {
      question: "Raster file types",
      answer: "503- .jpg, .tif, .gif-rendered file formats",
    },
    {
      question: "Databases",
      answer:
        "503- direct connection to relational database management systems and big databases - manage tables and features classes in databases",
    },
    {
      question: "Geodatabase",
      answer:
        "503- A database or file structure used primarily to store, query, and manipulate spatial/GIS data for central access-An object-based vector data model developed by Esri",
    },
    {
      question: "Cloud Computing",
      answer:
        "503- the practice of using a network of remote servers hosted on the Internet to store, manage, and process data, rather than a local server or a personal computer.-Allows single and multiple user editing",
    },
    {
      question: "Integrate Enterprise",
      answer:
        "503- data stored in big business systems to extend their analytical capabilities",
    },
    {
      question: "Data Rules and Relationships",
      answer:
        "503- define relationship between data sets and set rules (domains and subtypes)",
    },
    {
      question: "Metadata Management",
      answer:
        "503- describes content, quality, origin, and other characteristics of data",
    },
    {
      question: "Secures Data",
      answer:
        "503- flexibility and control over how GIS platform is deployed, maintained, secured, and used",
    },
    {
      question: "Versioning Data",
      answer:
        "504- Used to standardize data across systems, that allow it to be queried-extract data from current source-transform data into the current format-load data to final storage point and format",
    },
  ],
  [
    {
      question: "ETL (extraction, transformation, and loading)",
      answer:
        "601- select features based on filters of attributes- new selection, add to selection, remove from selection, subset selection, switch selection, clear selection",
    },
    {
      question: "Attribute Data Selection",
      answer:
        "601- Intersect, within a distance, contains, completely contains, contains Clementini, within, completely within, within Clementini, are identical to, boundary touches, shares a line segment with, crossed by the outline of, have their center in, contained by",
    },
    {
      question: "Spatial Data Selection",
      answer:
        "601- Intersect, within a distance, contains, completely contains, contains Clementini, within, completely within, within Clementini, are identical to, boundary touches, shares a line segment with, crossed by the outline of, have their center in, contained by",
    },
    {
      question: "Location Data Selection",
      answer: "601- select features within a certain distance of a location",
    },
    {
      question: "Data Editing- Buffer",
      answer:
        "601- Creates buffer polygons around input features to a specified distance",
    },
    {
      question: "Data Editing- Dissolve",
      answer: "601- Aggregates features based on specified attributes",
    },
    {
      question: "Data Editing- Merge",
      answer:
        "601- combines tow attribute tables into one using a common key between tables",
    },
    {
      question: "Data Editing- Append",
      answer:
        "601- combines datasets of same data type into an existing dataset",
    },
    {
      question: "Data Editing- Union",
      answer: "601- combines input features with another feature dataset",
    },
    {
      question: "Data Editing- Clip",
      answer:
        "601- extracts input features that overlay the clip features (keeps input attributes)",
    },
    {
      question: "Data Editing- Intersect",
      answer:
        "601- extracts feature which overlap in all layers to new feature class (joins attribute tables)",
    },
    {
      question: "Data Editing- Join",
      answer:
        "601- combine two attribute tables into one using a common key between tables",
    },
    {
      question: "Data Classification",
      answer:
        "602- objects with similar symbols- up to 7 feature classed (5 is preferred)-classes should be exhaustive and should not overlap",
    },
    {
      question: "Data Classification Categories",
      answer:
        "602- Equal Range- equal distance between class breaks -quantiles- equal number of observations in each class -standard deviation- class breaks based on distance of standard deviation from the mean -natural breaks- class breaks conform to gaps in data distribution-symbology- one layer can be symbolized by selected attribute",
    },
    {
      question: "Overlay Analysis Methodology",
      answer:
        "603- GIS analysis that evaluates what features are on top of other features in order to answer spatial questions, based on Boolean logic.Used to define a problem, break problem into submodels, determine significant layer, reclassify or transform data within a layer",
    },
    {
      question: "Spatial Overlay Analysis",
      answer:
        "603- Overlays are the combination of spatial and attribute data from two or more spatial layers that cover the same area to study the relationship between them",
    },
    {
      question: "Overlay Analysis",
      answer:
        "603- GIS analysis that evaluates what features are on top of other features in order to answer spatial questions.",
    },
    {
      question: "Vector Overlay Tools",
      answer:
        "603- identity- input features, split by overlay features-intersect- only features common to all input layers-symmetrical difference- features common to either input layer or overlay layer but not both-union- all input features-update- input feature geometry replaced by update layer",
    },
    {
      question: "Raster Overlay Tools",
      answer:
        "603- zonal statistics- summarizes values in a rater layer by zones (categories) in another layer (e.g. calculate the mean elevation for each vegetation category) combine- assigns a value to each cell in the output layer based on unique combinations of values from several input layers single output map algebra- combines multiple raster layer using an expression (e.g. add several ranked layer to create and overall ranking) weighted overlay- automates the raster overlay process and provides an option to assign weights to each layer before adding weighted sum- overlays several rasters multiplying each by their given weight and sums them together",
    },
    {
      question: "Map Algebra",
      answer:
        "604- various functions performed on neighboring cells for raster datasets",
    },
    {
      question: "Local Operations (Map Algebra)",
      answer:
        "604- combine rasters that overlay each other-add/subtract/etc. the cells that are in the same location",
    },
    {
      question: "Global Operations (Map Algebra)",
      answer:
        "604- applies a formula to all cells-add/subtract/etc. all cells based on one value-find the distance from one cell to all cells",
    },
    {
      question: "Focal Operations (Map Algebra)",
      answer:
        "604- calculated a value based on all neighboring cells-find the average of all the cells around a chosen cell",
    },
    {
      question: "Zonal Operations (Map Algebra)",
      answer:
        "604- computing a value based on cells in a particular zone (such as a watershed)",
    },
    {
      question: "Descriptive Statistics",
      answer:
        "605- numerical data used to measure and describe characteristics of groups. Includes measures of central tendency and measures of variation.-Summarizes a sample to learn about the population",
    },
    {
      question: "Summary Statistics",
      answer:
        "605- statistics that summarize a great deal of numerical information about a distribution, such as the mean and the standard deviation",
    },
    {
      question: "Coefficient of Determination",
      answer:
        "605- R squared - number that indicates how well data fit in a statistical model-fit a line or curve-1 indicated the line fits perfectly with the data-0 indicated the line does not fit at all, data is random",
    },
  ],
  [
    {
      question: "Schema (Database Object)",
      answer:
        "701- structure or design of the database or database object (table, view, index, stored procedure, trigger)-defines tables, fields in each table, relationships between fields-a schema will include information on which fields have domains and what those domains are",
    },
    {
      question: "Data Dictionary",
      answer:
        "701- catalog or table containing information about the datasets stored in a database",
    },
    {
      question: "Domain",
      answer: "701- the range of values for a particular metadata element",
    },
    {
      question: "Attribute Domain",
      answer:
        "701- enforces data integrity, identify what values are allowed in a field in a feature class",
    },
    {
      question: "Coded Value Domain",
      answer:
        "701- attribute domain that defines a set of permissible values for an attribute in a geodatabase - it has a code and its equivalent",
    },
    {
      question: "Range Domain",
      answer:
        "701- attribute domain that specifies a valid range of permissible numerical attribute",
    },
    {
      question: "Spatial Domain",
      answer: "701- allowable range for x,y coordinated and for m, z values",
    },
    {
      question: "Tables (Database Object)",
      answer:
        "701- collection of related data held in structured formation within a database, contains fields and rows",
    },
    {
      question: "Views (Database Object)",
      answer:
        "701- resulting set of a stored query on the data - users can query- virtual table computed dynamically from data when the view is accessed",
    },
    {
      question: "Sequences (Database Object)",
      answer:
        "701- ordered collection of objects in which repetition are allowed (finite or infinite) number of elements is the length of the sequence",
    },
    {
      question: "Synonyms (Database Objects)",
      answer:
        "701- alias or alternate name for a table, view, sequence or other object",
    },
    {
      question: "Indexes (Database Objects)",
      answer:
        "701- data structure that improves the speed of data retrieval operations in a database table-causes more storage space and additional writes-quickly locate data in database-indexes can be on multiple columns",
    },
    {
      question: "Clusters (Database Objects)",
      answer:
        "701- multiple servers share one storage--typically used to handle user load balancing databases distributed to different servers using replication--typically used if you have multiple users utilizing the same data in different physical locations--there is a master database that the replica databases sync between",
    },
    {
      question: "Database Links",
      answer:
        "701- data stored in a different database but accessible to the database currently being accessed",
    },
    {
      question: "Snapshot (Database Objects)",
      answer:
        "701- state of a system at a particular point in time, can be a backup copy",
    },
    {
      question: "Procedure (Database Objects)",
      answer:
        "701- subroutine available to applications that access a relational database system (data validation, access control mechanisms)",
    },
    {
      question: "Trigger (Database Objects)",
      answer:
        "701- procedural code automatically executed in response to certain events on a particular table or view in a database",
    },
    {
      question: "Functions and Subroutines",
      answer:
        "701- sequence of program instructions that perform a specific taskThe difference between a function and a subroutine is that a function can return data, whereas a sub can't.",
    },
    {
      question: "Package (Database Objects)",
      answer:
        "701- built from source with one of the available package management systems",
    },
    {
      question: "Non-schema Objects",
      answer: "701- users, roles, contexts, directory objects",
    },
    {
      question: "Database Design",
      answer:
        "702- process of determining fields, tables and relationships needed to satisfy the data and processing requirements, a detailed model of the database",
    },
    {
      question: "Database Design Process",
      answer:
        "702- (pre-created list on quizlet)System AnalysisConceptual DesignPhysical DesignImplementation & ConversionOperation & Maintenance",
    },
    {
      question: "Conceptual Schema (Database Design Process)",
      answer:
        "702- Step 1 of Database Design ProcessDetermine where relationships and dependency is within the data",
    },
    {
      question: "Logical Data Model (Database Design Process)",
      answer:
        "702- Step 2 of Database Design ProcessArrange data in a logical structure that can be mapped into the storage objects supported by the database management system",
    },
    {
      question: "Physical Model (Database Design Process)",
      answer:
        "702- Step 3 of Database Design Process-physical configuration of the database on the storage media-detailed specification of data elements, data types, indexing options, and other parameters residing in the DBMS data dictionary-models, hardware, software",
    },
    {
      question: "Database Field Type",
      answer:
        "702-short integer- between -32768 and 32768long integer- between -2,147,483,648 and 2,147,483,648float- single-precision floating-point numbersdouble- double-precision floating-point numberstext- free-text, could be a coded value-assign to and integer through a domaindates- a calendar date and/or timeBLOB- (Binary Large Object) data stored as a long sequence of binary numbers - ArcGIS stores annotation and dimensions as BLOB - images, multimedia, bits of codeObject Identifiers- Unique IDs and FIDsGlobal Identifiers- Global ID and GUID - data types store registry sing style strings consisting of 36 characters enclosed in curly bracketsRaster field types- raster can be stored within the geodatabasegeometry -point, line, polygon, multipoint, multipatch",
    },
    {
      question: "Database Administration Basic Tasks",
      answer:
        "703-Backup and recoveryDatabase SecurityStorage and capacity planningPerformance monitoring and tuningTroubleshootingother- high availability and ETL",
    },
    {
      question: "Database Administration Archiving",
      answer:
        "703- captures, manages, and analyzes data changes (most often done with geodatabases)",
    },
    {
      question: "Database Administration Retrieval",
      answer:
        "703- extracting data from a backup due to data loss or data corruption",
    },
    {
      question: "Data Owner",
      answer:
        "704- Individuals, normally managers or directors, who have responsibility for the integrity, accurate reporting and use of computerized data.-user who creates tables, feature classes",
    },
    {
      question: "User Access",
      answer:
        "704- Refers to what permissions each user should be granted in a particular database, and which database objects they will be able to see and use. Administrator- full control of the database; can read, create, update, delete (features and data sets) Editor- can read, update, create, and delete features Creator- can create additional feature classes, tables, and can read update, create, and delete Reader- can only view data",
    },
    {
      question: "Authentication (Data Security)",
      answer:
        "704- database checks the list of users to make sure a user is allowed to make a connection-Operating System (OS) authentication-Database Authentication",
    },
    {
      question: "Groups (Data Security)",
      answer: "704- grant users based on their common functions",
    },
    {
      question: "Public Role (Data Security)",
      answer: "704- right granted to anyone connected to database",
    },
  ],
  [
    {
      question: "File Based Transfer",
      answer: "801- data is in a structured file format",
    },
    {
      question: "Application Programming Interface (API)",
      answer:
        "801- A set of software routines that allows one software system to work with another.",
    },
    {
      question: "Web Services",
      answer:
        "801- Small pieces of code that are accessed via the application server which permit inter-operable machine-to-machine interaction over a network.",
    },
    {
      question: "SSL (Secure Sockets Layer)",
      answer:
        "801- a protocol that provides security when communicating on the Internet (encryption)",
    },
    {
      question: "TLS (Transport Layer Security)",
      answer:
        "801- used to encrypt traffic on the wire. TLS is the replacement for SSL and like SSL, it uses certificates issued by CAs.",
    },
    {
      question: "NTP (Network Transport Protocol)",
      answer:
        "801- communication packet is constructed at different intervals, transferred form host to receiver Transmission Control Protocol (TCP)- header package for the data at the transport layer Internet Protocol (IP)- header is added to internet layer Media Access Control (MAC) address- added at the physical network layer",
    },
    {
      question: "NFS (Network File System)",
      answer:
        "801- A client/server application that enables users to access shared files stored on different types of computers and work with those files as if they were stored locally on their own computers.",
    },
    {
      question: "CIFS Common Internet File System",
      answer:
        "801- a network file system protocol used for providing shared access to files and printers between machines on the network.",
    },
    {
      question: "HTTP (Hypertext Transfer Protocol)",
      answer:
        "801- the protocol used for transmitting web pages over the Internet, a way of delivering map images or map data to web browsers",
    },
    {
      question: "Scripting",
      answer:
        "802- used to manipulate, customize, and automate existing softwareinterpreted by the computer rather than compiled",
    },
    {
      question: "Object-Oriented Programming (OOP)",
      answer:
        "802- designing a program by discovering objects, their properties, and their relationships -contain data in the form of fields (aka attributes) and procedures (aka methods)",
    },
    {
      question: "Extensibility (system design principle)",
      answer:
        "802- implementation take future growth into consideration-level of effort to extend the system and implement the extension",
    },
    {
      question: "Query Expression",
      answer:
        "A type of expression that evaluates to a Boolean (true or false) value, that is typically used to select those rows in a table in which the expression evaluates to true. Query expressions are generally part of a SQL statement.",
    },
    {
      question: "Expression (Scripting Basics)",
      answer:
        "802- most basic programming instruction-contains vales and operators that can reduce to a single value",
    },
    {
      question: "Variables (Scripting Basics)",
      answer:
        "802- value that can change depending on the program or information passed to the program",
    },
    {
      question: "Iterations (Scripting Basics)",
      answer:
        "802- repeating a process to generate an outcome-for loops, do while loops, do until loops",
    },
    {
      question: "Condition Statement (Scripting Basics)",
      answer:
        "802- the result must meet the requirements of the statement-if- a conditional statement expression that is either true or false-else- combined with an if statement and if the statement is false, defaults to the else condition-elif- check if a different condition from the first 'if' is true",
    },
    {
      question: "Agile (Application Development)",
      answer:
        "803- A software development methodology that delivers functionality in mini-increments or rapid iterations, measured in weeks, requiring frequent communication, development, testing, and delivery.Scrum, Crystal, Extreme Programming (XP) and feature-driven developments are types of Agile",
    },
    {
      question: "DevOps (Application Development)",
      answer:
        "803- An approach based on lean and agile principles in which business owners and the development, operations, and quality assurance departments collaborate. -organization changes that enhances collaboration between departments",
    },
    {
      question: "Waterfall (Application Development)",
      answer:
        "803- A series of steps in which a software system trickles down-Requirements, Design, implementation, verification, maintenance",
    },
    {
      question: "Rapid Application Development (RAD) (Application Development)",
      answer:
        "803- A development method that uses special tools and an iterative approach to rapidly produce a high-quality system with low investment cost",
    },
    {
      question: "Spiral Development (Application Development)",
      answer:
        "803- The spiral model is a risk-driven process model generator for software projects. Based on the unique risk patterns of a given project, the spiral model guides a team to adopt elements of one or more process models, such as incremental, waterfall, or evolutionary prototyping.Combines top-down and bottom-up concepts",
    },
  ],
  [
    {
      question: "GPS Basics",
      answer:
        "MISC- 24 satellites, revolution 12 hours (aka 2 Earth orbits a day), Altitude 12,000 miles-Started by DOD in 1970's for military use only-Calculates location by measuring time interval between the transmission and reception of a satellite signal",
    },
    {
      question: "GPS Standard Positioning Service",
      answer:
        "MISC- signal broadcast for civilian useHorizontal location requires 3 satellites (concept is called Trilateration)Vertical location requires 4 satellites",
    },
    {
      question: "NAVSTAR GPS",
      answer:
        "MISC- as of 2010, the only fully-operational GNSS constellationNAVigation Satellite Timing and Ranging-transmits signals on two phase modulated frequencies-transmits a navigation message that contains orbital data for computing the position of all satellites",
    },
    {
      question: "Types of GPS Receivers",
      answer:
        "MISC- Recreational Grade, Mapping Grade, Survey or High Accuracy Grade",
    },
    {
      question: "GPS accuracy is depend on...",
      answer:
        "MISC- type of GPS receiver, field techniques, post processing of data and errors from other sources",
    },
    {
      question: "GPS Errors",
      answer:
        "MISC- Multipatch- errors caused by reflected GPS signals arriving at the GPS receiver-structures and reflective surfaces Atmosphere- signals can experience delays when traveling through the atmosphere (tropospheric and ionospheric delays) Distance from Base Station- differential correction will increase the quality of the data, accuracy is degraded slightly as the distance from base station increases Selective availability- intentional degradation of the GPS signals by the DOD to limit accuracy fro non-US military/government users (currently not a factor) Jammers, Spoofing risk",
    },
    {
      question: "Noise Error (signal)",
      answer:
        "MISC- is the distortion of the satellite signal prior to reaching the GPS receiver and/or and additional signal piggy-backing onto the GPS satellite signal",
    },
    {
      question: "PDOP (Position Dilution of Precision)",
      answer:
        "MISC- conditional collection only when there is an optimum satellite availability (4 or more) and configuration to produce and acceptable (lower, 6 or less) PDOP value (higher PDOP values are bad)",
    },
    {
      question: "Signal-to-noise ratio (SNR) Mask",
      answer:
        "MISC- method of setting a threshold to control the strength of the radiation exposure compared with the amount of noise apparent in a digital image to minimize error",
    },
    {
      question: "Elevation Mask",
      answer:
        "MISC- Set to 15 degrees, default angle to minimize the amount of atmosphere through which the satellite signal must travel",
    },
    {
      question: "Data Collection Rate",
      answer:
        "MISC- (aka sync rate) -collect point data at 1 second intervals or same interval as base station-collect polygon and line data at 5 second intervals",
    },
    {
      question: "Datum",
      answer:
        "MISC- A theoretically exact point, axis, or plane derived from the true geometric counterpart of a specific datum feature. The origin from which the location is established.-GPS receivers are designed to collect GPS position relative to WGS84 datum, but can be manipulated",
    },
    {
      question: "Coordinates (latitude and longitude)",
      answer:
        "MISC Degrees/Minutes/Seconds (DMS) 43 5' 20Decimal Degrees (DD) 43.088889 Latitude is positive in Norther HemisphereLongitude is negative in Western Hemisphere",
    },
    {
      question: "Latitude and Longitude Conversion (DMS and DD)",
      answer: "MISC- DD = d + m/60 + s/3600",
    },
    {
      question: "Coordinate Systems",
      answer: "DMS, DD, UTM, State Plane, MGRS",
    },
    {
      question: "Euclidean distance",
      answer:
        "A method of distance measurement using the straight line mileage between two places. (2D)",
    },
    {
      question: "Manhattan Distance",
      answer:
        "distance measured in terms of roadways, walkways, and other paths that avoid obstruction and reduce both distance and travel time",
    },
  ],
];

export const unorderedQuiz = [
  {
    question: "Certification",
    answer:
      "a process, often voluntary, by which individuals who have demonstrated a level of expertise in the profession are identified to the public and other stakeholders by a third party",
  },
  {
    question: "What did URISA explore in 1999?",
    answer:
      "Formed a committee to explore GIS certification and this work lead to the creation to the GIS Certification Institute",
  },
  {
    question: "Surveyors",
    answer:
      "determine exact position of features and the angles and distances between them. Surveyors may collect attributes as they collect locations such as x,y,z values, time, and other attributes",
  },
  {
    question: "Mappers",
    answer:
      "create visual representations of real world locations and use thematic mapping to show locations and attributes",
  },
  {
    question: "Photogrammetrists",
    answer:
      "Find positions of features and the angles and distances between them by measuring from photographs and analyze data to determine landcover",
  },
  {
    question: "CAD (Computer Aided Drafting)",
    answer:
      "Use AutoCad and Microstation to create detailed plans for structures and collect some attributes",
  },
  {
    question:
      "How is GIS different than CAD, Photogrammetrists, & Cartographers?",
    answer: "GIS introduces spatial and temporal analysis",
  },
  {
    question: "What are the GISCI code of ethics?",
    answer:
      "Read definition online (www.gisci.org/ethics/codeofethics.aprx) likely a question about conflict resolution",
  },
  {
    question: "What are the 4 obligations of a GISCI professional?",
    answer:
      "Society, Employers and Funders, Colleagues and Profession, Individuals in Society",
  },
  {
    question: "What does HIPPA stand for? What is it for?",
    answer:
      "Health Insurance Portability and Accountability Act of 1996. HIPPA laws protect individuals' medical records and other personal health information.",
  },
  {
    question:
      "How would you comply with HIPPA laws if asked to map medical data?",
    answer: "Data anonymization, hex map, heat map, etc",
  },
  {
    question: "What is does OGC stand for?",
    answer: "Open Geospatial Consortium",
  },
  {
    question: "What does FGDC stand for?",
    answer: "Federal Geographic Data Committee",
  },
  {
    question: "What does ISO stand for?",
    answer: "International Standards Organization.",
  },
  {
    question:
      "What does the Federal Bureau of the Budget do in regards to mapping?",
    answer: "Publishes the National Map Accuracy Standards (NMAS)",
  },
  {
    question: "What does the OGC do? What does F.A.I.R. stand for?",
    answer:
      "The Open Geospatial Consortium is an internal industry consortium of companies, government agencies, and universities. OGC standards are developed by members to make location information and services FAIR (Findable, Accessible, Interoperable, Reuseable).",
  },
  {
    question: "Give 4 Examples of File Based Standards from the OGC",
    answer: "KML/KMZ, GML, OGC and ISO Simple Features, Geopackage",
  },
  {
    question: "Give 5 Examples of Web Based Standards from the OGC",
    answer:
      "Web Feature Service, Web Map Service, Web Coverage Service, Web Map Tile Service, Web Processing Service",
  },
  {
    question:
      "What is a .gpkg? What is it based on? Can it store both vector & raster data?",
    answer:
      "A geopackageUniversal file format for geodata based on SQLLite. Yes, it supports both.",
  },
  {
    question: "Who is in the FGDC? What does the FGDC do?",
    answer:
      "It's an organization of federal geospatial professionals chaired by the Department of the Interior.Provides oversight and direction for geospatial decisions across the federal government",
  },
  {
    question: "What are some standards that the FGDC publishes?",
    answer:
      "Addressing, metadata and content standards, geographic information data quality, soil code standards, classification of wetlands, National Standard for Spatial Data Accuracy",
  },
  {
    question: "Does the FGDC create metadata standards and the NMAS?",
    answer:
      "No, the Bureau of the Budget creates both metadata standards and the national map accuracy standards (NMAS)",
  },
  {
    question:
      "What is the required horizontal accuracy of 1) A map larger than 1:20,000 and B) A map 1:20,000 or smaller?",
    answer: "1/30 (.033) and 1/50 (.02)",
  },
  {
    question:
      "What percentage of points on a map have to match the horizontal accuracy to pass the NMAS standard?",
    answer: "90% for both smaller or larger than 1:20,000",
  },
  {
    question:
      "What is the vertical accuracy and percentage of points to pass a NMAS standard?",
    answer: "At least 1/2 the contour interval, 90% (again)",
  },
  {
    question:
      "What is the minimum amount of points to check for each dataset, according to the FGDC?",
    answer: "20 check points must be compared to a high accuracy data source",
  },
  {
    question: "What is RMS Error? What is RMSE?",
    answer:
      "The average of the distances between the mapped location and the actual location. Both are the same.",
  },
  {
    question: "What is geometric accuracy?",
    answer: "How close a mapped location is to its real world counterpart",
  },
  {
    question: "What is thematic accuracy?",
    answer:
      "Are the attributes associated with the location correct? (Is it a 4 lane street, or a 2 way street? The data may be geometrically accurate but not thematically accurate and vice versa)",
  },
  {
    question: "What is precision? How is it different from accuracy?",
    answer:
      "Precision is about process and consistency. If you take 5 GPS locations using the same device, do they all fall in the same area? A location can be precise but inaccurate.",
  },
  {
    question: "What level of accuracy is needed for any given project?",
    answer: "Accuracy and precision depend on the business needs of the client",
  },
  {
    question: "What is a planar measurement?",
    answer: "A planar measurement is something measured in 2D space",
  },
  {
    question: "Can an area measured in GIS be different than a legal area?",
    answer: "Yes. Legal areas commonly do not line up with GIS measurements.",
  },
  {
    question: "What are 3 kinds of accuracy for Remotely Sensed Imagery?",
    answer:
      "Spatial Accuracy (is what is being returned in the right spot?)Spectral Accuracy (is what is being returned true?)Classification Accuracy (user defined classification)",
  },
  {
    question: "What is fuzzy tolerance?",
    answer: "The point at which 2 different points are considered the same.",
  },
  {
    question: "What is the Precision of 123.123456?   . ",
    answer: "9 (can store 9 total digits)",
  },
  {
    question: ". What is the scale of 123.123456?. ",
    answer: "6 (6 spaces after the decimal point)",
  },
  {
    question: "Does a - (negative sign) count as a significant digit?",
    answer: "Yes.",
  },
  {
    question: "How many significant digits can a float value hold?   . ",
    answer: "7 significant digits",
  },
  {
    question: " How many significant digits can a double value hold?   . ",
    answer: "15 significant digits",
  },
  {
    question:
      "What does SDTS stand for? Is it for data accuracy or map accuracy?",
    answer:
      "Spatial Data Transfer StandardSDTS deals with the exchange of spatial data, not maps and is for data accuracy, not map accuracy",
  },
  {
    question:
      "According to the SDTS, should testing be performed against an independent source of high accuracy, if available?",
    answer: "Yes...",
  },
  {
    question:
      "What percentage of accuracy is necessary for rasters to pass the SDTS standard?",
    answer: "95%",
  },
  {
    question: "How many check points are necessary according to the SDTS?",
    answer: "20",
  },
  {
    question: "What is ortho imagery?",
    answer: "Top down imagery, corrected to be exactly top-down view",
  },
  {
    question: "What is oblique imagery?",
    answer: "Flown at an angle, shows sides of buildings and features",
  },
  {
    question: "What is a spectral signature?",
    answer:
      "How light is reflected off of an object. Each pixel in a raster has a spectral signature and can be used to categorize or classify the data (grey pixels are concrete, green pixels are trees, etc.)",
  },
  {
    question:
      "How would an image analyst check the accuracy of their classifications?",
    answer:
      "Determine a set of random areas, compare that to a photo or field verify them, create an error matrix that compares the amount of correctly identified points to the number of sample points collected (percentage of what was correct)",
  },
  {
    question:
      "What is Kappa Coefficient? How is it different from Cohen's Kappa?",
    answer:
      "Kappa is 1.0 when agreement is perfect; it is 0.0 when agreement is no better than would be expected by chance.AKA Cohen's kappa (they're the same)",
  },
  {
    question: "What does a Kappa coefficient of 1.0 mean? What about 0?",
    answer:
      "1 means the data is fully in agreement, 0 means the agreement is no better than random chance.A coefficient of .4 or below usually means that there is no correlation between data (presence of a septic tank and increased nitrogen in stream, for example)",
  },
  {
    question: ".  What is meant by spectral accuracy in raster data?   . ",
    answer: "Are the cell values the proper elevation or color",
  },
  {
    question: ".  What is meant by temporal accuracy in raster data?   . ",
    answer:
      "Are the cell values correct for conditions during the time period it was gathered?",
  },
  {
    question: ".  What is meant by spatial accuracy in raster data?   . ",
    answer:
      "Are the cell values in the right place? Does the cell size accurately represent the area modeled?",
  },
  {
    question: ".  What is meant by radiometric accuracy in raster data?   . ",
    answer:
      "Are various features able to be picked out from each other? Greater bit depth = higher resolution",
  },
  {
    question: "What is the CSDGM?",
    answer:
      "Content Standard for Digital Geospatial MetadataIt is developed by the FGDC and does not tell exactly how metadata should be stored but rather what should be in it",
  },
  {
    question:
      "Is the CSDGM standard required by the FGDC? If not, what does it endorse?",
    answer:
      "Nope. It is still in use but the FGDC now endorses ISO standards and recommends ISO for organizations just getting into GIS & metadata",
  },
  {
    question: "What is the ISO 19115? What about ISO 19115 NAP?",
    answer:
      "ISO 19115 is a content standard that defines what information should exist in a metadata document.ISO 19115 NAP is the North American Profile developed to accommodate multiple languages (English & French)",
  },
  {
    question: "What is the ISO 19139?",
    answer: "XML schema implementation of the ISO metadata standards",
  },
  {
    question: "Do ISO standards include domains?",
    answer: "Yes",
  },
  {
    question: "What fields are mandatory for ISO datasets?",
    answer:
      "Title, Date, Geographic Location, Language, Topic Category, Abstract, Metadata",
  },
  {
    question: ". . CHAPTER 3: Mapping the Globe. . ",
    answer: ". . CHAPTER 3: Mapping the Globe. . ",
  },
  {
    question: "What is a geoid?",
    answer:
      "a model of Earth using mean sea level as a baseEarth is not a perfect sphere",
  },
  {
    question: "What is a spheroid or ellipsoid?",
    answer:
      "Approximation of the shape of the Earth. It is based on a mathematical equation the mimics Earth's shape",
  },
  {
    question:
      "Should a map of a city/county use a spheroid/ellipsoid or a sphere?",
    answer:
      "Spheroid or Ellipsoid. Spheres work fine for small scale (1:5,000,000) maps but larger scale maps need to use a spheroid.",
  },
  {
    question: "How much wider is the Earth at the equator?",
    answer: "27 miles",
  },
  {
    question: "What planet is an oblate ellipsoid?",
    answer: "The Earth! The Earth rotates around it's minor axis (equator)",
  },
  {
    question: "What are datums based off of?",
    answer: "Spheroid/Ellipsoid",
  },
  {
    question: "Why is one spheroid chosen over another?",
    answer: "Some spheroids fit parts of the Earth better.",
  },
  {
    question: "What spheroid is used in the United States?",
    answer:
      "In the United States the preferred spheroid is GRS_1980 which NAD83 is based off of.",
  },
  {
    question: "What spheroid is preferred globally?",
    answer: "WGS_1984",
  },
  {
    question: "What spheroid is used by GPS units?",
    answer: "WGS_1984",
  },
  {
    question: "What does the term geomatics mean?",
    answer:
      "Geomatics is the gathering, storing, processing, and delivering geographic information. It is an all encompassing term for GIS.",
  },
  {
    question:
      ".  What is a geographic coordinate system? What are some examples of a geographic coordinate system?   . ",
    answer:
      "Geographic coordinate systems use lat/long to define a location on the Earth",
  },
  {
    question: ".  What is a projected coordinate system?   . ",
    answer: "Used to define a location on a flat, 2D map.",
  },
  {
    question: ".  What is a cartesian coordinate system?   . ",
    answer: ".  Another name for a Projected Coordinate System. . ",
  },
  {
    question:
      "Explain the steps from a geoid to a projected coordinate system.",
    answer:
      ". . Geoid --> Spheroid --> Geographic Coordinate   System --> Projected/Cartesian Coordinate   System. . .  Approximate the geoid, Equation for the geoid (now really a spheroid), Calculate lat/long coordinates, Push lat/long coordinates through more equations, That equals a projected coordinate system.   . . ",
  },
  {
    question: "Points east of the Prime Meridian have what value?",
    answer: "Positive",
  },
  {
    question: "Points west of the Prime Meridian have what value?",
    answer: "Negative",
  },
  {
    question: "Points south of the equator have what value?",
    answer: "Negative",
  },
  {
    question: "Points north of the equator have what value?",
    answer: "Positive",
  },
  {
    question: "A point in North America would have what values?",
    answer: "Lat = Positive, Long= Negative",
  },
  {
    question: "A point in in Southern Africa would have what value?",
    answer: "Lat = Negative, Long = Postive",
  },
  {
    question: "What do geodesists do?",
    answer:
      "Geodesists use datums to shift the spheroid so that it fits one spot on the Earth really well",
  },
  {
    question: "Where is the geographic center of the US? Why is it important?",
    answer:
      "Meade's Ranch Triangulation StationUsed to create reference grid and benchmarks for the United States",
  },
  {
    question: "The National Geodetic Survey group of NOAA manages what?",
    answer: "The geodetic framework for the United States",
  },
  {
    question: "What is a datum?",
    answer:
      "A datum is a mathematical model based on a spheroid that also includes X, Y, Z shift by fitting control points in equation.",
  },
  {
    question:
      "What was the first datum calculated for the United States? What spheroid was it based off of?",
    answer: ". NAD27. .  Based off of the Clarke 1866 Spheroid. . ",
  },
  {
    question:
      "What datum is currently used for projected coordinate systems in the United States? What spheroid was it based off of?",
    answer: ". NAD83. . Based off of the GRS80 Spheroid. ",
  },
  {
    question:
      "Which datum is based off of fits from control points? Which datum is Earth centered?",
    answer: "NAD27, NAD83",
  },
  {
    question: "Where does NAD27 get less accurate?",
    answer:
      "The farther you are from Meade's Ranch Kansas. 200M error in Alaska, 400M error in Hawaii.",
  },
  {
    question: "Name 3 common datums",
    answer: "NAD27NAD83WGS84",
  },
  {
    question: "Name 3 common US Datum transformations",
    answer: "NAD27-NAD83NAD27-WGS84NAD83-WGS84",
  },
  {
    question: "When would you use a datum transformation?",
    answer: "When mapping data from 2 different datums",
  },
  {
    question: ". What is Datum Shift?. ",
    answer: "The error when displaying data in 2 different datums",
  },
  {
    question:
      "What is a HARN? What is it based off of? What coordinate systems use HARN?",
    answer:
      "High Accuracy Reference Networksbased off of state level revisions to NAD83State Plane",
  },
  {
    question:
      "What are the 2 most common reference frames used in the world today?",
    answer:
      "WGS84 and ITRF 2000ITRF is the international standard, WGS is the USA standardThe difference between the 2 is less than 10 millimeters",
  },
  {
    question: "Name 2 common vertical datums",
    answer: "NAVD88NGVD29",
  },
  {
    question: "What is a planimetric map?",
    answer:
      "A map that has no relief dataFor example, a map that only shows roads buildings, rivers and lakes but no elevation data",
  },
  {
    question:
      "What are the four kinds of distortion introduced by cartesian (projected) coordinate systems?",
    answer: "Area, Shape, Distance, Direction",
  },
  {
    question: "What cartesian coordinate system is best for preserving shape?",
    answer: "Lambert Conformal Conic",
  },
  {
    question: "What cartesian coordinate system is best for preserving area?",
    answer: "Albers Equal Area",
  },
  {
    question:
      "What cartesian coordinate system is best for preserving distance?",
    answer: "Equidistant Conic",
  },
  {
    question:
      "What cartesian coordinate system is best for preserving direction?",
    answer: "Transverse Mercator",
  },
  {
    question: "What are the four classes of map projections?",
    answer: "Conformal, Equivalent, Equidistant, Azimuthal",
  },
  {
    question: "What projection would you use for a polar region?",
    answer: "Azimuthal",
  },
  {
    question: "Meridians are lines of ----?",
    answer: "Longitude",
  },
  {
    question: "Parallels are lines of ----?",
    answer: "Latitude",
  },
  {
    question:
      "What are some of the components of a projected coordinate system?",
    answer: "Projection, Datum, Central Meridian, Units of Measure, Offsets",
  },
  {
    question: "Name 4 common projections",
    answer: ". MARL!. . Mercator. Albers. Robinson. Lambert. ",
  },
  {
    question:
      "What's the difference between a projection and a projected coordinate system?",
    answer: "A projection is one part of a projected coordinate system",
  },
  {
    question: "What is a central meridian? What is it used for?",
    answer:
      "Defines the central part of the projected coordinate system, used to transform a projection to be more accurate for a specific location. For example, you would move the central meridian of state plane north to Woodinville if mapping the city.",
  },
  {
    question: "What projection is UTM based off of?",
    answer: "Transverse Mercator",
  },
  {
    question: "How wide is a UTM zone? How many zones are on the Earth?",
    answer: "6 degrees60 zones (60x6=360 degrees)",
  },
  {
    question:
      "What projection is best for mapping higher latitudes? Also used by National Geographic...",
    answer: "Robinson Projection",
  },
  {
    question:
      "What projection is used for states that are elongated in the north-south direction?",
    answer: "Transverse Mercator - CALIFORNIA",
  },
  {
    question: "Is UTM a projected coordinate system?",
    answer: "Yep",
  },
  {
    question:
      "What projection is used for states that are elongated in the east-west direction?",
    answer: "Lambert Conformal Conic - TENNESSEE",
  },
  {
    question: "What datum does Web Mercator use?",
    answer: "WGS84",
  },
  {
    question: "What is an SRID?",
    answer:
      "Spatial Reference IdentifierUsed to quickly identify coordinate systemWGS84 GCS = SRID 4326",
  },
  {
    question: "What is Well Known Text (WKT)?",
    answer:
      "It is a unique name for each coordinate systemWGS84 Web Mercator, for example.",
  },
  {
    question: "What coordinate system is 3857?",
    answer: "WGS84 Web Mercator",
  },
  {
    question: "What coordinate system is 4326?",
    answer: "WGS84 GCS",
  },
  {
    question: "What coordinate system is 4269?",
    answer: "NAD83 GCS",
  },
  {
    question: "What coordinate system is 4267?",
    answer: "NAD27 GCS",
  },
  {
    question:
      "What is a international foot? How is it different from a US Foot?",
    answer:
      "US Survey foot is .304800609.... of a meterInt'l Foot is .3048 of a meterCan cause problems over a large area",
  },
  {
    question:
      "NAD83 StatePlanes are in meters, but each state defines _________?",
    answer: "Which type of foot (Int'l or US Survey Foot) to use",
  },
  {
    question: "What units are used in US Coordinate Systems?",
    answer: "Int'l FeetFeetMeters",
  },
  {
    question: "What does georeference mean?",
    answer: "Required to convert analog data to digital data.",
  },
  {
    question: ". . CHAPTER 4 ESSENTIAL GEOMORPHOLOGY TERMS. . ",
    answer: ". . CHAPTER 4 ESSENTIAL GEOMORPHOLOGY TERMS. . ",
  },
  {
    question: "What is geomorphology?",
    answer:
      "the study of the physical features of the surface of the earth and their relation to its geological structures.",
  },
  {
    question: "What is a divergent tectonic plate?",
    answer:
      "Where plates are moving away from each other (mid Atlantic Ridge, for example)",
  },
  {
    question: "What are transform boundaries?",
    answer: "Where plates slide against one another",
  },
  {
    question: "What is a convergent tectonic plate?",
    answer: "Where plates crash into each other",
  },
  {
    question: "What is a subduction zone?",
    answer: "Where one plate goes under another plate",
  },
  {
    question: "What scale are USGS Topo Maps? In minutes?",
    answer: "1:24,000 (7.5 min X 7.5 min)",
  },
  {
    question: "What is a DEM?",
    answer: "Digital Elevation Model",
  },
  {
    question: "What is a DOQQ?",
    answer: "Digital Orthophoto Quarter Quad (aerial photo)",
  },
  {
    question: "What is a Digital Line Graph (DLG)",
    answer:
      "Early GIS vector datasets that were derived from USGS topo maps. Most of the features on a USGS topo map are included in a DLG (lakes, rivers, roads, etc)",
  },
  {
    question: "How do you find Euclidean Distance?",
    answer:
      "A(squared) + B(squared) = C(squared)Add the square of A & B, take the square root of that number. The PT is used for determining distance along a route.",
  },
  {
    question: "How do you determine Manhattan Distance?",
    answer:
      "Manhattan Distance is used to find the distance between two points when something blocks a direct path (such as buildings in midtown Manhattan).",
  },
  {
    question: "What is geodesic distance?",
    answer:
      "Shortest distance between two points on Earth taking into consideration the curvature of the planet.",
  },
  {
    question: "What is a loxodromic measure?",
    answer:
      "A method of navigation by following a rhumb line, a curve on the surface of the Earth that follows the same angle at the intersection with each meridian. This serves to maintain a steady course in sailing.",
  },
  {
    question:
      "What is a planar measurement? What is the only type of map it can be used on?",
    answer: "2D measurement (Pythagorean)Can only be used on a projected map",
  },
  {
    question: "When would you use a geodesic measurement?",
    answer: "When measuring very large areas",
  },
  {
    question: "When would you use planar measurement?",
    answer: "When measuring smaller areas",
  },
  {
    question: "Can you calculate area in lat/long?",
    answer: "No",
  },
  {
    question: "What is this angle in North Azimuth? How do you measure it?",
    answer: "45Clockwise from North",
  },
  {
    question: "What is this angle in South Azimuth? How do you measure it?",
    answer: "225Clockwise from South",
  },
  {
    question:
      "If North is 0, what would a 45 degree angle to the east be in Polar? How do you measure it?",
    answer: "45Clockwise from due east",
  },
  {
    question:
      "What is the angle in the previous flashcard in Quadrant Bearing? How do you measure it?",
    answer:
      "N45ESplit the circle into 4 parts, identify the NW, NE, SE, SW quadrants. North and South are 0 degrees, East and West are 90 degrees",
  },
  {
    question: "What is shown on a Large Scale Map",
    answer:
      "Maps that cover smaller areas Easy way to remember: A building on a large scale map is large",
  },
  {
    question: "What is shown on a Small Scale Map?",
    answer:
      "Maps that cover larger areasEasy way to remember: A building on a small scale map is small",
  },
  {
    question: "Which is the small scale map, 1:100 or 1:250000?",
    answer:
      "1:250000One inch on the map represents 250000 inches in real life vs one inch representing 100 inches in real life",
  },
  {
    question:
      "If two maps are 1:100000 and one is printed on larger paper, which is the smaller scale map?",
    answer: "Both are the same. Scale matters, page size does not.",
  },
  {
    question: "1 = 1000' is an example of a ________________ scale?",
    answer: "Verbal Scale",
  },
  {
    question: "1:1000 is an example of a ________________ scale?",
    answer: "Representational Fraction Scale",
  },
  {
    question:
      "If you print a map and are unsure if it will be resized, what type of scale should you use?",
    answer:
      "Bar ScaleThe bar scale will always be proportional to the whatever size it is changed to",
  },
  {
    question: "What elements are required on a map?",
    answer: "Title, Legend, Scale",
  },
  {
    question: "What cartographic elements are optional on a map?",
    answer:
      "Coordinate System, Author Name, Organization, Graticules, North Arrows",
  },
  {
    question: "When is it appropriate to leave off a North Arrow on a map?",
    answer:
      "If North is more than one direction (polar maps in conical projection, for example)",
  },
  {
    question:
      "What type of font is appropriate for geographic features like mountains, oceans, lakes, etc?",
    answer: "Serif fonts",
  },
  {
    question: "What type of font is appropriate for city names, legends, etc?",
    answer: "sans-serif fonts",
  },
  {
    question: "What kind of features are italicized?",
    answer: "Water features",
  },
  {
    question: "What is the difference between serif and sans serif?",
    answer:
      "One has feet, one doesn't. Arial is an example of a sans serif font, Times New Roman is a serif font",
  },
  {
    question: "What is kerning?",
    answer:
      "Kerning text has a space dedicated for each letter based on the letter's size, not all letters get the same amount of space",
  },
  {
    question: "What are 3 ways to specify color?",
    answer: "RGBCMYKHSV",
  },
  {
    question: "What does HSV stand for?",
    answer:
      "hue - base colorsaturation - lightness or darkness of colorvalue - intensity of color",
  },
  {
    question: "What would RGB color 155, 0, 0 be?",
    answer: "Red",
  },
  {
    question: "Would would RGB color 155, 0, 155 be?",
    answer: "Purple",
  },
  {
    question: "What color 0, 0, 0 be in RGB?",
    answer: "Black",
  },
  {
    question: "what does the k stand for in CMYK?",
    answer: "black",
  },
  {
    question: "What order should GIS data be displayed (top - down)?",
    answer: "Points, lines, polygons",
  },
  {
    question: "What is a thematic map?",
    answer: "A map that has been symbolized on attributes",
  },
  {
    question: "What is a choropleth map?",
    answer:
      "a thematic map in which areas are shaded or patterned in proportion to the measurement of the statistical variable being displayed on the map, such as population density or per-capita income.",
  },
  {
    question:
      "What is the difference between a proportional symbol and a graduated symbol?",
    answer:
      "Proportional symbols scale in proportion to the value in the data (a point with a value of 10 would be 10x larger than a value of 1) whereas a graduated symbol creates ranges of values to represent the different classes of data",
  },
  {
    question: "When would you use a divergent color ramp?",
    answer:
      "To show when values are above or below a mean or median value (elevation - above or below sea level)",
  },
  {
    question: "When would you use a sequential color ramp?",
    answer:
      "When not highlighting a value which the range of data falls around (number of moose per acre = light brown to dark brown)",
  },
  {
    question: "Classification Methods (link)",
    answer:
      "https://pro.arcgis.com/en/pro-app/latest/help/mapping/layer-properties/data-classification-methods.htm",
  },
  {
    question: "Lines of equal value: A map showing elevation or depth?",
    answer: "Contour line",
  },
  {
    question:
      "Lines of equal value: A map showing air pollution, rain fall, noise?",
    answer: "Isoline",
  },
  {
    question: "Lines of equal value: A map showing thickness?",
    answer:
      "Isopach (used in oil & gas, hydrologic survey)Shows areas of equal thickness across a surface",
  },
  {
    question: "What are index contours?",
    answer: "Lines drawn thicker or darker to help interpret contour maps",
  },
  {
    question: "What are supplemental contours?",
    answer:
      "Used to show small changes in elevation that would otherwise be swallowed by the regular contour interval",
  },
  {
    question: "What are 3 ways to show elevation data?",
    answer: "TIN (triangulated irregular network), Profile, Raster",
  },
  {
    question: "What is extrusion?",
    answer: "Creating 3D data out of non-3D data (contour lines, for example)",
  },
  {
    question: "When would Vertical Exaggeration of Elevation be used?",
    answer: "In order to create a more dramatic hillshade or other effect",
  },
  {
    question: "CHAPTER 6 GIS FILE TYPES",
    answer: "CHAPTER 6 GIS FILE TYPES",
  },
  {
    question: "What is the difference between discreet and continuous data?",
    answer:
      "Discreet data is often vector data where you add attributes and it describes one specific location or assetContinuous data is often raster data, where a surface is continuous and includes fuzzy data (where does the beach, wetland, and grass begin/end?)",
  },
  {
    question: "What kind of rasters are not continuous?",
    answer: "Scanned maps and land use maps",
  },
  {
    question: "How do you define raster resolution?",
    answer:
      "Raster resolution is the size of the grid cell of the raster. If a pixel is 2ft X 2ft the resolution is 2ft.",
  },
  {
    question: "Can you calculate area on a raster?",
    answer: "Yes",
  },
  {
    question: "What kind of data stores values across a surface?",
    answer: "Raster data",
  },
  {
    question: "How is an intersection defined?",
    answer: "Where 3 or more lines converge",
  },
  {
    question: "What is a vertex?",
    answer:
      "one point from a set of ordered points that defines the shape of a polygon or line",
  },
  {
    question: "What is a node?",
    answer: "The beginning or end of an edge",
  },
  {
    question: "What is a pseudo-node?",
    answer:
      "A point on the line that is usually used to indicate a change in attribute (gravel to pavement, for example)",
  },
  {
    question: "What is an edge?",
    answer: "Alternate name for a node (review definition)",
  },
  {
    question: "What is a curve? How is a true curve defined?",
    answer:
      "A curve is defined by verticesA true curve is defined and stored as an equation",
  },
  {
    question: "What is a dangling node?",
    answer: "End of the line with no connections",
  },
  {
    question:
      "What is the difference between a centroid, an area, and a perimeter?",
    answer:
      "A centroid is the central location of the polygonThe area is the LxW of the polygonThe perimeter is the total measure of the length of the outside of the polygon",
  },
  {
    question: "Can a centroid be outside of a polygon?",
    answer: "Yes",
  },
  {
    question: "Each GIS dataset contains 3 elements. What are they?",
    answer:
      "Features, Attributes, Spatial Information (Projected or Geographic Coordinate System)",
  },
  {
    question: "What is an example of an object oriented relational database?",
    answer: "Geodatabase (ESRI)",
  },
  {
    question: "BREAK",
    answer: "BREAK",
  },
  {
    question:
      "What is a coverage? How is it different from a feature class or shapefile?",
    answer:
      "A coverage is a historical dataset that is not used anymore and was replaced by the feature class. Coverages were a topological dataset that contained points, lines, polygons, regions, routes, and sections",
  },
  {
    question: "What is a .e00 file format?",
    answer:
      "A compressed coverage (this was an incorrect answer on the test but be aware of what the file type is)",
  },
  {
    question: "Is the shapefile an OGC standard?",
    answer: "No",
  },
  {
    question: "How do you define a polygon?",
    answer: "A set of vertices that begin and end on the same point",
  },
  {
    question: "How do you define a point?",
    answer: "Coordinate pairsX, Y, sometimes Z values",
  },
  {
    question: "How do you define a line?",
    answer: "An ordered set of vertices",
  },
  {
    question: "How is a shapefile different from a feature class?",
    answer:
      "Shapefiles cannot store topology, subtypes, domains, and are limited in character length and field name length",
  },
  {
    question: "What files are required for a shapefile to work?",
    answer: ".shp.dbf.shx",
  },
  {
    question: "Is a projection file (.prj) required for a shapefile?",
    answer: "No, but it is ideal",
  },
  {
    question: "What does a geodatabase model everything as?",
    answer: "An object",
  },
  {
    question: "Can a geodatabase store vector and raster data?",
    answer: "Yes",
  },
  {
    question: "Object Oriented Data Model",
    answer: "Look at link (review)",
  },
  {
    question:
      "What is a .mdb extension on a folder mean? What is the size limit?",
    answer: "That is is a personal geodatabaseSize limit is 2GBs",
  },
  {
    question: "What is a .gdb extension on a folder mean?",
    answer: "That it is a file geodatabase",
  },
  {
    question: "What does SDE stand for?",
    answer: "Spatial Database Engine",
  },
  {
    question: "What are two examples of a RDBMS?",
    answer: "Oracle, SQL Server",
  },
  {
    question: "What can a geodatabase hold?",
    answer:
      " Points, lines, polygons, multi-point, multi-patch, rasters, tables, annotation, networks, relationship classes, topologies   ",
  },
  {
    question: "What does KML stand for? What is a KMZ?",
    answer: "Keyhole Markup Language (Google Earth)KMZ is a zipped KML",
  },
  {
    question: "What kind of file type is KML based on?",
    answer: "XML",
  },
  {
    question: "KML is an OGC standard, true or false?",
    answer: "TRUE",
  },
  {
    question: "How are HTML, XML, and KML related?",
    answer: "KML is based on XML, XML is based on HTML",
  },
  {
    question: "Are all CAD drawings spatially referenced?",
    answer:
      "No. For example, a floating oil well is designed with CAD on land and then put into place out into the ocean.",
  },
  {
    question: "What kind of file types does AutoCAD create?",
    answer: "DWGDXF",
  },
  {
    question: "What kind of file type does Microstation create?",
    answer: "DGN",
  },
  {
    question: "What is the structure of a CAD file?",
    answer:
      "CAD files are layers of points, lines and polygons and may also be rasters and can be projected",
  },
  {
    question: "What does WMS stand for?",
    answer: "Web Map Service",
  },
  {
    question: "What does WFS stand for?",
    answer: "Web Feature Service",
  },
  {
    question: "Is a PDF vector or raster?",
    answer: "It can be both",
  },
  {
    question: "What is the ESRI name for a Raster Catalog?",
    answer: "Mosaic Raster Dataset",
  },
  {
    question: "What is an .sid file type?",
    answer: "It is a compressed raster",
  },
  {
    question:
      "How is a raster catalog or mosaic raster dataset best described?",
    answer:
      "It's a quilt of raster data that allows quick retrieval and storage so you don't to load the entire file (county cut into 100 different rasters rather than 1 huge raster, for example)",
  },
  {
    question: "What is an .img file extension?",
    answer: "ERDAS Imagine - Aerial Imagery It is a raster",
  },
  {
    question: "What two file types can store both vector and raster data?",
    answer: "EMF and PDF",
  },
  {
    question: "What is an Esri GRID file?",
    answer:
      " An Esri grid is a raster GIS file format developed by Esri, which has two formats:    A proprietary binary format, also known as an ARC/INFO GRID, ARC GRID and many other variations    A non-proprietary ASCII format, also known as an ARC/INFO ASCII GRID",
  },
  {
    question:
      "ASCII files are associated with what company and what file type?",
    answer: "ESRI GRID",
  },
  {
    question: "What is a TIN?",
    answer: "Triangulated Irregular Network",
  },
  {
    question: "What advantages do TINS offer?",
    answer:
      "Great at representing a surface and capturing linear features like roads, bridges, ridge lines",
  },
  {
    question: "When someone says wire frame model, what are they referencing?",
    answer: "TIN",
  },
  {
    question: "What are the edges of a TIN good at representing?",
    answer: "Linear features on the ground",
  },
  {
    question: "What is a Delaunay triangulation?",
    answer:
      "TINS use it to create wire frame modelsIt maximizes the minimum angle of all triangles and tries to avoid creating sliver triangles",
  },
  {
    question: "ASCII files are often delivered in what formats?",
    answer: ".txt.dat.csv",
  },
  {
    question: "What is an XLS or XLSX file type?",
    answer: "Microsoft Excel",
  },
  {
    question: "What is a DBF file type?",
    answer:
      "Database format, used by shapefiles and is a standard exchange format",
  },
  {
    question: "What does an .LAS file store? What is it from?",
    answer: "It stores velocities from LiDAR data",
  },
  {
    question: "What are 6 examples of 3D GIS data?",
    answer:
      "Point lines and polygons with Z valuesRastersTINMultipatchPoint CloudLiDAR",
  },
  {
    question: "Who produces DEMs?",
    answer: "National Mapping Division of the USGS",
  },
  {
    question: "What extent are DEMs delivered?",
    answer: "Same as 1:24000 USGS Quad Maps (7.5min X 7.5min)",
  },
  {
    question: "DEMs represent _________________ elevations?",
    answer: "Bare Earth",
  },
  {
    question: "What is 3DEP?",
    answer: "The National 3D Elevation Project",
  },
  {
    question: "What is the NED?",
    answer: "The National Elevation Dataset",
  },
  {
    question: "What is the difference between GML and KML?",
    answer:
      "GML is a way of differentiating different objects on the ground (4 lane roads, 2 lane roads) whereas KML is the way to visually display those elements,.",
  },
  {
    question: "What are the advantages of a web service?",
    answer:
      "Fast and direct access to GIS dataOGC standard web services are supported by many mapping applications",
  },
  {
    question:
      "What is the performance difference between a map service and a feature service?",
    answer:
      "Map services render server side, feature services render on the user side",
  },
  {
    question: "What is a web coverage service? What is it used for?",
    answer: "For sharing raster data, can be used for analysis",
  },
  {
    question: "What is a web map tile service? What are the advantages?",
    answer:
      "Web map tile services serve up data in tiles so you don't have to pull an entire map if you're only looking at one area",
  },
  {
    question: "What is a web processing service?",
    answer: "Geoprocessing tools and models",
  },
  {
    question: "What are two terms for ArcGIS Server services?",
    answer: "RESTSOAP",
  },
  {
    question: "What does REST stand for?",
    answer: "Representational State Transfer",
  },
  {
    question: "What does SOAP stand for?",
    answer: "Simple Object Access Protocol",
  },
  {
    question: "What types of data do REST services support?",
    answer: "JSON & XML",
  },
  {
    question: "What types of data do SOAP services support?",
    answer: "XML only",
  },
  {
    question: "What are the advantages/disadvantages of SOAP services?",
    answer: "Older technology, only allow XML dataMore security options",
  },
  {
    question: "What is a JSON? What is it used for?",
    answer:
      "JavaScript Object Notation It is commonly used for transmitting data in web applications (e.g., sending some data from the server to the client, so it can be displayed on a web page, or vice versa   ",
  },
  {
    question: "What are some common uses for XML data in GIS?",
    answer:
      "Metadata, GDB Schema, Exporting Database (data & schema), Format of GML & KML/KMZ",
  },
  {
    question: "What is SDTS? What is it used for?",
    answer:
      "Spatial Data Transfer StandardSets standards for data conversion so that various software can read other software's data without losing any information",
  },
  {
    question: "Does the FGDC still endorse SDTS?",
    answer: "No, it was removed in 2014",
  },
  {
    question: "Does OGC endorse the shapefile or GML as a format?",
    answer: "GML",
  },
  {
    question: "FALSE NORTHING AND FALSE EASTING",
    answer: "review",
  },
  {
    question: "NAPP",
    answer:
      "(National Aerial Photography Program)A USGS program that provides aerial photographs, taken between 1987 and 2004, over the contenninous United States.",
  },
  {
    question: "What is the APFO?",
    answer: "Aerial Photography Field Office (division of USDA)",
  },
  {
    question: "What five organizations are members of the GISCI?",
    answer: "AAGGITANSGICUCGISURISA",
  },
  {
    question: "What is NDOP?",
    answer: "National Digital Orthophoto Program   ",
  },
  {
    question: "What is an API?",
    answer:
      " -Application Programming Interface    - data is accessed and exchanged as needed between software systems   ",
  },
  {
    question: "How is the board of directors of GISCI made up?",
    answer: "-10 people total-Two people from each contributing organization",
  },
  {
    question: "What is PostGIS?",
    answer:
      "-Open-source software program -Adds support for geographic objects to the PostgreSQL object-relational database.   ",
  },
  {
    question:
      " What type of data is best represented by differing shapes, colors, textures rather than differing sizes?   ",
    answer: "Nominal data (shows qualitative differences)   ",
  },
  {
    question: "What is false northing and easting?",
    answer:
      "Value applied to the origin of a coordinate system to change the X or Y coordinate readings",
  },
  {
    question: "What are the three resolutions in remote sensing?",
    answer: "-Spatial -Spectral (electromagnetic spectrum   measured)-Temporal",
  },
  {
    question:
      "Is generalization better used for larger or smaller scaled maps?",
    answer: "Small",
  },
  {
    question:
      " What type of data is best represented by differing sizes of same shapes?   ",
    answer: "Ordinal and interval data (shows quantitative differences)   ",
  },
  {
    question:
      "What is the difference between a DISCRETE RASTER and a CONTINUOUS RASTER?",
    answer:
      " -Discrete rasters: categorical and have distinct values identifying each cell (e.g. land use)    -Continuous rasters: are grid cells with gradual changing data such as elevation, temperature or an aerial photograph.   ",
  },
  {
    question:
      " What type of data is best represented by varying shades or varying intensities of the same   color ?   ",
    answer: "Discrete rasters",
  },
  {
    question: " What disciplines are associated with Geomatics?   ",
    answer: "Continuous rasters",
  },
  {
    question:
      "What are some commonly-used techniques to indicate elevation in a 2D map?",
    answer: "Interval and ratio data (shows quantitative differences)   ",
  },
  {
    question: "What is hypsometry?",
    answer:
      "-Cartography-Earth mapping-Geography-Geophysics-GPS-Land surveying-Photogrammetry-Remote Sensing",
  },
  {
    question: "What are the common kinds of GIS platforms?",
    answer: "-contour lines-hillshading-hypsometric color.-spot heights",
  },
  {
    question: "Nominal Data",
    answer: "the measurement of land elevation relative to sea level",
  },
  {
    question:
      "If developing standards were a symphony, what would be ISO's role?",
    answer: "-Desktop-Enterprise GIS-Hosted (cloud)-Server",
  },
  {
    question: "Ordinal data",
    answer:
      "-Data of categories only. -Data cannot be arranged in an ordering scheme. (Gender, Race, Religion)   ",
  },
  {
    question: "What is OOP?",
    answer:
      "-Conductor-the orchestra is made up of independent technical experts nominated by members.",
  },
  {
    question:
      "What are lines where the shape of the surface abruptly changes(e.g. ridge-lines, streams, or roads) called in TINs?",
    answer:
      "Object-oriented programming (OOP) is a programming paradigm using objects - data structures consisting of data fields and methods together with their interactions",
  },
  {
    question:
      "What is the difference between Quality Control and Quality Assurance?",
    answer: "As breaklines",
  },
  {
    question: "Topology is an example of QA or QC?",
    answer:
      "Quality assurance deals with processes and procedures to assure that the data is collected accuractely and consistentlyQuality control is done after data is collected to make sure that it is accurate and complete",
  },
  {
    question: "Training team on data collection methods is an example of what?",
    answer: "QC - it is done after the data has been collected",
  },
  {
    question: "What are the 3 grades of GPS devices?",
    answer: "Quality Assurance",
  },
  {
    question:
      "What is the accuracy of a consumer/recreational grade GPS device?",
    answer: "Consumer/Recreational, Mapping Grade, Survey and Military Grade",
  },
  {
    question: "What is the accuracy of a mapping grade gps?",
    answer: "30 meters",
  },
  {
    question: "What is the accuracy of a military grade GPS?",
    answer: "0.5-2 meter and 3-5 meter",
  },
  {
    question: "What is topology?",
    answer: "1mm to 1 meter",
  },
  {
    question: "What are some elements to topology?",
    answer:
      "Defines rules and relationships among featuresProvides a system for giving priority to features of greater accuracy",
  },
  {
    question: "How large of a pixel size do you need for a mapping project?",
    answer: "What layers? What's the cluster tolerance? Ranks, Rules",
  },
  {
    question: "How do you determine raster resolution?",
    answer:
      "The pixel size needs to be 1/2 the size of the object that you're mapping. If mapping 8ft sidewalk, you will need 4ft pixel resolution.",
  },
  {
    question: "Accuracy of data is limited by what?",
    answer:
      "It is the size of the individual pixel (if a pixel is 2ft X 2ft it is a 2ft resolution raster)",
  },
  {
    question:
      "What are some important questions to ask about data to ensure it's accurate?",
    answer:
      "The collecting device. If the collecting device can only collect data every 10ft, you cannot have a resolution of 2 ft.",
  },
  {
    question: "What is raster classification noise?",
    answer:
      "Who collected the data?Is the right type of data being used?Has it been validated?What is the accuracy of the device used to collect the data?Is the metadata filled out?",
  },
  {
    question: "Why is metadata important?",
    answer:
      "Isolated pixels (if in the middle of the lake there is a small cluster of concrete pixels it's an error)",
  },
  {
    question: "What is a binary raster?",
    answer:
      "Document accuracy of the dataProvides info about source, projection, description, how often it's updated",
  },
  {
    question: "What is COGO? Why is it used?",
    answer:
      "A raster that has been classificed into 2 classes (1, 0 or true or false)",
  },
  {
    question: "What is georeferencing?",
    answer:
      "Coordinate geometry. It is used to draw points lines and polygons using survey points and measurements",
  },
  {
    question: "What are some examples of unreferenced data?",
    answer:
      "Aligning unreferenced data to a dataset that is spatially referenced",
  },
  {
    question: "What are control points?",
    answer: "PDF plans, scanned maps",
  },
  {
    question:
      "Can you georeference an image to an unprojected coordinate system?",
    answer:
      "Points that have exact matches between the referenced and unreferenced datasets",
  },
  {
    question:
      "What should you do if your basemap and scanned map are in different coordinate systems?",
    answer:
      "No. The image must be georeferenced to a projected (cartesian) coordinate system",
  },
  {
    question: "What is RMSE? What does it stand for? What is it used for?",
    answer: "Reproject basemap to a projected (cartestian) coordinate system",
  },
  {
    question: "What should the residual error be for georeferenced data?",
    answer:
      "Root Mean Squared ErrorUsed to show the difference between where you say the points are and where the software says the points are",
  },
  {
    question:
      "Define the similarity transformation type of georeferencing. What does it preserve?",
    answer:
      "Residual should be 10x less than mapped feature (review this and check)",
  },
  {
    question: "Definte the affine transformation type of georeferencing.",
    answer:
      "Scale, rotate, and translate. Only uses 2 control points so it preserves the shape of the original raster (straight lines stay straight)",
  },
  {
    question:
      "What type of georeferencing uses 6 links? What type of transformation is it?",
    answer:
      "Adds the ability to skew the image as well as scale, rotate, and translate from the similarity transformation.",
  },
  {
    question:
      "What type of georeferencing uses 10 links? What type of transformation is it?",
    answer: "2nd Order. It is a polynomial transformation.",
  },
  {
    question: "What is a projective transformation used for?",
    answer: "3rd Order. It is a polynomial transformation.",
  },
  {
    question: "What is a world file?",
    answer:
      "Used to correct aerials, taking into account distortion away from from flight path",
  },
  {
    question:
      "If an image has geographic data stored in the header, you can override it by creating a world file. True or false?",
    answer: "TRUE",
  },
  {
    question:
      "What are examples of image types that store georeferencing information in the header of the image file?",
    answer:
      "ERDAS, IMAGINE, bsq, bil, bip, GeoTIFF, and grids, store the georeferencing information in the header of the image file.",
  },
  {
    question:
      "If an image file doesn't store georeferencing information in the header, how is it usually stored?",
    answer: "As a seperate ASCII file",
  },
  {
    question: ".tfw is an example of what? What is the original file type?",
    answer: "World file. Originally a .tif",
  },
  {
    question:
      "What order of priority should these be put in? Header File, World File, Row/Column Information of the Image (an identity transformation)",
    answer: "World, Header, Row",
  },
  {
    question:
      "What order should these GPS types be in, from most to least accurate? Mapping Grade, Survey Grade, Aviation & Military, Recreational",
    answer: "Aviation & Military, Survey, Mapping, Recreation",
  },
  {
    question: "What are the preferred steps in a data collection process?",
    answer:
      "Plan project, test out data collection in a sample area, check the accuracy of that data, collect the rest of the data",
  },
  {
    question:
      "GPS satellites orbit the Earth _________ a day at an altitude of ___________ miles.",
    answer:
      "Twice a day at about 12,000 miles (11,000 also cited, look for number closest to 12,000)",
  },
  {
    question:
      "Do GPS receivers receive their location from satellites or determine the location on their own?",
    answer:
      "Receivers use triangulation of different satellites to determine their position on Earth",
  },
  {
    question: "What GCS is GPS reported in?",
    answer: "WGS84",
  },
  {
    question: "How many satellites are required to calculate a GPS position?",
    answer: "4",
  },
  {
    question: "What is SPS? How does it relate to GPS data?",
    answer:
      "SPS stands for Standard Positioning Service. The government is committed to providing GPS accuracy levels specified in the SPS.",
  },
  {
    question:
      "Do SPS accuracy commitments apply to receivers or satellite signals?",
    answer:
      "Satellite signals. They do not guarantee the accuracy of individual GPS devices.",
  },
  {
    question:
      "For GPS signals, what level of accuracy does the government commit to?",
    answer: "Less than 7.8 meters or 25.6ft",
  },
  {
    question: "What is URE?",
    answer:
      "User Range Error. The government commits to broadcasting GPS signals with a URE of less than 7,8 meters or 25.6ft.",
  },
  {
    question: "What is PDOP? What is it used for?",
    answer:
      "Positional Dilution of PrecisionDescribes how good satellite configuration is for collecting accurate points. A lower PDOP is better.PDOP improves if there are more satellites spread evenly throughout the sky. Clusters of satellites would present a high PDOP because of the limit of satellites at all angles to triangulate an accurate position.",
  },
  {
    question:
      "What is the preferred PDOP for collecting data? What's a great PDOP?",
    answer:
      "The lower the PDOP the better. PDOP of 6 is good enough, PDOP of 4 is great.",
  },
  {
    question: "What is GNSS used for?",
    answer: "Generic name for all GPS type systems",
  },
  {
    question: "What is NAVSTAR?",
    answer: "NAVSTAR is the name for the GPS system of the United States",
  },
  {
    question: "What is GLONASS?",
    answer: "GLONASS is the name of the Russian GPS system",
  },
  {
    question: "What is IRNSS?",
    answer: "IRNSS is the GPS system of India",
  },
  {
    question: "What is Galileo?",
    answer:
      "Galileo is the European Space Agency's satellite navigation system that is currently under construction.",
  },
  {
    question: "What is Compass/Beidu?",
    answer: "The GPS system of China",
  },
  {
    question:
      "What are the 2 frequencies of GPS signals? Which is mapping grade, which is survey grade?",
    answer: "L1 (mapping) and L2 (survey)",
  },
  {
    question:
      "What does CDMA stand for? What does it do and why is it necessary?",
    answer:
      "CDMA stands for Code Division Multiple Access. All satellites transmit signals at same frequency.It keeps signals separated into channels.",
  },
  {
    question: "Besides location, what do GPS satellite signals contain?",
    answer: "Time signal was sent and satellite position at time of signal",
  },
  {
    question: "What is SNR?",
    answer: "signal to noise ratio",
  },
  {
    question: "Which is a better SNR? 1000/500 or 1000/20?",
    answer:
      "1000/20. It is Signal Strength/Noise Level so higher SNR values are better (more signal strength to noise).",
  },
  {
    question: "What is a VRS? What is it for?",
    answer:
      "Virtual Reference Station. Network of reference stations that monitor GPS signals and log corrections for reference.",
  },
  {
    question: "What is CORS? What is it for?",
    answer:
      "Continuous Operating Reference Station. Run by NOAA, it is a network of permanent stations that are used to post process GPS data.",
  },
  {
    question: "What is RTK? What is it used for?",
    answer:
      "Real Time Kinematic. RTK is used for high accuracy GPS locations and uses a station and rover. The station stays in one place and collects a high accuracy signal and the rover uses that signal to correct it's own position.",
  },
  {
    question: "What is SBAS? What is it used for?",
    answer:
      "Satellite Based Augmentation System. Used to obtain high accuracy GPS locations and uses different stations around the US that then send their differential correction data to a satellite and then back down to the receiver so it can correct it's position based on the station signal & GPS signal.",
  },
  {
    question: "What is WAAS?",
    answer:
      "Wide Area Augmentation System. WAAS combines GPS satellites and geostationary satellites to improve GPS accuracy.",
  },
  {
    question: "What are benchmarks?",
    answer:
      "Known points (control stations) across the United States with exact locations",
  },
  {
    question: "What is a theodolite?",
    answer: "a surveying instrument for measuring angles",
  },
  {
    question:
      "What is a total station? How is it similar/different than a theolodite?",
    answer:
      "Total stations incorporate laser pulses to measure angles and only need one person to operate it (unlike theolodites which need 2 people, one on the staff, one on the theolodite). Total stations are more effective at measuring long distances and can compute the angles & trigonometry instantly, rather than after the fact by a surveyor.",
  },
  {
    question: "What is a transit?",
    answer:
      "Transits are simpler forms of a theodolite and the pros are that it is lightweight.",
  },
  {
    question: "What is a UAV? What about an UAS?",
    answer:
      "UAV is the drone itself, UAS is the drone and equipment on the ground controlling the drone",
  },
  {
    question: "At what altitude can recreational drone pilots fly?",
    answer: "Under 400 ft.",
  },
  {
    question: "What is Class G airspace?",
    answer: "surface to 1200 ft or less",
  },
  {
    question:
      "What kind of license do you need to fly a drone higher than 400ft?",
    answer: "Part 107",
  },
  {
    question: "How much can drones weigh?",
    answer: "55 lbs",
  },
  {
    question: "What are some general rules for drone flying?",
    answer:
      "-Fly within line of sight-Flown during daylight of civil twilight-Flown at no more than 100mph-Cannot fly directly over people-Cannot fly from a moving vehicle in a populated area-Yield to other aircraft",
  },
  {
    question: "What does geomatics mean?",
    answer:
      "Geomatics is the scientific term for gathering, storing, and processing geographic information. Umbrella term for surveying, geospatial engineering, etc.",
  },
  {
    question: "When selecting by location, what does intersect select?",
    answer:
      "Any feature that intersects the source layerThe Mississippi watershed intersects many states",
  },
  {
    question:
      "When selecting by location, what does are within a distance of select?",
    answer:
      "Creates buffers around source layer and selects features within those areasSeattle is within 20 miles of Bellevue",
  },
  {
    question:
      "When selecting by location, what does have their centroid within select?",
    answer:
      "A target feature will be selected by this operator if the centroid of its geometry falls into the geometry of the source feature",
  },
  {
    question:
      "When selecting by location, what does share a line segment with select?",
    answer:
      "the source and target features will be considered as sharing a line segment if their geometries have at least two contiguous vertices in common.",
  },
  {
    question:
      "When selecting by location, what does touch the boundary of select?",
    answer:
      "A target feature will be returned by this function if the intersection of its geometry with the geometry of the source feature is nonempty, but the intersection of their interiors is empty. This is the definition of the Clementini touch operator, so if the target feature touches (as defined by Clementini) the source feature, it will be returned by this function",
  },
  {
    question:
      "When selecting by location, what does are crossed by the outline of select?",
    answer:
      "For this operator, the boundaries of the source and target feature must have at least one edge, vertex, or endpoint in common but must not share a line segment.",
  },
  {
    question: "When selecting by location, what does contain select?",
    answer:
      "Differs from complete contain. A polygon of the US will contain the state of Texas, even though it shares a border with Mexico.",
  },
  {
    question:
      "When selecting by location, what does completely contain select?",
    answer:
      "Each point in the source feature must fall inside the geometry of the target featureThe United States complete contains Kansas but not Texas, because the southern Texas boundaries overlap the country boundary.",
  },
  {
    question:
      "When selecting by location, what does contain Clementini select?",
    answer:
      "If a selecting feature sits on the boundary of a feature, it won't be selected.A parcel does not contain a river if the river flows exactly on the border of the parcel.",
  },
  {
    question: "When selecting by location, what does are within select?",
    answer:
      "This method differs from the Are completely within method in that the geometry of the target feature must fall inside the geometry of the source feature including its boundaries.For example, using this operator, the state of Montana will be selected even if its boundaries partly overlap that of the country.",
  },
  {
    question: "When selecting by location, what does completely within select?",
    answer:
      "The source feature must fall COMPLETELY within the target feature. Wyoming is COMPLETE WITHIN the United States. It shares no international border. However, Montana would not be because it shares an international border.",
  },
  {
    question: "When selecting by location, what does within Clementini select?",
    answer:
      "If the feature sits entirely on the boundary of the selecting feature, it will not be selected.A crime that happened on the road that forms the boundary between two police districts will not be within either police district.",
  },
  {
    question:
      "When do you use quotes and when do you not use quotes on data for queries in SQL?",
    answer: "Text needs quotes, integers do not",
  },
  {
    question:
      "What would this query select? StreetName = Olive AND SpeedLimit = 55 OR SpeedLimit = 55",
    answer:
      "Segments of Olive that are 55mph and any road segment with a speed limit of 55mph.",
  },
  {
    question:
      "What would this query select? StreetName = Olive AND (SpeedLimit = 0 OR SpeedLimit = 55)",
    answer: "Any segment of Olive that has a speed limit of 0 or 55",
  },
  {
    question: "What would this select? StreetName like Olive%?",
    answer: "Anything that starts with OLIVE",
  },
  {
    question: "What would this select? StreetName like %Olive%",
    answer:
      "Anything that has olive in the name.Soliver Street, Soliverias Street, Olive Street, for example.",
  },
  {
    question: "What would this query do? MOD(Contour, 5000) = 0",
    answer: "Select contours that when divided by 5000 = 0",
  },
  {
    question:
      "What does the Intersect tool do? How is it different from Union?",
    answer:
      "Combines all of the features in two feature classes and only outputs the common areas of both. Union outputs the intersected features as well as the distinct features from both feature classes where they don't intersect.",
  },
  {
    question: "What is the difference between append and merge?",
    answer:
      "Append adds data to an existing feature class, merge combines two feature classes and creates a seperate output",
  },
  {
    question: "Overlay analysis is based on ________________?",
    answer: "Boolian Logic",
  },
  {
    question:
      "When doing a raster overlay, both rasters need to ______________?",
    answer: "Be in the same coordinate system",
  },
  {
    question:
      "What does generalization do to data? What are some advantages of generalization?",
    answer:
      "Reduces detail in the data. Declutter the map when zoomed out, make it draw faster, hide sensitive information",
  },
  {
    question: "What situations would you use generalization?",
    answer:
      "Protect individual privacies, remove unnecessary vertexes, polygons, create clusters of point data",
  },
  {
    question: "What is the order of operations?",
    answer:
      "Parenthesis, Exponents, Multiplication, Division, Addition, Subtraction",
  },
  {
    question: "Arithmetic Operator: * means what?",
    answer: "Multiplication",
  },
  {
    question: "Arithmetic Operator: / means what?",
    answer: "Division",
  },
  {
    question: "Arithmetic Operator: // means what?",
    answer: "Integer Division",
  },
  {
    question: "What is integer division?",
    answer: "5/2 = 2 (there is no remainder in integer division)",
  },
  {
    question: "Arithmetic Operator: % means what?",
    answer: "Operator",
  },
  {
    question: "Arithmetic Operator: ** means what?",
    answer: "Power",
  },
  {
    question: "What does == mean? What does != mean?",
    answer: "Equal to, not equal to",
  },
  {
    question: "How many degrees are there are Earth (in reference to DMS)?",
    answer: "360",
  },
  {
    question: "1/60th of a minute is _________________?",
    answer: "1 second",
  },
  {
    question: "1/60th of a degree is ________________?",
    answer: "1 minute",
  },
  {
    question: "1 degree is how many minutes",
    answer: "60 minutes",
  },
  {
    question: "45 30' 15 is in what format?",
    answer: "Degrees, Minutes, Seconds",
  },
  {
    question: "45 30.123 is in what format?",
    answer: "Degrees and Decimal Minutes",
  },
  {
    question: "45.123 is in what format?",
    answer: "Decimal Degrees",
  },
  {
    question: "How would you convert 45.41 from DD to DMS?",
    answer:
      "1. Take 45 and keep it 2. Take .41 and multiply it by 60 (there are 60 minutes in a degree). That equals 24.6. You keep 24.   You now have 4524 3. Take .6 and multiply it by 60 (there are 60 seconds in a minute). That equals 36.   4. The answer: 45 24 36'",
  },
  {
    question: "How would you convert 25 15 30' to decimal degrees?",
    answer:
      "1. Take the 25 and keep it 2. 15' is 15 minutes out of 60. So 15/60 = .25 3. Divide 30/3600 (60 seconds in a minute, 60 minutes in a degree = 60x60=3600)   4. 25 + .25 + .0083333 = 25.2583333  The answer: 25.2583333",
  },
];
