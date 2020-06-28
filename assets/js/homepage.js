var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#username");
var repoContainerEl = document.querySelector("#repos-container");
var repoSeachTerm = document.querySelector("#repo-search-term");
var languageButtonsEl = document.querySelector("#language-buttons");

var displayRepos = function (repos, searchTerm) {
  if (repos.length === 0) {
    repoContainerEl.textContent = "No repositories found";
    return;
  }

  repoContainerEl.textContent = "";
  repoSeachTerm.textContent = searchTerm;
  console.log(searchTerm);
  console.log(repos);

  // loop over repos
  for (var i = 0; i < repos.length; i++) {
    // format repo name
    var repoName = repos[i].owner.login + "/" + repos[i].name;

    // create a container for each repo
    var repoEl = document.createElement("a");
    repoEl.classList = "list-item flex-row justify-space-between align-center";
    repoEl.setAttribute("href", "./single-repo.html?repo=" + repoName);

    // create a span element to hold repo nname
    var titleEl = document.createElement("span");
    titleEl.textContent = repoName;

    // append to container
    repoEl.appendChild(titleEl);

    // create a status element
    var statusEl = document.createElement("span");
    statusEl.classList = "flex-row align-center";

    // check if current repo has issues or not
    if (repos[i].open_issues_count > 0) {
      statusEl.innerHTML =
        "<i class='fas fa-times status-icon icon-danger'></i>" +
        repos[i].open_issues_count +
        " issues.";
    } else {
      statusEl.innerHTML =
        "<i class='fas fa-check-square status-icon icon-success'></i>";
    }
    //append to container
    repoEl.appendChild(statusEl);

    var repoDescription = document.createElement("div");

    if (repos[i].description === null) {
      repoDescription.innerHTML =
        "<class='uppercase'>" + "There is no description for this repo";
    } else {
      repoDescription.innerHTML = "<class='uppercase'>" + repos[i].description;
    }

    //append description
    repoContainerEl.appendChild(repoDescription);

    //append container to the dom
    repoContainerEl.appendChild(repoEl);
  }
};

var getFeaturedRepos = function (language) {
  var apiUrl =
    "https://api.github.com/search/repositories?q=" +
    language +
    "+is:featured&sort=help-wanted-issues";

  fetch(apiUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        displayRepos(data.items, language);
      });
    } else {
      alert("Error" + response.statusText);
    }
  });
};

var getUserRepos = function (user) {
  var apiUrl = "https://api.github.com/users/" + user + "/repos";

  fetch(apiUrl)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          displayRepos(data, user);
        });
      } else {
        document.location.replace("./index.html");
      }
    })
    .catch(function (error) {
      //notice this `.catch()` getting chained onto the end of the `.then` method
      alert("Unable to connect to GitHub");
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

var buttonClickHandler = function (event) {
  var language = event.target.getAttribute("data-language");
  console.log(language);
  if (language) {
    getFeaturedRepos(language);

    //clear old content
    repoContainerEl.textContent = "";
  }
};

userFormEl = addEventListener("submit", formSubmitHandler);
languageButtonsEl.addEventListener("click", buttonClickHandler);
