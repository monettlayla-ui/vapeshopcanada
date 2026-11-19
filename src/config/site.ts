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

/** Footer links: same as the top nav (there is no customer account on this site). */
export const footerNavItems: NavItem[] = [...navItems];

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
    "We are ready to meet all your vaping needs, and Vape Shop Canada is the best place for nicotine vapes. If you are a smoker in Canada looking to quit, Vape Shop Canada is the legitimate and fast way to buy vapes, vape coils, and e-liquids hassle-free.",
    "Vape Shop Canada makes buying vapes online simple and hassle-free, with discreet packaging and fast delivery straight to your door anywhere in Canada. All our products are sourced from regulated and controlled environments, ensuring consumer safety and compliance with relevant health regulations.",
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
      "bimo-gti-40000-puffs-blueberry-lacy-cherry",
      "bimo-gti-40000-puffs-cherry-berry",
      "bimo-gti-40000-puffs-freeze-cola",
      "bimo-gti-40000-puffs-grape-bubble-gum",
    ],
  },
  {
    slugs: [
      "airmez-xbeats-40000-puffs-banana-taffy-freeze",
      "airmez-xbeats-40000-puffs-blackberry-b-pop",
      "airmez-xbeats-40000-puffs-blue-rancher",
      "airmez-xbeats-40000-puffs-blue-razz",
    ],
  },
  {
    title: "BEST SELLING STLTH VAPES",
    slugs: [
      "stlth-x-geek-bar-80k-purple-grape",
      "stlth-x-geek-bar-80k-lychee-melon-ice",
      "stlth-x-geek-bar-80k-strawberry-twist-ice",
      "stlth-x-geek-bar-80k-rocket-ice",
    ],
  },
  {
    slugs: [
      "stlth-loop-max-70k-pod-watermelon-ice",
      "stlth-eco-blue-lemon-ice",
      "stlth-eco-punch-ice",
      "stlth-eco-watermelon-lime-ice",
    ],
  },
  {
    title: "BEST SELLING FLAVOUR BEAST VAPES",
    slugs: [
      "flavour-beast-mode-max-3-60k-super-s-watermelon-iced",
      "flavour-beast-mode-max-3-60k-super-s-strawberry-iced",
      "flavour-beast-mode-max-3-60k-super-s-peach-iced",
      "flavour-beast-mode-max-3-60k-super-s-grape-iced",
    ],
  },
  {
    slugs: [
      "flavour-beast-mode-max-3-60k-super-s-blueberry-iced",
      "flavour-beast-mode-max-3-60k-super-s-blue-razz-iced",
      "flavour-beast-mode-max-3-60k-kanzi-iced",
      "flavour-beast-mode-max-3-60k-harambae-iced",
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

export const promoBanner = {
  eyebrow: "New collection",
  title: "The Top Quality and Authentic Disposable Vape Collection",
  image: "/images/hero-2.jpg",
  imageAlt: "Colourful disposable vape bottles surrounded by smoke",
  cta: { label: "Shop now", href: "/shop" },
};

export const viceNexaContent = {
  title: "Vice x NEXA 80K Canada - Buy Vice 80000 Puff Disposable Vapes Online",
  paragraphs: [
    "Looking for the longest lasting disposable vape in Canada? The Vice x NEXA 80K delivers up to 80,000 puffs from a 20mL prefilled cartridge, with a rechargeable battery, adjustable airflow, dual vaping modes and a 3D curved screen. It is one of the best high puff disposable vapes you can buy online in Canada, and a single device can last for months.",
    "Choose from icy fruit, mint and candy flavours such as Arctic Blue Melon, Banana Ice, Blue Raspberry Ice and Mango Tango Ice. Buy Vice vapes online Canada with authentic products, discreet packaging and fast Canada-wide delivery, and pay by E-transfer or Bitcoin.",
  ],
};

export const viceNexaProductRows: ProductRow[] = [
  {
    slugs: [
      "vice-x-nexa-80k-arctic-blue-melon",
      "vice-x-nexa-80k-banana-ice",
      "vice-x-nexa-80k-blue-raspberry-ice",
      "vice-x-nexa-80k-cherry-blast-ice",
    ],
  },
  {
    slugs: [
      "vice-x-nexa-80k-frosty-green-apple",
      "vice-x-nexa-80k-mango-tango-ice",
      "vice-x-nexa-80k-mint-ice",
      "vice-x-nexa-80k-peach-ice",
    ],
  },
];

export const krazeContent = {
  title: "Kraze Mega X 48K Vapes Canada - Buy Kraze Disposable Vapes Online",
  paragraphs: [
    "Kraze Mega X 48K disposable vapes give you up to 48,000 puffs in a compact, ready to use device, with strong nicotine, a mesh coil and bold flavour from the first puff to the last. If you are searching for Kraze vapes for sale in Canada, this is a great mix of value, power and long battery life.",
    "Pick from Banana Ice, Blue Razz Ice, Blueberry Kiwi Ice, Grape Ice, Holiday Mint Ice and more. Buy Kraze Mega X online Canada from a trusted vape shop with fast delivery across the country and easy payment by E-transfer or Bitcoin.",
  ],
};

export const krazeProductRows: ProductRow[] = [
  {
    slugs: [
      "kraze-mega-x-48k-banana-ice",
      "kraze-mega-x-48k-blue-razz-ice",
      "kraze-mega-x-48k-blueberry-kiwi-ice",
      "kraze-mega-x-48k-cherry-blast-g-ice",
    ],
  },
  {
    slugs: [
      "kraze-mega-x-48k-blueberry-watermelon-ice",
      "kraze-mega-x-48k-frizzy-peach-g-ice",
      "kraze-mega-x-48k-grape-ice",
      "kraze-mega-x-48k-holiday-mint-ice",
    ],
  },
];

export const elfBarContent = {
  title: "Elf Bar FS70K Canada - Buy Elf Bar 70000 Puff Disposable Vapes",
  paragraphs: [
    "Elf Bar is one of the most trusted names in disposable vapes, and the Elf Bar FS70K brings up to 70,000 puffs of smooth, consistent flavour in a sleek rechargeable device. If you want to buy Elf Bar vapes online in Canada, the FS70K is built for people who want fewer refills, fewer charges and a better price per puff.",
    "Explore flavours like Watermelon Ice, Strawberry Ice, Sour Blue Razz Ice, Sakura Grape Ice and classic Tobacco. Order Elf Bar disposable vapes for sale in Canada with discreet packaging, fast Canada-wide delivery and secure payment by E-transfer or Bitcoin.",
  ],
};

export const elfBarProductRows: ProductRow[] = [
  {
    slugs: [
      "elf-bar-fs70k-disposable-watermelon-ice",
      "elf-bar-fs70k-disposable-tobacco",
      "elf-bar-fs70k-disposable-strawberry-ice",
      "elf-bar-fs70k-disposable-sour-strawberry-dragon-fruit-ice",
    ],
  },
  {
    slugs: [
      "elf-bar-fs70k-disposable-sour-pineapple-ice",
      "elf-bar-fs70k-disposable-sour-blue-razz-ice",
      "elf-bar-fs70k-disposable-sakura-grape-ice",
      "elf-bar-fs70k-disposable",
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

export const airmezBimoContent = {
  title: "Airmez & Bimo Vapes Canada - Long-Lasting Disposable Vapes For Sale",
  paragraphs: [
    [
      "Looking for the best disposable vapes in Canada? Airmez and Bimo vapes for sale at Vape Shop Canada deliver up to 40,000 puffs per device, so one disposable vape lasts for weeks. Each Airmez Matrix Pro, Airmez XBeats, Bimo GTI and Bimo Felxy comes ready to use, with no refilling, no charging stress and no complicated setup.",
      "Choose from smooth fruity, icy, mint and candy-inspired flavors, all with strong nicotine and mesh-coil performance for a consistent hit from the first puff to the last. Buy Airmez and Bimo vapes online in Canada with authentic products, discreet packaging and fast Canada-wide delivery. Pay by E-transfer or Bitcoin, and enjoy high-puff disposable vapes at a great price from your trusted online vape shop.",
    ],
  ],
};

/** Product rows shown under the Airmez & Bimo text section. */
export const airmezBimoProductRows: ProductRow[] = [
  {
    slugs: [
      "airmez-matrix-pro-30000-puffs-blueberry-raspberry",
      "airmez-matrix-pro-30000-puffs-cherry-cola",
      "airmez-matrix-pro-30000-puffs-cherry-peach-lemonade",
      "airmez-matrix-pro-30000-puffs-fizzy-cherry",
    ],
  },
  {
    slugs: [
      "bimo-felxy-40000-puffs-apple-aloe",
      "bimo-felxy-40000-puffs-blueberry-ice",
      "bimo-felxy-40000-puffs-grape-ice",
      "bimo-felxy-40000-puffs-grapefruit-mint",
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
  email: "sales@vapesshopcanada.com",
  copyright: "Copyright © 2026 VAPE SHOP CANADA",
  /** Age and delivery notice shown at the very bottom of every page. */
  notice: {
    brand: "Vape Shop Canada - Canada's Vape Shop Online",
    servingLead: "Serving Ontario.",
    servingRest:
      "Quebec, British Columbia, Alberta, Saskatchewan, Manitoba, New Brunswick, Newfoundland, Nova Scotia, Prince Edward Island, Yukon, Northwest Territories and Nunavut. You must be at least 19 to buy and/or use this website. Government-issued photo ID is required for delivery and pickup.",
  },
};

export const aboutHero = {
  title: "About us",
  image: "/images/hero-2.jpg",
  imageAlt: "Colourful disposable vape bottles surrounded by smoke",
};

export const aboutContent = {
  title: "About Us",
  intro:
    "Vape Shop Canada is a reliable online destination created to make it simple and convenient to buy vapes online Canada from one trusted source. Our online vape store Canada offers a wide selection of disposable vapes, vape kits, vape pods, vape devices, e-liquids, vape liquids, nicotine vapes, and accessories designed to suit both new and experienced vapers. We focus on providing quality vape products that deliver consistent performance, strong flavor, and satisfying vapor production.",
  mission: {
    title: "Our Mission",
    image: "/images/banner-vape-devices.jpg",
    imageAlt: "Vape devices and e-cigarettes on a wooden table",
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
  email: "sales@vapesshopcanada.com",
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

export const extraSections: Record<"geekBar" | "eLiquids" | "glass", ExtraSection> = {
  geekBar: {
    title: "Geek Bar - Geek Bar Disposable Vapes Canada",
    paragraphs: [
      "Geek Bar disposable vapes are loved for their big puff counts and bold flavours. Browse Geek Bar Pulse X 25000 and Geek Bar 9000 puff devices, ready to use straight out of the box.",
    ],
    rows: [
      {
        slugs: [
          "3x-fantasi-70-30-shortfill-bundle-9",
          "4x-berry-fantasi-70-30-shortfill-bundle-9",
          "50ml-fantasi-berries-ice-bundle-70-30-e-liquid-bundle-4",
          "5x-50ml-fantasi-remix-bundle-70-30-e-liquid-bundle-4",
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
          "apple-drop-salt-e-liquid-berries-30ml",
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
