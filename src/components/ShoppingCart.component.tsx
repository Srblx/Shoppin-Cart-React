import { Offcanvas, Stack } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCardContext";
import { CartItem } from "./CartItem.component";
import { formatCurrency } from "../utils/FormatCurrency";
import storeItem from "../data/items.json";

type ShoppingCartProps = {
  isOpen: boolean;
};

export function ShoppingCart({ isOpen }: ShoppingCartProps) {
    const { closeCart, cartItemsType } = useShoppingCart()
  return (
    <Offcanvas show={isOpen} placement="end" onHide={closeCart}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Cart</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Stack gap={3}>
      {cartItemsType.map(item => 
      <CartItem key = {item.id} {...item} />)}
      <div className="ms-auto fw-bold fs-5">
      Total{" "}
            {formatCurrency(
              cartItemsType.reduce((total, cartItem) => {
                const item = storeItem.find(i => i.id == cartItem.id);
                return total + (item?.price || 0) * cartItem.quantity
              }, 0)
        )}
      </div>
        </Stack>
      </Offcanvas.Body>
    </Offcanvas>
  );
}
