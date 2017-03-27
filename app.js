class Button {
  constructor() {
    this._button = document.createElement('button');
  }

  set text(value) {
    this._button.innerHTML = value;
  }

  get text() {
    return this._button.innerHTML;
  }

  render() {
    return this._button;
  }

  on(name, callback) {
    this._button.addEventListener(name, function() {
      console.log("The button was clicked");
      callback.call(this);
    });
  }
}

class SearchInput {
  constructor() {
    this._input = document.createElement('input');
    this._input.setAttribute("placeholder", "Search");
  }

  render() {
    return this._input;
  }

  set query(value) {
    this._input.value = value;
  }

  get query() {
    return this._input.value;
  }

  on(name, callback) {
    this._input
      .addEventListener(name, function() {
        callback.call(this);
      });
  }
}

class SearchResults {
  constructor() {
    this._list = document.createElement('results');
  }

  get items() {
    return this._list.innerHTML;
  }

  set items(values) {
    var list = this._list;
    list.innerHTML = "";
    values.forEach(function (repository) {
      var item = document.createElement('li');
      var link = document.createElement('a');
      link.setAttribute('href', repository.html_url);
      link.appendChild(document.createTextNode(repository.full_name));
      item.appendChild(link);
      list.appendChild(item);
    });
  }

  render() {
    return this._list;
  }
}

class GithubSearch {
  constructor() {
    this._base_url = this._base_url = "https://api.github.com/";
    this._params = "access_token=9cac3e354a940a902a4b3e360bc182149245ef27&per_page=10";
  }

  search(query, callback) {
    var url = "";
    if (query === "") {
      url = this._base_url + "repositories?" + this._params;
    } else {
      url = this._base_url + "search/repositories?q=" + query + "&" + this._params;
    }

    new Ajax(url).
      then(x => {
        if (x.items) {
          callback(x.items);
        } else {
            callback(x);
        }
      })
      .catch(e => {
        console.log(e);
      })
      .get();
  }

}

var input = new SearchInput();
var results = new SearchResults();
var githubSearch = new GithubSearch();

input.on('keyup', function() {
  githubSearch.search(input.query, function (items) {
    results.items = items;
  });
});

let searchParagraph = document.createElement("p");
document.body.appendChild(searchParagraph);

let searchInput = document.body.appendChild(input.render());
searchParagraph.appendChild(searchInput);

document.body.appendChild(results.render());
document.addEventListener("DOMContentLoaded", function(event) {
  githubSearch.search("", function (items) {
    results.items = items;
  });
});
