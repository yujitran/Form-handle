<?php
if($_SERVER["REQUEST_METHOD"]=="POST") {

    $fullname = $_POST['fullname'];
    $phone = $_POST['phone-number'];
    $email = $_POST['email'];
    $country = $_POST['country'];
    $district = $_POST['district'];
    $street = $_POST['street'];

    $servername = "localhost";
    $username = "root";
    $password = "p";
    $dbname = "web_mysqli";
 
    // Create connection
    $conn = new mysqli($servername, $username, $password, $dbname);
    
    // Check connection
    if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
    }
    echo "Connected successfully";

    // $queryEmailPhone = `SELECT 'email', 'phone' FROM 'users' WHERE 'email'='$email' AND 'phone'='$phone'`;
    // $result = mysqli_query($conn, $queryEmailPhone);
    $queryEmail = "SELECT * FROM `users` WHERE email='$email'";
    $resultEmail = mysqli_query($conn,$queryEmail);
    $queryPhone = "SELECT * FROM `users` WHERE phone='$phone'";
    $resultPhone = mysqli_query($conn,$queryPhone);

    if(mysqli_num_rows($resultPhone)>0) {
        echo "<br/>"."Phone is already used";
    }elseif(mysqli_num_rows($resultEmail)>0){
        echo "<br/>"."Email is already used";
    } else {
         $sql = "INSERT INTO users (fullname, email, country, district, street, phone) 
            VALUES ('$fullname', '$email', '$country', '$district', '$street', '$phone')
            ";
        mysqli_query($conn, $sql);     

        if(mysqli_query($conn, $sql)) {
            echo "Data Inserted";
        } else {
            echo "Data not Inserted";
        }
    }      
}


?>