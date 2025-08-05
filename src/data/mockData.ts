/*
  This file contains all the data structures and sample data
  for the Diagon Alley Digital Emporium wizarding products store.
  This data is used for in-memory state management via React Context.
*/

// Using crypto.randomUUID() for unique IDs, available in modern browsers.

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  quantity: number; // Available quantity in stock
  image: string;
  description: string;
  rating: number;
  reviews: { user: string; comment: string; rating: number }[];
  magicalProperties?: string; // Special magical properties
  spellLevel?: 'Beginner' | 'Intermediate' | 'Advanced' | 'Master';
}

export interface CartItem extends Product {
  cartQuantity: number; // Quantity of this product in the user's cart
}

export interface User {
  id: string;
  name: string;
  email: string;
  password?: string; // For mock authentication purposes only
  addresses: Address[];
  paymentMethods: PaymentMethod[];
  loyaltyStatus: string;
  autoReplenishment: AutoReplenishmentSetting[];
  hogwartsHouse?: 'Gryffindor' | 'Slytherin' | 'Hufflepuff' | 'Ravenclaw';
  wizardLevel?: number;
  wandType?: string;
}

export interface Address {
  id: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  magicalLocation?: string; // e.g., "Near the Leaky Cauldron"
}

export interface PaymentMethod {
  id: string;
  type: 'Credit Card' | 'Debit Card' | 'Net Banking' | 'Cash on Delivery';
  last4?: string;
  bankName?: string;
}

export interface Order {
  id: string;
  userId: string;
  items: { productId: string; name: string; price: number; quantity: number; image: string }[];
  total: number;
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  orderDate: string;
  deliveryAddress: Address;
  deliverySlot: { date: string; time: string };
  paymentMethod: PaymentMethod['type'];
  deliveryMethod?: 'Standard Delivery' | 'Express Delivery' | 'Next Day Delivery';
}

export interface AutoReplenishmentSetting {
  productId: string;
  frequency: 'weekly' | 'monthly' | 'quarterly';
  quantity: number;
}

// --- Product Data ---

