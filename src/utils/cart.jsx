export default function Getcart(){
    const cartString = localStorage.getItem("cart")

    if(cartString == null){
        localStorage.setItem("cart" , "[]")
        return [];
    }else{
        const cart = JSON.parse(cartString)
        return cart;
    }
}

    const smapleCart = [
        {
           product:{ 
            productId : "0001",
            name : "product 1",
            labelldPrice : 2000,
            price : 1500,
            Image : "",
        },
        qty : 1,
        },

        {
            product:{
                productId : "0002",
                name : "product 2",
                labelldPrice : 3500,
                price : 3000,
                image : "",
            },
            qty : 2,
        },
        
    ];
    export function addToCart(product , qty){

        const cart = Getcart();

        const existingProductIndex = cart.findIndex(
            (item)=>{
                return item.product.productId == product.productId
            }
        );

        if(existingProductIndex == -1){

            if(qty <= 0){
                console.error("Quantity must be grater than 0")
                return;
            }

            cart.push(
                {
                    product : {
                        productId : product.productId,
                        name : product.name,
                        labelldPrice : product.labelldPrice,
                        price : product.price,
                        image : product.images[0]
                    },
                    qty : qty 
                }
            )
        }else{
            const newQty = cart[existingProductIndex].qty + qty

                if(newQty <= 0){
                    cart.splice(existingProductIndex , 1)

                }else{

                    cart[existingProductIndex].qty = newQty
                }
        }

        const cartString = JSON.stringify(cart);
        localStorage.setItem("cart" , cartString);
    }

    export function getCartTotal(cart){
        let total = 0;
        cart.forEach(
            (cartItem)=>{
                //total=total + cartItem.product.price*cartItem.qty
                total += cartItem.product.price*cartItem.qty
            }
        )
        return total;

    }

