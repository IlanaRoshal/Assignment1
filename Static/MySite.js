



function CheckForBlank()
{
    var ErrorMessage ="";
    if(document.getElementById('User_Name').value==""){
        ErrorMessage +="Please Enter User Name\n"
    }

    if(document.getElementById('User Password').value==""){
        ErrorMessage +="Please EnterUser Password\n"       
    }

    if(ErrorMessage !=""){
        alert(ErrorMessage)
        return false;
    }
}





