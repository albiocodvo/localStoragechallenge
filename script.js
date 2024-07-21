const itemForm = document.getElementById("item-form");
const itemInput = document.getElementById("item-input");
const itemList = document.getElementById("item-list");
const clearBtn = document.getElementById("clear");
const itemFilter = document.getElementById("filter");

    function addItem(e) {
        e.preventDefault();
        const newItem = itemInput.value;
        if (newItem === '') {
            alert("Please add an item");
                return;
            }

    // Create list item
        const li = document.createElement('li');
        li.appendChild(document.createTextNode(newItem));
        const button = createButton('remove-item btn-link text-red');
        li.appendChild(button);
        itemList.appendChild(li);

    // Store in localStorage
        let items = localStorage.getItem('shoppingList');
        items = items ? items.split(',') : [];
        items.push(newItem);
        localStorage.setItem('shoppingList', items.join(','));

        checkUI();
        itemInput.value = "";
        }

    function createButton(classes) {
        const button = document.createElement("submit", addItem);
        button.className = classes;
        const icon = createIcon("fa-solid fa-xmark");
        button.appendChild(icon);
        return button;
        }

    function createIcon(classes) {
        const icon = document.createElement("i");
        icon.className = classes;
        return icon;
        }

    function removeItem(e) {
        if (e.target.parentElement.classList.contains('remove-item')) {
        if (confirm("Are you sure?")) {
            const itemText = e.target.parentElement.parentElement.firstChild.textContent;
            e.target.parentElement.parentElement.remove();

    // Remove from localStorage
            let items = localStorage.getItem('shoppingList');
            items = items ? items.split(',') : [];
            items = items.filter(item => item !== itemText);
            localStorage.setItem('shoppingList', items.join(','));
                }
            }
            checkUI();
        }

    function clearItems() {
        while (itemList.firstChild) {
            itemList.removeChild(itemList.firstChild);
            }

        // Clear localStorage
        localStorage.removeItem('shoppingList');

        checkUI();
        }

    function filterItems(e) {
        const text = e.target.value.toLowerCase();
        const items = document.querySelectorAll("ul#item-list li");

        items.forEach(item => {
            const itemName = item.firstChild.textContent.toLowerCase();
            if (itemName.indexOf(text) !== -1) {
                item.style.display = 'flex';
                } else {
                item.style.display = 'none';
                }
            });
        }

    function checkUI() {
        const items = itemList.querySelectorAll("li");
        if (items.length === 0) {
            clearBtn.style.display = "none";
            itemFilter.style.display = "none";
            } else {
            clearBtn.style.display = "block";
            itemFilter.style.display = "block";
            }
        }

    function loadItems() {
        let items = localStorage.getItem('shoppingList');
        items = items ? items.split(',') : [];
        items.forEach(item => {
            const li = document.createElement('li');
            li.appendChild(document.createTextNode(item));
            const button = createButton('remove-item btn-link text-red');
            li.appendChild(button);
            itemList.appendChild(li);
            });
        checkUI();
        }

// Event Listeners
    itemForm.addEventListener('submit', addItem);
    itemList.addEventListener('click', removeItem);
    clearBtn.addEventListener('click', clearItems);
    itemFilter.addEventListener('input', filterItems);

// Load items from localStorage on page load
    loadItems();

