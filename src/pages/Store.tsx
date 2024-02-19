import { Col, Row } from "react-bootstrap";
import storeItems from "../data/items.json";
import { StoreItem } from "../components/StoreItem.component";

export function Store() {
  return (
    <>
      <h1>Store</h1>
      <Row lg={3} md={2} xs={1} className="g-3">
        {storeItems.map((item) => (
          //? ...item pour avoir acces au differente propriété le l'object
          <Col key={item.id}><StoreItem {...item}/></Col>
        ))}
      </Row>
    </>
  );
}
