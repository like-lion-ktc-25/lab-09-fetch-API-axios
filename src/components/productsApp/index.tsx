import { message, Modal, Spin } from "antd";
import { useEffect, useState } from "react";
import { deleteProduct } from "../../services/delelteProduct";
import { getProducts } from "../../services/getProduct";
import { addProduct } from "../../services/postProduct";
import { updateProduct } from "../../services/putProduct";
import type { Product } from "../../types/productApp";
import ProductDetail from "./ProductDetail";
import ProductForm from "./ProductForm";

const ProductApp = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showFormModal, setShowFormModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      console.error(error);
      message.error("Failed to fetch products!");
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (product: Omit<Product, "id">) => {
    if (products.find((p) => p.name === product.name)) {
      message.warning("Product name already exists!");
      return;
    }
    Modal.confirm({
      title: "Confirm Add",
      content: `Are you sure you want to add the product "${product.name}"?`,
      okText: "Add",
      cancelText: "Cancel",
      async onOk() {
        try {
          await addProduct(product);
          message.success("Product added successfully!");
          fetchProducts();
        } catch (error) {
          console.error(error);
          message.error("Failed to add product!");
        }
      },
    });
  };

  const handleUpdate = async (product: Product) => {
    Modal.confirm({
      title: "Confirm Update",
      content: `Are you sure you want to update the product "${product.name}"?`,
      okText: "Update",
      cancelText: "Cancel",
      async onOk() {
        try {
          await updateProduct(product);
          message.success("Product updated successfully!");
          setEditingProduct(null);
          fetchProducts();
        } catch (error) {
          console.error(error);
          message.error("Failed to update product!");
        }
      },
    });
  };

  const handleDelete = async (id: string) => {
    const productToDelete = products.find((p) => p.id === id);
    Modal.confirm({
      title: "Confirm Delete",
      content: `Are you sure you want to delete the product "${productToDelete?.name}"?`,
      okText: "Delete",
      cancelText: "Cancel",
      okType: "danger",
      async onOk() {
        try {
          await deleteProduct(id);
          message.success("Product deleted successfully!");
          fetchProducts();
        } catch (error) {
          console.error(error);
          message.error("Failed to delete product!");
        }
      },
    });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      {/* Modal view detail */}
      <Modal
        open={!!selectedProduct}
        title="Detail product"
        onCancel={() => setSelectedProduct(null)}
        footer={null}
      >
        {selectedProduct && <ProductDetail product={selectedProduct} />}
      </Modal>

      {/* Modal add/update */}
      <Modal
        open={showFormModal}
        title={editingProduct ? "Update product" : "Add new product"}
        onCancel={() => {
          setEditingProduct(null);
          setShowFormModal(false);
        }}
        footer={null}
      >
        <ProductForm
          onAdd={handleAdd}
          onUpdate={handleUpdate}
          editingProduct={editingProduct}
          onCancelEdit={() => {
            setEditingProduct(null);
            setShowFormModal(false);
          }}
        />
      </Modal>
      <div
        style={{
          width: "100%",
          maxWidth: 500,
          margin: "50px auto",
          padding: 20,
          borderRadius: 8,
          background: "#f9fafb",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
      >
        <h2 style={{ textAlign: "center", color: "#333", marginBottom: 16 }}>
          Product Management App
        </h2>

        <button
          onClick={() => {
            setEditingProduct(null);
            setShowFormModal(true);
          }}
          style={{
            padding: "8px 12px",
            background: "#28a745",
            color: "white",
            border: "none",
            borderRadius: 4,
            cursor: "pointer",
            marginBottom: 12,
          }}
        >
          Add new product
        </button>
        <Spin spinning={loading}>
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              overflowY: "auto",
              maxHeight: 500,
            }}
          >
            {products.map((p) => (
              <li
                key={p.id}
                style={{
                  background: "#fff",
                  border: "1px solid #eee",
                  padding: "8px 12px",
                  borderRadius: 4,
                  marginBottom: 8,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600 }}>{p.name}</div>
                  <div style={{ fontSize: 12, color: "#555" }}>
                    Brand: {p.brand} | Category: {p.category} | Price: $
                    {p.price}
                  </div>
                </div>
                <div style={{ display: "flex", gap: 4 }}>
                  <button
                    onClick={() => setSelectedProduct(p)}
                    style={{
                      padding: "4px 8px",
                      background: "#17a2b8",
                      color: "white",
                      border: "none",
                      borderRadius: 4,
                      cursor: "pointer",
                      fontSize: 12,
                    }}
                  >
                    View
                  </button>
                  <button
                    onClick={() => {
                      setEditingProduct(p);
                      setShowFormModal(true);
                    }}
                    style={{
                      padding: "4px 8px",
                      background: "#ffc107",
                      color: "white",
                      border: "none",
                      borderRadius: 4,
                      cursor: "pointer",
                      fontSize: 12,
                    }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(p.id)}
                    style={{
                      padding: "4px 8px",
                      background: "#dc3545",
                      color: "white",
                      border: "none",
                      borderRadius: 4,
                      cursor: "pointer",
                      fontSize: 12,
                    }}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </Spin>
      </div>
    </>
  );
};

export default ProductApp;
