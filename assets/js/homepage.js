var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#username");
var repoContainerEl = document.querySelector("#repos-container");
var repoSeachTerm = document.querySelector("#repo-search-term");

var displayRepos = function (repos, searchTerm) {
  repoContainerEl.textContent = "";
  repoSeachTerm.textContent = searchTerm;
  console.log(searchTerm);
  console.log(repos);

  // loop over repos
  for (var i = 0; i < repos.length; i++) {
    // format repo name
    var repoName = repos[i].owner.login + "/" + repos[i].name;

    // create a container for each repo
    var repoEl = document.createElement("div");
    repoEl.classList = "list-item flex-row justify-space-between align-center";

    // create a span element to hold repo nname
    var titleEl = document.createElement("span");
    titleEl.textContent = repoName;

    // append to container
    repoEl.appendChild(titleEl);

    //append container to the dom
    repoContainerEl.appendChild(repoEl);
  }
};

var getUserRepos = function (user) {
  var apiUrl = "https://api.github.com/users/" + user + "/repos";

  fetch(apiUrl).then(function (response) {
    response.json().then(function (data) {
      displayRepos(data, user);
    });
  });
  //console.log("outside");
};

var formSubmitHandler = function (event) {
  event.preventDefault();
  console.log(event);
  var username = nameInputEl.value.trim();

  if (username) {
    getUserRepos(username);
    nameInputEl.value = "";
  } else {
    alert("Please enter GitHub Username");
  }
};

userFormEl = addEventListener("submit", formSubmitHandler);
