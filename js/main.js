let pName = document.getElementById('productName')
let pCategory = document.getElementById('productCat')
let pPrice = document.getElementById('productPrice')
let pDesc = document.getElementById('productDesc')

let pTax = document.getElementById('productTax')
let pAds = document.getElementById('productADS')
let pDiscount = document.getElementById('productDiscount')
let pTotal = document.getElementById('productTotal')
let pQuant = document.getElementById('productQuantity')
let updateBTN = document.getElementById('updateBTN')
let addBTN = document.getElementById('addBTN')
let DELETEALL = document.getElementById('DELETEALL')
let quantname = document.getElementById('quantname')
let searchInput = document.getElementById('searchInput');

//saving data
let productContainer = []
let deletContainer = []
let mood = "create";
let tmp;

if (localStorage.getItem('Products') != null) {
    productContainer = JSON.parse(localStorage.getItem('Products'))
    displayData()
}
if (localStorage.getItem('Deleted') != null) {
    deletContainer = JSON.parse(localStorage.getItem('Deleted'))
    displayData()
}


function getTotal() {
    if (pPrice.value != "") {
        let total = +pPrice.value + +pTax.value + +pAds.value + - +pDiscount.value
        pTotal.value = total
    } else {
        pTotal.value = ""
    }
}
pDiscount.addEventListener('keyup', getTotal)
pPrice.addEventListener('keyup', getTotal)
pAds.addEventListener('keyup', getTotal)
pTax.addEventListener('keyup', getTotal)

console.log(deletContainer);

function addProduct() {
    let product = {
        name: pName.value,
        category: pCategory.value,
        price: pPrice.value,
        desc: pDesc.value,
        tax: pTax.value,
        ads: pAds.value,
        discount: pDiscount.value,
        total: pTotal.value,
        quantity: pQuant.value
    }

    if (product.name != "" && product.category != "" && product.price != "" && product.desc != "" && product.tax != "" && product.ads != "" && product.discount != "" && product.total != "") {
        if (mood == "create") {
            if (product.quantity > 1) {
                for (let i = 0; i < product.quantity; i++) {
                    productContainer.push(product);
                }
            } else {
                productContainer.push(product);
            }
        } else {
            productContainer[tmp] = product
            localStorage.setItem('Products', JSON.stringify(productContainer));
            displayData()
            addBTN.textContent = "Add Product";

            addBTN.innerHTML = "Add Product";
            clearForm();
            mood = "create";
            $('#productQuantity').removeAttr('disabled')
            $('#productQuantity').removeAttr('readonly')
            $('#productQuantity').css({ cursor: "" })
            $('#addBTN').removeClass('btn-outline-success');
            $('#addBTN').addClass('btn-outline-dark');
        }
        clearForm();
    } else {
        alert("Please Fill All The Inputs");
    }


    localStorage.setItem('Products', JSON.stringify(productContainer));
    displayData();
}


function clearForm() {
    pName.value = ""
    pCategory.value = ""
    pPrice.value = ""
    pDesc.value = ""
    pTax.value = ""
    pAds.value = ""
    pDiscount.value = ""
    pTotal.value = ""
    pQuant.value = ""
}

function displayData() {
    let cartona = ``;
    for (let i = 0; i < productContainer.length; i++) {
        cartona += `<tr>
        <td>${i+1}</td>
        <td>${productContainer[i].name}</td>
        <td>${productContainer[i].category}</td>
        <td>${productContainer[i].price}</td>
        <td>${productContainer[i].tax}</td>
        <td>${productContainer[i].ads}</td>
        <td>${productContainer[i].discount}</td>
        <td>${productContainer[i].total}</td>
        <td>${productContainer[i].desc}</td>
        <td><button id="UPDATEBTN" class="btn btn-sm p-2 btn-outline-info" onclick="updateProduct(${i})">Update</button></td>
    
        <td><button class="btn btn-sm p-2 btn-outline-danger dnger" onclick="deleteProduct(${i})" onclick="displayDeletedDatat()" >Delete</button></td>
        </tr>`
    }
    document.getElementById('tbody').innerHTML = cartona;
}


