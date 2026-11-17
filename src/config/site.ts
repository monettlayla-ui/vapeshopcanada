export const siteConfig = {
  name: "VAPE SHOP CANADA",
  country: "Canada",
  description:
    "Disposable Vapes Canada. Buy quality disposable vapes, vape pods, vape devices and e-liquids online in Canada.",
  logo: {
    light: "/images/logo-white.png", // for dark backgrounds (hero)
    dark: "/images/logo-dark.png", // for light backgrounds (inner pages)
    width: 602,
    height: 432,
  },
};

export type NavItem = { label: string; href: string };

export const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Shop All", href: "/shop" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Cart", href: "/cart" },
];

/** Footer links keep "My account", which is not in the top nav. */
export const footerNavItems: NavItem[] = [
  ...navItems.slice(0, 4),
  { label: "My account", href: "/my-account" },
  ...navItems.slice(4),
];

export const emptyCartContent = {
  title: "Cart",
  message: "Your cart is currently empty.",
  cta: { label: "Return to shop", href: "/shop" },
};

export const heroContent = {
  eyebrow: "Canada's #1 Online Vape Shop",
  titleTop: "Vape Shop",
  titleBottom: "CANADA",
  subtitle:
    "Shop from our top quality and authentic disposable Vapes, Vape pods, Vape devices, vape mods, E-liquids, vape Kits and Vaporizers online",
  cta: { label: "Shop now", href: "/shop" },
  slides: [
    { src: "/images/hero-1.jpg", alt: "Man exhaling vapour while holding a vape mod" },
    { src: "/images/hero-2.jpg", alt: "Colourful e-liquid bottles surrounded by smoke" },
  ],
  slideDurationMs: 5000,
  fadeDurationMs: 700,
};

export const introContent = {
  title: "Disposable Vapes Canada - Buy Disposable Vapes Online Canada",
  paragraphs: [
    "Finding quality disposable vapes, vape pods, or e-liquid flavors in Canada can be difficult when stock runs out. Vape Shop Canada allows you to buy vapes online in Canada easily from the comfort of your home, with a 100% guarantee of delivery to your doorstep on time. Buy vapes online Canada from the cheapest online vape store offering the best disposable vapes, e-liquids, vape kits, vape pods, vape devices, and vaporizers from top reputable brands.",
    "We are ready to meet all your vaping needs, and Vape Shop Canada is the best place for nicotine vapes. If you are a smoker in Canada looking to quit, Vape Shop Canada is the legitimate and fast way to buy vapes, vape coils, and e-liquids hassle-free. The availability of vape products in Canada has changed significantly.",
    "It is no longer possible to buy vapes online without a prescription, but Vape Shop Canada makes this process hassle-free. There is no need to visit a local chemist or pharmacy when buying from the best disposable vape store in Canada, because we have you covered. All our products are sourced from regulated and controlled environments, ensuring consumer safety and compliance with relevant health regulations.",
  ],
};

export type ProductRow = { title?: string; slugs: string[] };

/**
 * Rows of products shown on the home page under the intro text, in order.
 * `slugs` are product folder names in public/vapesshopaustralia; `title` is an optional heading.
 */
export const homeProductRows: ProductRow[] = [
  {
    slugs: [
      "10-pack-alibarbar-ingot-9000-puffs",
      "20-pack-alibarbar-ingot-9000-puffs",
      "3-pack-alibarbar-ingot-9000-puffs",
      "5-pack-alibarbar-ingot-9000-puffs",
    ],
  },
  {
    slugs: [
      "banana-buzz-alibarbar-ingot-9000-puffs",
      "blackberry-ice-alibarbar-ingot-9000-puffs",
      "blackberry-pomegranate-cherry-alibarbar-ingot-9000-puffs-2",
      "blackberry-pomegranate-cherry-alibarbar-ingot-9000-puffs",
    ],
  },
  {
    title: "BEST SELLING PRODUCTS",
    slugs: [
      "waka-smash-green-grape-6000-puffs",
      "waka-smash-mango-orange-6000-puffs",
      "waka-smash-guava-zest-6000-puffs",
      "waka-smash-juicy-black-currant-6000-puffs",
    ],
  },
  {
    slugs: [
      "waka-smash-peach-kiwi-melon-6000-puffs",
      "waka-smash-pear-sparkle-6000-puffs",
      "waka-smash-pineapple-melon-6000-puffs",
      "waka-smash-pomegranate-pop-6000-puffs",
    ],
  },
];

