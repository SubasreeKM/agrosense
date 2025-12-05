import { motion } from 'framer-motion';
import { MapPin, Navigation, Phone, Clock, Star, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';

const shops = [
  {
    id: 1,
    name: 'Krishna Agro Supplies',
    address: '123 Main Market, Sector 5, Farmville',
    distance: '1.2 km',
    rating: 4.8,
    phone: '+91 98765 43210',
    hours: 'Open until 8 PM',
    isOpen: true,
  },
  {
    id: 2,
    name: 'Green Earth Fertilizers',
    address: '456 Agricultural Zone, Block B',
    distance: '2.5 km',
    rating: 4.5,
    phone: '+91 98765 43211',
    hours: 'Open until 7 PM',
    isOpen: true,
  },
  {
    id: 3,
    name: 'Farm Fresh Seeds & More',
    address: '789 Rural Road, Village Center',
    distance: '3.8 km',
    rating: 4.7,
    phone: '+91 98765 43212',
    hours: 'Closed',
    isOpen: false,
  },
];

export function ShopFinderPreview() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-destructive/10 text-destructive text-sm font-medium mb-4">
            <MapPin className="w-4 h-4" />
            Shop Locator
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            Find Nearby Fertilizer Shops
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Locate agricultural supply stores near you with directions, 
            contact info, and business hours.
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Map Placeholder */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card variant="elevated" className="h-full min-h-[400px] overflow-hidden">
                <div className="relative h-full bg-muted">
                  {/* Map placeholder with styling */}
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-primary/5" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                        <MapPin className="w-8 h-8 text-primary" />
                      </div>
                      <p className="text-muted-foreground font-medium">Interactive Map</p>
                      <p className="text-sm text-muted-foreground">
                        Connect to see nearby shops
                      </p>
                      <Link to="/shops">
                        <Button variant="accent" className="mt-4">
                          View Full Map
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                  {/* Decorative map dots */}
                  <div className="absolute top-1/4 left-1/3 w-3 h-3 rounded-full bg-accent animate-pulse" />
                  <div className="absolute top-1/2 left-1/2 w-4 h-4 rounded-full bg-destructive animate-pulse" />
                  <div className="absolute bottom-1/3 right-1/4 w-3 h-3 rounded-full bg-accent animate-pulse" />
                </div>
              </Card>
            </motion.div>

            {/* Shop List */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              {shops.map((shop, index) => (
                <Card key={shop.id} variant="feature" className="overflow-hidden">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                        shop.isOpen ? 'bg-accent/10' : 'bg-muted'
                      }`}>
                        <MapPin className={`w-6 h-6 ${shop.isOpen ? 'text-accent' : 'text-muted-foreground'}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="font-semibold text-foreground truncate">
                            {shop.name}
                          </h4>
                          <div className="flex items-center gap-1 text-sun flex-shrink-0">
                            <Star className="w-4 h-4 fill-current" />
                            <span className="text-sm font-medium">{shop.rating}</span>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground truncate mb-2">
                          {shop.address}
                        </p>
                        <div className="flex flex-wrap items-center gap-4 text-xs">
                          <span className="flex items-center gap-1 text-muted-foreground">
                            <Navigation className="w-3 h-3" />
                            {shop.distance}
                          </span>
                          <span className="flex items-center gap-1 text-muted-foreground">
                            <Phone className="w-3 h-3" />
                            {shop.phone}
                          </span>
                          <span className={`flex items-center gap-1 ${
                            shop.isOpen ? 'text-accent' : 'text-destructive'
                          }`}>
                            <Clock className="w-3 h-3" />
                            {shop.hours}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
