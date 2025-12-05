import { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Clock, User, Heart, MessageCircle, Share2, Search, Plus } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const categories = ['All', 'Organic', 'Technology', 'Irrigation', 'Pest Control', 'Market'];

const blogPosts = [
  {
    id: 1,
    title: 'Organic Farming: A Complete Guide for Beginners',
    excerpt: 'Learn the fundamentals of organic farming, from soil preparation to natural pest control methods that will help you grow healthier crops.',
    author: 'Rajesh Kumar',
    avatar: 'RK',
    date: 'Dec 1, 2025',
    readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=600&h=400&fit=crop',
    category: 'Organic',
    likes: 245,
    comments: 32,
  },
  {
    id: 2,
    title: 'Water Conservation Techniques for Dry Season',
    excerpt: 'Discover effective irrigation methods to maximize water usage during drought conditions and protect your crops from water stress.',
    author: 'Priya Sharma',
    avatar: 'PS',
    date: 'Nov 28, 2025',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=600&h=400&fit=crop',
    category: 'Irrigation',
    likes: 189,
    comments: 24,
  },
  {
    id: 3,
    title: 'Maximizing Crop Yield with Smart Technology',
    excerpt: 'How modern farmers are using IoT sensors and AI to increase productivity and reduce costs while maintaining sustainable practices.',
    author: 'Amit Patel',
    avatar: 'AP',
    date: 'Nov 25, 2025',
    readTime: '10 min read',
    image: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=600&h=400&fit=crop',
    category: 'Technology',
    likes: 312,
    comments: 45,
  },
  {
    id: 4,
    title: 'Natural Pest Control Methods That Actually Work',
    excerpt: 'Say goodbye to harmful pesticides. Learn about companion planting, beneficial insects, and organic sprays for pest management.',
    author: 'Sunita Devi',
    avatar: 'SD',
    date: 'Nov 22, 2025',
    readTime: '7 min read',
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&h=400&fit=crop',
    category: 'Pest Control',
    likes: 178,
    comments: 28,
  },
  {
    id: 5,
    title: 'Understanding Commodity Markets for Better Returns',
    excerpt: 'A comprehensive guide to agricultural commodity markets, MSP, and strategies to get the best price for your produce.',
    author: 'Vikram Singh',
    avatar: 'VS',
    date: 'Nov 20, 2025',
    readTime: '12 min read',
    image: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=600&h=400&fit=crop',
    category: 'Market',
    likes: 256,
    comments: 38,
  },
  {
    id: 6,
    title: 'Soil Health: The Foundation of Good Farming',
    excerpt: 'Everything you need to know about maintaining healthy soil, including testing, amendments, and cover cropping techniques.',
    author: 'Meera Reddy',
    avatar: 'MR',
    date: 'Nov 18, 2025',
    readTime: '9 min read',
    image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=600&h=400&fit=crop',
    category: 'Organic',
    likes: 198,
    comments: 31,
  },
];

export default function Blogs() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-16">
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
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Agricultural Insights & Stories
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Learn from experienced farmers, discover new techniques, and share your own knowledge with the community.
            </p>
          </motion.div>

          {/* Search & Filter */}
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
              <Button variant="hero">
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
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === category
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Blog Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card variant="feature" className="h-full overflow-hidden cursor-pointer">
                  <div className="relative overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-accent text-accent-foreground">
                        {post.category}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-5">
                    <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-accent transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>

                    {/* Author */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-semibold text-primary">
                        {post.avatar}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-foreground">{post.author}</p>
                        <p className="text-xs text-muted-foreground">{post.date}</p>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        {post.readTime}
                      </div>
                    </div>

                    {/* Engagement */}
                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-destructive transition-colors">
                        <Heart className="w-4 h-4" />
                        {post.likes}
                      </button>
                      <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors">
                        <MessageCircle className="w-4 h-4" />
                        {post.comments}
                      </button>
                      <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-accent transition-colors">
                        <Share2 className="w-4 h-4" />
                        Share
                      </button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-16">
              <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-10 h-10 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">No articles found</h3>
              <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
