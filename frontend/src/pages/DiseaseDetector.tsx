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
  Info,
} from 'lucide-react';

import { AppNavbar } from '@/components/layout/AppNavbar';
import { AppFooter } from '@/components/layout/AppFooter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

/* ================= TYPES ================= */

interface DetectionResult {
  disease: string;
  confidence: number;
  severity: 'low' | 'medium' | 'high';
  treatment: string[];
  prevention: string[];
  weatherAlert: string | null;
}

interface ApiResponse {
  status: string;
  message: string;
  data: {
    is_leaf: boolean;
    disease?: string;
    confidence?: number;
    message?: string;
  };
}

/* ================= COMPONENT ================= */

export default function DiseaseDetector() {
  const [preview, setPreview] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<DetectionResult | null>(null);

  /* ================= DROP HANDLER ================= */

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file));
    setResult(null);
    setAnalyzing(true);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch(
        'http://127.0.0.1:5000/api/disease-detect',
        {
          method: 'POST',
          body: formData,
        }
      );

      const apiResponse: ApiResponse = await response.json();
      setAnalyzing(false);

      // ❌ Not a leaf image
      if (!apiResponse.data.is_leaf) {
        alert(apiResponse.data.message || 'Not a leaf image');
        return;
      }

      const confidence = apiResponse.data.confidence || 0;

      // ✅ Display results
      setResult({
        disease: apiResponse.data.disease || 'Unknown',
        confidence,
        severity:
          confidence > 80 ? 'high' : confidence > 60 ? 'medium' : 'low',
        treatment: [
          'Apply recommended fungicide',
          'Remove infected leaves immediately',
          'Improve air circulation around crops',
        ],
        prevention: [
          'Use disease-resistant varieties',
          'Avoid overhead irrigation',
          'Maintain proper crop hygiene',
        ],
        weatherAlert: null,
      });

    } catch (error) {
      console.error(error);
      setAnalyzing(false);
      alert('Server error. Please try again.');
    }
  }, []);

  /* ================= DROPZONE ================= */

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.jpg', '.jpeg', '.png', '.webp'] },
    maxFiles: 1,
  });

  /* ================= HELPERS ================= */

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low':
        return 'bg-accent text-accent-foreground';
      case 'medium':
        return 'bg-sun text-sun-foreground';
      case 'high':
        return 'bg-destructive text-destructive-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const resetScan = () => {
    setPreview(null);
    setResult(null);
    setAnalyzing(false);
  };

  /* ================= UI ================= */

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <AppNavbar />

      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4">

          {/* HEADER */}
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
              Upload a crop leaf image and get AI-powered disease detection with
              treatment recommendations.
            </p>
          </motion.div>

          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8">

            {/* UPLOAD CARD */}
            <Card variant="elevated">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="w-5 h-5 text-accent" />
                  Upload Leaf Image
                </CardTitle>
              </CardHeader>

              <CardContent>
                <div
                  {...getRootProps()}
                  className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer min-h-[350px] flex items-center justify-center
                  ${isDragActive ? 'border-accent bg-accent/5' : 'border-border hover:border-accent/50'}`}
                >
                  <input {...getInputProps()} />

                  {preview ? (
                    <div className="relative w-full">
                      <img
                        src={preview}
                        alt="Leaf Preview"
                        className="w-full h-80 object-contain rounded-lg"
                      />

                      {analyzing && (
                        <div className="absolute inset-0 bg-background/80 flex items-center justify-center rounded-lg">
                          <Loader2 className="w-10 h-10 animate-spin text-accent" />
                        </div>
                      )}
                    </div>
                  ) : (
                    <div>
                      <Upload className="w-12 h-12 text-accent mx-auto mb-4" />
                      <p className="font-medium mb-2">
                        {isDragActive ? 'Drop image here' : 'Drag & drop leaf image'}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        JPG, PNG, WEBP supported
                      </p>
                    </div>
                  )}
                </div>

                {preview && !analyzing && (
                  <Button
                    variant="outline"
                    className="w-full mt-4"
                    onClick={resetScan}
                  >
                    Scan New Image
                  </Button>
                )}
              </CardContent>
            </Card>

            {/* RESULT CARD */}
            <Card variant="elevated">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Leaf className="w-5 h-5 text-accent" />
                  Detection Results
                </CardTitle>
              </CardHeader>

              <CardContent>
                {result ? (
                  <div className="space-y-6">
                    <div className="flex gap-4">
                      <AlertTriangle className="text-destructive w-8 h-8" />
                      <div>
                        <h3 className="text-xl font-bold">{result.disease}</h3>
                        <Badge className={getSeverityColor(result.severity)}>
                          {result.severity.toUpperCase()} SEVERITY
                        </Badge>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between mb-1">
                        <span>Confidence</span>
                        <span className="font-bold">{result.confidence}%</span>
                      </div>
                      <Progress value={result.confidence} />
                    </div>

                    <div>
                      <h4 className="font-semibold flex gap-2 items-center">
                        <CheckCircle2 className="w-5 h-5 text-accent" />
                        Treatment
                      </h4>
                      <ul className="list-disc ml-6 text-sm text-muted-foreground">
                        {result.treatment.map((t, i) => (
                          <li key={i}>{t}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold flex gap-2 items-center">
                        <Info className="w-5 h-5 text-primary" />
                        Prevention
                      </h4>
                      <ul className="list-disc ml-6 text-sm text-muted-foreground">
                        {result.prevention.map((p, i) => (
                          <li key={i}>{p}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ) : (
                  <p className="text-center text-muted-foreground">
                    Upload a leaf image to see results
                  </p>
                )}
              </CardContent>
            </Card>

          </div>
        </div>
      </main>

      <AppFooter />
    </div>
  );
}
