export const icons = {};

export const categories = [
  {
    count: 3,
    title: "beaches",
    slug: "beaches",
  },
  {
    count: 12,
    title: "adventure",
    slug: "adventure",
  },
  {
    count: 6,
    title: "low budget",
    slug: "low-budget",
  },
  {
    count: 7,
    title: "camping",
    slug: "camping",
  },
  {
    count: 9,
    title: "trekking",
    slug: "trekking",
  },
  {
    count: 5,
    title: "popular",
    slug: "popular",
  },
];

const categoriesData = categories.map((category) => ({
  icon: icons[category.title as keyof typeof icons],
  ...category,
}));

export default categoriesData;
