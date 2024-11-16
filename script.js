// Select the total price element
const totalPriceElement = document.querySelector(".total");

// Helper function to update the total price
function updateTotalPrice() {
  let total = 0; // Initialize total as 0
  const products = document.querySelectorAll(".card-body"); // Dynamically fetch all products
  products.forEach((product) => {
    const quantityElement = product.querySelector(".quantity");
    const unitPriceElement = product.querySelector(".unit-price");

    // Ensure quantity and unit price elements exist
    if (!quantityElement || !unitPriceElement) {
      console.error("Missing quantity or unit price element");
      return;
    }

    const quantity = parseInt(quantityElement.textContent);
    const unitPrice = parseFloat(
      unitPriceElement.textContent.replace("$", "").trim()
    );

    // Ensure valid numeric values
    if (Number.isNaN(quantity) || Number.isNaN(unitPrice)) {
      console.error("Invalid quantity or unit price");
      return;
    }

    total += quantity * unitPrice; // Add (quantity × unit price) for this product to total
  });

  // Update the total price element
  if (totalPriceElement) {
    totalPriceElement.textContent = `Total price: $${total.toFixed(2)}`;
  } else {
    console.error("Total price element not found");
  }
}

// Add event listeners to each product
document.querySelectorAll(".card-body").forEach((product) => {
  const plusButton = product.querySelector(".fa-plus-circle");
  const minusButton = product.querySelector(".fa-minus-circle");
  const deleteButton = product.querySelector(".fa-trash-alt");
  const heartButton = product.querySelector(".fa-heart");
  const quantityElement = product.querySelector(".quantity");

  // Ensure buttons and quantity element exist
  if (
    !plusButton ||
    !minusButton ||
    !deleteButton ||
    !heartButton ||
    !quantityElement
  ) {
    console.error("Missing necessary elements in product card");
    return;
  }

  // Handle the "+" button click
  plusButton.onclick = () => {
    let quantity = parseInt(quantityElement.textContent);
    if (Number.isNaN(quantity)) {
      console.error("Invalid quantity");
      return;
    }
    quantityElement.textContent = ++quantity; // Increment quantity
    updateTotalPrice(); // Update total price
  };

  // Handle the "-" button click
  minusButton.onclick = () => {
    let quantity = parseInt(quantityElement.textContent);
    if (Number.isNaN(quantity)) {
      console.error("Invalid quantity");
      return;
    }
    if (quantity > 0) {
      quantityElement.textContent = --quantity; // Decrement quantity
      updateTotalPrice(); // Update total price
    }
  };

  // Handle the delete button click
  deleteButton.onclick = () => {
    product.remove(); // Remove the product from the DOM
    updateTotalPrice(); // Update total price
  };

  // Handle the heart (like) button click
  heartButton.onclick = () => {
    heartButton.style.color =
      heartButton.style.color === "red" ? "black" : "red"; // Toggle color
  };
});

// Initialize the total price on page load
updateTotalPrice();
