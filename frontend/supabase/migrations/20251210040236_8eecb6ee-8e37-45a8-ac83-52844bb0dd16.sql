-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create table for storing user payment QR codes
CREATE TABLE public.user_payment_qr (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  qr_data TEXT NOT NULL,
  upi_id TEXT,
  name TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id)
);

-- Enable Row Level Security
ALTER TABLE public.user_payment_qr ENABLE ROW LEVEL SECURITY;

-- Create policies for user access
CREATE POLICY "Users can view their own QR code" 
ON public.user_payment_qr 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own QR code" 
ON public.user_payment_qr 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own QR code" 
ON public.user_payment_qr 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_user_payment_qr_updated_at
BEFORE UPDATE ON public.user_payment_qr
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();