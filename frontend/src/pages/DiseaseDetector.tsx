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

import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
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

/* Static fallback treatment database */
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
    weatherAlert:
      'High humidity expected in next 3 days - increase monitoring frequency',
  },
};

export default function DiseaseDetector() {
  const [preview, setPreview] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<DetectionResult | null>(null);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    // Image preview
    const reader = new FileReader();
    reader.onload = () => setPreview(reader.result as string);
    reader.readAsDataURL(file);

    setResult(null);
    setAnalyzing(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:5000/api/disease-detect", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      console.log("Backend Response:", data);

      if (data.success) {
        const disease = data.data.disease;
        const confidence = data.data.confidence; // backend returns 0.95

        setResult({
          disease,
          confidence: parseFloat((confidence * 100).toFixed(2)), // convert to percentage
          severity:
            confidence > 0.85
              ? "high"
              : confidence > 0.55
              ? "medium"
              : "low",

          /* You can later replace these with backend recommendations */
          treatment: diseaseDatabase.default.treatment,
          prevention: diseaseDatabase.default.prevention,
          weatherAlert: diseaseDatabase.default.weatherAlert,
        });
      } else {
        alert("Prediction failed: " + data.message);
      }
    } catch (err) {
      console.error(err);
      alert("Error connecting to backend");
    }

    setAnalyzing(false);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [".jpg", ".jpeg", ".png", ".webp"] },
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
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          
          {/* Header Section */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
              <ScanLine className="w-4 h-4" />
              AI Disease Detection
            </span>

            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Crop Disease Detector
            </h1>

            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Upload a photo of your crop leaf — AI will identify the disease  
              and provide treatment recommendations.
            </p>
          </motion.div>

          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-8">

              {/* UPLOAD SECTION */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <Card className="h-full">
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
                        border-2 border-dashed rounded-xl p-8 text-center cursor-pointer
                        min-h-[350px] flex items-center justify-center transition-all
                        ${
                          isDragActive
                            ? "border-accent bg-accent/5"
                            : "border-border hover:border-accent/50 hover:bg-muted/50"
                        }
                      `}
                    >
                      <input {...getInputProps()} />

                      {preview ? (
                        <div className="relative w-full">
                          <img
                            src={preview}
                            alt="Preview"
                            className="w-full h-80 object-contain rounded-lg"
                          />

                          {analyzing && (
                            <div className="absolute inset-0 bg-background/80 backdrop-blur-md rounded-lg flex items-center justify-center">
                              <div className="text-center">
                                <Loader2 className="w-10 h-10 text-accent animate-spin mx-auto mb-2" />
                                <p className="text-sm text-muted-foreground">
                                  Running AI analysis...
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
                          <p className="text-lg font-medium mb-2">
                            {isDragActive ? "Drop image here" : "Drag & drop leaf image"}
                          </p>
                          <p className="text-sm text-muted-foreground mb-4">
                            or click to browse files
                          </p>
                          <Button variant="outline">Choose File</Button>
                        </div>
                      )}
                    </div>

                    {preview && !analyzing && (
                      <Button variant="outline" className="w-full mt-4" onClick={resetScan}>
                        Scan New Image
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </motion.div>

              {/* RESULTS SECTION */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Leaf className="w-5 h-5 text-accent" />
                      Detection Results
                    </CardTitle>
                  </CardHeader>

                  <CardContent>
                    {result ? (
                      <div className="space-y-6">
                        
                        {/* Disease Title */}
                        <div className="flex items-start gap-4">
                          <div className="w-14 h-14 rounded-xl bg-destructive/10 flex items-center justify-center">
                            <AlertTriangle className="w-7 h-7 text-destructive" />
                          </div>

                          <div>
                            <h3 className="text-xl font-bold">{result.disease}</h3>
                            <Badge className={getSeverityColor(result.severity)}>
                              {result.severity.toUpperCase()}
                            </Badge>
                          </div>
                        </div>

                        {/* Confidence Bar */}
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-muted-foreground">Detection Confidence</span>
                            <span className="text-lg font-bold text-accent">{result.confidence}%</span>
                          </div>
                          <Progress value={result.confidence} className="h-3" />
                        </div>

                        {/* Weather Alert */}
                        {result.weatherAlert && (
                          <div className="p-4 rounded-xl bg-sun/10 border border-sun/20">
                            <div className="flex items-center gap-2 mb-1">
                              <AlertTriangle className="w-5 h-5 text-sun" />
                              <span className="font-medium">Weather Alert</span>
                            </div>
                            <p className="text-sm">{result.weatherAlert}</p>
                          </div>
                        )}

                        {/* Treatment */}
                        <div className="p-4 rounded-xl bg-accent/5 border border-accent/20">
                          <div className="flex items-center gap-2 mb-2">
                            <CheckCircle2 className="w-5 h-5 text-accent" />
                            <span className="font-medium">Recommended Treatment</span>
                          </div>
                          <ul className="space-y-2">
                            {result.treatment.map((t, i) => (
                              <li key={i} className="text-sm text-muted-foreground flex gap-2">
                                <span className="w-1.5 h-1.5 bg-accent rounded-full mt-2" />
                                {t}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Prevention */}
                        <div className="p-4 rounded-xl bg-muted/50">
                          <div className="flex items-center gap-2 mb-2">
                            <Info className="w-5 h-5 text-primary" />
                            <span className="font-medium">Prevention Tips</span>
                          </div>
                          <ul className="space-y-2">
                            {result.prevention.map((p, i) => (
                              <li key={i} className="text-sm text-muted-foreground flex gap-2">
                                <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2" />
                                {p}
                              </li>
                            ))}
                          </ul>
                        </div>

                      </div>
                    ) : (
                      <div className="py-20 text-center">
                        <ScanLine className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                        <p className="text-lg font-medium">Upload an image to analyze</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
