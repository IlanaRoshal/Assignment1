const updateMyDetailsForm = document.getElementById('updateMyDetails_form');
if (updateMyDetailsForm) {
    document.querySelector('#updateMyDetails_form #User_Email').value = sessionStorage.getItem('connectedUserEmail');
    
    updateMyDetailsForm.addEventListener("submit", (e) =>{
        e.preventDefault();
        const email = document.querySelector('#updateMyDetails_form #User_Email').value;
        const phone = document.querySelector('#updateMyDetails_form #User_Phone').value;

        if (phone) {
            $.post("http://localhost:3030/customers/update", {
                phone, email
            })
            .done(function(msg){  
                window.location = '/MyAcount';
            })
            .fail(function(xhr, status, error) {
                alert('error updating user');
            });
        }
    });
}

function validateUpdate(oldEmail,newEmail){
    let errorMessage = '';
    if (!oldEmail) {
        errorMessage = "Old Email is required!";
    }
    else if (!newEmail) {
        errorMessage = "New Email is required!";
    }
    if (!errorMessage) {Category
            // Validation completed successfully!
            return true;   
    }
    alert(errorMessage);
    return false;
}

const uploadForm=document.getElementById('UploadForm');
if(uploadForm) {
    uploadForm.addEventListener("submit", (e) =>{
        e.preventDefault();
        const category = document.querySelector('#UploadForm #Category').value;
        const gender = document.querySelector('#UploadForm #Gender').value;
        const size = document.querySelector('#UploadForm #size').value;
        const price = document.querySelector('#UploadForm #price').value;
        const customer_email = sessionStorage.getItem('connectedUserEmail');

        if(validateUpload(Category,Gender,size,price)){
            var fd = new FormData();
            fd.append('customer_email', customer_email);
            fd.append('category', category);
            fd.append('gender', gender);
            fd.append('size', size);
            fd.append('price', price);

            var files = $('#UploadForm #image')[0].files;

            // Check file selected or not
            if(files.length > 0 ){
            fd.append('file',files[0]);
 
            $.ajax({
               url: 'http://localhost:3030/cloths/upload',
               type: 'post',
               data: fd,
               contentType: false,
               processData: false,
               success: function(response){
                    window.location = '/MyAcount';
               },
            });
         }else{
            alert("Please select a file.");
         }
        }
    });
}

function validateUpload(Category,Gender,size,price){
    let errorMessage = '';
    if (!Category) {
        errorMessage = "Category is required!";
    }
    else if (!Gender) {
        errorMessage = "Gender is required!";
    }
    else if (!size) {
        errorMessage = "sizeis required!";
    }
    else if (!price) {
        errorMessage = "price is required!";
    }

    if (!errorMessage) {
         // Validation completed successfully!
            return true;
        
    }
    alert(errorMessage);
    return false;
}

const signInForm=document.getElementById('signIn_form');
if(signInForm) {
    signInForm.addEventListener("submit", (e) =>{
        e.preventDefault();
        const email = document.querySelector('#signIn_form #User_Email').value;
        const password = document.querySelector('#signIn_form #User_Password').value;
        if(validateSignin(email,password)){
            $.post("http://localhost:3030/customers/login", {
                email, password
            }).done(function(msg){
                sessionStorage.setItem('connectedUserEmail', email);
                window.location = '/MyAcount';
            })
            .fail(function(xhr, status, error) {
                alert('error login user');
            });
        }
    });
}

function validateSignin(email ,password){
    let errorMessage = '';
    if (!email) {
        errorMessage = "Email is required!";
    }
    else if (!password) {
        errorMessage = "First name is required!";
    }

    if (!errorMessage) {
      
            // Validation completed successfully!
            return true;
        
    }

    alert(errorMessage);
    return false;

}

const signupForm = document.getElementById('signup_form');
if (signupForm) {
    signupForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const email = document.querySelector('#signup_form #User_Email').value;
        const firstname = document.querySelector('#signup_form #User_First_Name').value;
        const lastname = document.querySelector('#signup_form #User_last_Name').value;
        const phone = document.querySelector('#signup_form #User_Phone').value;
        const password = document.querySelector('#signup_form #User_Password').value;
        const repassword = document.querySelector('#signup_form #User_Repeat_Password').value;

        if (validateSignup(email, firstname, lastname, phone, password, repassword)) {
            $.post("http://localhost:3030/customers/signup", {
                email, firstname, lastname, phone, password, latitude, longitude
            })
            .done(function(msg){  
                window.location = '/login';
            })
            .fail(function(xhr, status, error) {
                alert('error creating user');
            });
        }
    });
}

