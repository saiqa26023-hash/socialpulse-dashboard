export const user = {
  name: "Saiqa",   // pehle "Alex Johnson" tha
  username: "@saiqa",
  avatar: "https://i.pravatar.cc/150?img=7",
  followers: 23000,      // 23K
  following: 850,
  posts: 342,
  cover: "https://images.unsplash.com/..."
};

export const posts = [
  { id: 1, content: "Just launched our new product! 🚀 Excited to share with you all.", likes: 234, comments: 45, time: "2h ago" },
  { id: 2, content: "Beautiful sunset today 🌅", likes: 567, comments: 89, time: "5h ago" },
  { id: 3, content: "Working on some amazing features. Stay tuned! ✨", likes: 123, comments: 23, time: "1d ago" },
];

export const comments = [
  { id: 1, user: "Jane Cooper", avatar: "https://i.pravatar.cc/40?img=1", text: "Great post! Really insightful.", type: "on my post", time: "10m ago" },
  { id: 2, user: "John Doe", avatar: "https://i.pravatar.cc/40?img=2", text: "I totally agree with you.", type: "my comment", time: "25m ago" },
  { id: 3, user: "Emily Smith", avatar: "https://i.pravatar.cc/40?img=3", text: "Thanks for sharing this!", type: "on my post", time: "1h ago" },
];

export const notifications = [
  { id: 1, message: "John Doe liked your post", time: "5m ago", read: false },
  { id: 2, message: "Emily Smith commented: 'Nice!'", time: "15m ago", read: false },
  { id: 3, message: "You have 3 new followers", time: "1h ago", read: true },
];

export const analyticsData = {
  engagement: [65, 78, 90, 120, 150, 180, 200],
  followersGrowth: [5000, 5200, 5800, 6200, 7000, 8500, 10000],
  categories: ["Tech", "Lifestyle", "Travel"],
  categoryValues: [45, 30, 25],
  daily: [
    { name: "Mon", value: 65 },
    { name: "Tue", value: 78 },
    { name: "Wed", value: 90 },
    { name: "Thu", value: 120 },
    { name: "Fri", value: 150 },
    { name: "Sat", value: 180 },
    { name: "Sun", value: 200 },
  ],
  
};