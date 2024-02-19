import { ShoppingCart } from "../components/ShoppingCart.component";
import { ReactNode, createContext, useContext, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

type ShoppingProviderProps = {
  children: ReactNode;
};

type ShoppingCartContext = {
  openCart: () => void;
  closeCart: () => void;
  getItemQuantity: (id: number) => number;
  increaseCartQuantity: (id: number) => void;
  decreaseCartQuantity: (id: number) => void;
  removeFormCart: (id: number) => void;
  cartQuantity: number;
  cartItemsType: CartItem[];
};

type CartItem = {
  id: number;
  quantity: number;
};

const ShoppingCardContext = createContext({} as ShoppingCartContext);

export function useShoppingCart() {
  return useContext(ShoppingCardContext);
}

export function ShoppingCartProvider({ children }: ShoppingProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [cartItem, setCartItem] = useLocalStorage<CartItem[]>(
    "shopping-cart",
    []
    );

  const cartQuantity = cartItem.reduce(
    (quantity, item) => item.quantity + quantity,
    0
  );

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  function getItemQuantity(id: number) {
    return cartItem.find((item) => item.id === id)?.quantity || 0;
  }

  function increaseCartQuantity(id: number) {
    setCartItem((currItem) => {
      if (currItem.find((item) => item.id === id) == null) {
        // l'opérateur de propagation (...currItem)
        return [...currItem, { id, quantity: 1 }];
      } else {
        return currItem.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      }
    });
  }

  function decreaseCartQuantity(id: number) {
    setCartItem((currItem) => {
      if (currItem.find((item) => item.id === id)?.quantity === 1) {
        return currItem.filter((item) => item.id !== id);
      } else {
        return currItem.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
      }
    });
  }

  function removeFormCart(id: number) {
    setCartItem((currItems) => {
      return currItems.filter((item) => item.id !== id);
    });
  }

  return (
    <ShoppingCardContext.Provider
      value={{
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFormCart,
        openCart,
        closeCart,
        cartItemsType: cartItem,
        cartQuantity,
      }}
    >
      {children}
      <ShoppingCart isOpen={isOpen}/> 
    </ShoppingCardContext.Provider>
  );
}
