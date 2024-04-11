document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('github-form');
    const searchInput = document.getElementById('search');
    const userList = document.getElementById('user-list');
    const repoList = document.getElementById('repos-list');
    let searchType = 'user';
  
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (searchType === 'user') {
        const searchTerm = searchInput.value;
        const users = await searchUsers(searchTerm);
        displayUsers(users);
      } else {
        const searchTerm = searchInput.value;
        const repos = await searchRepos(searchTerm);
        displayRepos(repos);
      }
    });
  
    userList.addEventListener('click', async (e) => {
      if (e.target.tagName === 'A') {
        e.preventDefault();
        const username = e.target.textContent;
        const repos = await getUserRepos(username);
        displayRepos(repos);
      }
    });
  
    const searchTypeToggle = document.createElement('button');
    searchTypeToggle.textContent = 'Toggle Search Type';
    document.body.insertBefore(searchTypeToggle, form);
  
    searchTypeToggle.addEventListener('click', () => {
      searchType = searchType === 'user' ? 'repo' : 'user';
    });
  
    async function searchUsers(searchTerm) {
      const response = await fetch(`https://api.github.com/search/users?q=${searchTerm}`);
      const data = await response.json();
      return data.items;
    }
  
    async function searchRepos(searchTerm) {
      const response = await fetch(`https://api.github.com/search/repositories?q=${searchTerm}`);
      const data = await response.json();
      return data.items;
    }
  
    async function getUserRepos(username) {
      const response = await fetch(`https://api.github.com/users/${username}/repos`);
      const data = await response.json();
      return data;
    }
  
    function displayUsers(users) {
      userList.innerHTML = '';
      users.forEach(user => {
        const li = document.createElement('li');
        const link = document.createElement('a');
        link.href = user.html_url;
        link.textContent = user.login;
        li.appendChild(link);
        userList.appendChild(li);
      });
    }
  
    function displayRepos(repos) {
      repoList.innerHTML = '';
      repos.forEach(repo => {
        const li = document.createElement('li');
        li.textContent = repo.full_name;
        repoList.appendChild(li);
      });
    }
  });