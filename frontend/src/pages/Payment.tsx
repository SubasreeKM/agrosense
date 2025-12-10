import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';
import { CreditCard, Download, RefreshCw, Copy, Check } from 'lucide-react';
import { AppNavbar } from '@/components/layout/AppNavbar';
import { AppFooter } from '@/components/layout/AppFooter';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

interface PaymentQR {
  id: string;
  user_id: string;
  qr_data: string;
  upi_id: string | null;
  name: string | null;
  created_at: string;
}

export default function Payment() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [existingQR, setExistingQR] = useState<PaymentQR | null>(null);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  
  const [formData, setFormData] = useState({
    upiId: '',
    name: '',
  });

  useEffect(() => {
    if (user) {
      fetchExistingQR();
    }
  }, [user]);

  const fetchExistingQR = async () => {
    try {
      const { data, error } = await supabase
        .from('user_payment_qr')
        .select('*')
        .eq('user_id', user?.id)
        .maybeSingle();

      if (error) throw error;
      setExistingQR(data);
    } catch (error) {
      console.error('Error fetching QR:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateQRData = () => {
    // Generate UPI payment string
    const upiString = `upi://pay?pa=${formData.upiId}&pn=${encodeURIComponent(formData.name)}&cu=INR`;
    return upiString;
  };

  const handleGenerateQR = async () => {
    if (!formData.upiId || !formData.name) {
      toast({
        title: "Missing Information",
        description: "Please enter both UPI ID and name.",
        variant: "destructive",
      });
      return;
    }

    setGenerating(true);
    try {
      const qrData = generateQRData();
      
      const { data, error } = await supabase
        .from('user_payment_qr')
        .insert({
          user_id: user?.id,
          qr_data: qrData,
          upi_id: formData.upiId,
          name: formData.name,
        })
        .select()
        .single();

      if (error) throw error;

      setExistingQR(data);
      toast({
        title: "QR Code Generated!",
        description: "Your payment QR code has been created and saved.",
      });
    } catch (error: any) {
      console.error('Error generating QR:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to generate QR code.",
        variant: "destructive",
      });
    } finally {
      setGenerating(false);
    }
  };

  const handleDownloadQR = () => {
    const svg = document.getElementById('payment-qr-code');
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx?.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL('image/png');
      const downloadLink = document.createElement('a');
      downloadLink.download = `payment-qr-${formData.name || 'farmer'}.png`;
      downloadLink.href = pngFile;
      downloadLink.click();
    };

    img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
  };

  const handleCopyUPI = () => {
    if (existingQR?.upi_id) {
      navigator.clipboard.writeText(existingQR.upi_id);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast({
        title: "Copied!",
        description: "UPI ID copied to clipboard.",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <AppNavbar />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-4 flex items-center justify-center min-h-[60vh]">
            <RefreshCw className="w-8 h-8 animate-spin text-primary" />
          </div>
        </main>
        <AppFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <AppNavbar />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto"
          >
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                <CreditCard className="w-4 h-4" />
                Payment QR Code
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                Receive Payments Easily
              </h1>
              <p className="text-muted-foreground">
                Generate a QR code for your customers to pay you directly for rice, wheat, or other produce.
              </p>
            </div>

            {existingQR ? (
              <Card variant="elevated">
                <CardHeader className="text-center">
                  <CardTitle>Your Payment QR Code</CardTitle>
                  <CardDescription>
                    Share this QR code with customers for easy payments
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center gap-6">
                  <div className="p-6 bg-white rounded-2xl shadow-lg">
                    <QRCodeSVG
                      id="payment-qr-code"
                      value={existingQR.qr_data}
                      size={220}
                      level="H"
                      includeMargin
                    />
                  </div>
                  
                  <div className="text-center">
                    <p className="text-lg font-semibold text-foreground">{existingQR.name}</p>
                    <div className="flex items-center justify-center gap-2 mt-1">
                      <p className="text-muted-foreground">{existingQR.upi_id}</p>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={handleCopyUPI}
                      >
                        {copied ? (
                          <Check className="w-4 h-4 text-accent" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
                  </div>

                  <Button onClick={handleDownloadQR} className="gap-2">
                    <Download className="w-4 h-4" />
                    Download QR Code
                  </Button>

                  <p className="text-sm text-muted-foreground text-center">
                    Created on {new Date(existingQR.created_at).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </p>
                </CardContent>
              </Card>
            ) : (
              <Card variant="elevated">
                <CardHeader>
                  <CardTitle>Generate Your Payment QR</CardTitle>
                  <CardDescription>
                    Enter your UPI details to create a one-time payment QR code
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Your Name / Farm Name</Label>
                    <Input
                      id="name"
                      placeholder="e.g., Ramesh Singh Farm"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="upiId">UPI ID</Label>
                    <Input
                      id="upiId"
                      placeholder="e.g., yourname@upi"
                      value={formData.upiId}
                      onChange={(e) => setFormData({ ...formData, upiId: e.target.value })}
                    />
                    <p className="text-xs text-muted-foreground">
                      Your UPI ID from Google Pay, PhonePe, Paytm, or any bank app
                    </p>
                  </div>

                  <Button
                    onClick={handleGenerateQR}
                    disabled={generating}
                    className="w-full gap-2"
                  >
                    {generating ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <CreditCard className="w-4 h-4" />
                        Generate QR Code
                      </>
                    )}
                  </Button>

                  <p className="text-xs text-muted-foreground text-center">
                    Note: You can only generate one QR code per account. Make sure your details are correct.
                  </p>
                </CardContent>
              </Card>
            )}
          </motion.div>
        </div>
      </main>

      <AppFooter />
    </div>
  );
}