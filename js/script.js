let productCountStr = localStorage.getItem('productCount');
let productCount;
let products;
let page = 1;
if (!productCountStr) {
    products = [];
}
else {
    products = JSON.parse(productCountStr)
}
loadMore(page);
document.querySelector('.load').addEventListener('click',function(){
    page++;
    loadMore(page);
})
function loadMore(page){
    fetch(`https://dummyjson.com/products?skip=${(page - 1) * 10}&limit=10`)
    .then(response => response.json())
    .then(data => {
        // console.log(data)
        data.products.forEach(element => {
            // console.log(element);
            let card = `<div class = "col-md-4">
                        <div class="card" style="width: 18rem;">
                            <img src="${element.images[0]}" class="card-img-top" alt="..." style="max-height: 220px;">
                            <div class="card-body">
                                <h5 class="card-title">${element.title}</h5>
                                <p class="card-text">${element.description}</p>
                                <a href="#" class="btn btn-primary" id="${element.id}">Go somewhere</a>
                            </div>
                        </div>
                    <div>`
            document.querySelector('.cards').innerHTML += card

        });
    }).then(() => {

        document.querySelectorAll('.card-body .btn').forEach(elem => {
            // console.log(elem);
            elem.addEventListener('click', function () {
                // productCount++;
                // console.log(productCount)
                // console.log(elem.id);
                if(!products.some(x=>x==elem.id)){
                products.push(elem.id)

                }
                document.querySelector('.count').innerText = products.length;
                
            })
        })

    })
localStorage.setItem('productCount', JSON.stringify(products))
}


