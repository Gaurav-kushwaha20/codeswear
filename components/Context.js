// cartContext.js
import { createContext, useContext, useState, useEffect } from "react";

// Create the context
const CartContext = createContext();

// Custom hook to use the CartContext
export const useCart = () => {
    return useContext(CartContext);
};

// Provider component
export const CartProvider = ({ children }) => {
  const [cartVisible, setCartVisible] = useState(false);
    const [cart, setCart] = useState({});
    const [subTotal, setSubTotal] = useState(0);

    // Save cart to localStorage
    const saveCart = (myCart) => {
        localStorage.setItem("cart", JSON.stringify(myCart));
        let subt = 0;
        let keys = Object.keys(myCart);
        for(let i = 0; i < keys.length; i++){

            subt = myCart[keys[i]].price * myCart[keys[i]].qty;
        }
        setSubTotal(subt);
    };
    const toggleCart = () => {
        setCartVisible(!cartVisible);
      };
     const cartOn = ()=>{
        setCartVisible(true)
     }
    // Clear the cart
    const clearCart = () => {
        setCart({});
        saveCart({});
    };

    // Add item to cart
    const addToCart = (itemCode, qty, price, name, size, variant) => {
        // console.log(itemCode, qty, price, name, size, variant);
        let newCart = cart ;
        if (itemCode in newCart) {
            newCart[itemCode].qty = newCart[itemCode].qty + qty;
        } else {
            newCart[itemCode] = { qty: 1, price, name, size, variant };
        }
        // console.log(newCart);
        setCart(newCart);
        saveCart(newCart);
        cartOn();
        
        
    };

    // Remove item from cart
    const removeFromCart = (itemCode, qty) => {
        let newCart = cart;
        // console.log(cart)
        // console.log(newCart)
    
        if (itemCode in newCart) {
            // console.log(" i am here")
            newCart[itemCode].qty = newCart[itemCode].qty - qty;
        }
        if (newCart[itemCode].qty <= 0) {
            delete newCart[itemCode];
        }
        setCart(newCart);
        
        saveCart(cart);
    };

    // Calculate subtotal whenever the cart changes
    useEffect(() => {
        try{
            if(localStorage.getItem("cart")){
                // console.log("type of "+typeof(localStorage.getItem('cart')))
               setCart(JSON.parse(localStorage.getItem("cart"))) 
               saveCart(JSON.parse(localStorage.getItem('cart')))


            }
        }catch(e){
            console.error(e)
            localStorage.clear();
        }

    }, []);

    return (
        <CartContext.Provider
            value={{ cart, addToCart, removeFromCart, clearCart, subTotal, cartVisible, toggleCart }}
        >
            {children}
        </CartContext.Provider>
    );
};
