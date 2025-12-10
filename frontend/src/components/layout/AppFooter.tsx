import { Link } from 'react-router-dom';
import { Leaf, Facebook, Twitter, Instagram, Linkedin, Youtube } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function AppFooter() {
  return (
    <footer className="bg-sidebar text-sidebar-foreground">
      <div className="container mx-auto px-4 py-8">
        <div className="grid sm:grid-cols-2 gap-8">
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/dashboard" className="text-sidebar-foreground/70 hover:text-sidebar-primary transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/disease-detector" className="text-sidebar-foreground/70 hover:text-sidebar-primary transition-colors">
                  Disease Detector
                </Link>
              </li>
              <li>
                <Link to="/weather" className="text-sidebar-foreground/70 hover:text-sidebar-primary transition-colors">
                  Weather Forecast
                </Link>
              </li>
              <li>
                <Link to="/chatbot" className="text-sidebar-foreground/70 hover:text-sidebar-primary transition-colors">
                  AI Assistant
                </Link>
              </li>
              <li>
                <Link to="/blogs" className="text-sidebar-foreground/70 hover:text-sidebar-primary transition-colors">
                  Blogs
                </Link>
              </li>
              <li>
                <Link to="/todo" className="text-sidebar-foreground/70 hover:text-sidebar-primary transition-colors">
                  Todo List
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">About AgroSense AI</h4>
            <p className="text-sidebar-foreground/70 text-sm">
              Empowering farmers with AI-driven insights for smarter, more sustainable agriculture.
            </p>
          </div>
        </div>
      </div>

      <div className="border-t border-sidebar-border">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg gradient-accent flex items-center justify-center">
                  <Leaf className="w-4 h-4 text-accent-foreground" />
                </div>
                <span className="font-bold">AgroSense AI</span>
              </div>
              <span className="text-sidebar-foreground/50 text-sm">
                © 2025 AgroSense AI. All Rights Reserved.
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-sidebar-accent">
                <Facebook className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-sidebar-accent">
                <Twitter className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-sidebar-accent">
                <Instagram className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-sidebar-accent">
                <Linkedin className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-sidebar-accent">
                <Youtube className="w-5 h-5" />
              </Button>
            </div>

            <div className="flex items-center gap-4 text-sm">
              <Link to="/privacy" className="text-sidebar-foreground/50 hover:text-sidebar-primary transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-sidebar-foreground/50 hover:text-sidebar-primary transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
