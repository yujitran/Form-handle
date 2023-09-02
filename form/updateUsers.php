<?php
//update table db => save cookies and add to table edit

//set array of cookie
$data = [];

if ($_SERVER["REQUEST_METHOD"] == "POST") {


    $fullname = $_POST['fullname'];
    $phone = $_POST['phone-number'];
    $email = $_POST['email'];
    $country = $_POST['country'];
    $district = $_POST['district'];
    $street = $_POST['street'];
    $gender = $_POST['gender'];
    $containerFileName = [];
   
    function reArrayFiless($file){
        $file_ary = array();
        $file_count = count($file['name']);
        $file_key = array_keys($file);
        
        for($i=0;$i<$file_count;$i++)
        {
            foreach($file_key as $val)
            {
                $file_ary[$i][$val] = $file[$val][$i];
            }
        }
        return $file_ary;
    }
    $imgs = reArrayFiless($_FILES['images']) ;
    foreach($imgs as $key) {
        $containerFileName[] = $key['name'];
    }


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

    //pull email and phone from db 
    $queryEmail = "SELECT * FROM `users` WHERE email='$email'";
    $resultEmail = mysqli_query($conn, $queryEmail);
    $queryPhone = "SELECT * FROM `users` WHERE phone='$phone'";
    $resultPhone = mysqli_query($conn, $queryPhone);

    //check email and phone exists?
    if (mysqli_num_rows($resultPhone) > 0) {
        echo "<br/>" . "Phone is already used";
    } elseif (mysqli_num_rows($resultEmail) > 0) {
        echo "<br/>" . "Email is already used";
    } else {
        //insert form values to db
        $sql = "INSERT INTO users (fullname, email, country, district, street, phone, gender) 
                VALUES ('$fullname', '$email', '$country', '$district', '$street', '$phone', '$gender')";

        //add cookie from form
        $randLetter = uniqid();

        if (!empty($_POST['idHidden'])) {
            $data = json_decode($_COOKIE["listUser"]);
            foreach ($data as $user => $key) {
                // var_dump($user);
                foreach ($key as $val => $item) {
                    if ($item == $_POST['idHidden']) {
                        $key = ["id" => "", "images" => "", "fullname" => "", "phone" => "", "email" => "", "country" => "", "district" => "", "street" => "", "gender" => ""];
                        $key = ["id" => $_POST['idHidden'], "images" => $containerFileName, "fullname" => $fullname, "phone" => $phone, "email" => $email, "country" => $country, "district" => $district, "street" => $street, "gender" => $gender];
                        $data[(int)$user] = $key;
                    };
                }
            }
            setcookie('listUser', json_encode($data), time() + (86400 * 30), "/");

        } else {
            $data = json_decode($_COOKIE["listUser"]);
            $data[] =  ["id" => $randLetter, "images" => $containerFileName, "fullname" => $fullname, "phone" => $phone, "email" => $email, "country" => $country, "district" => $district, "street" => $street, "gender" => $gender];
            setcookie('listUser', json_encode($data), time() + (86400 * 30), "/");
            mysqli_query($conn, $sql);
        }
    }
}
