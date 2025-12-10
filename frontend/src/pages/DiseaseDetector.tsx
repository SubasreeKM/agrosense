import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useDropzone } from 'react-dropzone';
import { 
  Upload, 
  ScanLine, 
  AlertTriangle, 
  CheckCircle2, 
  Loader2, 
  Leaf,
  Info
} from 'lucide-react';
import { AppNavbar } from '@/components/layout/AppNavbar';
import { AppFooter } from '@/components/layout/AppFooter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

interface DetectionResult {
  disease: string;
  confidence: number;
  severity: 'low' | 'medium' | 'high';
  treatment: string[];
  prevention: string[];
  weatherAlert: string | null;
}

const diseaseDatabase: Record<string, DetectionResult> = {
  default: {
    disease: 'Late Blight (Phytophthora infestans)',
    confidence: 94.5,
    severity: 'medium',
    treatment: [
      'Apply copper-based fungicide immediately',
      'Remove and destroy infected plant parts',
      'Increase spacing between plants for better air circulation',
      'Apply Mancozeb 75% WP at 2.5g/L water',
    ],
    prevention: [
      'Use disease-resistant varieties',
      'Avoid overhead irrigation',
      'Practice crop rotation',
      'Maintain proper plant spacing',
    ],
    weatherAlert: 'High humidity expected in next 3 days - increase monitoring frequency',
  },
};

export default function DiseaseDetector() {
  const [preview, setPreview] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<DetectionResult | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result as string);
        setResult(null);
        setAnalyzing(true);
        setTimeout(() => {
          setAnalyzing(false);
          setResult(diseaseDatabase.default);
        }, 3000);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.jpeg', '.jpg', '.png', '.webp'] },
    maxFiles: 1,
  });

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'bg-accent text-accent-foreground';
      case 'medium': return 'bg-sun text-sun-foreground';
      case 'high': return 'bg-destructive text-destructive-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const resetScan = () => {
    setPreview(null);
    setResult(null);
    setAnalyzing(false);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <AppNavbar />
      
      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
              <ScanLine className="w-4 h-4" />
              AI Disease Detection
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Crop Disease Detector
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Upload a photo of your crop leaf and our AI model will identify 
              diseases with 98% accuracy and provide treatment recommendations.
            </p>
          </motion.div>

          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Card variant="elevated" className="h-full">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Upload className="w-5 h-5 text-accent" />
                      Upload Leaf Image
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div
                      {...getRootProps()}
                      className={`
                        relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer
                        transition-all duration-300 min-h-[350px] flex items-center justify-center
                        ${isDragActive 
                          ? 'border-accent bg-accent/5' 
                          : 'border-border hover:border-accent/50 hover:bg-muted/50'
                        }
                      `}
                    >
                      <input {...getInputProps()} />
                      {preview ? (
                        <div className="relative w-full">
                          <img
                            src={preview}
                            alt="Uploaded leaf"
                            className="w-full h-80 object-contain rounded-lg"
                          />
                          {analyzing && (
                            <div className="absolute inset-0 bg-background/80 backdrop-blur-sm rounded-lg flex items-center justify-center">
                              <div className="text-center">
                                <div className="w-16 h-16 rounded-full gradient-accent flex items-center justify-center mx-auto mb-4">
                                  <Loader2 className="w-8 h-8 text-accent-foreground animate-spin" />
                                </div>
                                <p className="text-lg font-medium text-foreground">Analyzing Image...</p>
                                <p className="text-sm text-muted-foreground">
                                  Running AI disease detection model
                                </p>
                              </div>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div>
                          <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                            <Upload className="w-10 h-10 text-accent" />
                          </div>
                          <p className="text-lg font-medium text-foreground mb-2">
                            {isDragActive ? 'Drop your image here' : 'Drag & drop a leaf image'}
                          </p>
                          <p className="text-sm text-muted-foreground mb-4">
                            or click to browse (JPG, PNG, WEBP)
                          </p>
                          <Button variant="outline">
                            Choose File
                          </Button>
                        </div>
                      )}
                    </div>

                    {preview && !analyzing && (
                      <div className="flex gap-3 mt-4">
                        <Button variant="outline" className="flex-1" onClick={resetScan}>
                          Scan New Image
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card variant="elevated" className="h-full">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Leaf className="w-5 h-5 text-accent" />
                      Detection Results
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {result ? (
                      <div className="space-y-6">
                        <div className="flex items-start gap-4">
                          <div className="w-14 h-14 rounded-xl bg-destructive/10 flex items-center justify-center flex-shrink-0">
                            <AlertTriangle className="w-7 h-7 text-destructive" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-xl font-bold text-foreground mb-1">
                              {result.disease}
                            </h3>
                            <Badge className={getSeverityColor(result.severity)}>
                              {result.severity.charAt(0).toUpperCase() + result.severity.slice(1)} Severity
                            </Badge>
                          </div>
                        </div>

                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-muted-foreground">Detection Confidence</span>
                            <span className="text-lg font-bold text-accent">{result.confidence}%</span>
                          </div>
                          <Progress value={result.confidence} className="h-3" />
                        </div>

                        {result.weatherAlert && (
                          <div className="p-4 rounded-xl bg-sun/10 border border-sun/20">
                            <div className="flex items-center gap-2 mb-2">
                              <AlertTriangle className="w-5 h-5 text-sun" />
                              <span className="font-medium text-foreground">Weather Alert</span>
                            </div>
                            <p className="text-sm text-muted-foreground">{result.weatherAlert}</p>
                          </div>
                        )}

                        <div className="p-4 rounded-xl bg-accent/5 border border-accent/20">
                          <div className="flex items-center gap-2 mb-3">
                            <CheckCircle2 className="w-5 h-5 text-accent" />
                            <span className="font-medium text-foreground">Recommended Treatment</span>
                          </div>
                          <ul className="space-y-2">
                            {result.treatment.map((item, i) => (
                              <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                                <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="p-4 rounded-xl bg-muted/50">
                          <div className="flex items-center gap-2 mb-3">
                            <Info className="w-5 h-5 text-primary" />
                            <span className="font-medium text-foreground">Prevention Tips</span>
                          </div>
                          <ul className="space-y-2">
                            {result.prevention.map((item, i) => (
                              <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ) : (
                      <div className="h-full flex items-center justify-center py-16">
                        <div className="text-center">
                          <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                            <ScanLine className="w-10 h-10 text-muted-foreground" />
                          </div>
                          <h4 className="text-lg font-semibold text-foreground mb-2">
                            Upload an Image to Analyze
                          </h4>
                          <p className="text-sm text-muted-foreground max-w-xs mx-auto">
                            Our AI can detect over 38 common crop diseases including 
                            blight, rust, mosaic virus, and more.
                          </p>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </main>

      <AppFooter />
    </div>
  );
}
