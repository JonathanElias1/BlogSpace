let postsArray = [];
const titleInput = document.getElementById(`post-title`);
const bodyInput = document.getElementById(`post-body`);
const form = document.getElementById(`new-post`);

function renderPosts() {
  let html = "";
  for (let post of postsArray) {
    html += `
               <h3>${post.title}</h3>
               <p>${post.body}</p>
               <hr />
           `;
  }
  document.getElementById("blog-list").innerHTML = html;
}

/**
 Challenge:
 
 GET a list of blog from the JSON Placeholder API.
 
 BaseURL: https://apis.scrimba.com/jsonplaceholder/
 Endpoint: /posts
 
 Since there's so many posts, let's limit the array to just 5 items.
 You can use the `.slice()` array method to just grab the first 5 objects
 from the data array that comes back from the API
 */

//Solution

// fetch(`https://apis.scrimba.com/jsonplaceholder/posts`)
//   .then((response) => response.json())
//   .then((data) => {
//     console.log(data.slice(0, 5));
//     const postsArr = data.slice(0, 5);
//     console.log(postsArr);
//   });
//can slice this either way

/**
 Challenge:

 With the 5 blog post objects, display the `title` and `body`
properties of the first 5 posts on the browser page.
 
 Hints: 
 * Create a `div` in the HTML file to store these items
 * Loop over the items creating a string of HTML elements you 
   can then put into the div with `innerHTML`
 */

fetch("https://apis.scrimba.com/jsonplaceholder/posts")
  .then((res) => res.json())
  .then((data) => {
    postsArray = data.slice(0, 5);
    renderPosts();
  });
//so we slice the data to start at 0 go to 5 then we make
//the html = to nothing so we can add to it later
//then we make a for loop saying for anything in this post array do the following
// then we set html= to html + the post title and the post body
//then we use DOM manipulation to grab our element by ID and make the inner html of it = to our HTML

/**
 Challenge:
 
 * Listen for the "submit" event on the form (which will happen when the button is clicked)
    * (Don't forget to preventDefault on the form so it doesn't refresh your page. Google "form preventDefault" if you're not sure what I'm talking about)
 * Combine the title value and body value into an object (with a "title" property and "body" property)
 * Log the object to the console

*/
//form below = document.getelementbyid(`new-post)
//so we access the new post then insert a submit event handler for an event
form.addEventListener("submit", function (e) {
  e.preventDefault();
  const postTitle = document.getElementById("post-title").value;
  const postBody = document.getElementById("post-body").value;
  const data = {
    title: postTitle,
    body: postBody,
  };

  /**
   * Challenge: Send this off to the server!
   *
   * 1. BaseURL: https://apis.scrimba.com/jsonplaceholder/
   * 2. Endpoint: /posts
   * 3. method: ???
   * 4. Request body: ??? (Remember to turn it into JSON)
   * 5. Headers: ??? (Check the JSON Placeholder API docs or past casts for help)
   */

  //ANSWER 1

  // fetch("https://apis.scrimba.com/jsonplaceholder/posts", {
  //   method: "POST",
  //   body: JSON.stringify(data),
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  // })
  //   .then((res) => res.json())
  //   .then((data) => console.log(data));

  //YOU CAN ALSO DO IT THIS WAY
  //ANSWER 2

  const options = {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  };

  //Since fetch can call a function you can make the object variable hold
  //the method, body, and header and then just call it instead of doing it all
  //within the fetch

  fetch("https://apis.scrimba.com/jsonplaceholder/posts", options)
    .then((res) => res.json())
    .then((post) => {
      //update the DOM with the new blog entry
      postsArray.unshift(post);
      //so u unshift the entire postsArray variable for each post
      //which makes whatever u post at the top then u render it
      renderPosts();
      form.reset();
      //   clearForm();
    });
});
//take the innerhtml of the div that contains all of the
//blog posts and set it equal to the new blog posts and then
//all the other blog posts from before
//since ur not overwriting the old blog posts until
//the new one is there, they will all appear together

// function clearForm() {
//   titleInput.value = "";
//   bodyInput.value = "";
// }
