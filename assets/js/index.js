const form_add = document.getElementById("add_user");
const form_update = document.getElementById("update_user");
const btnDelete = document.getElementById("btnDelete");

swal_response = (tittle, text, icon, redirect = false, url = "/") => {
  Swal.fire({
    title: tittle,
    text: text ?? "",
    icon: icon,
    confirmButtonText: "Cool!",
  }).then(() => {
    if (redirect) {
      window.location.href = url;
    }
  });
};

swal_confirm = (id, title, text, confirmButtonText) => {
  Swal.fire({
    title: title,
    text: text,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: confirmButtonText,
  }).then((result) => {
    if (result.isConfirmed) {
      axios
        .delete(`/api/users/${id}`)
        .then((res) => {
          swal_response("Success!", res.data.message, "success", true);
        })
        .catch((err) => {
          swal_response("Error!", err.message, "error");
        });
    }
  });
};

delete_user = (id) => {
  swal_confirm(id, "Are you sure?", "You wont be able to revert this!", "Yes, Delete It!");
};

$("#update_user").submit(function (e) {
  e.preventDefault();
  let id = $("#userId").val();
  let formData = $("#update_user").serialize();

  axios
    .put(`/api/users/${id}`, formData)
    .then((res) => {
      swal_response("Success!", res.data.message, "success", true);
    })
    .catch((err) => {
      swal_response("Error!", err.message, "error");
    });
});
