import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { BookOpen, Brain, TrendingUp } from 'lucide-react';

interface LandingPageProps {
  onNavigate: (page: string, type?: 'teacher' | 'student') => void;
}

export function LandingPage({ onNavigate }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-success bg-clip-text text-transparent" style={{ fontFamily: 'Roboto Mono, monospace' }}>
            Learnify
          </h1>
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto" style={{ fontFamily: 'Inter, sans-serif' }}>
            Your Personalized Learning Path, Powered by AI
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-20">
            <Button 
              size="lg"
              className="gradient-bg hover:opacity-90 px-8 py-3"
              onClick={() => onNavigate('teacher-dashboard', 'teacher')}
            >
              Login as Teacher
            </Button>
            <Button 
              size="lg"
              className="success-bg hover:opacity-90 px-8 py-3"
              onClick={() => onNavigate('student-dashboard', 'student')}
            >
              Login as Student
            </Button>
          </div>

          {/* Background Illustration */}
          <div className="relative mb-20">
            <div className="flex justify-center items-center space-x-8 opacity-20">
              <BookOpen size={64} className="text-primary animate-pulse" />
              <div className="text-4xl">→</div>
              <Brain size={64} className="text-success animate-pulse delay-1000" />
            </div>
          </div>
        </div>

        {/* How it Works Section */}
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12" style={{ fontFamily: 'Roboto Mono, monospace' }}>
            How it Works
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="card-shadow border-0 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <BookOpen size={32} className="text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-4" style={{ fontFamily: 'Roboto Mono, monospace' }}>
                  Create Path
                </h3>
                <p className="text-muted-foreground" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Teachers design structured learning paths with resources, quizzes, and AI-generated content.
                </p>
              </CardContent>
            </Card>

            <Card className="card-shadow border-0 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Brain size={32} className="text-success" />
                </div>
                <h3 className="text-xl font-semibold mb-4" style={{ fontFamily: 'Roboto Mono, monospace' }}>
                  Learn
                </h3>
                <p className="text-muted-foreground" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Students follow personalized paths with interactive content and AI-powered assistance.
                </p>
              </CardContent>
            </Card>

            <Card className="card-shadow border-0 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <TrendingUp size={32} className="text-destructive" />
                </div>
                <h3 className="text-xl font-semibold mb-4" style={{ fontFamily: 'Roboto Mono, monospace' }}>
                  Track Progress
                </h3>
                <p className="text-muted-foreground" style={{ fontFamily: 'Inter, sans-serif' }}>
                  Advanced analytics provide insights into learning progress and engagement patterns.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}