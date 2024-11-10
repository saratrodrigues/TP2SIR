  function fetchAndRenderItems() {
    fetch('http://localhost:3000/students')
      .then(response => response.json())
      .then(data => renderItems(data))
      .catch(error => console.error('Error fetching data:', error));
  }
  
  function renderItems(items) {
    const tableBody = document.getElementById("itemsTable").querySelector("tbody");
    tableBody.innerHTML = "";
  
    items.forEach(item => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${item.id}</td>
        <td contenteditable="true" oninput="editItem(${item.id}, 'name', this.innerText)">${item.name}</td>
        <td contenteditable="true" oninput="editItem(${item.id}, 'course', this.innerText)">${item.course}</td>
        <td contenteditable="true" oninput="editItem(${item.id}, 'year', this.innerText)">${item.year}</td>
        <td><button onclick="deleteItem(${item.id})">Delete</button></td>
      `;
      tableBody.appendChild(row);
    });
  }
  
  function editItem(id, property, value) {
    const updatedValue = (property === 'year') ? parseInt(value) : value;
    fetch(`http://localhost:3000/students/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ [property]: updatedValue })
    })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Error updating student');
      }
    })
    .then(updatedStudent => {
      console.log('Student updated:', updatedStudent);
      cell.innerText = updatedValue;
    })
    .then(()=> fetchAndRenderItems())
    .catch(error => console.error('Error updating item:', error));
  }
  
  function deleteItem(id) {
    fetch(`http://localhost:3000/students/${id}`, { method: 'DELETE' })
      .then(() => fetchAndRenderItems())
      .catch(error => console.error('Error deleting item:', error));
  }
  
  function createNewItem() {
    const newName = document.getElementById("newName").value;
    const newCourse = document.getElementById("newCourse").value;
    const newYear = parseInt(document.getElementById("newYear").value);

    if (!newName || !newCourse || !newYear) {
        alert("Please fill in all fields.");
        return;
      }
  
    fetch('http://localhost:3000/students', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: newName, course: newCourse, year: newYear })
    })
    .then(() => {
      fetchAndRenderItems();
      document.getElementById("newName").value = "";
      document.getElementById("newCourse").value = "";
      document.getElementById("newYear").value = "";
    })
    .catch(error => console.error('Error creating item:', error));
  }
  
  fetchAndRenderItems();