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
  document.getElementById("submit").setAttribute("onclick", "validateForm()");
  //   document.onreadystatechange = () => {

  //   if(document.readyState === 'complete') {
  //       //add data id to delete button
  //     tableEdit.querySelectorAll('tr').forEach(row => {
  //           if(row.querySelector('.btn-del')) {
  //           id = row.querySelector('[col_name="B1"]').innerText;
  //           row.querySelector('.btn-del').setAttribute("data-id", id);
  //         }
  //     });      
  //   }
  // }
 

  // click submit add info
  document.getElementById("submit").addEventListener("click", () => {
      if(row.querySelector('.btn-del')) {
        id = row.querySelector('[col_name="B1"]').innerText;
        row.querySelector('.btn-del').setAttribute("data-id", id);
      }    
    });   

  
    // Trùng id => edit row có id đó
    if (document.getElementById("idRow").value !== ""){
 

      //check id của form hiện tại ở row nào trong table Edit
      tableEdit.querySelectorAll("tr").forEach((row) => {
        //reset lại row đó
        if (row.querySelector('[col_name="B1"]').innerText == document.getElementById("idRow").value) {
          row.querySelectorAll("td").forEach((td) => {
            td.textContent = "";
            alert("hrloo id");

       
        });
        }
      });

      // Khi add vào table edit xong sẽ reset lại form
      // document.getElementById("idRow").value = "";
      // document.getElementById("fullname").value = "";
      // document.getElementById("phone-number").value = "";
      // document.getElementById("email").value = "";
      // let countryOp = document.getElementById("country");
      // countryOp.value = "";
      // countryOp.selected = "false";
      // countrySlect.innerHTML = "<option></option>";

      // let districtOp = document.getElementById("district");
      // districtOp.value = "";
      // districtOp.selected = "false";
      // districtSlect.innerHTML = "<option></option>";

      // let streetOp = document.getElementById("street");
      // streetOp.value = "";
      // streetOp.selected = "false";
      // streetSlect.innerHTML = "<option></option>";

      // document.querySelector('input[name="gender"]:checked').checked = false;

      // // set up lại selection country
      // arrayLocation.forEach(function addCity(item) {
      //   let option = document.createElement("option");
      //   option.text = item.country;
      //   option.value = item.country;
      //   countrySlect.appendChild(option);
      // });
    }


  
  // end Submit

  // function button Edit
  function createEventClickEdit(domBtn) {
    let data = [];
    //get row
    let rowData = domBtn.parentElement.parentElement;
    //set value id cho form để edit tại id đó
    document.getElementById("idRow").setAttribute("value", rowData.querySelector('[col_name="B0"]').innerText);
    data["id"] = document.getElementById("idRow").value;

    let cols = rowData.querySelectorAll("td");

    //lấy value từng field col vào data
    for (let i = 0; i < cols.length; i++) {
      let col = cols[i];
      if (col.hasAttribute("col_name")) {
        data[col.getAttribute("col_name")] = col.innerText;
      }
    }

    //đặt tên cho các field col
    let fields = [];
    fields["id"] = data["B0"];
    fields["fullname"] = data["B1"];
    fields["phone"] = data["B2"];
    fields["email"] = data["B3"];
    fields["country"] = data["B4"];
    fields["district"] = data["B5"];
    fields["street"] = data["B6"];
    fields["gender"] = data["B7"];

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

  // function delete button
  // function createEventClickDel(domBtn) {
  //      //add data id to delete button
  //      tableEdit.querySelectorAll('tr').forEach(row => {
  //       if(row.querySelector('.btn-del')) {
  //       id = row.querySelector('[col_name="B1"]').innerText;
  //       row.querySelector('.btn-del').setAttribute("data-id", id);
  //     }
  // }); 
  // }
  // // end function delete button
