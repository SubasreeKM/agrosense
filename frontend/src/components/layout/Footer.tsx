import { Link } from 'react-router-dom';
import {
  Leaf, Mail, Phone, MapPin,
  Facebook, Twitter, Instagram, Linkedin, Youtube
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

import { useState } from 'react';
import axios from 'axios';

export function Footer() {

  // FORM STATES
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  // FORM SUBMIT HANDLER
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const res = await axios.post<{ message?: string }>("http://localhost:5000/api/contact", {
        name,
        email,
        subject,
        message,
      });

      alert(res.data?.message ?? "Message sent successfully!");

      // RESET FORM
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
      
    } catch (err) {
      alert("Failed to send message. Please try again.");
    }
  };

  return (
    <footer className="bg-sidebar text-sidebar-foreground">

      {/* Contact Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-12">

          {/* Contact Form */}
          <div>
            <h3 className="text-2xl font-bold mb-6">Get in Touch</h3>

            <form className="space-y-4" onSubmit={handleSubmit}>

              <div className="grid sm:grid-cols-2 gap-4">
                <Input
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-sidebar-accent border-sidebar-border text-sidebar-foreground placeholder:text-sidebar-foreground/50"
                />

                <Input
                  type="email"
                  placeholder="Your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-sidebar-accent border-sidebar-border text-sidebar-foreground placeholder:text-sidebar-foreground/50"
                />
              </div>

              <Input
                placeholder="Subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="bg-sidebar-accent border-sidebar-border text-sidebar-foreground placeholder:text-sidebar-foreground/50"
              />

              <Textarea
                placeholder="Your Message"
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="bg-sidebar-accent border-sidebar-border text-sidebar-foreground placeholder:text-sidebar-foreground/50 resize-none"
              />

              <Button variant="accent" size="lg" type="submit">
                Send Message
              </Button>
            </form>
          </div>

          {/* Contact Info & Links */}
          <div className="grid sm:grid-cols-2 gap-8">
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-3">
                <li><Link to="/" className="text-sidebar-foreground/70 hover:text-sidebar-primary transition-colors">Home</Link></li>
                <li><Link to="/dashboard" className="text-sidebar-foreground/70 hover:text-sidebar-primary transition-colors">Dashboard</Link></li>
                <li><Link to="/disease-detector" className="text-sidebar-foreground/70 hover:text-sidebar-primary transition-colors">Disease Detector</Link></li>
                <li><Link to="/weather" className="text-sidebar-foreground/70 hover:text-sidebar-primary transition-colors">Weather Forecast</Link></li>
                <li><Link to="/blogs" className="text-sidebar-foreground/70 hover:text-sidebar-primary transition-colors">Blogs</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
              <ul className="space-y-4">

                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-sidebar-primary mt-0.5 flex-shrink-0" />
                  <span className="text-sidebar-foreground/70">
                    123 Agriculture Road, Farmville, IN 12345
                  </span>
                </li>

                <li className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-sidebar-primary flex-shrink-0" />
                  <span className="text-sidebar-foreground/70">+91 98765 43210</span>
                </li>

                <li className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-sidebar-primary flex-shrink-0" />
                  <span className="text-sidebar-foreground/70">support@agrosense.ai</span>
                </li>

              </ul>
            </div>

          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-sidebar-border">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">

            {/* Logo */}
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

            {/* Social Icons */}
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-sidebar-accent"><Facebook className="w-5 h-5" /></Button>
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-sidebar-accent"><Twitter className="w-5 h-5" /></Button>
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-sidebar-accent"><Instagram className="w-5 h-5" /></Button>
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-sidebar-accent"><Linkedin className="w-5 h-5" /></Button>
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-sidebar-accent"><Youtube className="w-5 h-5" /></Button>
            </div>

            {/* Legal */}
            <div className="flex items-center gap-4 text-sm">
              <Link to="/privacy" className="text-sidebar-foreground/50 hover:text-sidebar-primary transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="text-sidebar-foreground/50 hover:text-sidebar-primary transition-colors">Terms of Service</Link>
            </div>

          </div>
        </div>
      </div>

    </footer>
  );
}
