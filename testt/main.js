// Switch between Register, Overview, and Orders Views
function switchView(viewName) {
  const registerView = document.getElementById("view-register");
  const dashboardLayout = document.getElementById("dashboard-layout");
  const overviewView = document.getElementById("view-overview");
  const ordersView = document.getElementById("view-orders");

  const menuOverview = document.getElementById("menu-overview");
  const menuOrders = document.getElementById("menu-orders");

  const switchBtns = document.querySelectorAll(".switch-btn");
  switchBtns.forEach((btn) => btn.classList.remove("active"));

  if (viewName === "register") {
    registerView.classList.remove("hidden");
    dashboardLayout.classList.add("hidden");
    switchBtns[0].classList.add("active");
  } else {
    registerView.classList.add("hidden");
    dashboardLayout.classList.remove("hidden");

    if (viewName === "overview") {
      overviewView.classList.remove("hidden");
      ordersView.classList.add("hidden");
      menuOverview.classList.add("active");
      menuOrders.classList.remove("active");
      switchBtns[1].classList.add("active");
    } else if (viewName === "orders") {
      overviewView.classList.add("hidden");
      ordersView.classList.remove("hidden");
      menuOverview.classList.remove("active");
      menuOrders.classList.add("active");
      switchBtns[2].classList.add("active");
    }
  }
}