export const MOCK_PRODUCTS: Product[] = [
  // Wands Category - "Ollivanders Fine Wands"
  {
    id: crypto.randomUUID(),
    name: 'The Elder Wand',
    category: 'Wands',
    price: 2500.00,
    quantity: 1,
    image: '/src/assets/images/elder-wand.jpg',
    description: 'The most powerful wand ever made, crafted from elder wood with a Thestral tail hair core. 15 inches of pure magical supremacy. Also known as the Deathstick, this legendary wand has passed through many hands throughout history.',
    rating: 5.0,
    reviews: [
      { user: 'Albus Dumbledore', comment: 'Unparalleled power, but use with great wisdom.', rating: 5 },
      { user: 'Gellert Grindelwald', comment: 'The ultimate magical instrument.', rating: 5 },
    ],
    magicalProperties: 'Unbeatable in duels, amplifies all spells',
    spellLevel: 'Master',
  },
  {
    id: crypto.randomUUID(),
    name: "Harry Potter's Holly Wand",
    category: 'Wands',
    price: 45.00,
    quantity: 25,
    image: '/src/assets/images/harry-wand.jpg',
    description: '11 inches, holly wood with phoenix feather core. Supple and excellent for charm work. The brother wand to Voldemort\'s, sharing the same phoenix feather core from Fawkes.',
    rating: 4.9,
    reviews: [
      { user: 'Hermione Granger', comment: 'Perfect for defensive magic and Patronus charms.', rating: 5 },
      { user: 'Ron Weasley', comment: 'Brilliant wand, saved us countless times.', rating: 5 },
    ],
    magicalProperties: 'Excellent for protection spells, strong against dark magic',
    spellLevel: 'Intermediate',
  },
  {
    id: crypto.randomUUID(),
    name: "Hermione's Vine Wood Wand",
    category: 'Wands',
    price: 42.00,
    quantity: 30,
    image: '/src/assets/images/hermione-wand.jpg',
    description: '10¾ inches, vine wood with dragon heartstring core. Perfect for complex spellwork and transfiguration. Vine wands are drawn to witches and wizards who seek a greater purpose.',
    rating: 4.8,
    reviews: [
      { user: 'Professor McGonagall', comment: 'Exceptional for transfiguration work.', rating: 5 },
      { user: 'Harry Potter', comment: 'Hermione\'s wand never fails to amaze.', rating: 5 },
    ],
    magicalProperties: 'Superior for complex spells and academic magic',
    spellLevel: 'Advanced',
  },
  {
    id: crypto.randomUUID(),
    name: 'Custom Wand Builder',
    category: 'Wands',
    price: 75.00,
    quantity: 100,
    image: '/src/assets/images/custom-wand.jpg',
    description: 'Create your perfect wand! Choose from various woods (oak, willow, ebony, holly) and cores (phoenix feather, dragon heartstring, unicorn hair). Each wand is unique and chooses its wizard.',
    rating: 4.7,
    reviews: [
      { user: 'Garrick Ollivander', comment: 'Every wand is special when crafted with care.', rating: 5 },
      { user: 'Luna Lovegood', comment: 'My custom wand feels like it was meant for me.', rating: 5 },
    ],
    magicalProperties: 'Perfectly matched to your magical signature',
    spellLevel: 'Beginner',
  },

  // Potions Category - "Slughorn's Potions Emporium"
  {
    id: crypto.randomUUID(),
    name: 'Felix Felicis (Liquid Luck)',
    category: 'Potions',
    price: 500.00,
    quantity: 5,
    image: '/src/assets/images/felix-felicis.webp',
    description: 'The most coveted potion in the wizarding world. Brings extraordinary luck for 12 hours. Golden in color and incredibly difficult to brew. Use sparingly - too much can cause giddiness and dangerous overconfidence.',
    rating: 5.0,
    reviews: [
      { user: 'Harry Potter', comment: 'Helped me get Slughorn\'s memory. Incredible!', rating: 5 },
      { user: 'Horace Slughorn', comment: 'My finest brewing achievement.', rating: 5 },
    ],
    magicalProperties: 'Grants extraordinary luck and perfect timing',
    spellLevel: 'Master',
  },
  {
    id: crypto.randomUUID(),
    name: 'Polyjuice Potion',
    category: 'Potions',
    price: 150.00,
    quantity: 12,
    image: '/src/assets/images/polyjuice-potion.webp',
    description: 'Transform into anyone for one hour. Requires a piece of the person you wish to become. Thick, mudlike consistency with a taste that varies depending on the person being impersonated.',
    rating: 4.6,
    reviews: [
      { user: 'Hermione Granger', comment: 'Perfectly brewed, though the taste is awful.', rating: 4 },
      { user: 'Barty Crouch Jr.', comment: 'Essential for my... activities.', rating: 5 },
    ],
    magicalProperties: 'Complete physical transformation for 1 hour',
    spellLevel: 'Advanced',
  },
  {
    id: crypto.randomUUID(),
    name: 'Amortentia Love Potion',
    category: 'Potions',
    price: 85.00,
    quantity: 20,
    image: '/src/assets/images/amortentia-potion.webp',
    description: 'The most powerful love potion in existence. Creates powerful infatuation and obsession. Smells different to each person according to what attracts them most. Pearl-sheen, steam rises in spirals.',
    rating: 4.3,
    reviews: [
      { user: 'Romilda Vane', comment: 'Perfect for getting someone\'s attention!', rating: 5 },
      { user: 'Professor Slughorn', comment: 'Dangerous if misused. Handle with care.', rating: 4 },
    ],
    magicalProperties: 'Creates powerful romantic attraction',
    spellLevel: 'Intermediate',
  },
  {
    id: crypto.randomUUID(),
    name: 'Complete Potion Brewing Kit',
    category: 'Potions',
    price: 125.00,
    quantity: 35,
    image: '/src/assets/images/potion-kit.webp',
    description: 'Everything needed to start brewing potions! Includes pewter cauldron, brass scales, glass phials, and essential ingredients like dried nettles, snake fangs, and porcupine quills.',
    rating: 4.8,
    reviews: [
      { user: 'Neville Longbottom', comment: 'Finally, a kit that makes potions easier!', rating: 5 },
      { user: 'Severus Snape', comment: 'Adequate for beginners, I suppose.', rating: 4 },
    ],
    magicalProperties: 'Complete brewing setup for aspiring potioneers',
    spellLevel: 'Beginner',
  },

  // Flying Equipment - "Quality Quidditch Supplies"
  {
    id: crypto.randomUUID(),
    name: 'Firebolt Supreme Racing Broom',
    category: 'Flying Equipment',
    price: 1200.00,
    quantity: 8,
    image: '/src/assets/images/firebolt-broom.webp',
    description: 'The fastest racing broom ever created. 0-150mph in 10 seconds with unparalleled precision and control. Handcrafted with ash wood handle and birch twigs. The choice of professional Quidditch players worldwide.',
    rating: 5.0,
    reviews: [
      { user: 'Harry Potter', comment: 'The best broom I\'ve ever flown. Incredible speed!', rating: 5 },
      { user: 'Viktor Krum', comment: 'Perfect for professional Quidditch.', rating: 5 },
    ],
    magicalProperties: 'Unmatched speed and precision in flight',
    spellLevel: 'Advanced',
  },
  {
    id: crypto.randomUUID(),
    name: 'Nimbus 2001 Professional Broom',
    category: 'Flying Equipment',
    price: 800.00,
    quantity: 15,
    image: '/src/assets/images/nimbus-broom.webp',
    description: 'The broom that dominated Quidditch before the Firebolt. Excellent acceleration and handling. Mahogany handle with superior balance. Used by the Slytherin Quidditch team.',
    rating: 4.7,
    reviews: [
      { user: 'Draco Malfoy', comment: 'Superior to any Nimbus 2000. Excellent quality.', rating: 5 },
      { user: 'Marcus Flint', comment: 'Perfect for aggressive Quidditch play.', rating: 4 },
    ],
    magicalProperties: 'Professional-grade speed and maneuverability',
    spellLevel: 'Intermediate',
  },
  {
    id: crypto.randomUUID(),
    name: 'Golden Snitch Set',
    category: 'Flying Equipment',
    price: 75.00,
    quantity: 50,
    image: '/src/assets/images/golden-snitch.webp',
    description: 'Official Quidditch Golden Snitch with flesh memory. Remembers the first person to touch it. Comes with practice Snitches for training. Essential for any Quidditch match or practice session.',
    rating: 4.9,
    reviews: [
      { user: 'Oliver Wood', comment: 'Perfect for Seeker training. High quality!', rating: 5 },
      { user: 'Cho Chang', comment: 'Excellent flight patterns and responsiveness.', rating: 5 },
    ],
    magicalProperties: 'Flesh memory and erratic flight patterns',
    spellLevel: 'Intermediate',
  },

  // Magical Foods - "Honeydukes Sweet Shop"
  {
    id: crypto.randomUUID(),
    name: 'Chocolate Frogs',
    category: 'Magical Foods',
    price: 8.50,
    quantity: 100,
    image: '/src/assets/images/chocolate-frogs.webp',
    description: 'Delicious chocolate frogs that hop around until eaten! Each comes with a collectible Famous Witches and Wizards card. Collect them all! Made with the finest magical chocolate.',
    rating: 4.8,
    reviews: [
      { user: 'Ron Weasley', comment: 'My favorite sweet! Love collecting the cards.', rating: 5 },
      { user: 'Harry Potter', comment: 'Got Dumbledore on my first try!', rating: 5 },
    ],
    magicalProperties: 'Self-hopping chocolate with collectible cards',
    spellLevel: 'Beginner',
  },
  {
    id: crypto.randomUUID(),
    name: "Bertie Bott's Every Flavour Beans",
    category: 'Magical Foods',
    price: 6.25,
    quantity: 80,
    image: '/src/assets/images/bertie-bott-beans.webp',
    description: 'Risk it all with these magical jelly beans! Flavors include chocolate, peppermint, and liver, tripe, earwax, spinach, and worse! You never know what you\'re going to get.',
    rating: 4.2,
    reviews: [
      { user: 'Dumbledore', comment: 'Alas, earwax! But the good ones are delightful.', rating: 4 },
      { user: 'Hermione Granger', comment: 'Fascinating magic, terrible spinach flavor.', rating: 4 },
    ],
    magicalProperties: 'Truly every flavor imaginable, good and bad',
    spellLevel: 'Beginner',
  },
  {
    id: crypto.randomUUID(),
    name: 'Butterbeer',
    category: 'Magical Foods',
    price: 4.50,
    quantity: 200,
    image: '/src/assets/images/butterbeer.webp',
    description: 'The wizarding world\'s favorite beverage! Warming, butterscotch-flavored drink with a slight alcoholic content. Perfect for cold days in Hogsmeade. Served hot or cold with foam on top.',
    rating: 4.9,
    reviews: [
      { user: 'Hermione Granger', comment: 'Perfectly warming and delicious!', rating: 5 },
      { user: 'Hagrid', comment: 'Nothing beats a good butterbeer by the fire.', rating: 5 },
    ],
    magicalProperties: 'Warming properties, slight magical enhancement',
    spellLevel: 'Beginner',
  },

  // Magical Accessories - "Magical Menagerie & More"
  {
    id: crypto.randomUUID(),
    name: 'Invisibility Cloak',
    category: 'Magical Accessories',
    price: 1500.00,
    quantity: 3,
    image: '/src/assets/images/invisibility-cloak.webp',
    description: 'True invisibility cloak woven from Demiguise hair. Provides complete invisibility and is resistant to most revealing charms. One size fits all. Passed down through generations of the Potter family.',
    rating: 5.0,
    reviews: [
      { user: 'Harry Potter', comment: 'Invaluable for midnight adventures!', rating: 5 },
      { user: 'James Potter', comment: 'Perfect for mischief and mayhem.', rating: 5 },
    ],
    magicalProperties: 'Complete invisibility, resistant to detection',
    spellLevel: 'Master',
  },
  {
    id: crypto.randomUUID(),
    name: "Marauder's Map",
    category: 'Magical Accessories',
    price: 250.00,
    quantity: 10,
    image: '/src/assets/images/marauders-map.webp',
    description: 'I solemnly swear I am up to no good. This magical map shows every person\'s location within Hogwarts, including secret passages. Created by Messrs. Moony, Wormtail, Padfoot, and Prongs.',
    rating: 4.9,
    reviews: [
      { user: 'Fred Weasley', comment: 'Our greatest treasure! Endless possibilities.', rating: 5 },
      { user: 'George Weasley', comment: 'Perfect for avoiding Filch and finding trouble.', rating: 5 },
    ],
    magicalProperties: 'Shows all people and secret passages in real-time',
    spellLevel: 'Advanced',
  },
  {
    id: crypto.randomUUID(),
    name: 'Time-Turner',
    category: 'Magical Accessories',
    price: 2000.00,
    quantity: 2,
    image: '/src/assets/images/time-turner.webp',
    description: 'Extremely rare magical device that allows the user to travel back in time up to 5 hours. Requires special Ministry permission. Golden hourglass pendant on a long chain. Use with extreme caution.',
    rating: 5.0,
    reviews: [
      { user: 'Hermione Granger', comment: 'Invaluable for attending multiple classes!', rating: 5 },
      { user: 'Professor McGonagall', comment: 'Dangerous but necessary for exceptional students.', rating: 5 },
    ],
    magicalProperties: 'Time travel up to 5 hours in the past',
    spellLevel: 'Master',
  },

  // Dark Arts Defense
  {
    id: crypto.randomUUID(),
    name: 'Protective Charms Bundle',
    category: 'Dark Arts Defense',
    price: 180.00,
    quantity: 25,
    image: '/src/assets/images/protective-charms.webp',
    description: 'Complete collection of protective charms and amulets. Includes Protean Charm items, Shield Charm enhancers, and anti-jinx accessories. Essential for anyone facing dark magic threats.',
    rating: 4.7,
    reviews: [
      { user: 'Auror Kingsley', comment: 'Professional-grade protection. Highly recommended.', rating: 5 },
      { user: 'Neville Longbottom', comment: 'Gave me confidence against Death Eaters.', rating: 5 },
    ],
    magicalProperties: 'Multi-layered magical protection against dark arts',
    spellLevel: 'Advanced',
  },
];