export type CategoryBanner = {
  title: string;
  text: string;
  image: string;
  imageAlt: string;
  cta: { label: string; href: string };
};

export const categoryBanners: CategoryBanner[] = [
  {
    title: "VAPE DEVICES",
    text: "Buy Vape devices online in Canada on Vape Shop Canada",
    image: "/images/banner-vape-devices.jpg",
    imageAlt: "Vape pen and mod devices on a wooden table",
    cta: { label: "Shop now", href: "/shop" },
  },
  {
    title: "E-Liquids",
    text: "Buy Vape E-Liquids online Canada and ship safely to your address",
    image: "/images/banner-e-liquids.jpg",
    imageAlt: "E-liquid bottle surrounded by colourful smoke and fruit",
    cta: { label: "Shop now", href: "/shop" },
  },
];

export const eLiquidsContent = {
  title: "E-liquids Online Canada - Vape Juice for Sale",
  paragraphs: [
    "Are you looking to buy e-liquids online Canada? We are proud to offer one of the best selections of premium e-liquid flavors in Canada, carefully curated to deliver an exceptional vaping experience. Our wide range of e-liquids and vape liquids is designed to suit both casual vapers and experienced users who demand consistent quality and rich flavor.",
    "Crafted from concentrated flavor sources and made using the finest ingredients, our vape juices in Canada provide smooth vapor production and long-lasting taste. Whether you prefer classic, fruity, dessert, or menthol profiles, our e-liquids are the perfect choice to elevate your vape session and enjoy reliable performance with every puff.",
  ],
};

export const igetBanner = {
  eyebrow: "New collection",
  title: "The Top Quality and authentic Iget Vape Collection",
  image: "/images/iget-banner.jpg",
  imageAlt: "IGET Bar disposable vapes surrounded by colourful smoke",
  cta: { label: "Shop now", href: "/shop" },
};

export const igetContent = {
  title: "IGET Vapes Canada - Buy IGET Vapes Online Canada",
  paragraphs: [
    "Looking for iGet vape for sale in Canada? iGet vapes are among the most popular disposable vape devices, known for their sleek design, powerful performance, and rich flavor delivery. Whether you are new to vaping or an experienced user, iGet disposable vapes offer a hassle-free experience with no refilling, no charging setup, and no maintenance required.",
    "Our collection of iGet vapes for sale Canada includes a wide variety of flavors to suit every preference, from fruity and icy blends to classic options. Designed for long-lasting use, iGet vapes provide consistent vapor production and a smooth draw from the first puff to the last. If you want a reliable, easy-to-use device, buying iGet vape online Canada is the perfect choice for convenient and satisfying vaping",
  ],
};

/** Product rows shown under the IGET text section. */
export const igetProductRows: ProductRow[] = [
  {
    slugs: [
      "10-pack-iget-bar-pro-10000-puffs",
      "10-pack-iget-bar-pro-10000-puffs-2",
      "20-pack-iget-bar-pro-10000-puffs",
      "20-pack-iget-bar-pro-10000-puffs-2",
    ],
  },
  {
    slugs: [
      "3-pack-iget-bar-pro-10000-puffs",
      "5-pack-iget-bar-pro-10000-puffs",
      "5-pack-iget-bar-pro-10000-puffs-2",
      "blackberry-ice-iget-bar-pro-10000-puffs",
    ],
  },
];

export const smokelessContent = {
  title: "Smokeless Tobacco - Smokeless Tobacco For Sale Canada",
  paragraphs: [
    "Smokeless tobacco offers an alternative to traditional smoking, providing nicotine without inhaling smoke. Products like chewing tobacco, snuff, or pouches deliver nicotine directly through the mouth, giving users a satisfying experience while reducing exposure to harmful smoke.",
    "At Vape Shop Canada, while we specialize in vapes, disposable vapes, and e-liquids, many users looking to transition from smokeless tobacco find vaping a cleaner, more convenient, and flavorful way to enjoy nicotine. Our high-quality devices and premium nicotine vape liquids offer an easy, smoke-free alternative, giving you the flexibility to enjoy nicotine anytime, anywhere. Explore our range to find the perfect vape online Canada for a smooth and satisfying experience.",
  ],
};

