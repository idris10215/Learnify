import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { 
  ArrowLeft,
  BookOpen,
  Brain,
  Check,
  Clock,
  FileText,
  Play,
  Download,
  ChevronRight,
  Star
} from 'lucide-react';

interface TopicViewProps {
  onNavigate: (page: string) => void;
}

const topicData = {
  title: 'Component State Management',
  course: 'Introduction to React',
  instructor: 'Dr. Smith',
  duration: '45 minutes',
  progress: 0,
  description: 'Learn how to manage state in React components using useState hook and understand when and how to lift state up.',
  learningObjectives: [
    'Understand what component state is',
    'Learn to use the useState hook',
    'Master state lifting patterns',
    'Practice with interactive examples'
  ]
};

const resources = [
  { id: 1, type: 'pdf', title: 'React State Management Guide.pdf', size: '2.3 MB' },
  { id: 2, type: 'video', title: 'useState Hook Demo', duration: '15 min' },
  { id: 3, type: 'link', title: 'Official React Docs - State', url: 'https://react.dev/learn/state' },
];

const aiSummary = `
This topic covers React component state management fundamentals. Key concepts include:

• **State Definition**: Local data that belongs to a component and can change over time
• **useState Hook**: The primary way to add state to functional components  
• **State Updates**: How to modify state and trigger re-renders
• **State Lifting**: Moving state up to share between components
• **Best Practices**: When to use local vs lifted state

The lesson includes practical examples and hands-on exercises to reinforce learning.
`;

export function TopicView({ onNavigate }: TopicViewProps) {
  const [completed, setCompleted] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [currentResource, setCurrentResource] = useState(0);

  const handleMarkComplete = () => {
    setCompleted(true);
  };

  const handleTakeQuiz = () => {
    onNavigate('quiz');
  };

  return (
    <div className="min-h-screen bg-secondary/20">
      {/* Header */}
      <div className="bg-white border-b border-border p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => onNavigate('student-dashboard')}>
              <ArrowLeft size={20} className="mr-2" />
              Back to Dashboard
            </Button>
            <div>
              <h1 className="text-xl font-semibold" style={{ fontFamily: 'Roboto Mono, monospace' }}>
                {topicData.title}
              </h1>
              <p className="text-sm text-muted-foreground">
                {topicData.course} • {topicData.instructor}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="flex items-center gap-1">
              <Clock size={14} />
              {topicData.duration}
            </Badge>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setBookmarked(!bookmarked)}
            >
              <Star size={16} className={bookmarked ? 'fill-current text-yellow-500' : ''} />
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Topic Overview */}
            <Card className="card-shadow border-0">
              <CardHeader>
                <CardTitle style={{ fontFamily: 'Roboto Mono, monospace' }}>Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">{topicData.description}</p>
                
                <div>
                  <h4 className="font-medium mb-3">Learning Objectives</h4>
                  <ul className="space-y-2">
                    {topicData.learningObjectives.map((objective, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                        <span className="text-sm">{objective}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Learning Resources */}
            <Card className="card-shadow border-0">
              <CardHeader>
                <CardTitle style={{ fontFamily: 'Roboto Mono, monospace' }}>Learning Resources</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {resources.map((resource, index) => (
                    <div
                      key={resource.id}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                        currentResource === index
                          ? 'border-primary bg-primary/5'
                          : 'border-border bg-white hover:border-primary/50'
                      }`}
                      onClick={() => setCurrentResource(index)}
                    >
                      <div className="flex items-center gap-3">
                        {resource.type === 'pdf' && <FileText size={20} className="text-red-500" />}
                        {resource.type === 'video' && <Play size={20} className="text-blue-500" />}
                        {resource.type === 'link' && <BookOpen size={20} className="text-green-500" />}
                        
                        <div className="flex-1">
                          <h4 className="font-medium">{resource.title}</h4>
                          <p className="text-sm text-muted-foreground">
                            {resource.size || resource.duration || 'External link'}
                          </p>
                        </div>
                        
                        <Button variant="ghost" size="sm">
                          <Download size={16} />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Resource Viewer */}
                <div className="mt-6 p-6 bg-secondary/50 rounded-lg min-h-96 flex items-center justify-center">
                  <div className="text-center">
                    <FileText size={64} className="mx-auto mb-4 text-muted-foreground" />
                    <h4 className="font-medium mb-2">PDF Viewer</h4>
                    <p className="text-sm text-muted-foreground">
                      Viewing: {resources[currentResource]?.title}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Progress Actions */}
            <Card className="card-shadow border-0 bg-gradient-to-r from-primary/5 to-success/5">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold mb-2" style={{ fontFamily: 'Roboto Mono, monospace' }}>
                      Ready to test your knowledge?
                    </h3>
                    <p className="text-muted-foreground">
                      Complete this topic and take the quiz to reinforce your learning.
                    </p>
                  </div>
                  <div className="flex gap-3">
                    {!completed ? (
                      <Button 
                        variant="outline"
                        onClick={handleMarkComplete}
                      >
                        <Check size={16} className="mr-2" />
                        Mark as Completed
                      </Button>
                    ) : (
                      <Badge className="success-bg">
                        <Check size={14} className="mr-1" />
                        Completed
                      </Badge>
                    )}
                    <Button 
                      className="gradient-bg hover:opacity-90"
                      onClick={handleTakeQuiz}
                    >
                      <Brain size={16} className="mr-2" />
                      Take Quiz
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Progress */}
            <Card className="card-shadow border-0">
              <CardHeader>
                <CardTitle style={{ fontFamily: 'Roboto Mono, monospace' }}>Your Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Course Progress</span>
                      <span className="text-sm text-muted-foreground">68%</span>
                    </div>
                    <Progress value={68} />
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Topic Progress</span>
                      <span className="text-sm text-muted-foreground">{completed ? '100%' : '0%'}</span>
                    </div>
                    <Progress value={completed ? 100 : 0} />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* AI Summary */}
            <Card className="card-shadow border-0">
              <CardHeader>
                <CardTitle className="flex items-center gap-2" style={{ fontFamily: 'Roboto Mono, monospace' }}>
                  <Brain size={20} className="text-primary" />
                  AI Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground whitespace-pre-line">
                  {aiSummary}
                </div>
              </CardContent>
            </Card>

            {/* Next Topic */}
            <Card className="card-shadow border-0">
              <CardHeader>
                <CardTitle style={{ fontFamily: 'Roboto Mono, monospace' }}>Up Next</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-secondary/50 rounded-lg">
                    <h4 className="font-medium text-sm">Event Handling in React</h4>
                    <p className="text-xs text-muted-foreground">30 minutes</p>
                  </div>
                  <Button variant="outline" className="w-full">
                    <ChevronRight size={16} className="mr-2" />
                    Continue to Next Topic
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}