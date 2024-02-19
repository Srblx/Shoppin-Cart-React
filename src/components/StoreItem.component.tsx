import {
    Button,
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    CardMediaProps,
    styled,
  } from "@mui/material";
  import { formatCurrency } from "../utils/FormatCurrency";
  import AddShoppingCartSharpIcon from "@mui/icons-material/AddShoppingCartSharp";
import { useShoppingCart } from "../context/ShoppingCardContext";
import { Component } from "react";
  
  type StoreItemProps = {
    id: number;
    name: string;
    price: number;
    imgUrl: string;
  };
  
  const StyledCardBody = styled(CardContent)({
    display: "flex",
    flex: "column",
  });
  
  const StyledCardImg = styled(CardMedia)<{component: "img"}>({
    // (props: {visible: string}) => ({
      border: "solid 1px black",
      borderRadius: "5px",
      objectFit: "cover",
      height: "250px"
      // custome props pour manipuler un component 
      // display: props.visible != "true" ? "none" : undefined
    // })
  });
  
  const StyledCardTitle = styled(CardActionArea)({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "baseline",
    marginBottom: "1rem",
    width: "100%",
  });
  
  const StyledSpanName = styled("span")({
    fontSize: "20px",
    fontWeight: "bold",
  });
  
  const StyledSpanPrice = styled("span")({
    fontSize: "18px",
    color: "#494949",
    marginLeft: "10px",
  });
  
  const StyledDivForBtnAdd = styled("div")({
    marginBottom: "20px",
    textAlign: "center",
  });
  
  const StyledButton = styled(Button)({
    background: "#3293E9",
    color: "white",
    width: "90%",
    transition: "all 0.4s",
    "&:hover": {
      backgroundColor: "#358753",
      color: "black",
      border: "solid 1px black",
    },
  });
  
  const StyledDivForContainerQuantity = styled("div")({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flex: "column",
    gap: ".5rem",
  });
  
  const StyledDivForContentQuantity = styled("div")({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: ".5rem",
  });
  
export function StoreItem({ id, name, price, imgUrl }: StoreItemProps) {
    const { getItemQuantity, increaseCartQuantity, decreaseCartQuantity, removeFormCart } = useShoppingCart()
    const quantity = getItemQuantity(id)
  
    return (
      <Card className="h-100">
        <StyledCardImg component="img" src={imgUrl}/>
        <StyledCardBody>
          <StyledCardTitle>
            <StyledSpanName>{name}</StyledSpanName>
            <StyledSpanPrice>{formatCurrency(price)}</StyledSpanPrice>
          </StyledCardTitle>
        </StyledCardBody>
        <StyledDivForBtnAdd>
          {quantity === 0 ? (
            <StyledButton
              variant="outlined"
              startIcon={<AddShoppingCartSharpIcon />}
              endIcon={<AddShoppingCartSharpIcon />}
              onClick={() => increaseCartQuantity(id)}
            >
              Add to cart
            </StyledButton>
          ) : (
            <StyledDivForContainerQuantity>
              <StyledDivForContentQuantity>
                <StyledButton onClick={() => decreaseCartQuantity(id)}>-</StyledButton>
                <div>
                  <span style={{fontSize: "18px", margin: "5px"}}>
                    {quantity}
                  </span>
                     in cart
                </div>
                <StyledButton onClick={() => increaseCartQuantity(id)}>+</StyledButton>
              </StyledDivForContentQuantity>
               <Button style={{background: "red", color: "white"}} onClick={() => removeFormCart(id)}>Remove</Button>
              
            </StyledDivForContainerQuantity>
          )}
        </StyledDivForBtnAdd>
      </Card>
    );
  }
  