/** Product rows shown under the smokeless tobacco text section. */
export const smokelessProductRows: ProductRow[] = [
  {
    slugs: [
      "americas-best-golden-blend",
      "americas-best-original-blend",
      "apple-thick-cut-2oz",
      "browns-mule-plug",
    ],
  },
  {
    slugs: [
      "buy-camel-snus-large-frost",
      "copenhagen-original-fine-cut-snuff",
      "copenhagen-snuff",
      "creek-natural-1-2oz-fine-cut",
    ],
  },
];

export type FeatureIconName = "truck" | "cart" | "arrow";

export const features: { icon: FeatureIconName; title: string; text: string }[] = [
  {
    icon: "truck",
    title: "Fast Delivery",
    text: "We offer the fasted shipping to all locations in Canada",
  },
  {
    icon: "cart",
    title: "Shipping Guarantee",
    text: "You are guaranteed to have the best quality and a less monotonous shopping experience",
  },
  {
    icon: "arrow",
    title: "Easy Payment",
    text: "We accept flexible payment options such as E-transfer and Bitcoin.",
  },
];

export const alfakherContent = {
  title: "ALFAKHER Vapes Canada - Buy ALFAKHER Vapes Online Canada",
  paragraphs: [
    "Looking for the finest Al Fakher shisha and vape products in Canada? Vape Shop Canada proudly offers a wide selection of Al Fakher e-liquids, premium vape juices, and authentic nicotine vapes to elevate your vaping experience. Known worldwide for quality and consistency, Al Fakher delivers rich flavors and smooth vapor, perfect for both beginners and seasoned vapers. Explore classic, fruity, and exotic blends that make every puff satisfying and enjoyable.",
    "All our Al Fakher vape products are sourced from trusted suppliers, ensuring safety and authenticity. Whether you’re buying disposable vapes, vape kits, or e-liquids online Canada, Vape Shop Canada is your go-to destination for top-quality Al Fakher vapes, fast delivery, and a hassle-free online shopping experience.",
  ],
};

/** Product rows shown under the Alfakher text section. */
export const alfakherProductRows: ProductRow[] = [
  {
    slugs: [
      "alfakher-crown-bar-8000-puffs-10-pack",
      "alfakher-crown-bar-8000-puffs-20-pack",
      "alfakher-crown-bar-8000-puffs-3-pack",
      "alfakher-crown-bar-8000-puffs-5-pack",
    ],
  },
  {
    slugs: [
      "alfakher-crown-bar-berry-ice-8000-puffs",
      "alfakher-crown-bar-berry-mint-8000-puffs",
      "alfakher-crown-bar-blackcurrant-ice-8000-puffs",
      "alfakher-crown-bar-blue-razz-lemonade-8000-puffs",
    ],
  },
];

export const hqdContent = {
  title: "Buy HQD Vapes Online Canada",
  paragraphs: [
    "HQD is a well-known disposable vape brand trusted by vapers for its quality, performance, and bold flavor profiles. Designed for convenience, HQD vapes come pre-filled, pre-charged, and ready to use straight out of the box, making them ideal for beginners and experienced users who want a hassle-free vaping experience.",
    "With a wide range of flavors and puff counts available, HQD disposable vapes deliver smooth draws, consistent vapor production, and long-lasting satisfaction. Compact and easy to carry, HQD devices are perfect for on-the-go use without the need for refilling or maintenance. If you’re looking for a reliable and flavorful disposable option, HQD vapes for sale offer a simple and enjoyable way to vape.",
  ],
};

/** Product rows shown under the HQD text section. */
export const hqdProductRows: ProductRow[] = [
  {
    slugs: [
      "10-pack-hqd-slick-6000-puffs",
      "20-pack-hqd-slick-6000-puffs",
      "3-pack-hqd-slick-6000-puffs",
      "5-pack-hqd-slick-6000-puffs",
    ],
  },
  {
    slugs: [
      "black-ice-hqd-slick-6000-puffs",
      "blackberry-raspberry-lemon-hqd-slick-6000-puffs",
      "blackberry-raspberry-lemon-hqd-slick-6000-puffs-2",
      "blueberry-lemonade-hqd-slick-6000-puffs",
    ],
  },
];

