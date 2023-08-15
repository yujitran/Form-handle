<?php

    // $data[] = ["fullname" => "", "phone" => "", "email" => "", "country" => "", "dictrict" => "", "street" => ""];
    // setcookie("listUSer", json_encode($data));
    // if(!isset($_COOKIE["listUser"])) {
    //   // var_dump($_COOKIE);
    // }
?>

<?php include("validateFormPhp.php"); ?>
<?php include("updateUsers.php"); ?>


<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      .active {
        display: block;
      }
      .hide {
        display: none;
      }
      .form {
        width: 780px;
        border: 2px solid black;
        border-radius: 5px;
        padding: 15px 15px;
        margin: 0 auto;
      }
      .form td {
        width: 250px;
        height: 40px;
      }
      .submit-form {
        background: rgb(34, 145, 182);
        color: black;
      }

      #country {
        width: 150px;
        text-align: center;
      }
      #district {
        width: 150px;
        text-align: center;
      }
      #street {
        width: 150px;
        text-align: center;
      }

      #editor {
        border: 1px solid #333;
        width: 100%;
        height: auto;
        margin-top: 100px;
      }

      #editor td {
        height: 100px;
        text-align: center;
      }

      #editor tr td {
        border: 2px solid #333;
      }

      .btn-edit {
        width: 100px;
        height: 50px;
        background: lightblue;
        color: #333;
        cursor: pointer;
      }

      .btn-del {
        width: 100px;
        height: 50px;
        background: rgb(235, 82, 82);
        color: white;
        margin-left: 50px;
        cursor: pointer;
      }

      .error {
        color: red;
      }
    </style>
  </head>
  <body>
    <form method="post" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>">
      <table class="form">
        <input class = "idHidden" type="hidden" id="idRow" />
        <tr>
          <td>Fullname</td>  
          <td>
            <input
              type="text"
              name="fullname"
              id="fullname"
              placeholder="name (8-30 characters)"
              onkeyup="validateInputFname()"; 
            /><br />
          </td>
          <td>
            <p id="alert-fullname">
              <span class="error">
                <?php 
                if(!empty($error["fullname"]["require"])){echo $error["fullname"]["require"];}
                elseif(!empty($error["fullname"]["min"])){echo $error["fullname"]["min"];}
                elseif(!empty($error["fullname"]["max"])){echo $error["fullname"]["max"];}
                elseif(!empty($error["fullname"]["invalid"])){echo $error["fullname"]["invalid"];}
                ?>
                </span>
            </p>
            
          </td>
        </tr>
        <tr>
          <td>Phone</td>
          <td>
            <input
              type="text"
              name="phone-number"
              id="phone-number"
              placeholder="name (9-12 characters)"
              onkeyup="validateInputPhone()"
            />
          </td>
          <td>
            <p id="alert-phone">
              <span class="error">
                    <?php 
                    if(!empty($error["phonenum"]["require"])){echo $error["phonenum"]["require"];}
                    elseif(!empty($error["phonenum"]["invalid"])){echo $error["phonenum"]["invalid"];}
                    elseif(!empty($error["phonenum"]["min"])){echo $error["phonenum"]["min"];}
                    elseif(!empty($error["phonenum"]["max"])){echo $error["phonenum"]["max"];}
                    elseif(!empty($error["phonenum"]["containText"])){echo $error["phonenum"]["containText"];}
                    ?>
              </span>
            </p>
          </td>
        </tr>
        <tr>
          <td>Email</td>
          <td>
            <input
              type="text"
              name="email"
              id="email"
              placeholder="bribri@gmail.com"
              onkeyup="validateInputEmail()"
            /><br />
          </td>
          <td>
            <p id="alert-email">
              <span class="error">
                  <?php 
                  if(!empty($error["email"]["require"])){echo $error["email"]["require"];}
                  elseif(!empty($error["email"]["invalid"])){echo $error["email"]["invalid"];}
                  elseif(!empty($error["email"]["circleA"])){echo $error["email"]["circleA"];}
                  elseif(!empty($error["email"]["continuousDot"])){echo $error["email"]["continuousDot"];}
                  elseif(!empty($error["email"]["chairsfail"])){echo $error["email"]["chairsfail"];}
                  elseif(!empty($error["email"]["emptyDot"])){echo $error["email"]["emptyDot"];}
                  elseif(!empty($error["email"]["endDot"])){echo $error["email"]["endDot"];}
                  ?>
                </span> 
            </p>
          </td>
        </tr>
        <tr>
            <td>Country</td>
            <td>
              <select name="country" id="country">
                <option value="">choose a country</option>
              </select>
            </td>
            <td>
              <p id="alert-country">
                <span class="error">
                    <?php 
                    if(!empty($error["country"]["require"])){echo $error["country"]["require"];}
                    ?>
                  </span>
              </p>
            </td>
        </tr>
        <tr>
            <td>District</td>
            <td>
              <select name="district" id="district"></select>
            </td>
            <td>
              <p id="alert-district">
                <span class="error">
                    <?php 
                    if(!empty($error["district"]["require"])){echo $error["district"]["require"];}
                    ?>
                </span>
              </p>
            </td>
          </tr>
          <tr>
            <td>Street</td>
            <td>
              <select name="street" id="street"></select>
            </td>
            <td>
              <p id="alert-street">
                <span class="error">
                      <?php 
                      if(!empty($error["street"]["require"])){echo $error["street"]["require"];}
                      ?>
                </span>
              </p>
          </td>
        </tr>
        <tr>
            <td>Gender</td>
            <td>
              <input type="radio" name="gender" class="gender" value="male" />
              Male
              <input type="radio" name="gender" class="gender" value="female" />
              Female
            </td>
            <td><p id="alert-fullname"></p></td>
        </tr>
        <tr>
            <td><p id="outputGender"></p></td>
        </tr>
        <tr>
          <td>
            <input
              type="button"
              class="submit-form"
              name=""
              id="addTable"
              value="Add to table edit"
            />
          </td>
          <td>
            <input
              type="submit"
              class="submit-form"
              name="submit"
              id="submit"
              value="Submit"
            />
          </td>
        </tr>
      </table>
    </form>

    <table id="editor" >
      <tr>
        <th>ID</th>
        <th>Fullname</th>
        <th>Phone</th>
        <th>Email</th>
        <th>Country</th>
        <th>District</th>
        <th>Street</th>
        <th>Gender</th>
        <th>Action</th>
      </tr>
      <?php

      $ote = [];
        // $data[] = json_decode($_COOKIE['listUser']);
        
  
          $ote = json_decode($_COOKIE['listUser']);
          // print_r($ote);
         
          foreach($ote as $user) {
            echo "<tr>";
            $i = 0;
            foreach($user as $val) {
              $i++;
                echo "<td col-name='B$i'>".$val."</td>";
            }
            echo "<td>"
            ."<button class='btn-edit' onclick='createEventClickEdit(this)'>Edit"."</button>".
            "<button class='btn-del' onclick='createEventClickDel(this)'>Delete"."</button>".
            "</td>";
            echo "</tr>";
          }
        
      
      ?>
    </table>
  </body>
  <script src="js/validateFormJs.js"></script>
  <script src="js/addTableEdit.js"></script>
</html>
