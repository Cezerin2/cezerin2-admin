function resizeElements() {
  if (window.innerWidth >= 769) {
    var elContainer = document.getElementById("container")
    var elHeadContainer = document.getElementById("headContainer")
    var elBodyContainer = document.getElementById("bodyContainer")

    if (elBodyContainer) {
      elBodyContainer.style.height =
        elContainer.clientHeight - elHeadContainer.clientHeight + "px"
    }
  }
}
window.addEventListener("resize", resizeElements)
window.addEventListener("load", resizeElements)

if ("Notification" in window) {
  if (Notification.permission !== "denied") {
    Notification.requestPermission()
  }
}
