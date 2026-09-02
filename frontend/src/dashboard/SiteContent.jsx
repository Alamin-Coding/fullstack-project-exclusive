import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const API_URL = import.meta.env.VITE_AUTH_URL;

const inputClass =
  "w-full rounded-3xl border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20";

const emptyContent = {
  headerPromo: { text: "", linkText: "", linkUrl: "/shop" },
  banners: [{ imageUrl: "" }],
  flashSale: { title: "", heading: "", endDate: "" },
  bestSelling: { title: "", heading: "" },
  ourProducts: { title: "", heading: "" },
  musicPromo: { badge: "", heading: "", buttonText: "", buttonUrl: "/shop", imageUrl: "", endDate: "" },
  newArrival: { title: "", heading: "", items: [{ title: "", description: "", imageUrl: "", linkUrl: "/shop" }] },
  services: [{ title: "", subtitle: "" }],
  footer: { brand: "", subscribeText: "", address: "", email: "", phone: "", copyright: "" },
  about: {
    title: "",
    paragraph1: "",
    paragraph2: "",
    imageUrl: "",
    stats: [{ count: "", heading: "" }],
    team: [{ name: "", role: "", imageUrl: "" }],
  },
  contact: {
    phoneLabel: "",
    phoneText: "",
    phone: "",
    emailLabel: "",
    emailText: "",
    email1: "",
    email2: "",
  },
};

const mergeSiteContent = (site = {}) => ({
  headerPromo: { ...emptyContent.headerPromo, ...(site.headerPromo || {}) },
  banners: site.banners?.length ? site.banners : emptyContent.banners,
  flashSale: { ...emptyContent.flashSale, ...(site.flashSale || {}) },
  bestSelling: { ...emptyContent.bestSelling, ...(site.bestSelling || {}) },
  ourProducts: { ...emptyContent.ourProducts, ...(site.ourProducts || {}) },
  musicPromo: { ...emptyContent.musicPromo, ...(site.musicPromo || {}) },
  newArrival: {
    ...emptyContent.newArrival,
    ...(site.newArrival || {}),
    items: site.newArrival?.items?.length ? site.newArrival.items : emptyContent.newArrival.items,
  },
  services: site.services?.length ? site.services : emptyContent.services,
  footer: { ...emptyContent.footer, ...(site.footer || {}) },
  about: {
    ...emptyContent.about,
    ...(site.about || {}),
    stats: site.about?.stats?.length ? site.about.stats : emptyContent.about.stats,
    team: site.about?.team?.length ? site.about.team : emptyContent.about.team,
  },
  contact: { ...emptyContent.contact, ...(site.contact || {}) },
});

const buildPayload = (values) => mergeSiteContent(values);

