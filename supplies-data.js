
const SUPPLIES = [
  {
    id: "varmala-teakwood-10x10",
    name: "Varmala Teakwood Frame",
    size: "10 × 10 inch",
    price: 300,
    stock: 5,
    category: "Teakwood Frames",
    image: "images/supplies/10x10 Varmala-Teakwood Frame_15mmdeep_300_5.png"
  },
  {
    id: "varmala-teakwood-10x16-acrylic",
    name: "Varmala Teakwood Frame with Acrylic Base",
    size: "10 × 16 inch",
    price: 400,
    stock: 1,
    category: "Teakwood Frames",
    image: "images/supplies/10x16 Varmala-Teakwood Frame with Acrylic ase_15mmdeep_400_1 -.png"
  },
  {
    id: "varmala-teakwood-10x16",
    name: "Varmala Teakwood Frame",
    size: "10 × 16 inch",
    price: 350,
    stock: 2,
    category: "Teakwood Frames",
    image: "images/supplies/10x16 Varmala-Teakwood Frame_15mmdeep_350_2.png"
  },
  {
    id: "varmala-teakwood-12x12",
    name: "Varmala Teakwood Frame",
    size: "12 × 12 inch",
    price: 350,
    stock: 6,
    category: "Teakwood Frames",
    image: "images/supplies/12x12 Varmala-Teakwood Frame_15mmdeep_350_6.png"
  },
  {
    id: "varmala-teakwood-12x16",
    name: "Varmala Teakwood Frame",
    size: "12 × 16 inch",
    price: 400,
    stock: 7,
    category: "Teakwood Frames",
    image: "images/supplies/12x16 Varmala-Teakwood Frame_15mmdeep_400_7.png"
  },
  {
    id: "varmala-teakwood-12x18",
    name: "Varmala Teakwood Frame",
    size: "12 × 18 inch",
    price: 450,
    stock: 4,
    category: "Teakwood Frames",
    image: "images/supplies/12x18 Varmala-Teakwood Frame_15mmdeep_450_4.png"
  },
  {
    id: "varmala-teakwood-6x6",
    name: "Varmala Teakwood Frame",
    size: "6 × 6 inch",
    price: 250,
    stock: 5,
    category: "Teakwood Frames",
    image: "images/supplies/6x6 Varmala-Teakwood Frame_15mmdeep_250_5.png"
  },
  {
    id: "varmala-teakwood-8x8",
    name: "Varmala Teakwood Frame",
    size: "8 × 8 inch",
    price: 250,
    stock: 4,
    category: "Teakwood Frames",
    image: "images/supplies/8x8 Varmala-Teakwood Frame_15mmdeep_250_4.png"
  },
  {
    id: "acrylic-white-12x9",
    name: "Acrylic White Frame",
    size: "12 × 9 inch",
    price: 350,
    stock: 1,
    category: "White Frames",
    image: "images/supplies/Acrylic White Frame_12x9 Inch_350_1.png"
  },
  {
    id: "acrylic-white-8x4",
    name: "Acrylic White Frame",
    size: "8 × 4 inch, 2-inch deep",
    price: 350,
    stock: 1,
    category: "White Frames",
    image: "images/supplies/Acrylic White Frame_8x4 Inch-2 Inch Deeo_350_1.png"
  },
  {
    id: "easel-stand-4",
    name: "Easel Stand",
    size: "4 inch",
    price: 50,
    stock: 4,
    category: "Stands & Accessories",
    image: "images/supplies/Easel Stand_4Inch_50_4.png"
  },
  {
    id: "led-string-light-20m",
    name: "LED String Light",
    size: "20 metres",
    price: 20,
    stock: 2,
    category: "Lights",
    image: "images/supplies/LED String Light_20Mts_20_2.png"
  },
  {
    id: "metal-stand-4",
    name: "Metal Stand",
    size: "4 inch",
    price: 100,
    stock: 9,
    category: "Stands & Accessories",
    image: "images/supplies/Metal Stand_4Inch_100_9.png"
  },
  {
    id: "pinewood-led-lamp-12",
    name: "Pinewood LED Lamp",
    size: "12 inch",
    price: 300,
    stock: 2,
    category: "LED Lamps",
    image: "images/supplies/Pinewood-LEDLAMP_12Inch_300_2.png"
  },
  {
    id: "pinewood-led-lamp-14",
    name: "Pinewood LED Lamp",
    size: "14 inch",
    price: 350,
    stock: 1,
    category: "LED Lamps",
    image: "images/supplies/Pinewood-LEDLAMP_14Inch_350_1.png"
  },
  {
    id: "teakwood-circle-12",
    name: "Teakwood Circle",
    size: "12 inch, 15mm deep",
    price: 350,
    stock: 2,
    category: "Teakwood Frames",
    image: "images/supplies/Teakwood-Circle_12 Inch-15mm Deep_350_2.png"
  },
  {
    id: "teakwood-led-lamp-12",
    name: "Teakwood LED Lamp",
    size: "12 inch",
    price: 350,
    stock: 1,
    category: "LED Lamps",
    image: "images/supplies/Teakwood-LED LAMP_12Inch_350_1.png"
  },
  {
    id: "teakwood-led-lamp-14",
    name: "Teakwood LED Lamp",
    size: "14 inch",
    price: 390,
    stock: 1,
    category: "LED Lamps",
    image: "images/supplies/Teakwood-LED LAMP_14Inch_390_1.png"
  },
  {
    id: "teakwood-led-lamp-8",
    name: "Teakwood LED Lamp",
    size: "8 inch",
    price: 300,
    stock: 1,
    category: "LED Lamps",
    image: "images/supplies/Teakwood-LED LAMP_8Inch_300_1.png"
  },
  {
    id: "teakwood-nameplate-16x6",
    name: "Teakwood Rectangular Nameplate",
    size: "16 × 6 inch, 10mm deep",
    price: 250,
    stock: 2,
    category: "Nameplates",
    image: "images/supplies/Teakwood-Rectangular NamePlate_16x6 Inch-10mm Deep_250_2.png"
  },
  {
    id: "teakwood-rectangular-12x3",
    name: "Teakwood Rectangular Frame",
    size: "12 × 3 inch, 2-inch deep",
    price: 250,
    stock: 2,
    category: "Teakwood Frames",
    image: "images/supplies/Teakwood-Rectangular_12x3 Inch-2 Inch Deep_250_2.png"
  }
];
