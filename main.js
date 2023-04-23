async function getPost(){
  let request = await fetch(`https://jsonplaceholder.typicode.com/posts/${getRandomNumber()}`);
  let response = await request.json();
  return response;
}

async function getUser(){
  let request = await fetch(`https://randomuser.me/api/`);
  let response = await request.json();
  return response.results[0]; 
}
/* 
setInterval(()=>{
getUser().then((response)=>console.log(response))
  
}, 100000)
*/
function init(){
  showPost()
  showPost()
  showPost()
}
init();

async function showPost(){
  // get user INfor
  const user = await getUser();
  //get post info
  const post = await getPost();
  console.log({
    "post":post,
    "user":user
  })
  
  let postElement = document.createElement("div");
  postElement.classList.add("post");
  postElement.innerHTML = `
      <h2 class="post-title">${post.title}</h2>
      <p class="post-body">${post.body}</p>
      <div class="post-author-box">
        <img src=${user.picture.medium} alt="" class="post-img">
        <span class="post-author">${user.name.first} ${user.name.last}</span>
      </div>
  `;
  // get the container
  callDataToDom(postElement);
  hideLoader();
}
function callDataToDom(postElement){
  let container = document.querySelector(".container");
  container.appendChild(postElement);
}
function getRandomNumber(){
   return Math.floor(Math.random() * 100) + 1; 
}
const {offsetHeight,offsetTop,clientHeight,clientTop}=document.documentElement;
console.log(document.documentElement)
// setInterval(()=>{
//   console.log({offsetHeight,offsetTop})

// },2000)

/**
 * 
 * INFINIT SCROLL
 */
let isInside = true;
window.addEventListener('scroll', (event)=>{
  const {scrollHeight,clientHeight,scrollTop} = document.documentElement;
  console.log({scrollHeight,clientHeight,scrollTop})
  if((scrollHeight-5<=clientHeight+scrollTop) && isInside ){
    isInside = false;
    showLoader();
    setTimeout(() => {
      showPost();
      isInside=true;
    }, 1000);
  }
})
let loader = document.querySelector(".loader");
function showLoader(){
  loader.classList.add("show")
}
function hideLoader(){
  loader.classList.remove("show")
}