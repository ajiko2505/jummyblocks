export const site = {
  name: "Jummy Blocks",
  address: "No 11 Jubril Aminu, Parkview Estate, Ikoyi, Lagos",
  whatsapp: "2348066278073",
  phoneDisplay: "+234 806 627 8073",
  email: "snapknowledge101@gmail.com",
  hours: "Monday – Saturday | 8am – 5pm",
  // Set this to your online shop URL to show a "Buy online" button on product pages.
  shopUrl: "",
  facebook: "https://web.facebook.com/",
  instagram: "https://www.instagram.com/jummyblocks/",
  tiktok: "https://www.tiktok.com/@jummyblocks?lang=en-GB",
};

export function waLink(message: string) {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
}

export const defaultWaMessage =
  "Hello Jummy Blocks, I found you on your website and I'd like to make an enquiry about your blocks and paving stones.";