export const faqContent = {
  title: "FAQs - Vape Shop Canada",
  items: [
    {
      q: "What products do you sell?",
      a: "We sell disposable vapes, vape kits, vape pods, e-liquids, vape coils, and vape devices online in Canada.",
    },
    {
      q: "Can I buy vapes online in Canada?",
      a: "Yes, you can buy vapes online Canada through our store with a simple and hassle-free process.",
    },
    {
      q: "Do you deliver vapes across Canada?",
      a: "Yes, we offer fast and reliable vape delivery Canada-wide.",
    },
    {
      q: "Are your vape products authentic?",
      a: "All our vape products are sourced from reputable brands and regulated suppliers.",
    },
    {
      q: "Do you sell nicotine vapes?",
      a: "Yes, we offer nicotine vape products in compliance with Canadian regulations.",
    },
    {
      q: "Are your vapes suitable for beginners?",
      a: "Yes, we stock easy-to-use disposable vapes and starter vape kits ideal for beginners.",
    },
    {
      q: "How long does delivery take?",
      a: "Delivery times vary by location, but most orders arrive within a few business days.",
    },
    {
      q: "Do you offer customer support?",
      a: "Yes, our support team is available to help with orders, products, and general enquiries.",
    },
  ],
};

export const gunnpodsContent = {
  title: "GUNNpods Canada - Buy GUNNpods Canada online Canada",
  paragraphs: [
    [
      "GunnPod Plus vapes for sale at Vape Shop Canada are designed for convenience, power, and smooth flavor delivery. These sleek, portable devices are perfect for both beginners and experienced vapers, offering a satisfying puff without the need for refills or complicated settings.",
      "With a variety of exciting flavors, from fruity to icy and dessert-inspired blends, GunnPod Plus ensures a premium vaping experience every time.",
    ],
    "Shop GunnPod Plus online Canada and enjoy authentic products, fast delivery, and a hassle-free online shopping experience. Upgrade your vape sessions with GunnPod Plus disposable vapes and discover why Vape Shop Canada is the top destination for high-quality, reliable vape devices and e-liquids.",
  ],
};

/** Product rows shown under the GUNNpods text section. */
export const gunnpodsProductRows: ProductRow[] = [
  {
    slugs: [
      "gunnpod-plus-4500-puffs-10-pack",
      "gunnpod-plus-4500-puffs-20-pack",
      "gunnpod-plus-4500-puffs-3-pack",
      "gunnpod-plus-4500-puffs-5-pack",
    ],
  },
  {
    slugs: [
      "gunnpod-plus-4500-puffs-50-pack",
      "gunnpod-plus-cherry-pomegranate-ice-4500-puffs",
      "gunnpod-plus-classic-tobacco-4500-puffs",
      "gunnpod-plus-cola-ice-4500-puffs",
    ],
  },
];

export const vaporassoContent = {
  title: "Vaporasso Online Canada - Buy Vaporasso Online Canada",
  paragraphs: [
    [
      "Looking for Vaporassor vapes for sale in Canada? Vape Shop Canada brings you the latest Vaporassor disposable vapes, vape kits, and e-liquids designed for convenience, flavor, and smooth performance. Perfect for beginners and experienced vapers, Vaporassor vapes deliver satisfying puffs with minimal effort—no refills or charging needed.",
      "Shop from a wide range of flavors, including fruity, icy, and classic options, all crafted for long-lasting enjoyment.",
    ],
    "Buying Vaporassor online Canada has never been easier, with fast delivery, authentic products, and a hassle-free shopping experience. Upgrade your vape sessions with Vaporassor devices, enjoy premium flavor, and discover why Vape Shop Canada is the best place to buy Vaporassor vapes online.",
  ],
};

export const mrFogContent = {
  title: "Mr FOG Vapes Canada - Mr FOG Vapes for sale Canada",
  paragraphs: [
    [
      "Mr Fog vapes for sale at Vape Shop Canada are designed for smooth, flavorful, and hassle-free vaping. These disposable vapes are perfect for beginners and experienced users, offering consistent puffs without refills or charging.",
      "With a wide range of fruity, icy, and classic flavors, Mr Fog vapes deliver a premium vaping experience every time. Buying Mr Fog online Canada is simple, with fast delivery, authentic products, and a convenient online shopping experience. Upgrade your sessions with Mr Fog disposable vapes and discover why Vape Shop Canada is the ultimate destination for high-quality vape devices and e-liquids.",
    ],
  ],
};

