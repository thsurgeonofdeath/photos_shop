import React, {useState, useEffect} from "react"

const Context = React.createContext()

function ContextProvider({children}){
    const [allPhotos,setAllPhotos] = useState([])
    const [cartItems,setCartItems] = useState([])

    const url = "https://raw.githubusercontent.com/bobziroll/scrimba-react-bootcamp-images/master/images.json"

    useEffect(() => {
        // Getting the datat from the API
        fetch(url)
        .then(res => res.json())
        .then(data => setAllPhotos(data))
    },[])

    function toggleFavorite(id){
        const updatetArr = allPhotos.map(photo => {
            if(photo.id === id){
                return {...photo, isFavorite: !photo.isFavorite}
            }
            return photo
        })
        setAllPhotos(updatetArr)
    }

    function addToCart(newItem){
        setCartItems(prevItems => [...prevItems, newItem])
    }

    function removeFromCart(id){
        setCartItems(prevItems => prevItems.filter(item => item.id !== id))
    }

    function emptyCart() {
        setCartItems([])
    }

    return(
        <Context.Provider 
        value={{allPhotos, 
            cartItems, 
            toggleFavorite,
            addToCart, 
            removeFromCart, 
            emptyCart}}>
            {children}
        </Context.Provider>
    )
}

export {ContextProvider, Context}