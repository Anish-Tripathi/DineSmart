import React, { useState, useEffect } from "react";
import styles from "./ManageMenu.module.css";
import { toast } from "sonner";
import { FaRupeeSign } from "react-icons/fa";
import { FiPlus, FiTrash2, FiEdit2 } from "react-icons/fi";
import MenuItemDialog from "./MenuItemDialog";
import { categories, initialMenuItem } from "./Details.js";
import {
  Utensils,
  Salad,
  Flame,
  Wheat,
  List,
  AlertTriangle,
  Sparkles,
} from "lucide-react";
const baseUrl = process.env.REACT_APP_API_BASE_URL;

const ManageMenu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [currentMenuItem, setCurrentMenuItem] = useState(initialMenuItem);
  const [editingIndex, setEditingIndex] = useState(null);
  const [loading, setLoading] = useState(false);
  const [restaurantId, setRestaurantId] = useState(null);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState(categories[0].key);
  const [showDialog, setShowDialog] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const currentrestaurantId = localStorage.getItem("currentRestaurantId");
    setRestaurantId(currentrestaurantId);
    fetchMenuItems(currentrestaurantId);
  }, []);

  const fetchMenuItems = async (restaurantId) => {
    try {
      setLoading(true);
      const response = await fetch(
        `${baseUrl}/api/menu-items/restaurant/${restaurantId}`
      );
      if (!response.ok) throw new Error("Failed to fetch menu items");
      const data = await response.json();
      setMenuItems(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleMenuItemChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name.startsWith("nutritionInfo.")) {
      const field = name.split(".")[1];
      setCurrentMenuItem((prev) => ({
        ...prev,
        nutritionInfo: { ...prev.nutritionInfo, [field]: Number(value) },
      }));
    } else {
      setCurrentMenuItem((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const handleIngredientChange = (index, value) => {
    setCurrentMenuItem((prev) => {
      const newIngredients = [...prev.ingredients];
      newIngredients[index] = value;
      return { ...prev, ingredients: newIngredients };
    });
  };

  const addIngredient = () => {
    setCurrentMenuItem((prev) => ({
      ...prev,
      ingredients: [...prev.ingredients, ""],
    }));
  };

  const removeIngredient = (index) => {
    const newIngredients = [...currentMenuItem.ingredients];
    newIngredients.splice(index, 1);
    setCurrentMenuItem((prev) => ({
      ...prev,
      ingredients: newIngredients,
    }));
  };

  const handleAllergenChange = (index, value) => {
    const newAllergens = [...currentMenuItem.allergenInfo];
    newAllergens[index] = value;
    setCurrentMenuItem((prev) => ({
      ...prev,
      allergenInfo: newAllergens,
    }));
  };

  const addAllergen = () => {
    setCurrentMenuItem((prev) => ({
      ...prev,
      allergenInfo: [...prev.allergenInfo, ""],
    }));
  };

  const removeAllergen = (index) => {
    const newAllergens = [...currentMenuItem.allergenInfo];
    newAllergens.splice(index, 1);
    setCurrentMenuItem((prev) => ({
      ...prev,
      allergenInfo: newAllergens,
    }));
  };

  const resetMenuItem = () => setCurrentMenuItem(initialMenuItem);

  const openDialog = (index = null) => {
    if (index !== null) {
      setCurrentMenuItem({ ...menuItems[index] });
      setEditingIndex(index);
    } else {
      resetMenuItem();
      setEditingIndex(null);
    }
    setShowDialog(true);
  };

  const closeDialog = () => {
    setShowDialog(false);
    resetMenuItem();
    setEditingIndex(null);
  };

  const saveMenuItem = async () => {
    if (!restaurantId) {
      setError("No restaurant associated with this user");
      return;
    }
    try {
      setLoading(true);
      const menuItemData = { ...currentMenuItem, restaurant: restaurantId };
      let response;
      if (editingIndex !== null) {
        response = await fetch(
          `${baseUrl}/api/menu-items/${currentMenuItem._id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(menuItemData),
          }
        );
      } else {
        response = await fetch(`${baseUrl}/api/menu-items`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(menuItemData),
        });
      }
      if (!response.ok) throw new Error("Failed to save menu item");
      await fetchMenuItems(restaurantId);
      closeDialog();
      toast.success(
        `Menu item ${editingIndex !== null ? "updated" : "added"} successfully!`
      );
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteMenuItem = async (index) => {
    toast(
      (t) => (
        <div className={styles.toastContent}>
          <p>Are you sure you want to delete this menu item?</p>
          <div className={styles.toastActions}>
            <button
              onClick={async () => {
                toast.dismiss(t);
                try {
                  setLoading(true);
                  const itemToDelete = menuItems[index];
                  const response = await fetch(
                    `${baseUrl}/api/menu-items/${itemToDelete._id}`,
                    { method: "DELETE" }
                  );
                  if (!response.ok)
                    throw new Error("Failed to delete menu item");
                  await fetchMenuItems(restaurantId);
                  toast.success("Menu item deleted successfully!");
                } catch (err) {
                  toast.error(err.message);
                } finally {
                  setLoading(false);
                }
              }}
              className={styles.confirmBtn}
            >
              Yes, Delete
            </button>
            <button
              onClick={() => toast.dismiss(t)}
              className={styles.cancelBtn}
            >
              Cancel
            </button>
          </div>
        </div>
      ),
      { duration: 10000 }
    );
  };

  const filteredItems = menuItems
    .filter((item) => item.name.toLowerCase().includes(search.toLowerCase()))
    .filter((item) => item.category === activeCategory);

  return (
    <div className={styles.container}>
      <div className={styles.backgroundOverlay}></div>

      <div className={styles.content}>
        <div className={styles.header}>
          <h1 className={styles.title}>
            <List size={32} />
            Menu Management
          </h1>
          <p className={styles.subtitle}>
            Manage your restaurant's menu items with ease
          </p>
        </div>

        {error && (
          <div className={styles.errorMessage}>
            <AlertTriangle size={16} />
            {error}
          </div>
        )}

        <div className={styles.controlsSection}>
          <div className={styles.categoryTabs}>
            {categories.map((cat) => (
              <button
                key={cat.key}
                className={`${styles.tabBtn} ${
                  activeCategory === cat.key ? styles.activeTab : ""
                }`}
                onClick={() => setActiveCategory(cat.key)}
                type="button"
              >
                {cat.icon}
                <span>{cat.label}</span>
              </button>
            ))}
          </div>

          <div className={styles.topActions}>
            <div className={styles.searchContainer}>
              <input
                type="text"
                placeholder="Search menu items..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className={styles.searchInput}
              />
            </div>
            <button
              className={styles.addBtn}
              onClick={() => openDialog()}
              type="button"
            >
              <FiPlus />
              Add New Item
            </button>
          </div>
        </div>

        {loading && (
          <div className={styles.loadingOverlay}>
            <div className={styles.loader}></div>
            <p>Loading...</p>
          </div>
        )}

        <div className={styles.tableSection}>
          <div className={styles.tableHeader}>
            <h3>
              {categories.find((cat) => cat.key === activeCategory)?.label}
              <span className={styles.itemCount}>
                ({filteredItems.length} items)
              </span>
            </h3>
          </div>

          <div className={styles.tableContainer}>
            <table className={styles.menuTable}>
              <thead>
                <tr>
                  <th>Item Details</th>
                  <th>Price</th>
                  <th>Properties</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredItems.length === 0 ? (
                  <tr>
                    <td colSpan={4} className={styles.emptyState}>
                      <div className={styles.emptyContent}>
                        <Utensils size={48} className={styles.emptyIcon} />
                        <h4>No items found</h4>
                        <p>Add your first menu item to get started</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredItems.map((item, idx) => (
                    <tr key={item._id} className={styles.tableRow}>
                      <td className={styles.itemDetails}>
                        <div className={styles.itemInfo}>
                          <div className={styles.itemName}>{item.name}</div>
                          <div className={styles.itemDescription}>
                            {item.description}
                          </div>
                        </div>
                      </td>
                      <td className={styles.priceCell}>
                        <div className={styles.price}>
                          <FaRupeeSign size={14} />
                          {Number(item.price).toFixed(2)}
                        </div>
                      </td>
                      <td className={styles.tagsCell}>
                        <div className={styles.tags}>
                          {item.isVeg ? (
                            <span className={styles.veg}>
                              <Salad size={12} /> Veg
                            </span>
                          ) : (
                            <span className={styles.nonVeg}>
                              <Flame size={12} /> Non-Veg
                            </span>
                          )}
                          {item.isSpicy && (
                            <span className={styles.spicy}>
                              <Flame size={12} /> Spicy
                            </span>
                          )}
                          {item.isGlutenFree && (
                            <span className={styles.glutenFree}>
                              <Wheat size={12} /> Gluten-free
                            </span>
                          )}
                          {item.popular && (
                            <span className={styles.popular}>
                              <Sparkles size={12} /> Popular
                            </span>
                          )}
                        </div>
                      </td>
                      <td className={styles.actionsCell}>
                        <div className={styles.actionButtons}>
                          <button
                            className={styles.editBtn}
                            title="Edit item"
                            onClick={() =>
                              openDialog(
                                menuItems.findIndex((mi) => mi._id === item._id)
                              )
                            }
                          >
                            <FiEdit2 size={16} />
                          </button>
                          <button
                            className={styles.deleteBtn}
                            title="Delete item"
                            onClick={() =>
                              deleteMenuItem(
                                menuItems.findIndex((mi) => mi._id === item._id)
                              )
                            }
                          >
                            <FiTrash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {showDialog && (
        <MenuItemDialog
          open={showDialog}
          onClose={closeDialog}
          onSave={saveMenuItem}
          editing={editingIndex !== null}
          item={currentMenuItem}
          onChange={handleMenuItemChange}
          onIngredientChange={handleIngredientChange}
          addIngredient={addIngredient}
          removeIngredient={removeIngredient}
          onAllergenChange={handleAllergenChange}
          addAllergen={addAllergen}
          removeAllergen={removeAllergen}
          categories={categories}
        />
      )}
    </div>
  );
};

export default ManageMenu;
