 //Set up Selection Location

 //Declare variable selection
 
 const arrayLocation = [
    {
      country: "Hà Nội",
      district: [
        { "Long Biên": [{ street: ["Bồ Đề", "Amazon"] }] },
        { "Hoàn Kiếm": [{ street: ["Kiếm Hoàn", "Amazon"] }] },
        { "Hai Bà Trưng": [{ street: ["Việt Hưng", "Việt Bắc"] }] },
      ],
    },

    {
      country: "Hồ Chí Minh",
      district: [
        { "Quận 1": [{ street: ["Cự giải", "Bạch Dương"] }] },
        { "Quận 2": [{ street: ["Shiza", "Amazon"] }] },
        { "Quận 3": [{ street: ["Muda", "Pipi"] }] },
      ],
    },
  ];

  var countrySlect = document.getElementById("country");
  var districtSlect = document.getElementById("district");
  var streetSlect = document.getElementById("street");

  // set up selection country
  arrayLocation.forEach(function addCity(item) {
    let option = document.createElement("option");
    option.text = item.country;
    option.value = item.country;
    countrySlect.appendChild(option);
  });

  //event change country
  countrySlect.onchange = function () {
    //set district = empty option every onchange
    districtSlect.innerHTML = "<option></option>";
    streetSlect.innerHTML = "<option></option>";

    arrayLocation.forEach(function addCity(item) {
      if (countrySlect.value == item.country) {
        addToDistrict(item.district);
      }
    });
  };

  //function add selection district
  function addToDistrict(arr) {
    for (let i = 0; i < arr.length; i++) {
      let keys = Object.keys(arr[i]);
      keys.forEach((item) => {
        let option = document.createElement("option");
        option.text = item;
        option.value = item;
        districtSlect.appendChild(option);
      });
    }
  }

  //even change selection district
  districtSlect.onchange = function () {
    streetSlect.innerHTML = "<option></option>";

    arrayLocation.forEach((element) => {
      for (let i = 0; i < element.district.length; i++) {
        // Lấy all name obj of district
        let keys = Object.keys(element.district[i]);
        keys.forEach((item) => {
          //Nếu như selected hiện tại = name obj đang lặp
          if (districtSlect.value == item) {
            // lặp district và lấy các obj của nó
            element.district.forEach((value) => {
              //Nếu có obj tại item tồn tại => add street
              if (value[item]) {
                addToStreet(value[item]);
              }
            });
          }
        });
      }
    });
  };

  //function add selection Street
  function addToStreet(arr) {
    arr.forEach((element) => {
      element.street.forEach((e) => {
        let option = document.createElement("option");
        option.text = e;
        option.value = e;
        streetSlect.appendChild(option);
      });
    });
  }

  // Submit
  var tableEdit = document.getElementById("editor");

  //validate form to table
  document.getElementById("addTable").setAttribute("onclick", "validateForm()");

  //click submit add info
  // document.getElementById("addTable").addEventListener("click", () => {
  //   //Nếu id đó không tồn tịa => add row mới
  //   if (document.getElementById("idRow").value == "") {
  //     let fullname = document.getElementById("fullname").value;
  //     let phone = document.getElementById("phone-number").value;
  //     let email = document.getElementById("email").value;
  //     let country = document.getElementById("country").value;
  //     let district = document.getElementById("district").value;
  //     let street = document.getElementById("street").value;
  //     let gender = document.querySelector(
  //       'input[name="gender"]:checked').value;

  //     //get table edit
  //     let arrayInfo = [
  //       fullname,
  //       phone,
  //       email,
  //       country,
  //       district,
  //       street,
  //       gender,
  //     ];

  //     for (let s = 0; s < arrayInfo.length; s++) {
  //       if (arrayInfo[s] == "") {
  //         return;
  //       }
  //     }

  //     validateInputFname(fullname);

  //     //validate fullname to add table
  //     let checkValidateFname = validateFullname(fullname);
  //     if (checkValidateFname.status === false) {
  //       // return;
  //     }

  //     //validate phone to add table
  //     let checkValidatePhone = validatePhone(phone);

  //     if (checkValidatePhone.status === false) {
  //       return;
  //     }

  //     //validate Email to add table
  //     let checkValidateEmail = validateEmail(email);
  //     if (checkValidateEmail.status === false) {
  //       return;
  //     }

  //     //add info
  //     let randLetter = String.fromCharCode(
  //       65 + Math.floor(Math.random() * 26)
  //     );
  //     let uniqid = randLetter + Date.now();

  //     //set id for row
  //     let row = tableEdit.insertRow(-1);
  //     row.setAttribute("id", uniqid);
  //     //create column
  //     for (let i = 0; i < arrayInfo.length; i++) {
  //       row.insertCell(-1).innerHTML = arrayInfo[i];
  //     }

  //     // create Edit and Delete button
  //     let edit = document.createElement("button");
  //     let textButtonEdit = document.createTextNode("Edit");
  //     edit.className = "btn-edit";
  //     edit.setAttribute("onclick", "createEventClickEdit(this)");
  //     edit.appendChild(textButtonEdit);

  //     let del = document.createElement("button");
  //     let textButtonDelete = document.createTextNode("Delete");
  //     del.className = "btn-del";
  //     del.setAttribute("onclick", "createEventClickDel(this)");
  //     del.appendChild(textButtonDelete);

  //     // add Edit and Delete button to column
  //     row.insertCell(-1).append(edit, del);

  //     //set class-name for column
  //     lengthRow = row.querySelectorAll("td").length;
  //     for (let j = 0; j < lengthRow; j++) {
  //       //Nếu column chứa nút edit thì không cần thêm class
  //       if (
  //         row.querySelectorAll("td")[j] !==
  //         row.querySelector(".btn-edit").parentElement
  //       ) {
  //         row
  //           .querySelectorAll("td")
  //           [j].setAttribute("col-name", "B" + 1 + parseInt(j));
  //       } else {
  //         row
  //           .querySelectorAll("td")
  //           [j].setAttribute("col-button", "C" + 2 + parseInt(j));
  //       }
  //     }

  //     // Khi add vào table edit xong sẽ reset lại form
  //     document.getElementById("fullname").value = "";
  //     document.getElementById("phone-number").value = "";
  //     document.getElementById("email").value = "";
  //     let countryOp = document.getElementById("country");
  //     countryOp.value = "";
  //     countryOp.selected = "false";
  //     countrySlect.innerHTML = "<option></option>";

  //     let districtOp = document.getElementById("district");
  //     districtOp.value = "";
  //     districtOp.selected = "false";
  //     districtSlect.innerHTML = "<option></option>";

  //     let streetOp = document.getElementById("street");
  //     streetOp.value = "";
  //     streetOp.selected = "false";
  //     streetSlect.innerHTML = "<option></option>";
  //     document.querySelector('input[name="gender"]:checked').checked = false;

  //     // set up lại selection country
  //     arrayLocation.forEach(function addCity(item) {
  //       let option = document.createElement("option");
  //       option.text = item.country;
  //       option.value = item.country;
  //       countrySlect.appendChild(option);
  //     });
  //   }
  //   // Trùng id => edit row có id đó
  //   else {
  //     let fullname = document.getElementById("fullname").value;
  //     let phone = document.getElementById("phone-number").value;
  //     let email = document.getElementById("email").value;
  //     let country = document.getElementById("country").value;
  //     let district = document.getElementById("district").value;
  //     let street = document.getElementById("street").value;
  //     let gender = document.querySelector(
  //       'input[name="gender"]:checked'
  //     ).value;

  //     //get table edit
  //     let arrayInfos = [
  //       fullname,
  //       phone,
  //       email,
  //       country,
  //       district,
  //       street,
  //       gender,
  //     ];

  //     //value trống => không cho submit
  //     for (let s = 0; s < arrayInfos.length; s++) {
  //       if (arrayInfos[s] == "") {
  //         // return;
  //       }
  //     }

  //     //validate fullname to add table
  //     let checkValidateFname = validateFullname(fullname);
  //     if (checkValidateFname.status === false) {
  //       // return;
  //     }

  //     //validate phone to add table
  //     let checkValidatePhone = validatePhone(phone);

  //     if (checkValidatePhone.status === false) {
  //       return;
  //     }

  //     //validate Email to add table
  //     let checkValidateEmail = validateEmail(email);
  //     if (checkValidateEmail.status === false) {
  //       return;
  //     }

  //     //check id của form hiện tại ở row nào trong table Edit
  //     tableEdit.querySelectorAll("tr").forEach((row) => {
  //       //reset lại row đó
  //       if (row.getAttribute("id") == document.getElementById("idRow").value) {
  //         row.querySelectorAll("td").forEach((td) => {
  //           td.textContent = "";
  //         });

  //         //up lại thông tin trên form vào row đó
  //         row.querySelectorAll("td").forEach((item) => {
  //           if (item.getAttribute("col-name") == "B10") {
  //             item.textContent = fullname;
  //           }
  //           if (item.getAttribute("col-name") == "B11") {
  //             item.textContent = phone;
  //           }
  //           if (item.getAttribute("col-name") == "B12") {
  //             item.textContent = email;
  //           }
  //           if (item.getAttribute("col-name") == "B13") {
  //             item.textContent = country;
  //           }
  //           if (item.getAttribute("col-name") == "B14") {
  //             item.textContent = district;
  //           }
  //           if (item.getAttribute("col-name") == "B15") {
  //             item.textContent = street;
  //           }
  //           if (item.getAttribute("col-name") == "B16") {
  //             item.textContent = gender;
  //           }
  //           if (item.getAttribute("col-button") == "C27") {
  //             // create Edit and Delete button
  //             let edit = document.createElement("button");
  //             let textButtonEdit = document.createTextNode("Edit");
  //             edit.className = "btn-edit";
  //             edit.setAttribute("onclick", "createEventClickEdit(this)");
  //             edit.appendChild(textButtonEdit);

  //             let del = document.createElement("button");
  //             let textButtonDelete = document.createTextNode("Delete");
  //             del.className = "btn-del";
  //             del.setAttribute("onclick", "createEventClickDel(this)");
  //             del.appendChild(textButtonDelete);

  //             //append vào td đó
  //             item.append(edit, del);
  //           }
  //         });
  //       }
  //     });

  //     // Khi add vào table edit xong sẽ reset lại form
  //     document.getElementById("idRow").value = "";
  //     document.getElementById("fullname").value = "";
  //     document.getElementById("phone-number").value = "";
  //     document.getElementById("email").value = "";
  //     let countryOp = document.getElementById("country");
  //     countryOp.value = "";
  //     countryOp.selected = "false";
  //     countrySlect.innerHTML = "<option></option>";

  //     let districtOp = document.getElementById("district");
  //     districtOp.value = "";
  //     districtOp.selected = "false";
  //     districtSlect.innerHTML = "<option></option>";

  //     let streetOp = document.getElementById("street");
  //     streetOp.value = "";
  //     streetOp.selected = "false";
  //     streetSlect.innerHTML = "<option></option>";

  //     document.querySelector('input[name="gender"]:checked').checked = false;

  //     // set up lại selection country
  //     arrayLocation.forEach(function addCity(item) {
  //       let option = document.createElement("option");
  //       option.text = item.country;
  //       option.value = item.country;
  //       countrySlect.appendChild(option);
  //     });
  //   }
  // });
  // end Submit

  // function button Edit
  function createEventClickEdit(domBtn) {
    let data = [];
    //get row
    let rowData = domBtn.parentElement.parentElement;
    //set value id cho form để edit tại id đó
    document.getElementById("idRow").setAttribute("value", rowData.querySelector('[col-name="B1"]').innerText);
    data["id"] = document.getElementById("idRow").value;

    let cols = rowData.querySelectorAll("td");

    //lấy value từng field col vào data
    for (let i = 0; i < cols.length; i++) {
      let col = cols[i];
      if (col.hasAttribute("col-name")) {
        data[col.getAttribute("col-name")] = col.innerText;
      }
    }

    //đặt tên cho các field col
    let fields = [];
    fields["id"] = data["B1"];
    fields["fullname"] = data["B2"];
    fields["phone"] = data["B3"];
    fields["email"] = data["B4"];
    fields["country"] = data["B5"];
    fields["district"] = data["B6"];
    fields["street"] = data["B7"];
    fields["gender"] = data["B8"];

    //up value lên form
    document.getElementById("fullname").value = fields["fullname"];
    document.getElementById("phone-number").value = fields["phone"];
    document.getElementById("email").value = fields["email"];

    //country đã được xổ ra sau khi submit form 
    let upCountry = document.getElementById("country");
    for (let i = 0; i < upCountry.options.length; i++) {
      let CtryOp = upCountry.options[i];
      if (CtryOp.value == fields["country"]) {
        document.getElementById("country").value = CtryOp.value;
        upCountry.selected = "true";
      }
    }

    let upDistrict = document.getElementById("district");
    //đổ option ra và kích hoạt selected cho value district từ row
    arrayLocation.forEach((item) => {
      if (fields["country"] == item.country) {
        districtSlect.innerHTML = "<option></option>";
        addToDistrict(item.district);
        document.getElementById("district").value = fields["district"];
        upDistrict.selected = "true";
      }
    });


    let upStreet = document.getElementById("street");
    arrayLocation.forEach((element) => {
      for (let i = 0; i < element.district.length; i++) {
          //Nếu như selected hiện tại = value district từ row
          if (districtSlect.value == fields["district"]) {
            // lặp district và lấy các obj của nó
            element.district.forEach((value) => {
              //Nếu có obj tại district tồn tại => add street
              if (value[fields["district"]]) {
                streetSlect.innerHTML = "<option></option>";
                console.log(value[fields["district"]])
                addToStreet(value[fields["district"]]);
                document.getElementById("street").value = fields["street"];
                upStreet.selected = "true";
              }
            });
          }
      }
    });


    //active checked cho input có value = fields["gender"]
    let genderRadio = document.querySelectorAll(".gender");
    genderRadio.forEach((item) => {
      if (item.value == fields["gender"]) {
        item.checked = true;
      }
    });
    //end up value to form
  }
  //end function Edit

  //function delete button
  function createEventClickDel(domBtn) {
    let removeRow = domBtn.parentElement.parentElement;
    removeRow.remove();
    document.getElementById("idRow").value = "";
  }
  //end function delete button

