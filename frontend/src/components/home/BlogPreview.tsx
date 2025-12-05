import { motion } from 'framer-motion';
import { BookOpen, Clock, User, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';

const blogPosts = [
  {
    id: 1,
    title: 'Organic Farming: A Complete Guide for Beginners',
    excerpt: 'Learn the fundamentals of organic farming, from soil preparation to natural pest control methods.',
    author: 'Rajesh Kumar',
    date: 'Dec 1, 2025',
    readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=400&h=250&fit=crop',
    category: 'Organic',
  },
  {
    id: 2,
    title: 'Water Conservation Techniques for Dry Season',
    excerpt: 'Discover effective irrigation methods to maximize water usage during drought conditions.',
    author: 'Priya Sharma',
    date: 'Nov 28, 2025',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400&h=250&fit=crop',
    category: 'Irrigation',
  },
  {
    id: 3,
    title: 'Maximizing Crop Yield with Smart Technology',
    excerpt: 'How modern farmers are using IoT sensors and AI to increase productivity and reduce costs.',
    author: 'Amit Patel',
    date: 'Nov 25, 2025',
    readTime: '10 min read',
    image: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=400&h=250&fit=crop',
    category: 'Technology',
  },
];

export function BlogPreview() {
  return (
    <section className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
            <BookOpen className="w-4 h-4" />
            Farmer Blogs
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            Learn from the Community
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Read articles and guides from experienced farmers to enhance 
            your agricultural knowledge.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {blogPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card variant="feature" className="h-full overflow-hidden">
                <div className="relative overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-accent text-accent-foreground text-xs font-medium">
                      {post.category}
                    </span>
                  </div>
                </div>
                <CardContent className="p-5">
                  <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-accent transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <User className="w-3 h-3" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-3 h-3" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Link to="/blogs">
            <Button variant="outline" size="lg">
              View All Articles
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
