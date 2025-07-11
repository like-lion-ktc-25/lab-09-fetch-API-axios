import { useEffect, useState } from "react";
import type { Product } from "../../types/productApp";

interface Props {
  onAdd: (product: Omit<Product, "id">) => void;
  onUpdate: (product: Product) => void;
  editingProduct: Product | null;
  onCancelEdit: () => void;
}

const ProductForm = ({
  onAdd,
  onUpdate,
  editingProduct,
  onCancelEdit,
}: Props) => {
  const [form, setForm] = useState<Omit<Product, "id">>({
    name: "",
    price: "",
    brand: "",
    category: "",
  });

  const handleSubmit = () => {
    if (!form.name.trim()) {
      alert("Tên sản phẩm không được để trống");
      return;
    }
    if (editingProduct) {
      onUpdate({ ...editingProduct, ...form });
    } else {
      onAdd(form);
    }
    setForm({ name: "", price: "", brand: "", category: "" });
  };

  useEffect(() => {
    if (editingProduct) {
      setForm({
        name: editingProduct.name,
        price: editingProduct.price,
        brand: editingProduct.brand,
        category: editingProduct.category,
      });
    } else {
      setForm({ name: "", price: "", brand: "", category: "" });
    }
  }, [editingProduct]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <input
        placeholder="Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        style={{
          padding: "8px 12px",
          border: "1px solid #ccc",
          borderRadius: 4,
        }}
      />
      <input
        placeholder="Brand"
        value={form.brand}
        onChange={(e) => setForm({ ...form, brand: e.target.value })}
        style={{
          padding: "8px 12px",
          border: "1px solid #ccc",
          borderRadius: 4,
        }}
      />
      <input
        placeholder="Category"
        value={form.category}
        onChange={(e) => setForm({ ...form, category: e.target.value })}
        style={{
          padding: "8px 12px",
          border: "1px solid #ccc",
          borderRadius: 4,
        }}
      />
      <input
        placeholder="Price"
        value={form.price}
        onChange={(e) => setForm({ ...form, price: e.target.value })}
        style={{
          padding: "8px 12px",
          border: "1px solid #ccc",
          borderRadius: 4,
        }}
      />
      <div style={{ display: "flex", gap: 8 }}>
        <button
          onClick={handleSubmit}
          style={{
            padding: "8px 12px",
            background: editingProduct ? "#ffc107" : "#28a745",
            color: "white",
            border: "none",
            borderRadius: 4,
            cursor: "pointer",
            flex: 1,
          }}
        >
          {editingProduct ? "Update" : "Add"}
        </button>
        {editingProduct && (
          <button
            onClick={onCancelEdit}
            style={{
              padding: "8px 12px",
              background: "#6c757d",
              color: "white",
              border: "none",
              borderRadius: 4,
              cursor: "pointer",
            }}
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductForm;
