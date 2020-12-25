// Get the modal
var modal = document.getElementById("myModal");
var modalSua = document.getElementById("myModal-update");
var modalXoa = document.getElementById("myModal-delete");


// Get the button that opens the modal
var btn = document.getElementById("myBtn");
var update = document.querySelectorAll(".update-info");
for(var i = 0; i < update.length; i++) {
    update[i].onclick = function() {
        modalSua.style.display = "block";
      }
}

var deleteif = document.querySelectorAll(".delete-info");
for(var i = 0; i < deleteif.length; i++) {
    deleteif[i].onclick = function() {
        modalXoa.style.display = "block";
      }
}
// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close");
var huyBtn = document.querySelectorAll(".cancel-update");

// When the user clicks the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
for(var i = 0; i < deleteif.length; i++) {
    huyBtn[i].onclick = function() {
        modalXoa.style.display = "none";
        modalSua.style.display = "none";
        modal.style.display = "none";
      }
    span[i].onclick = function() {
        modalXoa.style.display = "none";
        modalSua.style.display = "none";
        modal.style.display = "none";
      }
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}