<script>
   
     import Drawer, { AppContent, Content } from '@smui/drawer';
    import List, { Item, Text } from '@smui/list';
  import { resources } from "./data.js"
  let resource_items = ["Websites", "Literature", "Downloads", "Media"]
    let selected = 0;
    let resources_index = 0;

    let name = "";
    let link = "";
    $: name = resources[selected][resources_index].name;
    $: link = resources[selected][resources_index].link;
    function displayItems(rindex) {
    //this function should use map function to display name properties of each object in the array with that name having an <a> and link to the linkk property of the object
      let items = resources[rindex].map((resource) => {
        return `<h3><a href="${resource.link}">${resource.name}</a><h3>`;
      });
      let selected = rindex;
      items = items.join("\n");
      return [selected,items];
}
      
    $: [selected,items] = displayItems(0);
      
    // }
    $: console.log(items);
    $: console.log(selected);
    // $: console.log(name);
    // $: console.log(link);
    
  </script>



<div class="drawer-container">
    <Drawer>
      <Content>
        <List>
          <Item
          >                   
           <h2>{resource_items[0]}</h2> 
         </Item>
         <Item >                  
          <h2>{resource_items[1]}</h2> 
       </Item>
            <Item
          >   
                              
              <h2>{resource_items[2]}</h2> 
            </Item>
            <Item
          >   
                             
              <h2>{resource_items[3]}</h2> 
           </Item>
        </List>
      </Content>
    </Drawer>
  
    <AppContent class="app-content">
      <main class="main-content">
     

      
      <div>{items}</div>
         <!-- make {items} display html rows not just a string -->
         
        
        <!-- {#each resources[selected] as resource}
        <div><a href={link}>{name}</div>
      {/each} -->
      </main>
    </AppContent>
  </div>
  
  
  
  <style>
    /* These classes are only needed because the
      drawer is in a container on the page. */
    .drawer-container {
      position: relative;
      display: flex;
      height: 550px;
      max-width: 800px;
      margin: 50,30,50,50;
      border: 3px solid rgba(25, 43, 150, 0.1);
      overflow: hidden;
      z-index: 0;
    }
  
    * :global(.app-content) {
      flex: auto;
      overflow: hidden;
      position: relative;
      flex-grow: 1;
    }
  
    .main-content {
      overflow: hidden;
      padding: 16px;
      height: 100%;
      box-sizing: border-box;
    }
  </style>
  