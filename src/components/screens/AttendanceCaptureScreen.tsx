import { useState } from 'react';
import { Camera, RotateCcw, Check, AlertCircle, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface AttendanceCaptureScreenProps {
  className: string;
  onCapture: () => void;
  onRetake: () => void;
  onProceed: () => void;
  detectedFaces?: number;
  isProcessing?: boolean;
  hasCapture?: boolean;
}

export const AttendanceCaptureScreen = ({
  className,
  onCapture,
  onRetake,
  onProceed,
  detectedFaces = 0,
  isProcessing = false,
  hasCapture = false
}: AttendanceCaptureScreenProps) => {
  return (
    <div className="p-4 space-y-4">
      {/* Class Info */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            {className}
          </CardTitle>
          <CardDescription>
            Position camera to capture all students in frame
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Camera Interface */}
      <div className="relative">
        <div className="aspect-[4/3] bg-muted rounded-xl overflow-hidden border-4 border-dashed border-primary/30">
          {/* Simulated Camera View */}
          <div className="w-full h-full bg-gradient-to-br from-primary/5 to-secondary/5 flex items-center justify-center">
            {hasCapture ? (
              <div className="text-center space-y-4">
                <div className="w-20 h-20 bg-success/20 rounded-full flex items-center justify-center mx-auto">
                  <Check className="h-10 w-10 text-success" />
                </div>
                <div>
                  <p className="font-semibold text-success">Photo Captured!</p>
                  <p className="text-sm text-muted-foreground">
                    {detectedFaces} faces detected
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-center text-muted-foreground">
                <Camera className="h-16 w-16 mx-auto mb-2 opacity-50" />
                <p>Camera Preview</p>
                <p className="text-xs">Tap capture when ready</p>
              </div>
            )}
          </div>

          {/* AI Detection Overlay */}
          {isProcessing && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <div className="text-center text-white">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-2" />
                <p className="text-sm">Processing faces...</p>
              </div>
            </div>
          )}

          {/* Face Detection Indicators */}
          {detectedFaces > 0 && !isProcessing && (
            <div className="absolute top-4 right-4">
              <Badge variant="secondary" className="bg-primary text-primary-foreground">
                {detectedFaces} faces
              </Badge>
            </div>
          )}
        </div>
      </div>

      {/* Instructions */}
      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="pt-4">
          <div className="flex gap-3">
            <AlertCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium">Capture Tips:</p>
              <ul className="text-xs text-muted-foreground mt-1 space-y-1">
                <li>• Ensure good lighting</li>
                <li>• Keep students facing camera</li>
                <li>• Avoid blurry images</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex gap-3">
        {hasCapture ? (
          <>
            <Button
              variant="outline"
              className="flex-1"
              onClick={onRetake}
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Retake
            </Button>
            <Button
              className="flex-1"
              onClick={onProceed}
              disabled={detectedFaces === 0}
            >
              <Check className="h-4 w-4 mr-2" />
              Continue ({detectedFaces})
            </Button>
          </>
        ) : (
          <Button
            className="w-full"
            size="lg"
            onClick={onCapture}
            disabled={isProcessing}
          >
            <Camera className="h-5 w-5 mr-2" />
            Capture Attendance
          </Button>
        )}
      </div>
    </div>
  );
};