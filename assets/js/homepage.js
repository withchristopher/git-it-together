var getUserRepos = function () {
  // var response = fetch("https://api.github.com/users/octocat/repos");

  fetch("https://api.github.com/users/octocat/repos").then(function (response) {
    console.log("inside", response);
  });
  console.log("outside");
};

getUserRepos();
