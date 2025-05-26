import React from "react";
import styles from "./MenuItemDialog.module.css";
import { FiPlus, FiEdit2, FiX } from "react-icons/fi";
import {
  Utensils,
  Tag,
  Star,
  Image as LucideImage,
  Layers3,
  Salad,
  Flame,
  Wheat,
  Sparkles,
  List,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";

const MenuItemDialog = ({
  open,
  onClose,
  onSave,
  editing,
  item,
  onChange,
  onIngredientChange,
  addIngredient,
  removeIngredient,
  onAllergenChange,
  addAllergen,
  removeAllergen,
  categories,
}) => {
  if (!open) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.dialog}>
        <div className={styles.header}>
          <h2>
            {editing ? (
              <>
                <FiEdit2 /> Edit Menu Item
              </>
            ) : (
              <>
                <FiPlus /> Add New Menu Item
              </>
            )}
          </h2>
          <button className={styles.closeBtn} onClick={onClose} title="Close">
            <FiX size={22} />
          </button>
        </div>
        <div className={styles.body}>
          <div className={styles.section}>
            <div className={styles.group}>
              <label>
                <Utensils size={16} /> Item Name
              </label>
              <input
                type="text"
                name="name"
                value={item.name}
                onChange={onChange}
                required
              />
            </div>
            <div className={styles.group}>
              <label>
                <Tag size={16} /> Description
              </label>
              <textarea
                name="description"
                value={item.description}
                onChange={onChange}
                required
                rows={2}
              />
            </div>
            <div className={styles.groupRow}>
              <div className={styles.group}>
                <label>
                  <Star size={16} /> Price
                </label>
                <input
                  type="number"
                  name="price"
                  value={item.price}
                  onChange={onChange}
                  min="0"
                  step="0.01"
                  required
                />
              </div>
              <div className={styles.group}>
                <label>
                  <LucideImage size={16} /> Image URL
                </label>
                <input
                  type="url"
                  name="image"
                  value={item.image}
                  onChange={onChange}
                  required
                />
              </div>
            </div>
            <div className={styles.group}>
              <label>
                <Layers3 size={16} /> Category
              </label>
              <select
                name="category"
                value={item.category}
                onChange={onChange}
                required
              >
                {categories.map((cat) => (
                  <option key={cat.key} value={cat.key}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className={styles.section}>
            <div className={styles.checks}>
              <label>
                <Salad size={16} />
                <input
                  type="checkbox"
                  name="isVeg"
                  checked={item.isVeg}
                  onChange={onChange}
                />
                Vegetarian
              </label>
              <label>
                <Flame size={16} />
                <input
                  type="checkbox"
                  name="isSpicy"
                  checked={item.isSpicy}
                  onChange={onChange}
                />
                Spicy
              </label>
              <label>
                <Wheat size={16} />
                <input
                  type="checkbox"
                  name="isGlutenFree"
                  checked={item.isGlutenFree}
                  onChange={onChange}
                />
                Gluten Free
              </label>
              <label>
                <Sparkles size={16} />
                <input
                  type="checkbox"
                  name="popular"
                  checked={item.popular}
                  onChange={onChange}
                />
                Popular
              </label>
            </div>
          </div>
          <div className={styles.section}>
            <label>
              <List size={16} /> Ingredients
            </label>
            {item.ingredients.map((ingredient, i) => (
              <div key={i} className={styles.inlineArray}>
                <input
                  type="text"
                  value={ingredient}
                  onChange={(e) => onIngredientChange(i, e.target.value)}
                  placeholder="Ingredient"
                />
                <button
                  type="button"
                  onClick={() => removeIngredient(i)}
                  className={styles.removeBtn}
                  disabled={item.ingredients.length === 1}
                  title="Remove"
                >
                  <FiX />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addIngredient}
              className={styles.addArrayBtn}
            >
              <FiPlus /> Add Ingredient
            </button>
          </div>
          <div className={styles.section}>
            <label>
              <AlertTriangle size={16} /> Allergen Info
            </label>
            {item.allergenInfo.map((allergen, i) => (
              <div key={i} className={styles.inlineArray}>
                <input
                  type="text"
                  value={allergen}
                  onChange={(e) => onAllergenChange(i, e.target.value)}
                  placeholder="Allergen"
                />
                <button
                  type="button"
                  onClick={() => removeAllergen(i)}
                  className={styles.removeBtn}
                  disabled={item.allergenInfo.length === 1}
                  title="Remove"
                >
                  <FiX />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addAllergen}
              className={styles.addArrayBtn}
            >
              <FiPlus /> Add Allergen
            </button>
          </div>
          <div className={styles.section}>
            <h3>
              <CheckCircle size={16} /> Nutrition Info
            </h3>
            <div className={styles.nutritionGrid}>
              <div>
                <label>Calories</label>
                <input
                  type="number"
                  name="nutritionInfo.calories"
                  value={item.nutritionInfo.calories}
                  onChange={onChange}
                  min="0"
                />
              </div>
              <div>
                <label>Protein (g)</label>
                <input
                  type="number"
                  name="nutritionInfo.protein"
                  value={item.nutritionInfo.protein}
                  onChange={onChange}
                  min="0"
                  step="0.1"
                />
              </div>
              <div>
                <label>Carbs (g)</label>
                <input
                  type="number"
                  name="nutritionInfo.carbs"
                  value={item.nutritionInfo.carbs}
                  onChange={onChange}
                  min="0"
                  step="0.1"
                />
              </div>
              <div>
                <label>Fat (g)</label>
                <input
                  type="number"
                  name="nutritionInfo.fat"
                  value={item.nutritionInfo.fat}
                  onChange={onChange}
                  min="0"
                  step="0.1"
                />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.actions}>
          <button className={styles.cancel} onClick={onClose}>
            Cancel
          </button>
          <button
            className={styles.save}
            onClick={onSave}
            disabled={!item.name || !item.description || !item.price}
          >
            {editing ? "Update" : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuItemDialog;