function deleteProduct(index) {
    deletContainer.push(productContainer[index])
    console.log(deletContainer);
    localStorage.setItem('Deleted', JSON.stringify(deletContainer));
    productContainer.splice(index, 1)
    localStorage.setItem('Products', JSON.stringify(productContainer));
    displayData()
    displayDeletedData();
}

function deletAll() {
    while (productContainer.length != 0) {
        deletContainer.push(productContainer[productContainer.length - 1])
        localStorage.setItem('Deleted', JSON.stringify(deletContainer));
        console.log(deletContainer);
        productContainer.splice(productContainer.length - 1, 1);
        localStorage.setItem('Products', JSON.stringify(productContainer));
        displayData();
        displayDeletedData()
    }
}

function updateProduct(index) {
    pName.value = productContainer[index].name
    pCategory.value = productContainer[index].category
    pPrice.value = productContainer[index].price
    pDesc.value = productContainer[index].desc
    pTax.value = productContainer[index].tax
    pAds.value = productContainer[index].ads
    pDiscount.value = productContainer[index].discount
    pTotal.value = productContainer[index].total
    getTotal();
    pQuant.value = productContainer[index].quantity
    tmp = index;
    mood = "update"
    $('#productQuantity').attr('disabled', 'disabled')
    $('#productQuantity').attr('readonly', 'readonly')
    $('#productQuantity').css({ cursor: "not-allowed" })
    addBTN.textContent = "Update"
    $('#addBTN').addClass('btn-outline-success');
    $('#addBTN').removeClass('btn-outline-dark');
}

function searchInputs() {
    let search = searchInput.value;
    let cartona = ``;
    for (let i = 0; i < productContainer.length; i++) {
        if (productContainer[i].name.toLowerCase().includes(search.toLowerCase())) {
            cartona += `<tr>
            <td>${i+1}</td>
            <td>${productContainer[i].name}</td>
            <td>${productContainer[i].category}</td>
            <td>${productContainer[i].price}</td>
            <td>${productContainer[i].tax}</td>
            <td>${productContainer[i].ads}</td>
            <td>${productContainer[i].discount}</td>
            <td>${productContainer[i].total}</td>
            <td>${productContainer[i].desc}</td>
            <td><button class="btn btn-sm p-2 btn-outline-info" onclick="updateProduct(${i})">Update</button></td>
            <td><button class="btn btn-sm p-2 btn-outline-danger dnger" onclick="deleteProduct(${i})" >Delete</button></td>
            </tr>`
        }
    }
    document.getElementById('tbody').innerHTML = cartona;

}
new WOW().init();

function displayDeletedData() {
    let cartona = ``;
    for (let i = 0; i < deletContainer.length; i++) {
        cartona += `
    <tr>
        <td>${i+1}</td>
        <td>${deletContainer[i].name}</td>
        <td>${deletContainer[i].category}</td>
        <td>${deletContainer[i].total}</td>
    </tr>
    `
    }
    document.getElementById('delbody').innerHTML = cartona;
}

function deletDeletedAll() {
    deletContainer.splice(0);
    console.log(deletContainer);
    localStorage.setItem('Deleted', JSON.stringify(deletContainer));
    displayDeletedData();
}
let isShown = false;
let delicon = document.getElementById('delicon')
let cnt = 0;
$('#delicon').click(function() {
    if (cnt % 2 == 0) {
        displayDeletedData();
        $('#delhead').fadeIn(1500);
        $('#delbody').fadeIn(1000);
        $('.deltext').fadeIn(1000);
        $('.deleic').animate({ right: '0px' }, 1000);
        $('#delAll').fadeIn(1000);
        cnt++;
    } else {
        $('#delhead').fadeOut(1000);
        $('#delbody').fadeOut(1000);
        $('.deltext').fadeOut(1000);
        $('#delicon').animate({ right: '300px' }, 2000);
        $('#delAll').fadeOut(1000);
        cnt++;
    }
});