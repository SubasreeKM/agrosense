import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useDropzone } from 'react-dropzone';
import { Upload, ScanLine, AlertTriangle, CheckCircle2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Link } from 'react-router-dom';

export function DiseaseDetectorPreview() {
  const [preview, setPreview] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<{
    disease: string;
    confidence: number;
    severity: 'low' | 'medium' | 'high';
    treatment: string;
  } | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result as string);
        setResult(null);
        // Simulate analysis
        setAnalyzing(true);
        setTimeout(() => {
          setAnalyzing(false);
          setResult({
            disease: 'Late Blight',
            confidence: 94.5,
            severity: 'medium',
            treatment: 'Apply copper-based fungicide. Ensure proper drainage and air circulation around plants.',
          });
        }, 2000);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp'],
    },
    maxFiles: 1,
  });

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'text-accent';
      case 'medium': return 'text-sun';
      case 'high': return 'text-destructive';
      default: return 'text-muted-foreground';
    }
  };

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
            <ScanLine className="w-4 h-4" />
            Disease Detection
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            Detect Crop Diseases Instantly
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Upload a photo of your crop leaf and our AI will identify diseases 
            with treatment recommendations.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <Card variant="elevated" className="overflow-hidden">
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Upload Area */}
                <div>
                  <div
                    {...getRootProps()}
                    className={`
                      relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer
                      transition-all duration-300 min-h-[300px] flex items-center justify-center
                      ${isDragActive 
                        ? 'border-accent bg-accent/5' 
                        : 'border-border hover:border-accent/50 hover:bg-muted/50'
                      }
                    `}
                  >
                    <input {...getInputProps()} />
                    {preview ? (
                      <div className="relative w-full h-full">
                        <img
                          src={preview}
                          alt="Preview"
                          className="w-full h-64 object-cover rounded-lg"
                        />
                        {analyzing && (
                          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm rounded-lg flex items-center justify-center">
                            <div className="text-center">
                              <Loader2 className="w-10 h-10 text-accent animate-spin mx-auto mb-2" />
                              <p className="text-sm text-muted-foreground">Analyzing image...</p>
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div>
                        <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                          <Upload className="w-8 h-8 text-accent" />
                        </div>
                        <p className="text-foreground font-medium mb-2">
                          {isDragActive ? 'Drop your image here' : 'Drag & drop a leaf image'}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          or click to browse (JPG, PNG, WEBP)
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Results Area */}
                <div className="flex flex-col justify-center">
                  {result ? (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-6"
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center flex-shrink-0">
                          <AlertTriangle className="w-6 h-6 text-destructive" />
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold text-foreground">
                            {result.disease}
                          </h4>
                          <p className={`text-sm font-medium ${getSeverityColor(result.severity)}`}>
                            {result.severity.charAt(0).toUpperCase() + result.severity.slice(1)} Severity
                          </p>
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-muted-foreground">Confidence</span>
                          <span className="text-sm font-semibold text-accent">{result.confidence}%</span>
                        </div>
                        <Progress value={result.confidence} className="h-2" />
                      </div>

                      <div className="p-4 rounded-xl bg-muted/50">
                        <div className="flex items-center gap-2 mb-2">
                          <CheckCircle2 className="w-5 h-5 text-accent" />
                          <span className="font-medium text-foreground">Treatment</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {result.treatment}
                        </p>
                      </div>

                      <Link to="/disease-detector">
                        <Button variant="accent" className="w-full">
                          Full Analysis Dashboard
                        </Button>
                      </Link>
                    </motion.div>
                  ) : (
                    <div className="text-center p-8">
                      <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                        <ScanLine className="w-8 h-8 text-muted-foreground" />
                      </div>
                      <h4 className="font-semibold text-foreground mb-2">
                        Upload an Image to Analyze
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Our AI model can detect over 38 common crop diseases 
                        with 98% accuracy.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