/** Product rows shown under the Mr FOG text section. */
export const mrFogProductRows: ProductRow[] = [
  {
    slugs: [
      "mr-fog-max-air-3600-puffs-10-pack",
      "mr-fog-max-air-3600-puffs-20-pack",
      "mr-fog-max-air-3600-puffs-3-pack",
      "mr-fog-max-air-3600-puffs-5-pack",
    ],
  },
];

export const alibarbarContent = {
  title: "ALIBARBAR Vapes Canada - ALIBARBAR Vapes For Sale Canada",
  paragraphs: [
    [
      "AliBarBar vapes for sale at Vape Shop Canada bring premium flavor, convenience, and reliability to your vaping experience. These sleek disposable vapes and pod devices are perfect for beginners and seasoned vapers, delivering smooth, consistent puffs without the need for refills or charging.",
      "With a wide selection of exciting flavors, including fruity, icy, and dessert-inspired blends, AliBarBar vapes ensure a satisfying and enjoyable vape every time. Buying AliBarBar online Canada is simple and hassle-free, with authentic products, fast delivery, and a smooth online shopping experience. Upgrade your sessions with AliBarBar disposable vapes and experience why Vape Shop Canada is the ultimate destination for top-quality vape devices and e-liquids.",
    ],
  ],
};

/** Product rows shown under the ALIBARBAR text section. */
export const alibarbarProductRows: ProductRow[] = [
  {
    slugs: [
      "10-pack-alibarbar-ingot-9000-puffs",
      "20-pack-alibarbar-ingot-9000-puffs",
      "3-pack-alibarbar-ingot-9000-puffs",
      "5-pack-alibarbar-ingot-9000-puffs",
    ],
  },
  {
    slugs: [
      "banana-buzz-alibarbar-ingot-9000-puffs",
      "blackberry-ice-alibarbar-ingot-9000-puffs",
      "blackberry-pomegranate-cherry-alibarbar-ingot-9000-puffs-2",
      "blackberry-pomegranate-cherry-alibarbar-ingot-9000-puffs",
    ],
  },
];

export const footerContent = {
  legalLinks: [
    { label: "Refund Policy", href: "/refund-policy" },
    { label: "Terms & Conditions", href: "/terms-conditions" },
    { label: "FAQ", href: "/faq" },
    { label: "Privacy Policy", href: "/privacy-policy" },
  ] as NavItem[],
  contactLabel: "Contact",
  email: "sales@vapesshopaustralia.com",
  copyright: "Copyright © 2026 VAPE SHOP CANADA",
};

export const aboutHero = {
  title: "About us",
  image: "/images/iget-banner.jpg",
  imageAlt: "IGET Bar disposable vapes surrounded by colourful smoke",
};

export const aboutContent = {
  title: "About Us",
  intro:
    "Vape Shop Canada is a reliable online destination created to make it simple and convenient to buy vapes online Canada from one trusted source. Our online vape store Canada offers a wide selection of disposable vapes, vape kits, vape pods, vape devices, e-liquids, vape liquids, nicotine vapes, and accessories designed to suit both new and experienced vapers. We focus on providing quality vape products that deliver consistent performance, strong flavor, and satisfying vapor production.",
  mission: {
    title: "Our Mission",
    image: "/images/about-iget-moon.png",
    imageAlt: "IGET Moon 5000 puff disposable vapes",
    paragraphs: [
      "Our mission is to give customers across Canada access to authentic vape products through a smooth and hassle-free ordering process.",
      "Every product available at Vape Shop Canada is sourced from reputable suppliers and handled through controlled environments to ensure safety, reliability, and compliance.",
      "Whether you are looking for easy-to-use disposable vapes Canada, refillable vape kits, long-lasting vape pods, or premium e-liquids online Canada, our store is built to meet all vaping preferences in one place.",
    ],
  },
  closing:
    "Vape Shop Canada understands the importance of convenience and privacy when buying vapes online. That is why we provide secure checkout, discreet packaging, and fast vape delivery Canada-wide. Our range of nicotine vapes and vape liquids is carefully selected to support smokers who are transitioning away from traditional tobacco while also serving experienced users who value flavor variety and device performance. With a customer-first approach, competitive pricing, and a growing catalogue of vape devices and e-liquids, Vape Shop Canada continues to be a trusted choice for those looking to buy vapes online Canada with confidence.",
  why: {
    title: "Why choose us",
    text: "We offer authentic vape products, competitive prices, fast Canada-wide delivery, secure payments, reliable support, and a hassle-free online shopping experience.",
    items: [
      {
        icon: "truck" as FeatureIconName,
        title: "Fast Delivery",
        text: "We offer fast shipping across Canada, ensuring your vape orders are processed quickly, packed securely, and delivered to your doorstep without unnecessary delays.",
      },
      {
        icon: "cart" as FeatureIconName,
        title: "Security",
        text: "Our website uses advanced security systems to protect customer data, payments, and personal information, providing a safe and trusted online shopping experience.",
      },
      {
        icon: "arrow" as FeatureIconName,
        title: "Order Tracking:",
        text: "Every order includes tracking details, allowing customers to monitor shipping progress in real time from dispatch to final delivery.",
      },
    ],
  },
};

