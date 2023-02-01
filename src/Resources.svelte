<script>
  import { resources } from "./data.js";

  let currentKey = "Websites";
let rkeys = ["Websites", "Literature", "Downloads", "Media"];
  function handleClick(event) {
    currentKey = event.target.innerHTML;
  }
console.log(resources[currentKey])
console.log(typeof Object.keys(resources));
  // Object.keys(resources).forEach((key) => {
  //   resources[key].forEach((resource) => {
  //     resource.link = resource.link.replace(
  //       "https://docs.google.com/document/d/",
  //       "https://docs.google.com/document/d/e/"
  //     );
  //   });
  // });
</script>

<style>
  .container {
    display: flex;
    justify-content: space-between;
  }

  .left-side {
    width: 30%;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .right-side {
    width: 70%;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .key {
    padding: 10px;
    cursor: pointer;
  }

  .selected {
    background-color: lightgray;
  }
</style>

<div class="container">
  <div class="left-side">
    {#each rkeys as key}
      <div
        class="key {key === currentKey ? 'selected' : ''}"
        on:click={handleClick}
      >
        {key}
      </div>
    {/each}
  </div>
  <div class="right-side">
    <ul>
      {#each resources[currentKey] as resource}
        <li>
          <h3>
            <a href={resource.link}>{resource.name}</a>
          </h3>
        </li>
      {/each}
    </ul>
  </div>
</div>