const SiteContent = () => {
  const [values, setValues] = useState(emptyContent);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const response = await axios.get(`${API_URL}/site`);
        setValues(mergeSiteContent(response.data.site));
      } catch (error) {
        console.log(error);
        toast.error("Failed to load storefront content");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const updateGroup = (group, field, value) => {
    setValues((prev) => ({
      ...prev,
      [group]: {
        ...(emptyContent[group] || {}),
        ...(prev[group] || {}),
        [field]: value,
      },
    }));
  };

  const updateListItem = (group, index, field, value) => {
    setValues((prev) => ({
      ...prev,
      [group]: prev[group].map((item, i) => (i === index ? { ...item, [field]: value } : item)),
    }));
  };

  const updateNestedList = (group, list, index, field, value) => {
    setValues((prev) => ({
      ...prev,
      [group]: {
        ...prev[group],
        [list]: prev[group][list].map((item, i) => (i === index ? { ...item, [field]: value } : item)),
      },
    }));
  };

  const handleSave = async (event) => {
    event.preventDefault();
    setSaving(true);
    try {
      const payload = buildPayload(values);
      const response = await axios.put(`${API_URL}/site`, payload);

      if (response.data.success) {
        toast.success(response.data.message);
        if (response.data.site) setValues(mergeSiteContent(response.data.site));
      } else {
        toast.error(response.data.message || "Failed to save content");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to save content");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <p className="text-slate-500">Loading storefront content...</p>;
  }

  return (
    <form onSubmit={handleSave} noValidate className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-primary">Storefront UI</p>
          <h2 className="mt-2 text-2xl font-semibold text-slate-900">Edit Exclusive pages</h2>
          <p className="mt-1 text-sm text-slate-500">These fields match header, homepage, about, contact, and footer.</p>
        </div>
        <button
          type="submit"
          disabled={saving}
          className="rounded-3xl bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#b63636] disabled:opacity-60"
        >
          {saving ? "Saving..." : "Save all changes"}
        </button>
      </div>

      <section className="space-y-4 rounded-3xl border border-slate-200 p-5">
        <h3 className="text-lg font-semibold">Header promo</h3>
        <input type="text" className={inputClass} placeholder="Promo text" value={values.headerPromo?.text || ""} onChange={(e) => updateGroup("headerPromo", "text", e.target.value)} />
        <div className="grid gap-4 md:grid-cols-2">
          <input type="text" className={inputClass} placeholder="Link text" value={values.headerPromo?.linkText || ""} onChange={(e) => updateGroup("headerPromo", "linkText", e.target.value)} />
          <input type="text" className={inputClass} placeholder="/shop" value={values.headerPromo?.linkUrl || ""} onChange={(e) => updateGroup("headerPromo", "linkUrl", e.target.value)} />
        </div>
      </section>

      <section className="space-y-4 rounded-3xl border border-slate-200 p-5">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Home banners</h3>
          <button type="button" className="text-sm font-medium text-primary" onClick={() => setValues((prev) => ({ ...prev, banners: [...(prev.banners || []), { imageUrl: "" }] }))}>
            Add banner
          </button>
        </div>
        {(values.banners || []).map((banner, index) => (
          <input key={index} className={inputClass} placeholder="Banner image URL" value={banner.imageUrl || ""} onChange={(e) => updateListItem("banners", index, "imageUrl", e.target.value)} />
        ))}
      </section>

      <section className="space-y-4 rounded-3xl border border-slate-200 p-5">
        <h3 className="text-lg font-semibold">Flash Sales</h3>
        <div className="grid gap-4 md:grid-cols-3">
          <input className={inputClass} placeholder="Today's" value={values.flashSale?.title || ""} onChange={(e) => updateGroup("flashSale", "title", e.target.value)} />
          <input className={inputClass} placeholder="Flash Sales" value={values.flashSale?.heading || ""} onChange={(e) => updateGroup("flashSale", "heading", e.target.value)} />
          <input className={inputClass} placeholder="2026-12-31 23:59:00" value={values.flashSale?.endDate || ""} onChange={(e) => updateGroup("flashSale", "endDate", e.target.value)} />
        </div>
      </section>

      <section className="space-y-4 rounded-3xl border border-slate-200 p-5">
        <h3 className="text-lg font-semibold">Best selling & Our products headings</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <input className={inputClass} placeholder="This Month" value={values.bestSelling?.title || ""} onChange={(e) => updateGroup("bestSelling", "title", e.target.value)} />
          <input className={inputClass} placeholder="Best Selling Products" value={values.bestSelling?.heading || ""} onChange={(e) => updateGroup("bestSelling", "heading", e.target.value)} />
          <input className={inputClass} placeholder="Our Products" value={values.ourProducts?.title || ""} onChange={(e) => updateGroup("ourProducts", "title", e.target.value)} />
          <input className={inputClass} placeholder="Explore Our Products" value={values.ourProducts?.heading || ""} onChange={(e) => updateGroup("ourProducts", "heading", e.target.value)} />
        </div>
      </section>

      <section className="space-y-4 rounded-3xl border border-slate-200 p-5">
        <h3 className="text-lg font-semibold">Music promo (JBL section)</h3>
        <input className={inputClass} placeholder="Categories" value={values.musicPromo?.badge || ""} onChange={(e) => updateGroup("musicPromo", "badge", e.target.value)} />
        <input className={inputClass} placeholder="Enhance Your Music Experience" value={values.musicPromo?.heading || ""} onChange={(e) => updateGroup("musicPromo", "heading", e.target.value)} />
        <div className="grid gap-4 md:grid-cols-2">
          <input className={inputClass} placeholder="Buy Now!" value={values.musicPromo?.buttonText || ""} onChange={(e) => updateGroup("musicPromo", "buttonText", e.target.value)} />
          <input className={inputClass} placeholder="/shop" value={values.musicPromo?.buttonUrl || ""} onChange={(e) => updateGroup("musicPromo", "buttonUrl", e.target.value)} />
          <input className={inputClass} placeholder="Background image URL" value={values.musicPromo?.imageUrl || ""} onChange={(e) => updateGroup("musicPromo", "imageUrl", e.target.value)} />
          <input className={inputClass} placeholder="Countdown date" value={values.musicPromo?.endDate || ""} onChange={(e) => updateGroup("musicPromo", "endDate", e.target.value)} />
        </div>
      </section>

      <section className="space-y-4 rounded-3xl border border-slate-200 p-5">
        <h3 className="text-lg font-semibold">New Arrival</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <input className={inputClass} placeholder="Featured" value={values.newArrival?.title || ""} onChange={(e) => updateGroup("newArrival", "title", e.target.value)} />
          <input className={inputClass} placeholder="New Arrival" value={values.newArrival?.heading || ""} onChange={(e) => updateGroup("newArrival", "heading", e.target.value)} />
        </div>
        {(values.newArrival?.items || []).map((item, index) => (
          <div key={index} className="grid gap-3 rounded-2xl bg-slate-50 p-4 md:grid-cols-2">
            <input className={inputClass} placeholder="Title" value={item.title || ""} onChange={(e) => updateNestedList("newArrival", "items", index, "title", e.target.value)} />
            <input className={inputClass} placeholder="Image URL" value={item.imageUrl || ""} onChange={(e) => updateNestedList("newArrival", "items", index, "imageUrl", e.target.value)} />
            <input className={`${inputClass} md:col-span-2`} placeholder="Description" value={item.description || ""} onChange={(e) => updateNestedList("newArrival", "items", index, "description", e.target.value)} />
          </div>
        ))}
      </section>

      <section className="space-y-4 rounded-3xl border border-slate-200 p-5">
        <h3 className="text-lg font-semibold">Services</h3>
        {(values.services || []).map((item, index) => (
          <div key={index} className="grid gap-3 md:grid-cols-2">
            <input className={inputClass} placeholder="Title" value={item.title || ""} onChange={(e) => updateListItem("services", index, "title", e.target.value)} />
            <input className={inputClass} placeholder="Subtitle" value={item.subtitle || ""} onChange={(e) => updateListItem("services", index, "subtitle", e.target.value)} />
          </div>
        ))}
      </section>

      <section className="space-y-4 rounded-3xl border border-slate-200 p-5">
        <h3 className="text-lg font-semibold">About page</h3>
        <input className={inputClass} placeholder="Our Story" value={values.about?.title || ""} onChange={(e) => updateGroup("about", "title", e.target.value)} />
        <textarea className={inputClass} rows={3} value={values.about?.paragraph1 || ""} onChange={(e) => updateGroup("about", "paragraph1", e.target.value)} />
        <textarea className={inputClass} rows={3} value={values.about?.paragraph2 || ""} onChange={(e) => updateGroup("about", "paragraph2", e.target.value)} />
        <input className={inputClass} placeholder="About image URL" value={values.about?.imageUrl || ""} onChange={(e) => updateGroup("about", "imageUrl", e.target.value)} />
        {(values.about?.stats || []).map((item, index) => (
          <div key={index} className="grid gap-3 md:grid-cols-2">
            <input className={inputClass} placeholder="10.5k" value={item.count || ""} onChange={(e) => updateNestedList("about", "stats", index, "count", e.target.value)} />
            <input className={inputClass} placeholder="Stat heading" value={item.heading || ""} onChange={(e) => updateNestedList("about", "stats", index, "heading", e.target.value)} />
          </div>
        ))}
        {(values.about?.team || []).map((item, index) => (
          <div key={index} className="grid gap-3 md:grid-cols-3">
            <input className={inputClass} placeholder="Name" value={item.name || ""} onChange={(e) => updateNestedList("about", "team", index, "name", e.target.value)} />
            <input className={inputClass} placeholder="Role" value={item.role || ""} onChange={(e) => updateNestedList("about", "team", index, "role", e.target.value)} />
            <input className={inputClass} placeholder="Image URL" value={item.imageUrl || ""} onChange={(e) => updateNestedList("about", "team", index, "imageUrl", e.target.value)} />
          </div>
        ))}
      </section>

      <section className="space-y-4 rounded-3xl border border-slate-200 p-5">
        <h3 className="text-lg font-semibold">Contact page</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <input className={inputClass} placeholder="Call To Us" value={values.contact?.phoneLabel || ""} onChange={(e) => updateGroup("contact", "phoneLabel", e.target.value)} />
          <input className={inputClass} placeholder="Phone" value={values.contact?.phone || ""} onChange={(e) => updateGroup("contact", "phone", e.target.value)} />
          <input className={`${inputClass} md:col-span-2`} placeholder="Availability text" value={values.contact?.phoneText || ""} onChange={(e) => updateGroup("contact", "phoneText", e.target.value)} />
          <input className={inputClass} placeholder="Write To US" value={values.contact?.emailLabel || ""} onChange={(e) => updateGroup("contact", "emailLabel", e.target.value)} />
          <input className={inputClass} placeholder="Email text" value={values.contact?.emailText || ""} onChange={(e) => updateGroup("contact", "emailText", e.target.value)} />
          <input className={inputClass} placeholder="customer email" value={values.contact?.email1 || ""} onChange={(e) => updateGroup("contact", "email1", e.target.value)} />
          <input className={inputClass} placeholder="support email" value={values.contact?.email2 || ""} onChange={(e) => updateGroup("contact", "email2", e.target.value)} />
        </div>
      </section>

      <section className="space-y-4 rounded-3xl border border-slate-200 p-5">
        <h3 className="text-lg font-semibold">Footer</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <input className={inputClass} placeholder="Exclusive" value={values.footer?.brand || ""} onChange={(e) => updateGroup("footer", "brand", e.target.value)} />
          <input className={inputClass} placeholder="Subscribe text" value={values.footer?.subscribeText || ""} onChange={(e) => updateGroup("footer", "subscribeText", e.target.value)} />
          <input className={`${inputClass} md:col-span-2`} placeholder="Address" value={values.footer?.address || ""} onChange={(e) => updateGroup("footer", "address", e.target.value)} />
          <input className={inputClass} placeholder="Email" value={values.footer?.email || ""} onChange={(e) => updateGroup("footer", "email", e.target.value)} />
          <input className={inputClass} placeholder="Phone" value={values.footer?.phone || ""} onChange={(e) => updateGroup("footer", "phone", e.target.value)} />
          <input className={`${inputClass} md:col-span-2`} placeholder="Copyright" value={values.footer?.copyright || ""} onChange={(e) => updateGroup("footer", "copyright", e.target.value)} />
        </div>
      </section>
    </form>
  );
};

export default SiteContent;
