var getRepoIssues = function (repo) {
  console.log(repo);
  var apiURL = "https://api.github.com/repos/" + repo + "/issues?direction=asc";
  fetch(apiURL).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        console.log(data);
      });
    } else {
      alert("There was a problem with your request!");
    }
  });
};

getRepoIssues("facebook/react");
