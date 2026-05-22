import React, { useEffect, useMemo, useState } from "react";
import {
  Plus,
  Search,
  Filter,
  Star,
  Pencil,
  Trash2,
  Eye,
  Flame,
  Leaf,
  MoreVertical,
  ImagePlus,
  IndianRupee,
  View,
} from "lucide-react";
import toast from "react-hot-toast";
import ViewMenuModal from "../../components/partner/modal/ViewMenuModal";
import EditMenuModal from "../../components/partner/modal/EditMenuModal";
import AddMenuModal from "../../components/partner/modal/AddMenuModal";
import api from "../../config/api";
import ConfirmModal from "../../components/modal/ConfirmModal";

const categories = [
  "All",
  "Biryani",
  "North Indian",
  "Starter",
  "Desserts",
  "Beverages",
];

const PartnerMenu = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [isViewMenuModalOpen, setIsViewMenuModalOpen] = useState(false);
  const [isEditMenuModalOpen, setIsEditMenuModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isAddMenuModalOpen, setIsAddMenuModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [menu, setMenu] = useState([]);

  const [stats, setStats] = useState([
    {
      label: "Total Items",
      value: 0,
    },
    {
      label: "Available",
      value: 0,
    },
    {
      label: "Out of Stock",
      value: 0,
    },
    {
      label: "Top Rated",
      value: 0,
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    try {
      const res = await api.get("/partner/menu");
      const items = res.data.data;
      setMenu(items);
      setStats([
        {
          label: "Total Items",
          value: items.length,
        },
        {
          label: "Available",
          value: items.filter((item) => item.isAvailable).length,
        },
        {
          label: "Out of Stock",
          value: items.filter((item) => !item.isAvailable).length,
        },
        {
          label: "Top Rated",
          value:
            items.reduce(
              (max, item) => (item.rating > max ? item.rating : max),
              0,
            ) || 0,
        },
      ]);
    } catch (error) {
      console.log("Error in Fetching menu : ", error);
    }
  };

  const addMenuItem = async (data) => {
    try {
      const formData = new FormData();

      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("price", data.price);
      formData.append("mrp", data.mrp);
      formData.append("category", data.category);
      formData.append("preparationTime", data.preparationTime);

      formData.append("isVeg", data.isVeg);

      formData.append("isAvailable", data.isAvailable);

      // MULTIPLE IMAGES
      if (data.images && data.images.length > 0) {
        data.images.forEach((image) => {
          formData.append("images", image);
        });
      }

      const res = await api.post("/partner/addMenu", formData);

      setMenu((prev) => [res.data.data, ...prev]);

      toast.success("Menu item added successfully");

      setIsAddMenuModalOpen(false);

      fetchMenu();
    } catch (error) {
      console.log("Error in adding menu item : ", error);

      toast.error(error.response?.data?.message || "Failed to add menu item");
    }
  };

  const editMenuItem = async (data) => {
    try {
      const formData = new FormData();

      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("price", data.price);
      formData.append("mrp", data.mrp);
      formData.append("category", data.category);
      formData.append("preparationTime", data.preparationTime);

      formData.append("isVeg", data.isVeg);

      formData.append("isAvailable", data.isAvailable);

      // MULTIPLE IMAGES
      if (data.images && data.images.length > 0) {
        data.images.forEach((image) => {
          formData.append("images", image);
        });
      }

      const res = await api.put(
        `/partner/updateMenu/${selectedItem._id}`,
        formData,
      );

      setMenu((prev) => [res.data.data, ...prev]);

      toast.success("Menu item updated successfully");

      setIsEditMenuModalOpen(false);
      setSelectedItem(null);

      fetchMenu();
    } catch (error) {
      console.log("Error in updating menu item : ", error);

      toast.error(
        error.response?.data?.message || "Failed to update menu item",
      );
    }
  };

  const deleteMenuItem = async () => {
    try {
      await api.delete(`/partner/deleteMenu/${selectedItem._id}`);

      setMenu((prev) => prev.filter((item) => item._id !== selectedItem._id));

      toast.success("Menu item deleted successfully");
      setIsConfirmModalOpen(false);
      setSelectedItem(null);
    } catch (error) {
      console.log("Error in deleting menu item : ", error);

      toast.error(
        error.response?.data?.message || "Failed to delete menu item",
      );
    }
  };

  const filteredItems = useMemo(() => {
    return menu.filter((item) => {
      const categoryMatch =
        activeCategory === "All" ? true : item.category === activeCategory;

      const searchMatch = item.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      return categoryMatch && searchMatch;
    });
  }, [menu, activeCategory, searchQuery]);

  return (
    <main className="min-h-screen bg-[#faf7f4] text-slate-900">
      <div className="">
        {/* HEADER */}
        <header className="sticky top-0 z-30 border-b border-[#f1e5dd] bg-white/90 backdrop-blur-xl">
          <div className="flex flex-col gap-5 px-4 py-5 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-orange-500">
                Restaurant Menu
              </p>

              <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-900">
                Menu Management
              </h1>

              <p className="mt-2 text-sm text-slate-500">
                Manage dishes, pricing, categories, availability, and featured
                items.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setIsAddMenuModalOpen((p) => !p)}
                className="inline-flex items-center gap-2 rounded-2xl bg-orange-500 px-5 py-3 text-sm font-semibold text-white shadow-xl shadow-orange-200 transition hover:bg-orange-600"
              >
                <Plus size={18} />
                Add New Item
              </button>
            </div>
          </div>
        </header>

        <section className="space-y-8 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          {/* STATS */}
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-[2rem] border border-[#f1e5dd] bg-white p-6 shadow-sm"
              >
                <p className="text-sm font-semibold text-slate-500">
                  {stat.label}
                </p>

                <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-900">
                  {stat.value}
                </h2>
              </div>
            ))}
          </div>

          {/* FILTER BAR */}
          <div className="rounded-[2rem] border border-[#f1e5dd] bg-white p-5 shadow-sm">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              {/* SEARCH */}
              <div className="flex flex-1 items-center gap-3 rounded-2xl border border-[#f1e5dd] bg-[#faf7f4] px-4 py-3">
                <Search size={18} className="text-orange-500" />

                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search menu items..."
                  className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
                />
              </div>

              {/* FILTERS */}
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`rounded-2xl px-4 py-2 text-sm font-semibold transition ${
                      activeCategory === category
                        ? "bg-orange-500 text-white shadow-lg shadow-orange-200"
                        : "border border-[#f1e5dd] bg-white text-slate-600 hover:border-orange-200 hover:bg-orange-50 hover:text-orange-500"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* MENU GRID */}
          <div className="grid gap-6 md:grid-cols-2 2xl:grid-cols-3">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="overflow-hidden rounded-[2rem] border border-[#f1e5dd] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              >
                {/* IMAGE */}
                <div className="relative h-60 overflow-hidden">
                  <img
                    src={
                      item?.images?.[0]?.url ||
                      `https://placehold.co/600x400/orange/white?text=${item.name || "No Image"}`
                    }
                    alt={item.name}
                    className="h-full w-full object-cover transition duration-500 hover:scale-105"
                  />

                  {/* BADGES */}
                  <div className="absolute left-4 top-4 flex gap-2">
                    <div
                      className={`rounded-full px-3 py-1 text-xs font-bold text-white ${
                        item.isVeg ? "bg-emerald-500" : "bg-red-500"
                      }`}
                    >
                      {item.isVeg ? "Veg" : "Non Veg"}
                    </div>

                    <div className="rounded-full bg-black/60 px-3 py-1 text-xs font-bold text-white backdrop-blur-md">
                      {item.category}
                    </div>
                  </div>

                  {/* STATUS */}
                  <div className="absolute right-4 top-4">
                    <div
                      className={`rounded-full px-3 py-1 text-xs font-bold ${
                        item.isAvailable
                          ? "bg-emerald-50 text-emerald-600"
                          : "bg-red-50 text-red-500"
                      }`}
                    >
                      {item.isAvailable ? "Available" : "Out of Stock"}
                    </div>
                  </div>
                </div>

                {/* CONTENT */}
                <div className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h2 className="text-xl font-black tracking-tight text-slate-900">
                        {item.name}
                      </h2>

                      <p className="mt-2 text-sm leading-7 text-slate-500">
                        {item.description}
                      </p>
                    </div>

                    {/* <button className="flex h-10 w-10 items-center justify-center rounded-2xl border border-[#f1e5dd] bg-white text-slate-500 transition hover:border-orange-200 hover:bg-orange-50 hover:text-orange-500">
                      <MoreVertical size={18} />
                    </button> */}
                  </div>

                  {/* STATS */}
                  <div className="mt-5 flex flex-wrap gap-3">
                    <div className="flex items-center gap-2 rounded-2xl bg-orange-50 px-4 py-2 text-sm font-semibold text-orange-600">
                      <IndianRupee size={15} />
                      {item.price}
                    </div>

                    <div className="flex items-center gap-2 rounded-2xl bg-[#faf7f4] px-4 py-2 text-sm font-semibold text-slate-700">
                      <Star
                        size={15}
                        fill="currentColor"
                        className="text-orange-500"
                      />
                      {item.rating}
                    </div>

                    <div className="flex items-center gap-2 rounded-2xl bg-[#faf7f4] px-4 py-2 text-sm font-semibold text-slate-700">
                      <Flame size={15} className="text-orange-500" />
                      {item.orders} Orders
                    </div>
                  </div>

                  {/* REVIEWS */}
                  <div className="mt-5 flex items-center justify-between rounded-2xl border border-[#f5ebe4] bg-[#fffaf7] px-4 py-4">
                    <div>
                      <p className="text-sm font-bold text-slate-900">
                        Customer Reviews
                      </p>

                      <p className="mt-1 text-xs text-slate-500">
                        {item.reviews} verified reviews
                      </p>
                    </div>

                    <div className="flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-sm font-bold text-emerald-600">
                      <Star size={14} fill="currentColor" />
                      {item.rating}
                    </div>
                  </div>

                  {/* ACTIONS */}
                  <div className="mt-5 grid grid-cols-3 gap-3">
                    <button
                      onClick={() => {
                        setSelectedItem(item);
                        setIsViewMenuModalOpen((prev) => !prev);
                      }}
                      className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-[#f1e5dd] bg-white px-3 py-4 text-xs font-semibold text-slate-600 transition hover:border-orange-200 hover:bg-orange-50 hover:text-orange-500"
                    >
                      <Eye size={18} />
                      View
                    </button>

                    <button
                      onClick={() => {
                        setSelectedItem(item);
                        setIsEditMenuModalOpen((prev) => !prev);
                      }}
                      className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-[#f1e5dd] bg-white px-3 py-4 text-xs font-semibold text-slate-600 transition hover:border-orange-200 hover:bg-orange-50 hover:text-orange-500"
                    >
                      <Pencil size={18} />
                      Edit
                    </button>

                    <button
                      onClick={() => {
                        setSelectedItem(item);
                        setIsConfirmModalOpen((p) => !p);
                      }}
                      className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-red-100 bg-red-50 px-3 py-4 text-xs font-semibold text-red-500 transition hover:bg-red-100"
                    >
                      <Trash2 size={18} />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* EMPTY STATE */}
          {filteredItems.length === 0 && (
            <div className="flex flex-col items-center justify-center rounded-[2rem] border border-dashed border-[#f1e5dd] bg-white px-6 py-20 text-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-[2rem] bg-orange-50 text-orange-500">
                <Search size={32} />
              </div>

              <h2 className="mt-6 text-2xl font-black tracking-tight text-slate-900">
                No menu items found
              </h2>

              <p className="mt-3 max-w-md text-sm leading-7 text-slate-500">
                Try changing your search query or selected category.
              </p>
            </div>
          )}
        </section>
      </div>

      {isAddMenuModalOpen && (
        <AddMenuModal
          open={isAddMenuModalOpen}
          onClose={() => setIsAddMenuModalOpen(false)}
          onCreate={addMenuItem}
        />
      )}

      {isViewMenuModalOpen && (
        <ViewMenuModal
          open={isViewMenuModalOpen}
          onClose={() => {
            setIsViewMenuModalOpen(false);
            setSelectedItem(null);
          }}
          onEdit={() => {
            setIsViewMenuModalOpen(false);
            setIsEditMenuModalOpen(true);
          }}
          item={selectedItem}
        />
      )}

      {isEditMenuModalOpen && (
        <EditMenuModal
          open={isEditMenuModalOpen}
          onClose={() => {
            setIsEditMenuModalOpen(false);
            setSelectedItem(null);
          }}
          item={selectedItem}
          onSave={editMenuItem}
        />
      )}

      {isConfirmModalOpen && (
        <ConfirmModal
          open={isConfirmModalOpen}
          onClose={() => {
            setIsConfirmModalOpen(false);
            setSelectedItem(null);
          }}
          title={`Delete ${selectedItem?.name}`}
          image={selectedItem?.images?.[0]?.url}
          description="Are you sure you want to delete this menu item? This action cannot be undone."
          onConfirm={deleteMenuItem}
        />
      )}
    </main>
  );
};

export default PartnerMenu;
