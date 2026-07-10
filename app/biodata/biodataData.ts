export type Field = { label: string; value: string | null };

export const personalDetails: Field[] = [
  { label: "Full Name", value: "Vikash Kumar" },
  { label: "Date of Birth", value: null },
  { label: "Time of Birth", value: null },
  { label: "Place of Birth", value: null },
  { label: "Height", value: null },
  { label: "Complexion", value: null },
  { label: "Blood Group", value: null },
  { label: "Marital Status", value: null },
  { label: "Religion", value: null },
  { label: "Caste / Community", value: null },
  { label: "Gotra", value: null },
  { label: "Diet", value: null },
  { label: "Nationality", value: "Indian" },
  { label: "Current City", value: "Dubai, UAE" },
  { label: "Native Place", value: null },
];

export const familyDetails: Field[] = [
  { label: "Father's Name", value: null },
  { label: "Father's Occupation", value: null },
  { label: "Mother's Name", value: null },
  { label: "Mother's Occupation", value: null },
  { label: "Siblings", value: null },
  { label: "Family Type", value: null },
];

export const astrologicalDetails: Field[] = [
  { label: "Rashi (Moon Sign)", value: null },
  { label: "Nakshatra", value: null },
  { label: "Manglik Status", value: null },
];

export const professionalDetails: Field[] = [
  { label: "Current Role", value: "Business Analyst, Namshi (E-Commerce), Dubai" },
  { label: "Annual Income", value: null },
];

export const aboutMe =
  "A curious, analytical mind with a habit of turning data into decisions. " +
  "IIT Delhi graduate and Dakshana Scholar, selected among the top 1% nationwide " +
  "for elite IIT-JEE coaching. National Winner of the 16th Youth Parliament, " +
  "Ministry of Parliamentary Affairs, Government of India. Currently leads " +
  "category analytics for a major Middle East e-commerce platform, with 4+ years " +
  "spent turning pricing, inventory, and marketing data into measurable growth. " +
  "Believes in showing up prepared, staying curious, and working well with people " +
  "— disciplined, warm, and always building toward the next goal.";
