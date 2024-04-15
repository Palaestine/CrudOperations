let productNameInput = document.getElementById("productName");
let productPriceInput = document.getElementById("productPrice");
let productCategoryInput = document.getElementById("productCategory");
let productDiscriptionInput = document.getElementById("productDiscription");
let addBtn = document.getElementById("addBtn");



let mood = "create";
let tmp;


let productContainer;

if(localStorage.getItem("productList") === null)
{
    productContainer=[];
}
else
{
    productContainer=JSON.parse(localStorage.getItem("productList"));
    displayProducts();
}

addBtn.addEventListener("click" , function addProduct(){

   

    if(validateProductName() == true ){

       let products = {
            name : productNameInput.value,
            price : productPriceInput.value,
            categ : productCategoryInput.value,
            desc : productDiscriptionInput.value
        }

        if(mood === "create")
        {
        productContainer.push(products);
        }
        else
        {
            productContainer[tmp] = products;
            mood = "create";
            addBtn.innerHTML = "addProduct";
        }

        localStorage.setItem("productList" , JSON.stringify(productContainer));
        displayProducts();
        //clearInput();
   
    }
    
    else if(validateProductPrice() == true ){

        let products = {
             name : productNameInput.value,
             price : productPriceInput.value,
             categ : productCategoryInput.value,
             desc : productDiscriptionInput.value
         }
 
         if(mood === "create")
         {
         productContainer.push(products);
         }
         else
         {
             productContainer[tmp] = products;
             mood = "create";
             addBtn.innerHTML = "addProduct";
         }
 
         localStorage.setItem("productList" , JSON.stringify(productContainer));
         displayProducts();
         //clearInput();
    
     }
    
        
    else{
    }

   

});

function displayProducts(){

    cartoona = ``;

    for(i=0 ; i<productContainer.length ; i++)
    {
        cartoona+=`
        <tr>

        <td>${i+1}</td>
        <td>${productContainer[i].name}</td>
        <td>${productContainer[i].price}</td>
        <td>${productContainer[i].categ}</td>
        <td>${productContainer[i].desc}</td>

        <td><button class="btn btn-outline-warning" onclick="updateProduct(${i})">Update</button></td>
        <td><button class="btn btn-outline-danger" onclick="deleteProduct(${i})">Delete</button></td>

        </tr>
        `
    };
    document.getElementById("tbody").innerHTML = cartoona;
};

function checkEmptyInput(){

    if(productNameInput.value!=""   && productPriceInput.value!=""  && productCategoryInput.value!="" && productDiscriptionInput.value!="" )
    {
        return true;
    }
    else
    {
        return false;
    }
}

function deleteProduct(e){

    productContainer.splice(e,1);
    localStorage.setItem("productList" , JSON.stringify(productContainer))
    displayProducts();
}

function searchProducts(term){
    cartoona=``;

    for(i=0 ;i<productContainer.length; i++)
    {
        if(productContainer[i].name.toLowerCase().includes(term.toLowerCase()) == true)
        {
            cartoona+=`
            <tr>
    
            <td>${i+1}</td>
            <td>${productContainer[i].name}</td>
            <td>${productContainer[i].price}</td>
            <td>${productContainer[i].categ}</td>
            <td>${productContainer[i].desc}</td>
    
    
            <td><button class="btn btn-outline-warning">Update</button></td>
            <td><button class="btn btn-outline-danger" onclick="deleteProduct(${i})">Delete</button></td>
    
            </tr>
            `
        }
    }
    document.getElementById("tbody").innerHTML = cartoona;

}

function updateProduct(e){
    productNameInput.value = productContainer[e].name;
    productPriceInput.value = productContainer[e].price;
    productCategoryInput.value = productContainer[e].categ;
    productDiscriptionInput.value = productContainer[e].desc;

    addBtn.innerHTML = "update";
    mood = "update";
    tmp = e ;

}

function clearInput(){

    productName.value="";
    productPrice.value="";
    productCategory.value="";
    productDiscription.value="";
};




function validateProductName(){

    let regex = /^[A-Z][a-z]{2,9}$/

    if(productNameInput.value == "")
    {
        productNameInput.classList.remove("is-valid");
        productNameInput.classList.remove("is-invalid");
        document.getElementById("nameAlert").classList.replace("d-block" , "d-none");
    }

    else if(regex.test( productNameInput.value ) == true)
    {
        productNameInput.classList.add("is-valid");
        productNameInput.classList.remove("is-invalid");
        document.getElementById("nameAlert").classList.replace("d-block" , "d-none");

        return true;
    }
    else
    {
        productNameInput.classList.add("is-invalid");
        productNameInput.classList.remove("is-valid");
        document.getElementById("nameAlert").classList.replace("d-none" , "d-block");

        return false;
    }
}
productNameInput.addEventListener("blur" , validateProductName);

function validateProductPrice(){

    let regex = /^([1-9][0-9][0-9][0-9][0-9]|100000)$/

    if(productPriceInput.value == "")
    {
        productPriceInput.classList.remove("is-valid");
        productPriceInput.classList.remove("is-invalid");
        document.getElementById("priceAlert").classList.replace("d-block" , "d-none");
    }

    else if(regex.test( productPriceInput.value ) == true)
    {
        productPriceInput.classList.add("is-valid");
        productPriceInput.classList.remove("is-invalid");
        document.getElementById("priceAlert").classList.replace("d-block" , "d-none");

        return true;
    }
    else
    {
        productPriceInput.classList.add("is-invalid");
        productPriceInput.classList.remove("is-valid");
        document.getElementById("priceAlert").classList.replace("d-none" , "d-block");

        return false;
    }
}
productPriceInput.addEventListener("blur" , validateProductPrice);