document.addEventListener('DOMContentLoaded', async () => {
  const tbody = document.querySelector('tbody');
  const sortBtn = document.getElementById('sortBtn');
  const searchInput = document.getElementById('searchInput');
  const myUrl = 'http://jsonplaceholder.typicode.com/users';
  let sortOrder = 1;

  async function fetchData(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Unable to fetch users data');
      }
      return response.json();
    } catch (error) {
      console.log(error);
    }
  }

  function displayData(users) {
    tbody.innerHTML = users
      .map(
        (user) =>
          `
            <tr>
                <td>${user.id}</td>
                <td>${user.name}</td>
                <td>${user.username}</td>
                <td>${user.email}</td>
            </tr>
        `
      )
      .join('');
  }

  function sortUsers(users, order) {
    try {
      if (order !== 1 && order !== -1) {
        throw new Error(
          'Invalid order parameter, please use 1 for ascending order or -1 por descending.'
        );
      }
      const sortedUsersArray = users.slice().sort((userA, userB) => {
        const comparison = userA.name.localeCompare(userB.name);

        return sortOrder === 1 ? comparison : -comparison;
      });
      if (sortOrder === 1) {
        sortOrder = -1;
      } else {
        sortOrder = 1;
      }

      return sortedUsersArray;
    } catch (error) {}
  }

  function filterUsersByName(users, nameFilter) {
    return users.filter(
      (user) => user.name.toLowerCase().indexOf(nameFilter.toLowerCase()) > -1
    );
  }

  const users = await fetchData(myUrl);
  displayData(users);

  sortBtn.addEventListener('click', (event) => {
    event.preventDefault();
    const sortedUsersOnClick = sortUsers(users, sortOrder);
    displayData(sortedUsersOnClick);
  });

  searchInput.addEventListener('input', (event) => {
    const inputValue = event.target.value;

    const filteredUsersArray = filterUsersByName(users, inputValue);
    displayData(filteredUsersArray);
  });
});
