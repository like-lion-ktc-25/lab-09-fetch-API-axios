import type { Product } from "../../types/productApp";

interface Props {
  product: Product;
}

const ProductDetail = ({ product }: Props) => {
  return (
    <div
      style={{
        marginTop: 16,
        padding: 16,
      }}
    >
      <p style={{ margin: "4px 0" }}>
        <strong>Name:</strong> {product.name}
      </p>
      <p style={{ margin: "4px 0" }}>
        <strong>Price:</strong> ${product.price}
      </p>
      <p style={{ margin: "4px 0" }}>
        <strong>Brand:</strong> {product.brand}
      </p>
      <p style={{ margin: "4px 0" }}>
        <strong>Category:</strong> {product.category}
      </p>
    </div>
  );
};

export default ProductDetail;