export const MOCK_USERS: User[] = [
  {
    id: crypto.randomUUID(),
    name: 'Harry Potter',
    email: 'harry@hogwarts.edu',
    password: 'hedwig123',
    addresses: [
      { id: crypto.randomUUID(), street: '4 Privet Drive', city: 'Little Whinging', state: 'Surrey', zip: 'RG12 9XX', country: 'UK', magicalLocation: 'Near Muggle London' },
      { id: crypto.randomUUID(), street: 'Gryffindor Tower', city: 'Hogwarts', state: 'Scotland', zip: 'H0G 1W4', country: 'UK', magicalLocation: 'Hogwarts School of Witchcraft and Wizardry' },
    ],
    paymentMethods: [
      { id: crypto.randomUUID(), type: 'Credit Card', last4: '4242' },
      { id: crypto.randomUUID(), type: 'Debit Card', last4: '1234' },
    ],
    loyaltyStatus: 'Gold Member',
    autoReplenishment: [
      { productId: MOCK_PRODUCTS.find(p => p.name === 'Butterbeer')?.id || '', frequency: 'weekly', quantity: 6 },
    ],
    hogwartsHouse: 'Gryffindor',
    wizardLevel: 85,
    wandType: 'Holly and Phoenix Feather',
  },
];

export const MOCK_CATEGORIES: string[] = [
  'Wands',
  'Potions',
  'Flying Equipment',
  'Magical Foods',
  'Magical Accessories',
  'Dark Arts Defense',
];

export const MOCK_ORDERS: Order[] = [
  {
    id: crypto.randomUUID(),
    userId: MOCK_USERS[0].id,
    items: [
      { productId: MOCK_PRODUCTS[0].id, name: MOCK_PRODUCTS[0].name, price: MOCK_PRODUCTS[0].price, quantity: 1, image: MOCK_PRODUCTS[0].image },
      { productId: MOCK_PRODUCTS[8].id, name: MOCK_PRODUCTS[8].name, price: MOCK_PRODUCTS[8].price, quantity: 3, image: MOCK_PRODUCTS[8].image },
    ],
    total: MOCK_PRODUCTS[0].price + (MOCK_PRODUCTS[8].price * 3) + ((MOCK_PRODUCTS[0].price + (MOCK_PRODUCTS[8].price * 3)) * 0.08),
    status: 'Delivered',
    orderDate: '2024-07-20',
    deliveryAddress: MOCK_USERS[0].addresses[1],
    deliverySlot: { date: '2024-07-21', time: '09:00 AM - 11:00 AM' },
    paymentMethod: 'Credit Card',
    deliveryMethod: 'Express Delivery',
  },
];