   function validateInputFname() {
        document.getElementById("alert-fullname").innerHTML = "";
        let fullname = document.getElementById("fullname").value;
  
        let checkValidateFnameInput = validateFullname(fullname);
        if (checkValidateFnameInput.status === false) {
          document.getElementById("alert-fullname").innerHTML =
            checkValidateFnameInput.message;
          document.getElementById("alert-fullname").style.color = "red";
        }
      }
  
      //validate follow input phone
      function validateInputPhone() {
        document.getElementById("alert-phone").innerHTML = "";
        let phone = document.getElementById("phone-number").value;
  
        let checkValidatePhoneInput = validatePhone(phone);
        if (checkValidatePhoneInput.status === false) {
          document.getElementById("alert-phone").innerHTML =
            checkValidatePhoneInput.message;
          document.getElementById("alert-phone").style.color = "red";
        }
      }
  
      //validate follow input email
      function validateInputEmail() {
        document.getElementById("alert-email").innerHTML = "";
        let email = document.getElementById("email").value;
  
        let checkValidateEmailInput = validateEmail(email);
        if (checkValidateEmailInput.status === false) {
          document.getElementById("alert-email").innerHTML =
            checkValidateEmailInput.message;
          document.getElementById("alert-email").style.color = "red";
        }
      }
  
      // Validate Form
      function validateForm() {
        let fullname = document.getElementById("fullname").value;
        let phone = document.getElementById("phone-number").value;
        let email = document.getElementById("email").value;
        let countrySelect = document.getElementById("country").value;
        let districtSelect = document.getElementById("district").value;
        // let e = document.getElementById("street");
        // let streetSelect = e.options[e.selectedIndex].text;
  
        let streetSelect = document.getElementById("street").value;
        //check rỗng
        let array = [
          fullname,
          phone,
          email,
          countrySelect,
          districtSelect,
          streetSelect,
        ];
        for (let i = 0; i < array.length; i++) {
          if (array[i] == "") {
            alert("Bạn không được để trống");
            return;
          }
        }
  
        //validate fullname
        let checkValidateFname = validateFullname(fullname);
        if (checkValidateFname.status === false) {
          alert(checkValidateFname.message);
          return;
        }
  
        //validate phone
        let checkValidatePhone = validatePhone(phone);
  
        if (checkValidatePhone.status === false) {
          alert(checkValidatePhone.message);
          return;
        }
  
        //validate Email
        let checkValidateEmail = validateEmail(email);
        if (checkValidateEmail.status === false) {
          alert(checkValidateEmail.message);
          return;
        }
  
        //validate gender
        outputGender = document.getElementById("outputGender");
        var selected = document.querySelector("input[name='gender']:checked");
        if (selected) {
          outputGender.innerHTML = "";
        } else {
          outputGender.innerHTML = "";
          outputGender.innerHTML += "Bạn chưa chọn gender!";
          outputGender.style.color = "red";
          return;
        }
      }
  
      // Validat Fullname
      function validateFullname(value) {
        let response = {
          status: false,
          message: "",
        };
  
        //check limit length
        if (value.length < 8) {
          response.status = false;
          response.message = "Bạn phải nhập đủ 8 ký tự";
          return response;
        }
  
        if (value.length > 30) {
          response.status = false;
          response.message = "Bạn đã nhập quá 30 ký tự";
          return response;
        }
  
        //check not text
        let checkText = document.getElementById("fullname").value;
        let arrayNumber = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
  
        for (let textt = 0; textt <= checkText.length; textt++) {
          for (let indexText = 0; indexText < arrayNumber.length; indexText++) {
            if (checkText[textt] == arrayNumber[indexText]) {
              response.status = false;
              response.message = "Họ và tên không được có chữ số";
              return response;
            }
          }
        }
        return true;
      }
  
      // Validate Phone-number
      function validatePhone(nump = "") {
        let response = {
          status: false,
          message: "",
        };
  
        //số đầu mào quốc gia (0, +84)
        numberPhone = nump.split("");
        if (
          numberPhone[0] !== "0" &&
          numberPhone[1] !== "+" &&
          numberPhone[2] !== "8" &&
          numberPhone[3] !== "4"
        ) {
          response.status = false;
          response.message = "Số điện thoại không hợp lệ";
          return response;
        }
  
        //số điện thoại phải có độ dài tối đa là 12 chữ số và tối thiểu là 9
        if (nump.length < 9) {
          response.status = false;
          response.message = "Số điện thoại tối thiểu là 9";
          return response;
        }
  
        if (nump.length > 12) {
          response.status = false;
          response.message = "Số điện thoại tối đa là 12";
          return response;
        }
  
        // Số điện thoại phải là chữ số
        for (let num = 1; num < nump.length; num++) {
          if (isNaN(nump[num])) {
            response.status = false;
            response.message = "Số điện thoại không hợp lệ vì chứa chữ";
            return response;
          }
        }
        return true;
      }
  
      // Validate Email
      function validateEmail(email = "") {
        const specialChar = [
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
  
        let response = {
          status: false,
          message: "",
        };
        //validate Email
        let length = 0;
        //check @ xuat hien 1 lan
        for (let j = 0; j < email.length; j++) {
          if (email[j] == "@") {
            length++;
          }
          if (length > 1) {
            response.status = false;
            response.message = "Chỉ được chứa 1 ký tự @";
            return response; //dung thuc thi
          }
        }
  
        textBeforeEmailArr = email.split("@");
        if (
          typeof textBeforeEmailArr[0] === "string" &&
          textBeforeEmailArr[0] == ""
        ) {
          response.status = false;
          response.message = "Email không hợp lệ";
          return response; //dung thuc thi
        }
  
        let arrayEmailAfter = textBeforeEmailArr[1];
        let lengthCham = 0;
        for (let i = 0; i < arrayEmailAfter.length; i++) {
          if (arrayEmailAfter[i] == ".") {
            lengthCham++;
          }
  
          if (arrayEmailAfter[i] == "." && arrayEmailAfter[i + 1] == ".") {
            response.status = false;
            response.message = "Không được chứa dấu '.' liên tiếp!";
            return response; //dung thuc thi
          }
  
          for (let j = 0; j < specialChar.length; j++) {
            if (arrayEmailAfter[i] == specialChar[j]) {
              response.status = false;
              response.message = "Email không hợp lệ (lỗi ký tự đặc biệt)";
              return response; //dung thuc thi
            }
          }
        }
  
        if (lengthCham == 0) {
          response.status = false;
          response.message = "Ít nhất phải có 1 dấu '.'";
          return response; //dung thuc thi
        }
  
        if (arrayEmailAfter[arrayEmailAfter.length - 1] == ".") {
          response.status = false;
          response.message = "Email không hợp lệ!";
          return response; //dung thuc thi
        }
  
        return true;
      }


