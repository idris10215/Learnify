import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { 
  ArrowLeft,
  Upload,
  Plus,
  Brain,
  FileText,
  Video,
  Link as LinkIcon,
  X,
  Check
} from 'lucide-react';

const steps = [
  { id: 1, title: 'Path Details', description: 'Basic information about your learning path' },
  { id: 2, title: 'Add Topics', description: 'Structure your learning content' },
  { id: 3, title: 'Upload Resources', description: 'Add materials and generate quizzes' },
];

const mockTopics = [
  { id: 1, title: 'Introduction to React', duration: '45 min', order: 1 },
  { id: 2, title: 'Components and Props', duration: '60 min', order: 2 },
  { id: 3, title: 'State Management', duration: '75 min', order: 3 },
];

const mockQuizzes = [
  {
    id: 1,
    topic: 'Introduction to React',
    questions: [
      {
        question: 'What is React?',
        options: ['A library', 'A framework', 'A language', 'A database'],
        correct: 0
      },
      {
        question: 'React uses which pattern?',
        options: ['MVC', 'MVP', 'Component-based', 'Observer'],
        correct: 2
      }
    ]
  }
];

export default function CreateLearningPath({ onNavigate }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [pathData, setPathData] = useState({
    title: '',
    description: '',
    difficulty: 'Beginner',
    estimatedHours: '',
  });

  const [topics, setTopics] = useState(mockTopics);
  const [newTopic, setNewTopic] = useState({ title: '', duration: '' });
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [generatedQuizzes, setGeneratedQuizzes] = useState(mockQuizzes);

  const handleNext = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const handlePrev = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const addTopic = () => {
    if (newTopic.title && newTopic.duration) {
      setTopics([...topics, {
        id: topics.length + 1,
        title: newTopic.title,
        duration: newTopic.duration,
        order: topics.length + 1
      }]);
      setNewTopic({ title: '', duration: '' });
    }
  };

  const removeTopic = (id) => {
    setTopics(topics.filter(topic => topic.id !== id));
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Learning Path Title</Label>
              <Input
                id="title"
                placeholder="e.g., Introduction to React Development"
                value={pathData.title}
                onChange={(e) => setPathData({ ...pathData, title: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe what students will learn in this path..."
                value={pathData.description}
                onChange={(e) => setPathData({ ...pathData, description: e.target.value })}
                rows={4}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="difficulty">Difficulty Level</Label>
                <select
                  id="difficulty"
                  className="w-full p-2 border border-border rounded-md"
                  value={pathData.difficulty}
                  onChange={(e) => setPathData({ ...pathData, difficulty: e.target.value })}
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="hours">Estimated Hours</Label>
                <Input
                  id="hours"
                  type="number"
                  placeholder="e.g., 8"
                  value={pathData.estimatedHours}
                  onChange={(e) => setPathData({ ...pathData, estimatedHours: e.target.value })}
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold font-mono">
                Learning Topics
              </h3>
              
              {/* Add New Topic */}
              <Card className="border-dashed border-2 border-muted">
                <CardContent className="p-4">
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="space-y-2">
                      <Label htmlFor="topic-title">Topic Title</Label>
                      <Input
                        id="topic-title"
                        placeholder="e.g., Introduction to Components"
                        value={newTopic.title}
                        onChange={(e) => setNewTopic({ ...newTopic, title: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="topic-duration">Duration</Label>
                      <Input
                        id="topic-duration"
                        placeholder="e.g., 45 min"
                        value={newTopic.duration}
                        onChange={(e) => setNewTopic({ ...newTopic, duration: e.target.value })}
                      />
                    </div>
                  </div>
                  <Button onClick={addTopic} className="w-full">
                    <Plus size={16} className="mr-2" />
                    Add Topic
                  </Button>
                </CardContent>
              </Card>

              {/* Topics List */}
              <div className="space-y-3">
                {topics.map((topic, index) => (
                  <Card key={topic.id} className="card-shadow border-0">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                            <span className="text-sm font-medium text-primary">{index + 1}</span>
                          </div>
                          <div>
                            <h4 className="font-medium">{topic.title}</h4>
                            <p className="text-sm text-muted-foreground">{topic.duration}</p>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeTopic(topic.id)}
                        >
                          <X size={16} />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold font-mono">
                Upload Resources
              </h3>

              {/* File Upload Area */}
              <Card className="border-dashed border-2 border-muted">
                <CardContent className="p-8 text-center">
                  <Upload size={48} className="mx-auto mb-4 text-muted-foreground" />
                  <h4 className="font-medium mb-2">Drag & drop files here</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Support for PDFs, videos, and links
                  </p>
                  <Button>Choose Files</Button>
                </CardContent>
              </Card>

              {/* Uploaded Files */}
              {uploadedFiles.length > 0 && (
                <div className="space-y-3">
                  <h4 className="font-medium">Uploaded Resources</h4>
                  {uploadedFiles.map((file, index) => (
                    <Card key={index} className="card-shadow border-0">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <FileText size={20} className="text-primary" />
                          <span className="flex-1">{file}</span>
                          <Button variant="outline" size="sm">
                            <Brain size={16} className="mr-2" />
                            Generate Quiz
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}

              {/* Generated Quizzes Preview */}
              {generatedQuizzes.length > 0 && (
                <div className="space-y-4">
                  <h4 className="font-medium">AI Generated Quizzes</h4>
                  {generatedQuizzes.map((quiz) => (
                    <Card key={quiz.id} className="card-shadow border-0">
                      <CardHeader>
                        <CardTitle className="text-base">Quiz: {quiz.topic}</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {quiz.questions.map((q, qIndex) => (
                          <div key={qIndex} className="p-3 bg-secondary/50 rounded-lg">
                            <h5 className="font-medium mb-2">{q.question}</h5>
                            <div className="space-y-1">
                              {q.options.map((option, oIndex) => (
                                <div
                                  key={oIndex}
                                  className={`p-2 rounded text-sm ${
                                    oIndex === q.correct 
                                      ? 'bg-success/20 text-success' 
                                      : 'bg-white'
                                  }`}
                                >
                                  {oIndex === q.correct && <Check size={14} className="inline mr-2" />}
                                  {option}
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-secondary/20 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" onClick={() => onNavigate('teacher-dashboard')}>
            <ArrowLeft size={20} className="mr-2" />
            Back to Dashboard
          </Button>
          <h1 className="text-2xl font-bold font-mono">
            Create Learning Path
          </h1>
        </div>

        {/* Stepper */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                      currentStep >= step.id
                        ? 'bg-primary border-primary text-white'
                        : 'bg-white border-muted text-muted-foreground'
                    }`}
                  >
                    {currentStep > step.id ? (
                      <Check size={20} />
                    ) : (
                      <span>{step.id}</span>
                    )}
                  </div>
                  <div className="mt-2 text-center">
                    <p className="text-sm font-medium">{step.title}</p>
                    <p className="text-xs text-muted-foreground">{step.description}</p>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`flex-1 h-0.5 mx-4 ${
                      currentStep > step.id ? 'bg-primary' : 'bg-muted'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <Card className="card-shadow border-0 mb-8">
          <CardContent className="p-8">
            {renderStepContent()}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button 
            variant="outline" 
            onClick={handlePrev}
            disabled={currentStep === 1}
          >
            Previous
          </Button>
          <div className="flex gap-4">
            <Button variant="outline">Save Draft</Button>
            {currentStep === 3 ? (
              <Button 
                className="gradient-bg hover:opacity-90"
                onClick={() => onNavigate('teacher-dashboard')}
              >
                Publish Path
              </Button>
            ) : (
              <Button onClick={handleNext}>
                Next
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}