// validate signup inputs are filled correctly by the user
function validateSignup(email, firstname, lastname, phone, password, repassword) {    
    let errorMessage = '';

    if (!email) {
        errorMessage = "Email is required!";
    }
    else if (!firstname) {
        errorMessage = "First name is required!";
    }
    else if (!lastname) {
        errorMessage = "Last name is required!";
    }
    else if (!phone) {
        errorMessage = "Phone is required!";
    }
    else if (!password) {
        errorMessage = "Password is required!";
    }
    else if (!repassword) {
        errorMessage = "Password confirmation is required!";
    }

    if (!errorMessage) {
        // all fields are filled, check password confirmation
        if (password !== repassword) {
            errorMessage = "Password do not match!";
        }
        else {
            // Validation completed successfully!
            return true;
        }
    }

    alert(errorMessage);
    return false;
}

// Load user cloths on load
function loadUserCloths() {
    const email = sessionStorage.getItem('connectedUserEmail');
    if (!email) {
       // alert('User is not logged in');
      //window.location = '/home';
    }
    else {
        const table = $('#my-cloths-table');
        $.get("http://localhost:3030/cloths?email=" + email).done(function(res){
            const cloths = res.rows;
            cloths.forEach(cloth => {
                table.append(`
                <tr>
                    <td>${cloth.id}</td>
                    <td>${cloth.category}</td>
                    <td>${cloth.gender}</td>
                    <td>${cloth.size}</td>
                    <td>${cloth.price}$</td>
                    <td>
                        <img class="cloth-image" src="images/${cloth.image}">
                    </td>
                    <td>
                        <button onclick="deleteItem('${cloth.id}')">Delete</button>
                    </td>
                </tr>
                `);
            });
        })
        .fail(function(xhr, status, error) {
            alert('error getting user cloths');
        });
    }
}

let latitude, longitude;

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(getCoordinates);
}

function getCoordinates(location) {
    latitude = location.coords.latitude;
    longitude = location.coords.longitude;
    searchItemsByLocation();
}

function searchItemsByLocation() {
    const search = $('#search');
    const email = sessionStorage.getItem('connectedUserEmail');
    if (!email) {
       // alert('User is not logged in');
      //  window.location = '/home';
    }
    else if (search) {
        const table = $('#my-search-table');
        $.get("http://localhost:3030/cloths/search?email="+ email +"&latitude=" + latitude + "&longitude=" + longitude).done(function(res){
            const cloths = res.rows;
            cloths.forEach(cloth => {
                table.append(`
                <tr>
                    <td>${cloth.id}</td>
                    <td>${cloth.category}</td>
                    <td>${cloth.gender}</td>
                    <td>${cloth.size}</td>
                    <td>${cloth.price}$</td>
                    <td>
                        <img class="cloth-image" src="images/${cloth.image}">
                    </td>
                    <td>
                        <div class="contact">
                            <p class="name">
                                Name: ${cloth.firstname} ${cloth.lastname}
                            </p>
                            <p class="number">
                                ${cloth.phone}
                            </p>
                            <a class="whatsapp" href="https://wa.me/${cloth.phone}?text=I'm%20interested%20in%20your%20item%20for%20sale">
                                <img src="images/Whatsapp.png" width="50" height="50" >
                            </a>
                        </div>
                    </td>
                </tr>
                `);
            });
        })
        .fail(function(xhr, status, error) {
            alert('error getting user cloths');
        });
    }
}

function deleteItem(id) {
    // send post request to server to delete item with id
     const idToDelete = id;
      $.post("http://localhost:3030/clothes/delete", {
                id
            })
            .done(function(msg){  
                window.location = '/MyAcount';
            })
            .fail(function(xhr, status, error) {
                alert('error deleting clohtes ');
            });
        
    };
