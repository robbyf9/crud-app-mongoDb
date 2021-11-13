const form_add = document.getElementById('add_user');
const form_update = document.getElementById('update_user');
const btnDelete = document.getElementById('btnDelete');

swal_response = (tittle, text, icon) => {
    Swal.fire({
        title: tittle,
        text: text ?? '',
        icon: icon,
        confirmButtonText: 'Cool!'
    })
}

swal_confirm = (id, title, text, confirmButtonText) => {
    Swal.fire({
        title: title,
        text: text,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: confirmButtonText
        }).then((result) => {
        if (result.isConfirmed) {
            axios.delete('/api/users/' + id)
                .then(res => {
                    swal_response('Success!', 'Data user succesfully deleted!', 'success')
                })
                .catch(err => {
                    swal_response('Error!', 'Oopss.. Something Happened!', 'error')
                })
        }
    })
}

delete_user = (id) => {
    swal_confirm(
        id, 'Are you sure?', 'You wont be able to revert this!', 'Yes, Delete It!'
    )
}

form_add.addEventListener('submit', swal_response(
    'Success!',
    'Data user sucessfully saved!',
    'success'
))

form_update.addEventListener('submit', swal_response(
    'Success!',
    'Data user sucessfully updated!',
    'success'
))