export const contactHero = {
  eyebrow: "Get in touch",
  title: "Message us",
  image: "/images/contact-hero.jpg",
  imageAlt: "Two soft 3D chat bubbles on a pink background",
};

export const contactContent = {
  title: "Contact Us",
  text: "We offer authentic vape products, competitive prices, fast Canada-wide delivery, secure payments, reliable support, and a hassle-free online shopping experience.",
  address: "Canada",
  email: "Sales@vapesshopaustralia.com",
  phone: "+1 (782) 910-0204",
};

/**
 * More product types, shown on the home page so visitors can see what else is in the shop.
 * Each block links to its category through the shop's category dropdown.
 */
export type ExtraSection = {
  title: string;
  paragraphs: string[];
  rows: ProductRow[];
};

export const extraSections: Record<"pouches" | "geekBar" | "eLiquids" | "glass", ExtraSection> = {
  pouches: {
    title: "Nicotine Pouches - IGET Shion Pouches Canada",
    paragraphs: [
      "Prefer something discreet? IGET Shion nicotine pouches are tobacco-free, smoke-free and easy to use anywhere. Choose from fresh mint, fruit and ice flavours in different strengths.",
    ],
    rows: [
      {
        slugs: [
          "apple-iget-shion-x1-nicotine-pouch-12mg-2",
          "blueberry-ice-iget-shion-x1-nicotine-pouch-12mg",
          "citrus-iget-shion-x1-nicotine-pouch-12mg",
          "cool-mint-iget-shion-x1-nicotine-pouch-12mg-2",
        ],
      },
    ],
  },
  geekBar: {
    title: "Geek Bar - Geek Bar Disposable Vapes Canada",
    paragraphs: [
      "Geek Bar disposable vapes are loved for their big puff counts and bold flavours. Browse Geek Bar Pulse X 25000 and Geek Bar 9000 puff devices, ready to use straight out of the box.",
    ],
    rows: [
      {
        slugs: [
          "atl-mint-geek-bar-pulse-x-25000",
          "banana-taffy-freeze-geek-bar-pulse-x-25000",
          "blueberry-jam-geek-bar-pulse-x-25000",
          "3x-fantasi-70-30-shortfill-bundle-9",
        ],
      },
    ],
  },
  eLiquids: {
    title: "E-Liquids - Salt Nic & Freebase Vape Juice Canada",
    paragraphs: [
      "Refill your favourite device with premium e-liquids. We stock nicotine salts and freebase juices in fruit, ice, dessert and menthol flavours from trusted brands.",
    ],
    rows: [
      {
        slugs: [
          "apple-drop-freebase-e-liquid-double-apple-60ml",
          "berry-drop-ice-salt-nic-e-liquid-dragonfruit-30ml",
          "big-5-juice-co-buffalo-100ml",
          "banana-ice-2",
        ],
      },
    ],
  },
  glass: {
    title: "Glass Bongs & Accessories",
    paragraphs: [
      "Looking for the gear that goes with your vape? Explore glass bongs, water pipes, adapters, bowls and other accessories.",
    ],
    rows: [
      {
        slugs: [
          "10-blueberry-double-ring-soft-glass-beaker-bong",
          "12-dopezilla-cerberus-water-pipe-milky-purple",
          "14mm-45-degree-male-quartz-banger",
          "14mm-kannastor-press",
        ],
      },
    ],
  },
};

/** Product row shown under the Vaporesso text section. */
export const vaporassoProductRows: ProductRow[] = [
  {
    slugs: ["xros-5-mini-kit-2ml", "xros-4-nano-kit-2ml", "xros-5-kit-2ml", "xros-4-kit-2ml"],
  },
];
