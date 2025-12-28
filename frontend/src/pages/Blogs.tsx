import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  BookOpen,
  Clock,
  Heart,
  MessageCircle,
  Share2,
  Search,
  Plus,
} from "lucide-react";

import { AppNavbar } from "@/components/layout/AppNavbar";
import { AppFooter } from "@/components/layout/AppFooter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import WriteBlogModal from "@/components/blogs/WriteBlogModal";
import { getBlogs } from "@/services/blogService";

const categories = ["All", "Organic", "Technology", "Irrigation", "Pest Control", "Market"];

export default function Blogs() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(true);

  //  Fetch blogs from backend
  const fetchBlogs = async () => {
    try {
      const data = await getBlogs();
      setBlogs(data || []);
    } catch (err) {
      console.error("Failed to load blogs", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const filteredPosts = blogs.filter((post) => {
    const matchesCategory =
      selectedCategory === "All" || post.category === selectedCategory;

    const matchesSearch =
      post.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt?.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <AppNavbar />

      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
              <BookOpen className="w-4 h-4" />
              Farmer Community
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Agricultural Insights & Stories
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Learn from experienced farmers, discover new techniques, and share your own knowledge.
            </p>
          </motion.div>

          {/* Search + Write */}
          <div className="max-w-4xl mx-auto mb-8">
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search articles..."
                  className="pl-10"
                />
              </div>

              <Button variant="hero" onClick={() => setOpenModal(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Write Article
              </Button>
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium ${
                    selectedCategory === category
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Blog Cards */}
          {loading ? (
            <p className="text-center text-muted-foreground">Loading blogs...</p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full overflow-hidden">
                    <div className="relative">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge>{post.category}</Badge>
                      </div>
                    </div>

                    <CardContent className="p-5">
                      <h3 className="text-lg font-semibold mb-2 line-clamp-2">
                        {post.title}
                      </h3>

                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                        {post.excerpt}
                      </p>

                      {/* Author */}
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-semibold">
                          {post.avatar}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">{post.author}</p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(post.created_at).toDateString()}
                          </p>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="w-3 h-3" />
                          {post.read_time}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex justify-between pt-4 border-t text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Heart className="w-4 h-4" /> {post.likes}
                        </span>
                        <span className="flex items-center gap-1">
                          <MessageCircle className="w-4 h-4" /> {post.comments}
                        </span>
                        <span className="flex items-center gap-1">
                          <Share2 className="w-4 h-4" /> Share
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}

          {/* Empty */}
          {!loading && filteredPosts.length === 0 && (
            <div className="text-center py-16">
              <BookOpen className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold">No articles found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search or category
              </p>
            </div>
          )}
        </div>
      </main>

      <AppFooter />

      {/* Write Blog Modal */}
      <WriteBlogModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onSuccess={fetchBlogs}
      />
    </div>
  );
}
