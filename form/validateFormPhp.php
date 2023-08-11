<?php
$error = [];

if($_SERVER["REQUEST_METHOD"]=="POST") {
  $fullname = $_POST['fullname'];
  $phonenum = $_POST['phone-number'];
  $email = $_POST['email'];
  $country = $_POST['country'];
  $district = $_POST['district'];
  $street = $_POST['street'];

  //validate fullname
  if(empty(($fullname))) {
    $error["fullname"]["require"] = "Bạn không được để trống!";
    
  }
  else {
    if(strlen($fullname) < 8) {
      $error["fullname"]["min"] = "Bạn phải nhập đủ 8 ký tự";
    }    
    if(strlen($fullname) > 30) {
      $error["fullname"]["max"] = "Bạn đã nhập quá 30 ký tự";
    }

    $arrayNumber = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];

    for($i = 0; $i < strlen($fullname); $i++) {
      for($j = 0; $j < count($arrayNumber); $j++) {
          if($fullname[$i] == $arrayNumber[$j]) {
            $error["fullname"]["invalid"] = "Họ và tên không được có chữ số";
          }
      }
    }
  }    

  //validate phone number
  if(empty(($phonenum))) {
    $error["phonenum"]["require"] = "Bạn không được để trống!";
  } else {
      // $numberPhone = $phonenum.str_split("");
      if(
        $phonenum[0] !== "0" &&
        $phonenum[1] !== "+" &&
        $phonenum[2] !== "8" &&
        $phonenum[3] !== "4"
      ) {
        $error["phonenum"]["invalid"] = "Số điện thoại không hợp lệ";
      }

      if(strlen($phonenum) < 9) {
        $error["phonenum"]["min"] = "Số điện thoại tối thiểu là 9";
      }

      if(strlen($phonenum) > 12) {
        $error["phonenum"]["max"] = "Số điện thoại tối đa là 12";
      }

      for($i = 0; $i < strlen($phonenum); $i++) {
        if(is_nan($phonenum[$i])) {
          $error["phonenum"]["containText"] = "Số điện thoại không hợp lệ vì chứa chữ";
        }
      }
  }

   //validate email
  if(empty(($email))) {
    $email["email"]["require"] = "Bạn không được để trống!";
  } else {
    $specialChars = [
      "/",
      "[",
      "`",
      "!",
      "#",
      "$",
      "%",
      "^",
      "&",
      "*",
      "(",
      ")",
      "_",
      "+",
      "-",
      "=",
      "[",
      "]",
      "{",
      "}",
      ";",
      '"',
      '"',
      "|",
      "<",
      ">",
      "?",
      "~",
      "]",
      "@",
      ];

    $lengthCircleA = 0;
    for($i = 0; $i < strlen($email); $i++) {
      if($email[$i] == "@") {
        $lengthCircleA++;
      }
      if($lengthCircleA > 1) {
        $error["email"]["circleA"] = "Chỉ được chứa 1 ký tự @";
      }
    }

    $textBothSideCircleA = explode("@", $email);
    if(gettype($textBothSideCircleA[0]) === "string" && empty($textBothSideCircleA[0])) {
      $error["email"]["invalid"] = "Email không hợp lệ";
    }
    // $lengthBothSideCircleA = strlen()

    $lengthDots = 0;
    $textAfterCircleA = $textBothSideCircleA[1];

    for($i = 0; $i < strlen($textAfterCircleA); $i++) {
      if($textAfterCircleA[$i] == ".") {
        $lengthDots++;
      }

      if($textAfterCircleA[$i] == "." && $textAfterCircleA[$i+1] == ".") {
        $error["email"]["continuousDot"] = "Không được chứa dấu '.' liên tiếp!";
      }

      for($j = 0; $j < count($specialChars); $j++) {
        if($textAfterCircleA[$i] == $specialChars[$j]) {
          $error["email"]["chairsfail"] = "Email không hợp lệ (lỗi ký tự đặc biệt)";
        }
      }
    }

    if ($lengthDots == 0) {
      $error["email"]["emptyDot"] = "Ít nhất phải có 1 dấu '.'";
    }

    if($textBothSideCircleA[1][strlen($textBothSideCircleA[1]) - 1] == ".") {
      $error["email"]["endDot"] = "Email không hợp lệ!";
    }
}

  if(empty(($country))) {
    $error["country"]["require"] = "Bạn không được để trống!";
  }    
  if(empty(($district))) {
    $error["district"]["require"] = "Bạn không được để trống!";
  }    
  if(empty(($street))) {
    $error["street"]["require"] = "Bạn không được để trống!";
  }    
  

}


?>