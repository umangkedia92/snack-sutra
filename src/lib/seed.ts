import db from "./db";
import { initializeSchema } from "./schema";

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

const CATEGORIES = [
  { name: "Starters", display_order: 1 },
  { name: "Main Course", display_order: 2 },
  { name: "Breads", display_order: 3 },
  { name: "Rice & Biryani", display_order: 4 },
  { name: "Desserts", display_order: 5 },
  { name: "Beverages", display_order: 6 },
];

const MENU_ITEMS = [
  { name: "Paneer Tikka", description: "Succulent cottage cheese cubes marinated in aromatic spices, char-grilled to perfection in our tandoor.", price: 249, category: "Starters", is_featured: 1 },
  { name: "Hara Bhara Kebab", description: "Crispy spinach and green pea patties with a hint of mint, served with tangy chutney.", price: 199, category: "Starters", is_featured: 0 },
  { name: "Crispy Corn", description: "Golden-fried sweet corn tossed with aromatic spices and fresh curry leaves.", price: 179, category: "Starters", is_featured: 0 },
  { name: "Mushroom Galouti", description: "Melt-in-your-mouth mushroom kebabs inspired by the royal kitchens of Lucknow.", price: 229, category: "Starters", is_featured: 1 },
  { name: "Dal Makhani", description: "Slow-cooked black lentils simmered overnight in a rich, buttery tomato gravy.", price: 279, category: "Main Course", is_featured: 1 },
  { name: "Palak Paneer", description: "Fresh cottage cheese cubes in a vibrant, silky spinach gravy with a touch of cream.", price: 269, category: "Main Course", is_featured: 0 },
  { name: "Paneer Butter Masala", description: "Soft paneer cubes in a luscious, creamy tomato-cashew sauce. A timeless classic.", price: 289, category: "Main Course", is_featured: 1 },
  { name: "Chole Masala", description: "Hearty chickpeas slow-cooked in a robust blend of warming spices and tangy tomatoes.", price: 229, category: "Main Course", is_featured: 0 },
  { name: "Malai Kofta", description: "Delicate paneer and potato dumplings floating in a rich, creamy cashew gravy.", price: 299, category: "Main Course", is_featured: 0 },
  { name: "Garlic Naan", description: "Soft, pillowy flatbread topped with fragrant garlic and fresh coriander, baked in tandoor.", price: 59, category: "Breads", is_featured: 0 },
  { name: "Butter Roti", description: "Whole wheat flatbread brushed with pure butter, soft and perfectly puffed.", price: 39, category: "Breads", is_featured: 0 },
  { name: "Cheese Naan", description: "Fluffy naan stuffed with melted cheese, golden-baked in our clay oven.", price: 79, category: "Breads", is_featured: 0 },
  { name: "Laccha Paratha", description: "Flaky, layered whole wheat paratha with a crispy exterior and soft center.", price: 49, category: "Breads", is_featured: 0 },
  { name: "Veg Biryani", description: "Fragrant basmati rice layered with seasonal vegetables and aromatic whole spices.", price: 249, category: "Rice & Biryani", is_featured: 0 },
  { name: "Paneer Biryani", description: "Rich, layered biryani with marinated paneer cubes, saffron, and caramelized onions.", price: 289, category: "Rice & Biryani", is_featured: 0 },
  { name: "Jeera Rice", description: "Fluffy basmati rice tempered with cumin seeds, a perfect accompaniment to any curry.", price: 149, category: "Rice & Biryani", is_featured: 0 },
  { name: "Gulab Jamun", description: "Two soft, golden milk dumplings soaked in warm rose-cardamom scented syrup.", price: 99, category: "Desserts", is_featured: 0 },
  { name: "Rasmalai", description: "Two delicate cottage cheese discs in chilled, saffron-infused sweetened milk.", price: 129, category: "Desserts", is_featured: 0 },
  { name: "Brownie with Ice Cream", description: "Warm, fudgy chocolate brownie topped with a scoop of creamy vanilla ice cream.", price: 179, category: "Desserts", is_featured: 0 },
  { name: "Masala Chai", description: "Aromatic Indian tea brewed with fresh ginger, cardamom, and warming spices.", price: 49, category: "Beverages", is_featured: 0 },
  { name: "Mango Lassi", description: "Creamy, chilled yogurt drink blended with sweet Alphonso mango pulp.", price: 99, category: "Beverages", is_featured: 0 },
  { name: "Cold Coffee", description: "Rich, chilled coffee blended with milk and a hint of vanilla. Perfectly refreshing.", price: 129, category: "Beverages", is_featured: 0 },
];

export async function seedDatabase() {
  await initializeSchema();

  const existing = await db.execute("SELECT COUNT(*) as count FROM categories");
  if ((existing.rows[0].count as number) > 0) return;

  for (const cat of CATEGORIES) {
    await db.execute({
      sql: "INSERT INTO categories (name, slug, display_order) VALUES (?, ?, ?)",
      args: [cat.name, slugify(cat.name), cat.display_order],
    });
  }

  const cats = await db.execute("SELECT id, name FROM categories");
  const catMap = new Map(cats.rows.map((r) => [r.name as string, r.id as number]));

  for (const item of MENU_ITEMS) {
    const categoryId = catMap.get(item.category);
    if (!categoryId) continue;
    await db.execute({
      sql: `INSERT INTO menu_items (name, slug, description, price, category_id, is_featured)
            VALUES (?, ?, ?, ?, ?, ?)`,
      args: [item.name, slugify(item.name), item.description, item.price, categoryId, item.is_featured],
    });
  }
}
