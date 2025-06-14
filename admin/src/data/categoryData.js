// src/data/categoryData.js

import {
    Home,
    Leaf,
    Shirt,
    FlaskConical,
    Coffee,
    Factory,
    Building2,
    BedDouble,
    HeartPulse,
  } from "lucide-react";
  
  // Main Categories with Icons
  export const categories = [
    { name: "Home Supplies", icon: Home },
    { name: "Agriculture", icon: Leaf },
    { name: "Food Product & Beverages", icon: Coffee },
    { name: "Apparel & Fashion", icon: Shirt },
    { name: "Chemicals", icon: FlaskConical },
    { name: "Industrial Supplies", icon: Factory },
    { name: "Construction & Real Estate", icon: Building2 },
    { name: "Furniture", icon: BedDouble },
    { name: "Health & Beauty", icon: HeartPulse },
    { name: "All Categories", icon: null },
  ];
  
  // Image Slider URLs
  export const slides = [
    "https://img-cdn.krishijagran.com/100537/modern-farming.png",
    "https://stylespeak.com/wp-content/uploads/2023/08/selena-gomezs-rare-beauty.jpg",
    "https://media.designcafe.com/wp-content/uploads/2021/10/07094012/modern-living-room-decor-ideas.jpg",
  ];
  
  // Subcategory Data by Main Category
  export const subcategoryData = {
    "Home Supplies": {
      "Child & Baby Care Products": ["Bio Oil", "Baby Carrier", "Baby Bath Tub", "Baby Cradle", "Diaper"],
      "Home Cleaning Products": ["Squeegees", "White Phenyl Compound", "Vacuum Purifier", "Washing Brushes", "Washroom Supplies"],
      "Kitchen Essentials": ["Plates", "Utensils", "Storage Jars"],
      "Soap & Detergents": ["Sodium Sulphate", "Detergents", "Detergents Powder", "CastileSoap"]
    },
  
    Agriculture: {
      "Dry Fruits & Nuts": ["Peanuts", "Walnuts", "Prunees", "Almond"],
      "Farming Tools and Supplies": ["Tractors", "Irrigation Pumps"],
      "Fresh Dried Preserved": ["Fresh Apple", "Blackberry Fruit", "Mango", "Dragon Fruit", "Avacado"],
      "Fresh Dried Preserved Vegetables": ["Ginger", "Celery", "Broccoli", "Tomato", "Spinach", "Cucumber"],
      "Fresh Flower and Plants": ["Rose Flower", "Red Rose", "Mango Tree", "Lotus Flower", "Yellow Rose"],
      "Food Grains & Cereals": ["Oats", "Rice", "Wheat", "Barley"],
      "Pesticides & Insectisides": ["Sulphur", "Insecticides", "Permethrin", "Trichoderma"],
      "Seeds & Plant Saplings": ["Wheat Seeds", "Corn Seeds"],
      "Soil Additives & Fertilzers": ["Vermicompost", "Neem Cake Fertilizer", "Mustard Cake", "Cow Dung", "Humic Acid", "Cow Dunk Cake"]
    },
  
    "Food Product & Beverages": {
      "Beverages": ["Apple Cider Vinegar", "Ice", "Coconut Water", "Distilled Water"],
      "Confectionery & Bakery Products": ["Cakes", "Candy & Jelly", "Peanut Butter", "Bread & Buns"],
      "Cooking Spices and Masala": ["Cinnamon", "Turmeric", "Saffron", "Dhaniya", "Garam Masala"],
      "Dairy Products": ["Ice Cream", "Milk", "Tofu", "Paneer"],
      "Dry Fruits & Nuts": ["Peanut", "Walnuts", "Prunes", "Almond", "Hazelnut"],
      "Fresh, Dried & Preserved Fruits": ["Fresh Apple", "Blackberry Fruit", "Mango", "Dragon Fruit"],
      "Fresh, Dried & Preserved Vegetables": ["Ginger", "Celery", "Broccoli", "Spinach", "Tomato"],
      "Marine Food Supplies": ["Fish", "Octopus", "Squid", "Fish Fry", "Lobster"],
      "Sweets & Namkeen": ["Moong Dal Halwa", "Nachos", "Sabudana Vada", "Vada", "Popcorn"]
    },
  
    "Apparel & Fashion": {
      "Kids Dresses & Clothing": ["Fancy Dress", "Baby Dresses", "Kids Lehenga", "Kids Frocks", "Boys T-shirts"],
      "Men, Womens & Kids Footwear": ["Nike Shoes", "Adidas Shoes", "Shoes", "Puma Shoes", "Sandals"],
      "Mens Clothing": ["Mens Shirts", "Trousers", "Lungi", "Cargo Pants", "Mens Jeans"],
      "Womens Clothing": ["Anarkali Dresses", "Designer Blouses", "Pakistani Suits", "Tops"],
      "Winter Clothing & Accessories": ["Blazers", "Sweater", "Sweatshirt", "Thermal Wear"]
    },
  
    Chemicals: {
      "Dyes &Pigments": ["Methyl Orange", "Titanium Dioxide", "Gentian Violet", "Natural Dyes"],
      "Medical and Industrial Gases": ["Oxygen", "Hydrogen", "Natural Gas", "Nitric Oxide", "Carbon Dioxide"],
      "Petrochemicals & Petroleum Products": ["Dissel", "Crude Oil", "Fossil Fuel", "Petrol"],
      "Textile Chemicals": ["Enzymes", "Viscose", "Lead Acetate", "Malachite Green", "Foaming Agent"]
    },
  
    "Industrial Supplies": {
      "Acoustic Window & Enclosures": ["Acoustic Enclosure", "Acoustic Foam", "Sound Proof Glass", "Acoustic Panel"],
      "Adhesives & Sealants": ["M Seal", "Fevikwik", "Glue", "Adhesives"],
      "Air Compressors, Accessories & Parts": ["Air Compressor", "Scroll Compressor", "Car Air Compressor", "Reciprocating Air Compressor"],
      "Bearings and Bearing Components": ["Ball Bearing", "Plummer Block", "Bimetal Bearings", "Needle Bearing", "Bearing Housing"],
      "Compression Springs & Air Springs": ["Helical Spring", "Coil Spring", "Shock Absorbers", "Disc Spring"],
      "Electrical Cables & Wires": ["Transmission Line", "Polycab Submersible Cable", "TV Cable", "Power Cables", "Underground Armoured Cable"],
      "Nuts Bolts and Fasteners": ["Rivets", "Anchor Fasteners", "Bolts", "D Shackle", "Shackle"],
      "Pumps, Pumping Machines & Parts": ["Reciprocating Pump", "Tullu Pump", "Gear Pump", "Booster Pump"]
    },
  
    "Construction & Real Estate": {
      "Bricks & Construction Materials": ["Plaster Of Paris", "Gravel", "Hollow Bricks", "Cement Bricks", "Lightweight Concrete"],
      "Construction Machinery & Equipment": ["Construction Equipment", "Brick Making Machine", "Jaw Crusher", "Fly Ash Brick Making Machine"],
      "Doors & Windows": ["UPVC Windows", "Flush Doors", "Sliding Doors", "Wooden Doors"],
      "Faucet, Showers & Bathroom Fittings": ["Bathroom Fittings", "Bathtub", "Faucet", "Health Faucet", "Bib Cock"],
      "Prefabricated & Portable Buildings": ["Greenhouse", "Polyhouse", "Prefabricated Structures", "Tensile Structures", "Portable Cabins", "Prefabricated Houses"],
      "Sanitary Ware & Fittings": ["Wash Basin", "Bidet", "Kitchen Sink", "Bio Toilet", "Toilet Accessories", "Water Closet"]
    },
  
    Furniture: {
      "Bedroom, Bathroom & Kids Furniture": ["Almirah", "Double Bed", "Beds", "Folding Bed", "Bunk Bed", "Foldable Wardrobe"],
      "Furniture Hardware & Fittings": ["Table Top", "Backrest", "Bed Frames", "Window Screens", "Furniture Hardware"],
      "Living Room and Plastic Furniture": ["Sofa Set", "Cupboard", "TV Unit", "Chairs"],
      "Metal Furniture Suppliers": ["Steel Furniture", "Recliner Chair", "Steel Table", "Steel Almirah", "Iron Table"]
    },
  
    "Health & Beauty": {
      "Aromatic & Essential Oils": ["Caster Oil", "Tea Tree Oil", "Argon Oil", "Neem Oil", "Flaxseed Oil", "Coconut Oil", "Cold Compressed Oils"],
      "Cosmetics, Hair Care & Beauty Products": ["Lipstick", "Nail Polish", "Hair Dryer", "Cosmetics", "Shampoo", "Hair Mask"],
      "Health Care Products": ["Methylcobalamin", "Adult Diapers"],
      "Medical Equipment & Supplies": ["CPAP Machine", "Holter Monitor", "Glucometer"],
      "Skin Care": ["Niacinamide", "Salicylic Acid", "Hyloronic Acid", "Tonner"]
    }
  };
  