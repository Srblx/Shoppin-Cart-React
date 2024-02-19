import { Stack } from "@mui/material";
import { useShoppingCart } from "../context/ShoppingCardContext";
import storeItem from "../data/items.json";
import { formatCurrency } from "../utils/FormatCurrency";
import { Button } from "react-bootstrap";

type CartItemProps = {
  id: number;
  quantity: number;
};

export function CartItem({ id, quantity }: CartItemProps) {
  const { removeFormCart } = useShoppingCart();
  const item = storeItem.find((i) => i.id == id);
  if (item == null) return null;

  return (
    <Stack direction="row" spacing={2} className="d-flex align-items-center">
      <img
        src={item.imgUrl}
        style={{ width: "125px", height: "75px", objectFit: "cover" }}
      ></img>
      <div className="me-auto">
        <div>
          {item.name}{" "}
          {quantity > 0 && (
            <span className="text-muted" style={{ fontSize: ".65rem" }}>
              x{quantity}
            </span>
          )}
        </div>
        <div className="text-muted" style={{ fontSize: ".75rem" }}>
          {formatCurrency(item.price)}
        </div>
      </div>
      <div>{formatCurrency(item.price * quantity)}</div>
      <Button
        variant="outlined-danger"
        size="sm"
        onClick={() => removeFormCart(item.id)}
        sx={{ marginLeft: "auto", color: "red" }} 
      >
        &times;
      </Button>
    </Stack>
  );
}
